import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/records')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/records"!</div>
}
