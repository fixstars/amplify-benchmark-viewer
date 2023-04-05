import type { ComponentStory, ComponentMeta } from '@storybook/react'

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
