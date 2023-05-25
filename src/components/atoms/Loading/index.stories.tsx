/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { Loading } from '.'

export default {
  title: 'Atoms/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = () => <Loading />

export const Default = Template.bind({})
