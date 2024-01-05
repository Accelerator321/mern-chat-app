import React from 'react'

const Message = ({message ,position,sender}) => {
  
  return (
    <div className={`message-box ${position}`}>
      {sender&&<div className='sender-info' >{sender}</div>}
      
      <div className={`message message-${position}`}>
        {message}
      </div>
      </div>
  )
}

export default Message