import 'styled-components'
import { lightTheme } from './lightTheme' 

type ITheme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
