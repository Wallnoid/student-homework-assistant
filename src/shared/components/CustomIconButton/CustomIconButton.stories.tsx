import type { Meta, StoryObj } from "@storybook/react"
import CustomIconButton from "./CustomIconButton"
import { colorOptions } from "@/shared/constants/colors-button.constants";
import { TvIcon } from "@heroicons/react/24/solid";

const meta = {
    title: 'Buttons/CustomIconButton',
    component: CustomIconButton,
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
} satisfies Meta<typeof CustomIconButton>;

export default meta;

type Story = StoryObj<typeof CustomIconButton>;

export const Default = {
    args: {
        children: <TvIcon className="size-5 " />
    },
} satisfies Story;


export const Primary: Story = {
    args: {
        variant: 'filled',
        children: <TvIcon className="size-5" />
    },
};

export const Secondary: Story = {
    args: {
        children: <TvIcon className="size-5 " />,
        variant: 'outlined'
    },
};


export const CircularButton: Story = {
    args: {
        children: <TvIcon className="size-5 " />,
        variant: 'outlined',
        size: 'md',
        roundedFull: true

    },
}

export const Large: Story = {
    args: {
        size: 'lg',
        backgroundColor: 'green',
        children: <TvIcon className="size-5" />
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: <TvIcon className="size-5" />
    },
};
