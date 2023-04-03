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
