import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { NavLink } from '.'

export default {
  title: 'Atoms/NavLink',
  component: NavLink,
  parameters: {
    backgrounds: {
      default: 'Header background color',
      values: [{ name: 'Header background color', value: '#111' }],
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof NavLink>

const Template: ComponentStory<typeof NavLink> = (args) => <NavLink {...args} />

export const Default = Template.bind({})
Default.args = {
  url: '/',
  label: 'Home',
}
