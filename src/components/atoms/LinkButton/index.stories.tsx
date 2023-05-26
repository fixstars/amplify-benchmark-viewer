/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { LinkButton } from '.'

export default {
  title: 'Atoms/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof LinkButton>

const Template: ComponentStory<typeof LinkButton> = (args) => (
  <LinkButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'a_client',
  link: '/clients/a_client',
}
