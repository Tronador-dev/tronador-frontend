import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './screens/login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Table } from './common/table'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Table />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
