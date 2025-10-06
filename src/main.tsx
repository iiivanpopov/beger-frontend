import { createRoot } from 'react-dom/client'
import { App } from '@/app'
import { Layout } from '@/layout'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <Layout><App /></Layout>,
)
