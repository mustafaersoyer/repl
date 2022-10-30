import { FlexProps } from '@chakra-ui/react'
import { CodeEditor } from 'components/shared/CodeEditor'
import { useTypebot } from 'contexts/TypebotContext'
import parserHtml from 'prettier/parser-html'
import prettier from 'prettier/standalone'
import { PopupParams } from 'typebot-js'
import { env, getViewerUrl } from 'utils'
import { parseInitPopupCode, typebotJsHtml } from '../params'

type PopupEmbedCodeProps = {
  delay?: number
  withStarterVariables?: boolean
  onCopied?: () => void
}

export const PopupEmbedCode = ({ delay }: PopupEmbedCodeProps & FlexProps) => {
  const { typebot } = useTypebot()
  const snippet = prettier.format(
    createSnippet({
      url: `${
        env('VIEWER_INTERNAL_URL') ?? getViewerUrl({ isBuilder: true })
      }/${typebot?.publicId}`,
      delay,
    }),
    {
      parser: 'html',
      plugins: [parserHtml],
    }
  )
  return <CodeEditor value={snippet} lang="html" isReadOnly />
}

const createSnippet = (params: PopupParams): string => {
  const jsCode = parseInitPopupCode(params)
  return `${typebotJsHtml}
  <script>${jsCode}</script>`
}
