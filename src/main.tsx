import type { RegisteredRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastsProvider } from '@/shared/components'
import { routeTree } from './routeTree.gen'
import './styles/globals.css'

const queryClient = new QueryClient()

const initialContextState = {
  user: null,
  queryClient,
}

const router = createRouter({
  routeTree,
  context: initialContextState,
})

interface AppRegister {
  router: typeof router
}

export type AppRouter = RegisteredRouter<AppRegister>

declare module '@tanstack/react-router' {
  interface Register extends AppRegister {}
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastsProvider />
    </QueryClientProvider>
  </StrictMode>,
)
