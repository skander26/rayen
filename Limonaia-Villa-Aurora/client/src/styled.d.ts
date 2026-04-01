import 'styled-components'
import type { AppTheme } from './theme/theme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- augments DefaultTheme for styled-components
  export interface DefaultTheme extends AppTheme {}
}
