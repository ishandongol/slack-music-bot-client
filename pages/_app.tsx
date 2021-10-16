import "react-dates/lib/css/_datepicker.css";
import '../styles/main.scss'
import type { AppProps } from 'next/app'
import 'react-dates/initialize';
import { SocketProvider } from "../hooks/useSocket";
import appConfig from "../config";

import { config,library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
library.add(fab,fas)

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <SocketProvider url={appConfig.webSocketUrl}>
    <Component {...pageProps} />
    </SocketProvider>
  )
}
export default MyApp
