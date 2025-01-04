import { Nameplate } from '@jgjgill/interaction'
import App from 'App'
import { Seo } from 'components'
import { HeadFC } from 'gatsby'
import React from 'react'

const NameplatePage = () => {
  return (
    <App>
      <div style={{ height: '100vh', background: 'black' }}>
        <Nameplate
          src={
            'https://raw.githubusercontent.com/jgjgill/blog/main/src/images/main-image.jpg'
          }
          mainText="jgjgill"
          subText="Frontend Developer"
        />
      </div>
    </App>
  )
}

export const Head: HeadFC = () => <Seo />

export default NameplatePage
