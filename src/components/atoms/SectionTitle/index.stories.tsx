/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { IconButton } from '@mui/material'
import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { SectionTitle } from '.'

export default {
  title: 'Atoms/SectionTitle',
  component: SectionTitle,
} as ComponentMeta<typeof SectionTitle>

const Template: ComponentStory<typeof SectionTitle> = (args) => (
  <SectionTitle {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Data Filtering',
}

export const RightComponent = Template.bind({})
RightComponent.args = {
  title: 'Data Filtering',
  rightComponent: (
    <IconButton>
      <FilterAltIcon />
    </IconButton>
  ),
}
