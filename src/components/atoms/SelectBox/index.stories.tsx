import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { SelectBox } from '.'

export default {
  title: 'Atoms/SelectBox',
  component: SelectBox,
} as ComponentMeta<typeof SelectBox>

const Template: ComponentStory<typeof SelectBox> = (args) => (
  <SelectBox {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'a_client',
  options: ['box', 'max-min', '3q-1q', 'median'],
}
