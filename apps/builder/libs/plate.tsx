import {
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
} from '@udecode/plate-basic-marks'
import { createPlugins } from '@udecode/plate-core'
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link'
import { PlateFloatingLink } from '@udecode/plate-ui-link'

export const editorStyle: React.CSSProperties = {
  flex: 1,
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '0.25rem',
}

export const platePlugins = createPlugins(
  [
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createLinkPlugin({
      renderAfterEditable: PlateFloatingLink,
      options: {
        isUrl: (url: string) =>
          url.startsWith('http') ||
          url.startsWith('mailto') ||
          url.startsWith('tel') ||
          url.startsWith('sms'),
      },
    }),
  ],
  {
    components: {
      [ELEMENT_LINK]: (props) => (
        <a
          href={props.element.url}
          target="_blank"
          rel="noreferrer"
          className={props.className}
        >
          {props.children}
        </a>
      ),
    },
  }
)
