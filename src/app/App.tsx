import { ConfigProvider, theme } from 'antd'
import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { router } from './Router.tsx'

const client = new QueryClient()

function App() {
  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <QueryClientProvider client={client}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </>
  )
}

function ThemeProvider(props: PropsWithChildren) {
  const token = theme.useToken()
  return <StyledThemeProvider theme={token}>{props.children}</StyledThemeProvider>
}

export default App
