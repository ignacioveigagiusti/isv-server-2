import React from 'react'
import '../../App.css';
import styles from './chat.module.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:8080')

export default function Chat() {
    const [messages, setMessages] = useState([])
    const [msgAlert, setMsgAlert] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMessage, setUserMessage] = useState('')

    const checkChatMsg = () => {
        setMsgAlert(`Please complete all fields correctly`);
        return false;
    }

    const addMessage = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!userEmail || !userMessage || !(userEmail.includes('@'))) return checkChatMsg(event);
        setMsgAlert('');
        const messageToAdd = {
            author: userEmail,
            timestamp: String(new Date()).slice(0,33),
            text: userMessage
        };
        console.log(userEmail)
        console.log(userMessage)
        console.log(messageToAdd)
        socket.emit('newMessage', messageToAdd);
    }    

    const renderMessages = (data) => {
        const html = data
        setMessages(html);
    }


    useEffect(() => {
        socket.on('messages', data => {
            renderMessages(data);
        })
        
        socket.on('msgError', data => {
            const html = `Error: ${data}`;
            setMessages(html);
        })  
    },[messages]);

    return (
        <div className={styles.chatContainer}> 
            <div className='collapse mb-3' id={styles.chatWidget}>
                <h2>Messages</h2>
                <div id='messages'>
                    {messages.map((elem,index) => (
                    <div key={elem.text}>
                    <strong>{elem.author}</strong>:
                    <span>{elem.timestamp}</span>
                    <em>{elem.text}</em>
                    </div>
                    ))}
                </div>
                <form onSubmit={addMessage}>
                    <input className="form-control" onChange={e => setUserEmail(e.target.value)} type="text" id="userEmail" placeholder="Email"></input>
                    <input className="form-control" onChange={e => setUserMessage(e.target.value)} type="text" id="userMessage" placeholder="Your message"></input>
                    <div id={`${styles.msgAlertWrapper}`}>
                        <div id={`${styles.msgAlert}`}>{msgAlert}</div>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Send"></input>
                </form>
            </div>
            <button className={`btn btn-info ${styles.chatToggleBtn}`} type="button" data-toggle="collapse" data-target={`#${styles.chatWidget}`} aria-expanded="false" aria-controls="chatWidget">Chat</button>
        </div>
    )
}
