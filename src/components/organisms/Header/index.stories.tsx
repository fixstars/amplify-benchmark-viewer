/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { Header } from '.'

export default {
  title: 'Organisms/Header',
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header />

export const Default = Template.bind({})
