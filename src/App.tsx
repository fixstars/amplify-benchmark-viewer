import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  ClientListPage,
  ClientPage,
  LabelListPage,
  ProblemListPage,
  ProblemPage,
  UploadDataPage,
} from 'pages'
import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { theme } from 'utils/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<ProblemListPage />} />
            <Route path="/clients" element={<ClientListPage />} />
            <Route
              path="/classes/:className/instances/:instance"
              element={<ProblemPage />}
            />
            <Route path="/clients/:clientName" element={<ClientPage />} />
            <Route path="/labels" element={<LabelListPage />} />
            <Route path="/upload" element={<UploadDataPage />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
