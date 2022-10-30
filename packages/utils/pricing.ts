import { Plan, Workspace } from 'db'

const infinity = -1

export const prices = {
  [Plan.STARTER]: 39,
  [Plan.PRO]: 89,
} as const

export const chatsLimit = {
  [Plan.FREE]: { totalIncluded: 300 },
  [Plan.STARTER]: {
    totalIncluded: 2000,
    increaseStep: {
      amount: 500,
      price: 10,
    },
  },
  [Plan.PRO]: {
    totalIncluded: 10000,
    increaseStep: {
      amount: 1000,
      price: 10,
    },
  },
  [Plan.OFFERED]: { totalIncluded: infinity },
  [Plan.LIFETIME]: { totalIncluded: infinity },
} as const

export const storageLimit = {
  [Plan.FREE]: { totalIncluded: 0 },
  [Plan.STARTER]: {
    totalIncluded: 2,
    increaseStep: {
      amount: 1,
      price: 2,
    },
  },
  [Plan.PRO]: {
    totalIncluded: 10,
    increaseStep: {
      amount: 1,
      price: 2,
    },
  },
  [Plan.OFFERED]: { totalIncluded: 2 },
  [Plan.LIFETIME]: { totalIncluded: 10 },
} as const

export const seatsLimit = {
  [Plan.FREE]: { totalIncluded: 0 },
  [Plan.STARTER]: {
    totalIncluded: 2,
  },
  [Plan.PRO]: {
    totalIncluded: 5,
  },
  [Plan.OFFERED]: { totalIncluded: 2 },
  [Plan.LIFETIME]: { totalIncluded: 8 },
} as const

export const getChatsLimit = ({
  plan,
  additionalChatsIndex,
}: Pick<Workspace, 'additionalChatsIndex' | 'plan'>) => {
  const { totalIncluded } = chatsLimit[plan]
  const increaseStep =
    plan === Plan.STARTER || plan === Plan.PRO
      ? chatsLimit[plan].increaseStep
      : { amount: 0 }
  if (totalIncluded === infinity) return infinity
  return totalIncluded + increaseStep.amount * additionalChatsIndex
}

export const getStorageLimit = ({
  plan,
  additionalStorageIndex,
}: Pick<Workspace, 'additionalStorageIndex' | 'plan'>) => {
  const { totalIncluded } = storageLimit[plan]
  const increaseStep =
    plan === Plan.STARTER || plan === Plan.PRO
      ? storageLimit[plan].increaseStep
      : { amount: 0 }
  return totalIncluded + increaseStep.amount * additionalStorageIndex
}

export const computePrice = (
  plan: Plan,
  selectedTotalChatsIndex: number,
  selectedTotalStorageIndex: number
) => {
  if (plan !== Plan.STARTER && plan !== Plan.PRO) return
  const {
    increaseStep: { price: chatsPrice },
  } = chatsLimit[plan]
  const {
    increaseStep: { price: storagePrice },
  } = storageLimit[plan]
  return (
    prices[plan] +
    selectedTotalChatsIndex * chatsPrice +
    selectedTotalStorageIndex * storagePrice
  )
}

const europeanUnionCountryCodes = [
  'AT',
  'BE',
  'BG',
  'CY',
  'CZ',
  'DE',
  'DK',
  'EE',
  'ES',
  'FI',
  'FR',
  'GR',
  'HR',
  'HU',
  'IE',
  'IT',
  'LT',
  'LU',
  'LV',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SE',
  'SI',
  'SK',
]

const europeanUnionExclusiveLanguageCodes = [
  'fr',
  'de',
  'it',
  'el',
  'pl',
  'fi',
  'nl',
  'hr',
  'cs',
  'hu',
  'ro',
  'sl',
  'sv',
  'bg',
]

export const guessIfUserIsEuropean = () =>
  navigator.languages.some((language) => {
    const [languageCode, countryCode] = language.split('-')
    return countryCode
      ? europeanUnionCountryCodes.includes(countryCode)
      : europeanUnionExclusiveLanguageCodes.includes(languageCode)
  })

export const formatPrice = (price: number) => {
  const isEuropean = guessIfUserIsEuropean()
  const formatter = new Intl.NumberFormat(isEuropean ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: isEuropean ? 'EUR' : 'USD',
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  return formatter.format(price)
}
