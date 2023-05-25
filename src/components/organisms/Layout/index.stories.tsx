/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { Layout } from '.'

export default {
  title: 'Organisms/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <div>Organisms layout component</div>,
}
