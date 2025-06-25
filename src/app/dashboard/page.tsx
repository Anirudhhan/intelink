import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const dashboard = async() => {
    const user = await currentUser();
    if (!user) {
        redirect('/sign-in');
    }
  return (
    <div>{user.firstName}</div>
  )
}

export default dashboard;