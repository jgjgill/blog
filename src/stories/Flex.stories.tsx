import React from 'react'

import Flex from '../components/@shared/Flex'

export default {
  title: 'Flex',
  component: Flex,
}

const Template = (args) => <Flex {...args}>Flex</Flex>
export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  justifyContent: 'center',
}

export const Secondary = Template.bind({})
Secondary.args = {
  justifyContent: 'end',
}
