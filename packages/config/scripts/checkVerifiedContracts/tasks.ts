import { Logger } from '@l2beat/backend-tools'
import { EtherscanLikeClient } from '@l2beat/shared'
import { EthereumAddress, toBatches } from '@l2beat/shared-pure'

import { isContractVerified } from './etherscan'
import { VerificationMap } from './output'

export async function verifyContracts(
  addresses: EthereumAddress[],
  previouslyVerified: Set<EthereumAddress>,
  manuallyVerified: Record<string, string>,
  etherscanClient: EtherscanLikeClient,
  workersCount: number,
  logger: Logger,
): Promise<VerificationMap> {
  logger.info(`Processing ${addresses.length} addresses.`)

  const getVerificationPromises = (addresses: EthereumAddress[]) =>
    addresses.map(async (address): Promise<[string, boolean]> => {
      if (
        previouslyVerified.has(address) ||
        manuallyVerified[address.toString()]
      ) {
        return [address.toString(), true]
      }

      logger.info(`Checking ${address.toString()}...`)
      const isVerified = await isContractVerified(etherscanClient, address)
      return [address.toString(), isVerified]
    })

  const batches = toBatches(addresses, workersCount)
  const results = []
  for (const batch of batches) {
    const processed = await Promise.all(getVerificationPromises(batch))
    results.push(...processed)
  }
  return Object.fromEntries(results)
}
