import { Logger } from '@l2beat/backend-tools'
import {
  CoingeckoClient,
  CoingeckoQueryService,
  HttpClient,
} from '@l2beat/shared'
import { notUndefined } from '@l2beat/shared-pure'

import { BlocksController } from '../../api/controllers/BlocksController'
import { DydxController } from '../../api/controllers/DydxController'
import { TvlController } from '../../api/controllers/tvl/TvlController'
import { createBlocksRouter } from '../../api/routers/BlocksRouter'
import { createDydxRouter } from '../../api/routers/DydxRouter'
import { createTvlRouter } from '../../api/routers/TvlRouter'
import { createTvlStatusRouter } from '../../api/routers/TvlStatusRouter'
import { Config } from '../../config'
import { ChainTvlConfig } from '../../config/Config'
import { Clock } from '../../core/Clock'
import { PriceUpdater } from '../../core/PriceUpdater'
import { AggregatedReportUpdater } from '../../core/reports/AggregatedReportUpdater'
import { AggregatedReportRepository } from '../../peripherals/database/AggregatedReportRepository'
import { AggregatedReportStatusRepository } from '../../peripherals/database/AggregatedReportStatusRepository'
import { BalanceRepository } from '../../peripherals/database/BalanceRepository'
import { BalanceStatusRepository } from '../../peripherals/database/BalanceStatusRepository'
import { BlockNumberRepository } from '../../peripherals/database/BlockNumberRepository'
import { CirculatingSupplyRepository } from '../../peripherals/database/CirculatingSupplyRepository'
import { PriceRepository } from '../../peripherals/database/PriceRepository'
import { ReportRepository } from '../../peripherals/database/ReportRepository'
import { ReportStatusRepository } from '../../peripherals/database/ReportStatusRepository'
import { Database } from '../../peripherals/database/shared/Database'
import { TotalSupplyRepository } from '../../peripherals/database/TotalSupplyRepository'
import { TotalSupplyStatusRepository } from '../../peripherals/database/TotalSupplyStatusRepository'
import { ApplicationModule, TvlSubmodule } from '../ApplicationModule'
import { chainTvlSubmodule } from './ChainTvlSubmodule'
import { createEthereumTvlSubmodule } from './EthereumTvlSubmodule'
import { TvlDatabase } from './types'

export function createTvlModule(
  config: Config,
  logger: Logger,
  http: HttpClient,
  database: Database,
  clock: Clock,
): ApplicationModule | undefined {
  if (!config.tvl.enabled) {
    logger.info('TVL module disabled')
    return
  }
  // #region database

  const db: TvlDatabase = {
    blockNumberRepository: new BlockNumberRepository(database, logger),
    priceRepository: new PriceRepository(database, logger),
    balanceRepository: new BalanceRepository(database, logger),
    reportRepository: new ReportRepository(database, logger),
    aggregatedReportRepository: new AggregatedReportRepository(
      database,
      logger,
    ),
    reportStatusRepository: new ReportStatusRepository(database, logger),
    aggregatedReportStatusRepository: new AggregatedReportStatusRepository(
      database,
      logger,
    ),
    balanceStatusRepository: new BalanceStatusRepository(database, logger),
    totalSupplyRepository: new TotalSupplyRepository(database, logger),
    totalSupplyStatusRepository: new TotalSupplyStatusRepository(
      database,
      logger,
    ),
    circulatingSupplyRepository: new CirculatingSupplyRepository(
      database,
      logger,
    ),
  }
  // #endregion
  // #region peripherals

  const coingeckoClient = new CoingeckoClient(http, config.tvl.coingeckoApiKey)
  const coingeckoQueryService = new CoingeckoQueryService(coingeckoClient)

  // #endregion
  // #region updaters

  const priceUpdater = new PriceUpdater(
    coingeckoQueryService,
    db.priceRepository,
    clock,
    config.tokens,
    logger,
  )

  // #endregion
  // #region submodules

  const createChainTvlSubmodule = (tvlConfig: ChainTvlConfig) =>
    chainTvlSubmodule(
      tvlConfig,
      config.tokens,
      db,
      priceUpdater,
      coingeckoQueryService,
      http,
      clock,
      logger,
    )

  const submodules: TvlSubmodule[] = [
    createEthereumTvlSubmodule(db, priceUpdater, config, logger, http, clock),
    createChainTvlSubmodule(config.tvl.arbitrum),
    createChainTvlSubmodule(config.tvl.optimism),
    createChainTvlSubmodule(config.tvl.base),
    createChainTvlSubmodule(config.tvl.lyra),
    createChainTvlSubmodule(config.tvl.linea),
    createChainTvlSubmodule(config.tvl.mantapacific),
    createChainTvlSubmodule(config.tvl.zkfair),
  ].filter(notUndefined)

  // #endregion

  const aggregatedReportUpdater = new AggregatedReportUpdater(
    submodules.flatMap((x) => x.reportUpdaters ?? []),
    db.aggregatedReportRepository,
    db.aggregatedReportStatusRepository,
    clock,
    config.projects,
    logger,
  )

  // #region api
  const blocksController = new BlocksController(db.blockNumberRepository)

  const tvlController = new TvlController(
    db.aggregatedReportRepository,
    db.reportRepository,
    db.aggregatedReportStatusRepository,
    db.balanceRepository,
    db.priceRepository,
    config.projects,
    config.tokens,
    logger,
    aggregatedReportUpdater.getConfigHash(),
    { errorOnUnsyncedTvl: config.tvl.errorOnUnsyncedTvl },
  )

  const dydxController = new DydxController(db.aggregatedReportRepository)

  const blocksRouter = createBlocksRouter(blocksController)
  const tvlRouter = createTvlRouter(tvlController)
  const dydxRouter = createDydxRouter(dydxController)
  const tvlStatusRouter = createTvlStatusRouter(
    clock,
    priceUpdater,
    aggregatedReportUpdater,
    submodules,
  )

  // #endregion

  const start = async () => {
    logger = logger.for('TvlModule')
    logger.info('Starting')

    priceUpdater.start()

    logger.info('Starting submodules...')

    for (const submodule of submodules) {
      await submodule.start?.()
    }

    await aggregatedReportUpdater.start()

    logger.info('Started')
  }

  return {
    routers: [blocksRouter, tvlRouter, dydxRouter, tvlStatusRouter],
    start,
  }
}
