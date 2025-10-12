import type { RegisteredRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import './styles/globals.css'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    isAuth: false,
    user: null,
    queryClient,
  },
})

interface AppRegister {
  router: typeof router
}

export type AppRouter = RegisteredRouter<AppRegister>

declare module '@tanstack/react-router' {
  interface Register extends AppRegister {}
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
)
