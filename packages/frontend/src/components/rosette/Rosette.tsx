import React from 'react'

import { cn } from '../../utils/cn'
import {
  sentimentToFillColor,
  sentimentToTextColor,
} from '../../utils/risks/color'
import { RiskSentiments, RiskValue, RiskValues } from '../../utils/risks/types'
import { getRiskSentiments } from '../../utils/risks/values'
import { UpcomingBadge } from '../badge/UpcomingBadge'
import { RoundedWarningIcon } from '../icons'
import { Icon } from '../icons/Icon'
import { WarningBar } from '../project/WarningBar'

export interface RosetteProps {
  risks: RiskSentiments
  isUpcoming?: boolean
  className?: string
  isUnderReview?: boolean
}

export function SmallRosette({ risks, className, isUpcoming }: RosetteProps) {
  if (isUpcoming) {
    return <UpcomingBadge className={className} isShort={true} />
  }

  const isUnderReview = Object.values(risks).every(
    (sentiment) => sentiment === 'UnderReview',
  )

  return (
    <Icon
      width="31"
      height="30"
      viewBox="0 0 31 30"
      alt-text="Rosette showing risk summary"
      className={className}
    >
      <path
        d="M13.6396 16.5301C14.1235 16.3737 14.6195 16.734 14.6203 17.2426L14.6393 29.1709C14.64 29.6134 14.2613 29.9553 13.8246 29.8834C12.3495 29.6405 9.1625 28.9365 6.6835 27.1354C3.98662 25.176 2.44301 22.4522 1.82389 21.1716C1.637 20.785 1.84661 20.3411 2.25519 20.2091L13.6396 16.5301Z"
        className={sentimentToFillColor(risks.sequencerFailure)}
      />
      <path
        d="M13.5475 13.7202C13.8415 14.1351 13.6462 14.7161 13.1612 14.8691L1.78553 18.4578C1.36348 18.591 0.923865 18.332 0.861775 17.8938C0.652045 16.4137 0.369734 13.162 1.34618 10.2576C2.40848 7.09781 4.54539 4.80971 5.58199 3.8356C5.89489 3.54156 6.38109 3.6087 6.62939 3.95902L13.5475
        13.7202Z"
        className={sentimentToFillColor(risks.stateValidation)}
      />
      <path
        d="M16.1218 12.6975C15.824 13.1098 15.211 13.1124 14.9096 12.7028L7.84131 3.09432C7.57901 2.73784 7.68231 2.23816 8.07691 2.03796C9.41021 1.36171 12.3966 0.0449563 15.4608 0.0316763C18.7943 0.0172163 21.6497 1.30117 22.9062 1.96788C23.2855 2.16914 23.379 2.65101 23.1275 2.99909L16.1218 12.6975Z"
        className={sentimentToFillColor(risks.dataAvailability)}
      />
      <path
        d="M17.8554 14.8216C17.3732 14.6599 17.1884 14.0755 17.4898 13.6659L24.5611 4.05961C24.8234 3.70319 25.3312 3.65312 25.6397 3.9704C26.6819 5.04211 28.8273 7.50181 29.7514 10.4233C30.7567 13.6017 30.3802 16.7098 30.1174 18.1077C30.038 18.5297 29.6057 18.7622 29.1986 18.6257L17.8554 14.8216Z"
        className={sentimentToFillColor(risks.exitWindow)}
      />
      <path
        d="M16.3566 17.2429C16.354 16.7344 16.8476 16.3708 17.3325 16.5239L28.7071 20.116C29.1291 20.2493 29.3404 20.7137 29.1397 21.1081C28.4617 22.4405 26.8261 25.265 24.3593 27.0826C21.6755 29.0599 18.6122 29.7068 17.2043 29.9093C16.7793 29.9704 16.4197 29.6363 16.4175 29.2069L16.3566 17.2429Z"
        className={sentimentToFillColor(risks.proposerFailure)}
      />
      {
        // #region question marks
      }
      {isUnderReview && (
        <>
          <path
            d="M13.72 18.5C13.6539 18.4996 13.5885 18.4862 13.5276 18.4605C13.4667 18.4348 13.4115 18.3974 13.365 18.3504C13.3186 18.3033 13.2819 18.2476 13.257 18.1864C13.2321 18.1251 13.2195 18.0596 13.22 17.9935C13.2265 16.6435 13.27 16.0995 13.5405 15.4435C13.8968 14.647 14.4296 13.9419 15.0985 13.3815C15.5885 12.9805 16.0211 12.5139 16.384 11.995C16.581 11.6985 16.6966 11.3553 16.719 11C16.7425 10.7973 16.7199 10.592 16.6528 10.3993C16.5858 10.2066 16.476 10.0315 16.3317 9.8873C16.1875 9.743 16.0124 9.6332 15.8197 9.5661C15.627 9.4991 15.4217 9.4765 15.219 9.5C14.204 9.5 13.83 10.278 13.7335 11.0465C13.7206 11.1699 13.6629 11.2842 13.5713 11.3678C13.4797 11.4514 13.3605 11.4985 13.2365 11.5H10.223C10.1554 11.4994 10.0886 11.4853 10.0266 11.4585C9.9646 11.4316 9.9086 11.3925 9.8619 11.3436C9.8153 11.2947 9.779 11.2369 9.7551 11.1737C9.7312 11.1104 9.7203 11.043 9.723 10.9755C9.793 8.9895 10.2815 8.1205 11.2325 7.243C12.1955 6.3545 13.4035 6 15.219 6C17.072 6 18.2645 6.35 19.206 7.177C19.7154 7.644 20.1153 8.2179 20.3769 8.8576C20.6384 9.4972 20.7553 10.1869 20.719 10.877C20.7208 11.5954 20.5531 12.3041 20.2295 12.9455C19.8028 13.7149 19.2539 14.4099 18.6045 15.0035L17.672 15.891C17.0911 16.4578 16.7553 17.2296 16.7365 18.041C16.7261 18.1656 16.6694 18.2818 16.5776 18.3667C16.4858 18.4515 16.3655 18.4989 16.2405 18.4995L13.72 18.5Z"
            fill="url(#paint0_linear_10_20)"
          />
          <path
            d="M14.9688 24C16.2114 24 17.2188 22.9926 17.2188 21.75C17.2188 20.5074 16.2114 19.5 14.9688 19.5C13.7261 19.5 12.7188 20.5074 12.7188 21.75C12.7188 22.9926 13.7261 24 14.9688 24Z"
            fill="url(#paint1_linear_10_20)"
          />

          <defs>
            <linearGradient
              id="paint0_linear_10_20"
              x1="15.2205"
              y1="6"
              x2="15.2205"
              y2="18.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFD044" />
              <stop offset="1" stopColor="#FFC109" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_10_20"
              x1="14.9688"
              y1="19.5"
              x2="14.9688"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFD045" />
              <stop offset="1" stopColor="#FFC107" />
            </linearGradient>
            <clipPath id="clip0_10_20">
              <rect width="31" height="30" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
      {
        // #endregion
      }
    </Icon>
  )
}

export function MediumRosette({ risks, isUnderReview }: RosetteProps) {
  isUnderReview =
    isUnderReview ??
    Object.values(risks).every((sentiment) => sentiment === 'UnderReview')

  return (
    <div className="relative w-[201px] p-8">
      <BigRosetteIcon
        risks={risks}
        className="h-[136px] w-[137px]"
        isUnderReview={isUnderReview}
      />
      <span className="absolute bottom-[18px] left-[22px] w-[10ch] rotate-[36deg] text-center text-[10px] font-medium uppercase leading-tight">
        Sequencer failure
      </span>
      <span className="absolute -left-2 top-[59px] w-[10ch] -rotate-[68deg] text-center text-[10px] font-medium uppercase leading-tight">
        State validation
      </span>
      <span className="absolute left-1/2 top-0.5 w-[10ch] -translate-x-1/2 text-center text-[10px] font-medium uppercase leading-tight">
        Data availability
      </span>
      <span className="absolute left-[160px] top-[58px] rotate-[68deg] text-center text-[10px] font-medium uppercase leading-tight">
        Exit window
      </span>
      <span className="absolute bottom-[20px] right-[19px] w-[10ch] -rotate-[36deg] text-center text-[10px] font-medium uppercase leading-tight">
        Proposer failure
      </span>
    </div>
  )
}

interface BigRosetteProps {
  risks: RiskValues
  isUpcoming?: boolean
  isUnderReview?: boolean
  className?: string
}

export function BigRosette({
  risks,
  className,
  isUpcoming,
  isUnderReview,
}: BigRosetteProps) {
  isUnderReview =
    isUnderReview ??
    Object.values(risks).every(({ sentiment }) => sentiment === 'UnderReview')
  const riskSentiments = getRiskSentiments(risks, isUnderReview)

  return (
    <div
      className={cn('Rosette relative w-[272px] p-12', className)}
      data-rosette-hover-disabled={isUnderReview || (isUpcoming ?? false)}
    >
      <BigRosetteIcon
        risks={riskSentiments}
        isUpcoming={isUpcoming}
        isUnderReview={isUnderReview}
      />
      <span
        className="Rosette-Text absolute bottom-[30px] left-[31px] w-[10ch] rotate-[36deg] text-center text-xs font-medium uppercase leading-tight"
        data-rosette="sequencer-failure"
      >
        Sequencer failure
      </span>
      <span
        className="Rosette-Text absolute -left-1 top-[77px] w-[10ch] -rotate-[64deg] text-center text-xs font-medium uppercase leading-tight"
        data-rosette="state-validation"
      >
        State validation
      </span>
      <span
        className="Rosette-Text absolute left-1/2 top-[10px] w-[10ch] -translate-x-1/2 text-center text-xs font-medium uppercase leading-tight"
        data-rosette="data-availability"
      >
        Data availability
      </span>
      <span
        className="Rosette-Text absolute left-[207px] top-[72px] rotate-[64deg] text-center text-xs font-medium uppercase leading-tight"
        data-rosette="exit-window"
      >
        Exit window
      </span>
      <span
        className="Rosette-Text absolute bottom-[32px] right-[23px] w-[10ch] -rotate-[36deg] text-center text-xs font-medium uppercase leading-tight"
        data-rosette="validator-failure"
      >
        Proposer failure
      </span>
      <OverlayBox
        className="absolute bottom-40 left-0"
        data-rosette="sequencer-failure"
        risk={risks.sequencerFailure}
      />
      <OverlayBox
        className="absolute bottom-40 left-0"
        data-rosette="validator-failure"
        risk={risks.proposerFailure}
      />
      <OverlayBox
        className="absolute left-0 top-44"
        data-rosette="state-validation"
        risk={risks.stateValidation}
      />
      <OverlayBox
        className="absolute left-0 top-44"
        data-rosette="exit-window"
        risk={risks.exitWindow}
      />
      <OverlayBox
        className="absolute left-0 top-44"
        data-rosette="data-availability"
        risk={risks.dataAvailability}
      />
    </div>
  )
}

function BigRosetteIcon({
  risks,
  className,
  isUpcoming,
  isUnderReview,
}: RosetteProps) {
  return (
    <>
      <Icon
        width="181"
        height="180"
        viewBox="0 0 181 180"
        className={cn(className, isUpcoming && 'opacity-30')}
        alt-text="Rosette showing risk summary"
      >
        <circle
          cx="90.8408"
          cy="90"
          r="90"
          className="fill-gray-100 dark:fill-neutral-700"
        />
        <path
          d="M80.8589 98.2024C83.4853 97.3765 86.1548 99.3485 86.1374 102.102L85.7291 166.681C85.7139 169.077 83.649 170.912 81.288 170.504C73.3126 169.126 56.0884 165.178 42.7447 155.321C28.2279 144.597 19.9876 129.784 16.6906 122.825C15.6954 120.724 16.8492 118.33 19.0669 117.632L80.8589 98.2024Z"
          className={cn(
            sentimentToFillColor(risks.sequencerFailure),
            'Rosette-Slice focus:outline-none',
          )}
          data-rosette="sequencer-failure"
        />
        <path
          d="M80.4851 82.9885C82.0593 85.2473 80.9768 88.3846 78.3447 89.1921L16.604 108.133C14.3134 108.836 11.9444 107.415 11.6271 105.04C10.555 97.018 9.16596 79.4018 14.5768 63.7194C20.4634 46.6582 32.1303 34.3618 37.7841 29.1327C39.4908 27.5543 42.1203 27.9386 43.4495 29.8458L80.4851 82.9885Z"
          className={cn(
            sentimentToFillColor(risks.stateValidation),
            'Rosette-Slice focus:outline-none',
          )}
          data-rosette="state-validation"
        />
        <path
          d="M94.4599 77.5583C92.8302 79.7773 89.5113 79.7654 87.8975 77.5349L50.0417 25.2126C48.6372 23.2713 49.2175 20.5705 51.3629 19.5036C58.6097 15.8996 74.8347 8.89881 91.4242 8.95819C109.472 9.02278 124.876 16.0963 131.65 19.7596C133.695 20.8655 134.18 23.4783 132.804 25.352L94.4599 77.5583Z"
          className={cn(
            sentimentToFillColor(risks.dataAvailability),
            'Rosette-Slice focus:outline-none',
          )}
          data-rosette="data-availability"
        />
        <path
          d="M103.756 89.1339C101.153 88.2379 100.177 85.0657 101.827 82.8615L140.521 31.1566C141.957 29.2382 144.708 28.9889 146.365 30.7199C151.961 36.5668 163.471 49.9752 168.349 65.8316C173.655 83.082 171.483 99.8928 170.001 107.45C169.553 109.731 167.203 110.971 165.005 110.215L103.756 89.1339Z"
          className={cn(
            sentimentToFillColor(risks.exitWindow),
            'Rosette-Slice focus:outline-none',
          )}
          data-rosette="exit-window"
        />
        <path
          d="M95.5409 102.181C95.5486 99.428 98.2361 97.4805 100.855 98.3304L162.282 118.265C164.561 119.005 165.685 121.528 164.581 123.655C160.854 130.839 151.878 146.061 138.445 155.795C123.83 166.385 107.218 169.756 99.5872 170.792C97.2836 171.105 95.3511 169.28 95.3577 166.956L95.5409 102.181Z"
          className={cn(
            sentimentToFillColor(risks.proposerFailure),
            'Rosette-Slice focus:outline-none',
          )}
          data-rosette="validator-failure"
        />
        {
          // #region question marks */
        }
        {isUnderReview ? (
          <>
            <path
              d="M85.1534 102.444C84.9184 102.443 84.686 102.395 84.4694 102.304C84.2528 102.213 84.0564 102.08 83.8913 101.912C83.7262 101.745 83.5956 101.547 83.5072 101.329C83.4187 101.112 83.374 100.879 83.3756 100.644C83.3987 95.8436 83.5534 93.9093 84.5152 91.5769C85.7821 88.7447 87.6764 86.2377 90.0547 84.2453C91.7971 82.8194 93.3351 81.1606 94.6254 79.3156C95.3259 78.2612 95.7367 77.0411 95.8165 75.7778C95.9002 75.0572 95.8198 74.327 95.5813 73.6418C95.3429 72.9567 94.9526 72.3343 94.4396 71.8214C93.9266 71.3084 93.3043 70.9181 92.6191 70.6796C91.934 70.4412 91.2038 70.3608 90.4832 70.4444C86.8743 70.4444 85.5445 73.2107 85.2014 75.9431C85.1557 76.3817 84.9504 76.7883 84.6247 77.0856C84.2989 77.3828 83.8753 77.5501 83.4343 77.5556H72.7196C72.4793 77.5536 72.2418 77.5034 72.0213 77.4079C71.8008 77.3123 71.6017 77.1735 71.4359 76.9995C71.27 76.8256 71.1409 76.6201 71.056 76.3952C70.9711 76.1704 70.9323 75.9308 70.9418 75.6907C71.1907 68.6293 72.9276 65.5396 76.309 62.4196C79.733 59.2604 84.0281 58 90.4832 58C97.0716 58 101.312 59.2444 104.659 62.1849C106.471 63.8453 107.892 65.8858 108.822 68.1602C109.752 70.4346 110.168 72.8866 110.039 75.3404C110.045 77.8948 109.449 80.4145 108.298 82.6951C106.781 85.4308 104.83 87.902 102.521 90.0124L99.205 93.168C97.1396 95.1834 95.9456 97.9275 95.8787 100.812C95.8418 101.255 95.6403 101.669 95.3138 101.97C94.9874 102.272 94.5597 102.441 94.1152 102.443L85.1534 102.444Z"
              fill="#FFC107"
            />
            <path
              d="M89.5933 122C94.0115 122 97.5933 118.418 97.5933 114C97.5933 109.582 94.0115 106 89.5933 106C85.175 106 81.5933 109.582 81.5933 114C81.5933 118.418 85.175 122 89.5933 122Z"
              fill="#FFC107"
            />
          </>
        ) : (
          <>
            {risks.sequencerFailure === 'UnderReview' && (
              <>
                <path
                  d="M58.3289 137.667C58.2408 137.666 58.1536 137.648 58.0724 137.614C57.9912 137.58 57.9175 137.53 57.8556 137.467C57.7937 137.404 57.7447 137.33 57.7115 137.248C57.6784 137.167 57.6616 137.079 57.6622 136.991C57.6709 135.191 57.7289 134.466 58.0896 133.591C58.5646 132.529 59.275 131.589 60.1669 130.842C60.8203 130.307 61.397 129.685 61.8809 128.993C62.1436 128.598 62.2976 128.14 62.3276 127.667C62.3589 127.396 62.3288 127.123 62.2394 126.866C62.1499 126.609 62.0036 126.375 61.8112 126.183C61.6188 125.991 61.3855 125.844 61.1285 125.755C60.8716 125.665 60.5978 125.635 60.3276 125.667C58.9742 125.667 58.4756 126.704 58.3469 127.729C58.3297 127.893 58.2528 128.046 58.1306 128.157C58.0084 128.269 57.8496 128.331 57.6842 128.333H53.6662C53.5761 128.333 53.487 128.314 53.4043 128.278C53.3217 128.242 53.247 128.19 53.1848 128.125C53.1226 128.06 53.0742 127.983 53.0424 127.898C53.0105 127.814 52.996 127.724 52.9996 127.634C53.0929 124.986 53.7442 123.827 55.0122 122.657C56.2962 121.473 57.9069 121 60.3276 121C62.7982 121 64.3882 121.467 65.6436 122.569C66.3228 123.192 66.8559 123.957 67.2047 124.81C67.5535 125.663 67.7093 126.582 67.6609 127.503C67.6633 128.461 67.4396 129.405 67.0082 130.261C66.4392 131.287 65.7075 132.213 64.8416 133.005L63.5982 134.188C62.8237 134.944 62.376 135.973 62.3509 137.055C62.3371 137.221 62.2615 137.376 62.1391 137.489C62.0166 137.602 61.8563 137.665 61.6896 137.666L58.3289 137.667Z"
                  className="fill-yellow-200"
                />
                <path
                  d="M59.9941 145C61.651 145 62.9941 143.657 62.9941 142C62.9941 140.343 61.651 139 59.9941 139C58.3373 139 56.9941 140.343 56.9941 142C56.9941 143.657 58.3373 145 59.9941 145Z"
                  className="fill-yellow-200"
                />
              </>
            )}
            {risks.stateValidation === 'UnderReview' && (
              <>
                <path
                  d="M37.7742 77.6667C37.6861 77.6661 37.5989 77.6483 37.5177 77.614C37.4365 77.5798 37.3628 77.5299 37.3009 77.4672C37.239 77.4044 37.19 77.3301 37.1569 77.2485C37.1237 77.1668 37.1069 77.0795 37.1075 76.9913C37.1162 75.1913 37.1742 74.466 37.5349 73.5913C38.01 72.5293 38.7203 71.5891 39.6122 70.842C40.2656 70.3073 40.8423 69.6852 41.3262 68.9933C41.5889 68.598 41.7429 68.1404 41.7729 67.6667C41.8042 67.3964 41.7741 67.1226 41.6847 66.8657C41.5953 66.6088 41.4489 66.3754 41.2565 66.183C41.0642 65.9906 40.8308 65.8443 40.5738 65.7549C40.3169 65.6654 40.0431 65.6353 39.7729 65.6667C38.4195 65.6667 37.9209 66.704 37.7922 67.7287C37.7751 67.8932 37.6981 68.0456 37.5759 68.1571C37.4538 68.2686 37.2949 68.3313 37.1295 68.3333H33.1115C33.0214 68.3326 32.9324 68.3138 32.8497 68.2779C32.767 68.2421 32.6923 68.1901 32.6301 68.1248C32.5679 68.0596 32.5195 67.9825 32.4877 67.8982C32.4558 67.8139 32.4413 67.7241 32.4449 67.634C32.5382 64.986 33.1895 63.8273 34.4575 62.6573C35.7415 61.4727 37.3522 61 39.7729 61C42.2435 61 43.8335 61.4667 45.0889 62.5693C45.7681 63.192 46.3013 63.9572 46.65 64.8101C46.9988 65.663 47.1546 66.5825 47.1062 67.5027C47.1086 68.4605 46.885 69.4055 46.4535 70.2607C45.8845 71.2865 45.1528 72.2133 44.2869 73.0047L43.0435 74.188C42.269 74.9438 41.8213 75.9728 41.7962 77.0547C41.7824 77.2208 41.7068 77.3757 41.5844 77.4889C41.4619 77.602 41.3016 77.6652 41.1349 77.666L37.7742 77.6667Z"
                  className="fill-yellow-200"
                />
                <path
                  d="M39.4395 85C41.0963 85 42.4395 83.6569 42.4395 82C42.4395 80.3431 41.0963 79 39.4395 79C37.7826 79 36.4395 80.3431 36.4395 82C36.4395 83.6569 37.7826 85 39.4395 85Z"
                  className="fill-yellow-200"
                />
              </>
            )}
            {risks.dataAvailability === 'UnderReview' && (
              <>
                <path
                  d="M89.3296 42.667C89.2416 42.666 89.1546 42.648 89.0736 42.614C88.9916 42.58 88.9186 42.53 88.8566 42.467C88.7946 42.404 88.7456 42.33 88.7126 42.248C88.6796 42.167 88.6626 42.079 88.6636 41.991C88.6716 40.191 88.7296 39.466 89.0906 38.591C89.5656 37.529 90.2756 36.589 91.1676 35.842C91.8216 35.307 92.3976 34.685 92.8816 33.993C93.1446 33.598 93.2986 33.14 93.3286 32.667C93.3596 32.396 93.3296 32.123 93.2406 31.866C93.1506 31.609 93.0046 31.375 92.8126 31.183C92.6196 30.991 92.3866 30.844 92.1296 30.755C91.8726 30.665 91.5986 30.635 91.3286 30.667C89.9756 30.667 89.4766 31.704 89.3476 32.729C89.3306 32.893 89.2536 33.046 89.1316 33.157C89.0096 33.269 88.8506 33.331 88.6856 33.333H84.6676C84.5766 33.333 84.4876 33.314 84.4056 33.278C84.3226 33.242 84.2476 33.19 84.1856 33.125C84.1236 33.06 84.0746 32.983 84.0436 32.898C84.0116 32.814 83.9966 32.724 84.0006 32.634C84.0936 29.986 84.7456 28.827 86.0136 27.657C87.2976 26.473 88.9076 26 91.3286 26C93.7996 26 95.3896 26.467 96.6446 27.569C97.3236 28.192 97.8566 28.957 98.2056 29.81C98.5546 30.663 98.7106 31.582 98.6616 32.503C98.6646 33.461 98.4406 34.405 98.0096 35.261C97.4406 36.287 96.7086 37.213 95.8426 38.005L94.5996 39.188C93.8246 39.944 93.3766 40.973 93.3516 42.055C93.3376 42.221 93.2626 42.376 93.1396 42.489C93.0176 42.602 92.8576 42.665 92.6906 42.666L89.3296 42.667Z"
                  className="fill-yellow-200"
                />
                <path
                  d="M90.9946 50C92.6516 50 93.9946 48.657 93.9946 47C93.9946 45.343 92.6516 44 90.9946 44C89.3386 44 87.9946 45.343 87.9946 47C87.9946 48.657 89.3386 50 90.9946 50Z"
                  className="fill-yellow-200"
                />
              </>
            )}
            {risks.exitWindow === 'UnderReview' && (
              <>
                <path
                  d="M140.774 77.6667C140.686 77.6661 140.599 77.6483 140.518 77.614C140.436 77.5798 140.363 77.5299 140.301 77.4672C140.239 77.4044 140.19 77.3301 140.157 77.2485C140.124 77.1668 140.107 77.0795 140.108 76.9913C140.116 75.1913 140.174 74.466 140.535 73.5913C141.01 72.5293 141.72 71.5891 142.612 70.842C143.266 70.3073 143.842 69.6852 144.326 68.9933C144.589 68.598 144.743 68.1404 144.773 67.6667C144.804 67.3964 144.774 67.1226 144.685 66.8657C144.595 66.6088 144.449 66.3754 144.257 66.183C144.064 65.9906 143.831 65.8443 143.574 65.7549C143.317 65.6654 143.043 65.6353 142.773 65.6667C141.42 65.6667 140.921 66.704 140.792 67.7287C140.775 67.8932 140.698 68.0456 140.576 68.1571C140.454 68.2686 140.295 68.3313 140.13 68.3333H136.112C136.021 68.3326 135.932 68.3138 135.85 68.2779C135.767 68.2421 135.692 68.1901 135.63 68.1248C135.568 68.0596 135.519 67.9825 135.488 67.8982C135.456 67.8139 135.441 67.7241 135.445 67.634C135.538 64.986 136.19 63.8273 137.458 62.6573C138.742 61.4727 140.352 61 142.773 61C145.244 61 146.834 61.4667 148.089 62.5693C148.768 63.192 149.301 63.9572 149.65 64.8101C149.999 65.663 150.155 66.5825 150.106 67.5027C150.109 68.4605 149.885 69.4055 149.454 70.2607C148.885 71.2865 148.153 72.2133 147.287 73.0047L146.044 74.188C145.269 74.9438 144.821 75.9728 144.796 77.0547C144.782 77.2208 144.707 77.3757 144.584 77.4889C144.462 77.602 144.302 77.6652 144.135 77.666L140.774 77.6667Z"
                  className="fill-yellow-200"
                />
                <path
                  d="M142.439 85C144.096 85 145.439 83.6569 145.439 82C145.439 80.3431 144.096 79 142.439 79C140.783 79 139.439 80.3431 139.439 82C139.439 83.6569 140.783 85 142.439 85Z"
                  className="fill-yellow-200"
                />
              </>
            )}
            {risks.proposerFailure === 'UnderReview' && (
              <>
                <path
                  d="M120.33 137.667C120.242 137.666 120.155 137.648 120.074 137.614C119.992 137.58 119.919 137.53 119.857 137.467C119.795 137.404 119.746 137.33 119.713 137.248C119.68 137.167 119.663 137.079 119.664 136.991C119.672 135.191 119.73 134.466 120.091 133.591C120.566 132.529 121.276 131.589 122.168 130.842C122.822 130.307 123.398 129.685 123.882 128.993C124.145 128.598 124.299 128.14 124.329 127.667C124.36 127.396 124.33 127.123 124.241 126.866C124.151 126.609 124.005 126.375 123.813 126.183C123.62 125.991 123.387 125.844 123.13 125.755C122.873 125.665 122.599 125.635 122.329 125.667C120.976 125.667 120.477 126.704 120.348 127.729C120.331 127.893 120.254 128.046 120.132 128.157C120.01 128.269 119.851 128.331 119.686 128.333H115.668C115.577 128.333 115.488 128.314 115.406 128.278C115.323 128.242 115.248 128.19 115.186 128.125C115.124 128.06 115.075 127.983 115.044 127.898C115.012 127.814 114.997 127.724 115.001 127.634C115.094 124.986 115.746 123.827 117.014 122.657C118.298 121.473 119.908 121 122.329 121C124.8 121 126.39 121.467 127.645 122.569C128.324 123.192 128.857 123.957 129.206 124.81C129.555 125.663 129.711 126.582 129.662 127.503C129.665 128.461 129.441 129.405 129.01 130.261C128.441 131.287 127.709 132.213 126.843 133.005L125.6 134.188C124.825 134.944 124.377 135.973 124.352 137.055C124.338 137.221 124.263 137.376 124.14 137.489C124.018 137.602 123.858 137.665 123.691 137.666L120.33 137.667Z"
                  className="fill-yellow-200"
                />
                <path
                  d="M121.995 145C123.652 145 124.995 143.657 124.995 142C124.995 140.343 123.652 139 121.995 139C120.339 139 118.995 140.343 118.995 142C118.995 143.657 120.339 145 121.995 145Z"
                  className="fill-yellow-200"
                />
              </>
            )}
          </>
        )}
        {
          // #endregion
        }
      </Icon>
      {isUpcoming && (
        <UpcomingBadge className="absolute left-[90px] top-[130px]" />
      )}
    </>
  )
}

function OverlayBox({
  className,
  risk,
  ...props
}: {
  risk: RiskValue
  className: string
  'data-rosette': string
}) {
  return (
    <div
      {...props}
      className={cn(
        'Rosette-Description z-110 hidden animate-quick-fade-in rounded-md bg-white px-4 py-3 text-left text-sm leading-tight text-gray-700 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.55)] dark:bg-neutral-700 dark:text-white',
        className,
      )}
    >
      <span
        className={cn(
          'mb-2 flex items-center gap-1 font-medium',
          sentimentToTextColor(risk.sentiment),
        )}
      >
        {risk.value}
      </span>
      {risk.warning && (
        <WarningBar
          className="mb-2"
          icon={RoundedWarningIcon}
          text={risk.warning.text}
          color={risk.warning.sentiment === 'bad' ? 'red' : 'yellow'}
        />
      )}
      <span className="text-xs">{risk.description}</span>
    </div>
  )
}
