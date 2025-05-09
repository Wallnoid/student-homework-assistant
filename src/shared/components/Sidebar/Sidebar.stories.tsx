import type { Meta, StoryObj } from "@storybook/react"
import Sidebar from "./Sidebar"

const meta = {
    title: 'Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
