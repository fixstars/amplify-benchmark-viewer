/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { Link } from '.'

export default {
  title: 'Atoms/Link',
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

export const Text = Template.bind({})
Text.args = {
  to: '/posts/1',
  children: 'This is the link component.',
}

export const Component = Template.bind({})
Component.args = {
  to: '/posts/2',
  children: <h1>This is the link component.</h1>,
}
