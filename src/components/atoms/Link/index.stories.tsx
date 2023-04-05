/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Meta, StoryObj } from '@storybook/react'

import { Link } from '.'

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    to: '/posts/1',
    children: 'This is the link component.',
  },
}

export const Component: Story = {
  args: {
    to: '/posts/1',
    children: <h1>This is the link component.</h1>,
  },
}
