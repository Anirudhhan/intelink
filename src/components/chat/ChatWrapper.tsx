import React from 'react'
import Messages from './Messages'
import ChatInput from './ChatInput'

const ChatWrapper = () => {
  return (
    <div className='relative min-h-full flex divide-y divide-zinc-200 flex-col justify-between gap2'>
      <div className='flex-1 justify-between flex flex-col mb-28'>
        <Messages/>
      </div>
      <ChatInput/>

    </div>
  )
}

export default ChatWrapper