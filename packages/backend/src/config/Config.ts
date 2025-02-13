import { LoggerOptions } from '@l2beat/backend-tools'
import { Layer2TransactionApi } from '@l2beat/config'
import { DiscoveryChainConfig } from '@l2beat/discovery'
import { ChainId, ProjectId, Token, UnixTime } from '@l2beat/shared-pure'
import { Knex } from 'knex'

import { Project } from '../model'
import { MulticallConfigEntry } from '../peripherals/ethereum/multicall/types'

export interface Config {
  readonly name: string
  readonly projects: Project[]
  readonly tokens: Token[]
  readonly logger: LoggerConfig
  readonly logThrottler: LogThrottlerConfig | false
  readonly clock: ClockConfig
  readonly metricsAuth: MetricsAuthConfig | false
  readonly database: DatabaseConfig
  readonly api: ApiConfig
  readonly health: HealthConfig
  readonly tvl: TvlConfig
  readonly liveness: LivenessConfig | false
  readonly finality: boolean
  readonly activity: ActivityConfig | false
  readonly updateMonitor: UpdateMonitorConfig | false
  readonly diffHistory: DiffHistoryConfig | false
  readonly statusEnabled: boolean
  readonly chains: { name: string; chainId: ChainId }[]
}

export type LoggerConfig = Pick<LoggerOptions, 'logLevel' | 'format'> &
  Partial<LoggerOptions>

export interface LogThrottlerConfig {
  readonly callsUntilThrottle: number
  readonly clearIntervalMs: number
  readonly throttleTimeMs: number
}

export interface ApiConfig {
  readonly port: number
}

export interface DatabaseConfig {
  readonly connection: Knex.Config['connection']
  readonly freshStart: boolean
  readonly connectionPoolSize: {
    min: number
    max: number
  }
}

export interface ClockConfig {
  readonly minBlockTimestamp: UnixTime
  readonly safeTimeOffsetSeconds: number
}

export interface TvlConfig {
  readonly enabled: boolean
  readonly errorOnUnsyncedTvl: boolean
  readonly coingeckoApiKey: string | undefined
  readonly ethereum: ChainTvlConfig
  readonly arbitrum: ChainTvlConfig
  readonly optimism: ChainTvlConfig
  readonly base: ChainTvlConfig
  readonly mantapacific: ChainTvlConfig
  readonly lyra: ChainTvlConfig
  readonly linea: ChainTvlConfig
  readonly zkfair: ChainTvlConfig
}

export interface LivenessConfig {
  readonly bigQuery: {
    readonly clientEmail: string
    readonly privateKey: string
    readonly projectId: string
    readonly queryLimitGb: number
    readonly queryWarningLimitGb: number
  }
  readonly minTimestamp: UnixTime
}

export interface BlockscoutChainConfig {
  readonly type: 'blockscout'
  readonly blockscoutApiUrl: string
}

export interface EtherscanChainConfig {
  readonly type: 'etherscan'
  readonly etherscanApiKey: string
  readonly etherscanApiUrl: string
}

export interface ChainTvlConfig {
  readonly chain: string
  readonly config?: {
    readonly projectId: ProjectId
    readonly chainId: ChainId
    readonly providerUrl: string
    readonly providerCallsPerMinute: number
    readonly minBlockTimestamp: UnixTime
    readonly blockNumberProviderConfig:
      | EtherscanChainConfig
      | BlockscoutChainConfig
    readonly multicallConfig: MulticallConfigEntry[]
  }
}

export interface HealthConfig {
  readonly releasedAt?: string
  readonly startedAt: string
  readonly commitSha: string
}
export interface ActivityConfig {
  readonly starkexApiKey: string
  readonly starkexCallsPerMinute: number
  readonly skipExplicitExclusion: boolean
  readonly projectsExcludedFromAPI: string[]
  readonly allowedProjectIds?: string[]
  readonly projects: Record<string, Layer2TransactionApi | undefined>
}

export interface MetricsAuthConfig {
  readonly user: string
  readonly pass: string
}

export interface UpdateMonitorConfig {
  readonly runOnStart?: boolean
  readonly chains: UpdateMonitorChainConfig[]
  readonly discord: DiscordConfig | false
}

export interface DiffHistoryConfig {
  readonly chains: DiffHistoryChainConfig[]
}

export interface DiscordConfig {
  readonly token: string
  readonly publicChannelId?: string
  readonly internalChannelId: string
  readonly callsPerMinute: number
}

export interface DiscoveryCacheChainConfig {
  reorgSafeDepth?: number
}

export type UpdateMonitorChainConfig = DiscoveryChainConfig &
  DiscoveryCacheChainConfig

export type DiffHistoryChainConfig = UpdateMonitorChainConfig
