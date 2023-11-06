import React, { Fragment } from 'react'

export default function Option(props) {
    const {e} = props
  return (
    <Fragment>
        <option>{e}</option>
     </Fragment>
  )
}
