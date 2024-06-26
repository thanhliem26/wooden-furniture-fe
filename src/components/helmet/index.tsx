import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  title: string
  children: React.ReactNode
}

const HelmetComponent = ({ title, children }: Props) => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      {children}
    </Fragment>
  )
}

export default HelmetComponent
