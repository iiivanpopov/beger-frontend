import { createFileRoute } from '@tanstack/react-router'
import { IndexPage } from '@/pages/index/IndexPage'

export const Route = createFileRoute('/')({
  component: IndexPage,
})
