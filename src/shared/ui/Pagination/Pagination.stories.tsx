import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'

const meta = {
  component: Pagination,
  title: 'UI/Pagination',
  argTypes: {
    page: { control: 'number' },
    nextDisabled: { control: 'boolean' },
    prevDisabled: { control: 'boolean' },
    availablePrev: { control: 'object' },
    availableNext: { control: 'object' },
    onNextPage: { action: 'nextPage' },
    onPrevPage: { action: 'prevPage' },
    onGotoPage: { action: 'gotoPage' },
  },
} satisfies Meta<typeof Pagination>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    page: 5,
    nextDisabled: false,
    prevDisabled: false,
    availablePrev: [3, 4],
    availableNext: [6, 7],
    onNextPage: () => {},
    onPrevPage: () => {},
    onGotoPage: () => {},
  },
}

export const FirstPage: Story = {
  args: {
    page: 1,
    nextDisabled: false,
    prevDisabled: true,
    availablePrev: [],
    availableNext: [2, 3],
    onNextPage: () => {},
    onPrevPage: () => {},
    onGotoPage: () => {},
  },
}

export const LastPage: Story = {
  args: {
    page: 10,
    nextDisabled: true,
    prevDisabled: false,
    availablePrev: [8, 9],
    availableNext: [],
    onNextPage: () => {},
    onPrevPage: () => {},
    onGotoPage: () => {},
  },
}

export const MiddlePage: Story = {
  args: {
    page: 5,
    nextDisabled: false,
    prevDisabled: false,
    availablePrev: [3, 4],
    availableNext: [6, 7],
    onNextPage: () => {},
    onPrevPage: () => {},
    onGotoPage: () => {},
  },
}

export const SinglePage: Story = {
  args: {
    page: 1,
    nextDisabled: true,
    prevDisabled: true,
    availablePrev: [],
    availableNext: [],
    onNextPage: () => {},
    onPrevPage: () => {},
    onGotoPage: () => {},
  },
}

export default meta
