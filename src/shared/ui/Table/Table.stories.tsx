import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'

const meta = {
  component: Table,
  title: 'UI/Table',
} satisfies Meta<typeof Table>

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>John Doe</Table.Cell>
            <Table.Cell>john@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
            <Table.Cell>Active</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jane Smith</Table.Cell>
            <Table.Cell>jane@example.com</Table.Cell>
            <Table.Cell>User</Table.Cell>
            <Table.Cell>Active</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bob Johnson</Table.Cell>
            <Table.Cell>bob@example.com</Table.Cell>
            <Table.Cell>User</Table.Cell>
            <Table.Cell>Inactive</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  },
}

export const Empty: Story = {
  render: () => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
              No data available
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  },
}

export const WithActions: Story = {
  render: () => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>John Doe</Table.Cell>
            <Table.Cell>john@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell>
              <button>Edit</button>
              {' '}
              |
              <button>Delete</button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jane Smith</Table.Cell>
            <Table.Cell>jane@example.com</Table.Cell>
            <Table.Cell>User</Table.Cell>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell>
              <button>Edit</button>
              {' '}
              |
              <button>Delete</button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  },
}

export const LongContent: Story = {
  render: () => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>#001</Table.Cell>
            <Table.Cell>This is a very long description that might wrap to multiple lines and test how the table handles content overflow</Table.Cell>
            <Table.Cell>Pending</Table.Cell>
            <Table.Cell>2024-01-15</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>#002</Table.Cell>
            <Table.Cell>Short description</Table.Cell>
            <Table.Cell>Completed</Table.Cell>
            <Table.Cell>2024-01-14</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  },
}

export default meta
