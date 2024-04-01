import { Fragment } from 'react'
import { Placeholder } from 'semantic-ui-react'

import "./style.scss"

interface IProps {
  imageLink :any
}

export default function PreviewComponent({imageLink}:IProps) {
  return (
    <Fragment>
      <Placeholder className={"width-100 height-100 selected-slide-preview"}>
      <img src={imageLink || ""} style={{ width: "100%", height: "100%" }}/>
      </Placeholder>
    </Fragment>
  )
}
