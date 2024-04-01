import classNames from 'classnames';
import React from 'react'

import "./style.scss"

interface Props{
    label?:string;
    children:any
    baseClassName?:any
}

function LabelComponent({label,children,baseClassName}:Props) {
  return (
  
    <div className={classNames(['flex flex-row'],baseClassName)}>
     <fieldset className=' flex flex-row fieldset'>
      <legend className='text-4'>{label}</legend>
        {children}
     </fieldset>
      </div>
 
  )
}

export default LabelComponent