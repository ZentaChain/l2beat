import React from 'react'

import { cn } from '../../utils/cn'
import { InfoIcon } from '../icons'
import { Link } from '../Link'
import { Callout } from './Callout'

export interface UpcomingDisclaimerProps {
  className?: string
}

export function UpcomingDisclaimer({ className }: UpcomingDisclaimerProps) {
  return (
    <Callout
      className={cn('bg-blue-600 p-4', className)}
      icon={<InfoIcon className="mt-1 fill-blue-500" />}
      body={
        <>
          <p className="mb-4 leading-snug">
            This project is currently in the development phase and is yet to be
            launched on the Ethereum Mainnet.
          </p>
          <p className="mb-4 leading-snug">
            Once the deployment process is complete, it will be added to the
            list of active projects, along with comprehensive information
            regarding risk, technology, and other technical aspects.
          </p>
          <p className="leading-snug">
            Follow us on{' '}
            <Link href={'https://twitter.com/l2beat'} title="Twitter">
              Twitter
            </Link>{' '}
            to stay updated on the latest news regarding this and other Layer 2
            projects.
          </p>
        </>
      }
    />
  )
}
