/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from 'store'
import GlobalFunctionsProvider from 'provider/GlobalFunctionsProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <GlobalFunctionsProvider>
          <Component {...pageProps} />
        </GlobalFunctionsProvider>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
