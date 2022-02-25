import React from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material';

const SidebarChat = () => {
    return (
        <div className='sidebarchat'>
            <Avatar />
            <div className='sidebarchat_info'>
                <h2>Room name</h2>
                <p>This is latest message</p>
            </div>
        </div>
    )
}

export default SidebarChat
