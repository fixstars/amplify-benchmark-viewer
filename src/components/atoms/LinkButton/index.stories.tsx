import type { ComponentStory, ComponentMeta } from '@storybook/react'

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
