import React from 'react'
import TextInput from './TextInput';

const TextGroup = ({members,label,checkValidation}) => {
  return (
      <>
      {
        members.map(member => {
            return  <TextInput label={`${label} for ${member}`} checkValidation={checkValidation} />
        })
      }
      </>
   
  )
}

export default TextGroup;