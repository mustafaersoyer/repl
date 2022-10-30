import { sendRequest } from 'utils'

export const deletePublishedTypebotQuery = ({
  publishedTypebotId,
  typebotId,
}: {
  publishedTypebotId: string
  typebotId: string
}) =>
  sendRequest({
    method: 'DELETE',
    url: `/api/publicTypebots/${publishedTypebotId}?typebotId=${typebotId}`,
  })
