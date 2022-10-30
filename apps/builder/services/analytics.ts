import { Stats } from 'models'
import useSWR from 'swr'
import { fetcher } from './utils'

export const useStats = ({
  typebotId,
  onError,
}: {
  typebotId?: string
  onError: (error: Error) => void
}) => {
  const { data, error, mutate } = useSWR<{ stats: Stats }, Error>(
    typebotId ? `/api/typebots/${typebotId}/results/stats` : null,
    fetcher
  )
  if (error) onError(error)
  return {
    stats: data?.stats,
    isLoading: !error && !data,
    mutate,
  }
}

export type AnswersCount = { groupId: string; totalAnswers: number }
export const useAnswersCount = ({
  typebotId,
  onError,
}: {
  typebotId?: string
  onError: (error: Error) => void
}) => {
  const { data, error, mutate } = useSWR<
    { answersCounts: AnswersCount[] },
    Error
  >(
    typebotId ? `/api/typebots/${typebotId}/results/answers/count` : null,
    fetcher
  )
  if (error) onError(error)
  return {
    answersCounts: data?.answersCounts,
    isLoading: !error && !data,
    mutate,
  }
}
