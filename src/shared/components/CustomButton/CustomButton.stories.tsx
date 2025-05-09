import type { Meta, StoryObj } from "@storybook/react"
import CustomButton from "./CustomButton"
import { fn } from "@storybook/test";
import { colorOptions } from "@/shared/constants/colors-button.constants";

const meta = {
    title: ' Buttons/CustomButton',
    component: CustomButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        backgroundColor: {
            control: {
                type: 'select',
            },
            options: colorOptions,
        },
    },
} satisfies Meta<typeof CustomButton>;

export default meta;

type Story = StoryObj<typeof CustomButton>;

export const Default = {
    args: {
        label: 'Button'
    },
} satisfies Story;


export const Primary: Story = {
    args: {
        variant: 'filled',
        label: 'Button',
    },
};

export const Secondary: Story = {
    args: {
        label: 'Button',
        variant: 'outlined'
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        label: 'Button',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        label: 'Button',
    },
};
