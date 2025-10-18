import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { UsersPage } from '@/pages/Users/UsersPage'

const SearchParamsSchema = v.object({
  page: v.optional(v.fallback(v.number(), 1), 1),
})

export const Route = createFileRoute('/admin/users')({
  component: UsersPage,
  validateSearch: SearchParamsSchema,
})
