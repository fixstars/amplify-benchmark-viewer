/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { JsonFileUploader } from '.'

export default {
  title: 'Atoms/JsonFileUploader',
  component: JsonFileUploader,
} as ComponentMeta<typeof JsonFileUploader>

const Template: ComponentStory<typeof JsonFileUploader> = () => (
  <JsonFileUploader />
)

export const Default = Template.bind({})
