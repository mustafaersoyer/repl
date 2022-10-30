import { fetcher } from 'services/utils'
import useSWR from 'swr'
import { env } from 'utils'

type Invoice = {
  id: string
  url: string
  date: number
  currency: string
  amount: number
}
export const useInvoicesQuery = (stripeId?: string | null) => {
  const { data, error } = useSWR<{ invoices: Invoice[] }, Error>(
    stripeId ? `/api/stripe/invoices?stripeId=${stripeId}` : null,
    fetcher,
    {
      dedupingInterval: env('E2E_TEST') === 'true' ? 0 : undefined,
    }
  )
  return {
    invoices: data?.invoices ?? [],
    isLoading: !error && !data,
  }
}
