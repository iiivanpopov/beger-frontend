import type { RegisteredRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastsProvider } from '@/components/ToastsProvider'
import { routeTree } from './routeTree.gen'
import './styles/globals.css'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    role: 'guest',
    queryClient,
  },
})

export type AppRouter = RegisteredRouter<{
  router: typeof router
}>

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastsProvider />
    </QueryClientProvider>
  </StrictMode>,
)
