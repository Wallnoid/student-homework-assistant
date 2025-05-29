import type { Meta, StoryObj } from "@storybook/react"
import CustomIconTextButton from "./CustomIconTextButton"
import { colorOptions } from "@/shared/constants/colors-button.constants";
import { TvIcon } from "@heroicons/react/24/solid";

const meta = {
    title: 'Buttons/CustomIconTextButton',
    component: CustomIconTextButton,
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
} satisfies Meta<typeof CustomIconTextButton>;

export default meta;

type Story = StoryObj<typeof CustomIconTextButton>;

export const Default = {
    args: {
        // props
        text: 'Button',
        children: <TvIcon className="size-5" />
    },
} satisfies Story;

export const Primary: Story = {
    args: {
        text: 'Button',
        children: <TvIcon className="size-5" />
    },
} satisfies Story;

export const Secondary: Story = {
    args: {
        text: 'Button',
        children: <TvIcon className="size-5" />,
        variant: 'outlined'
    },
} satisfies Story;


export const CircularButton: Story = {
    args: {
        text: 'Button',
        children: <TvIcon className="size-5" />,

        roundedFull: true
    },
} satisfies Story;



export const Large: Story = {
    args: {
        text: 'Button',
        children: <TvIcon className="size-5" />,
        size: 'lg'
    },
} satisfies Story;


export const Outlined: Story = {
    args: {
        text: 'Button',
        children: <TvIcon className="size-5" />,
        variant: 'outlined'
    },
} satisfies Story;


export const Text: Story = {
    args: {
        text: 'Button',
        children: <TvIcon className="size-5" />,
        variant: 'text'
    },
} satisfies Story;


