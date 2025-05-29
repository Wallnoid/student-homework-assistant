import type { Meta, StoryObj } from "@storybook/react"
import CustomColorPicker from "./CustomColorPicker"

const meta = {
    title: 'CustomColorPicker',
    component: CustomColorPicker,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof CustomColorPicker>;

export default meta;

type Story = StoryObj<typeof CustomColorPicker>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
