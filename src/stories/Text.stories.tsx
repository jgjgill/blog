import React from 'react'

import Text from '../components/@shared/Flex'

export default {
  title: 'Text',
  component: Text,
} as Meta<typeof Text>

const Template = (args) => <Text {...args}>Text</Text>

export const Default = Template.bind({})
