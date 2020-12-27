import { Card, CardContent, Typography } from '@material-ui/core'
import React, { forwardRef } from 'react'
import "./Message.css"

const Message = forwardRef(({ message, userName }, ref) => {
    // it checks that message is from userside or from guest side
    const isUser = userName === message.userName;

    //return card which contain message and username
    //and this function styled based on "isUser"
    return (
        <div ref={ref} className={`message ${isUser && 'message_user'}`}>
            <Card className={isUser ? "message_userCard" : "message_guestCard"}>
                <CardContent>
                    <Typography color="white" variant="h5" component="h2">
                        {!isUser && `${message.userName || 'Unknown User'}: `} {message.message}
                    </Typography>
                </CardContent>
            </Card >
        </div >
    )
})

export default Message
