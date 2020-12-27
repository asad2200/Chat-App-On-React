import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase'
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [userName, setUserName] = useState('')

  //Load messages from firebase to todos
  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    })
  }, [])

  //get username from user
  useEffect(() => {
    setUserName(prompt('Enter Your Name...'))
  }, []);

  //send message (store msg in firebase)
  const sendMessage = (event) => {
    event.preventDefault()
    db.collection("messages").add({
      userName: userName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  //delete all messages only display when username is asad2200
  const deleteAll = (event) => {
    event.preventDefault()
    db.collection("messages").onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        db.collection("messages").doc(doc.id).delete()
      })
    })
  }

  return (
    <div className="App">
      <img src="https://ndassistive.org/wp-content/uploads/2020/05/Messenger-logo.png?w=100&h=100" />
      <h1>The Messenger-clone App 📧</h1>
      <h3>Welcome {userName}.</h3>
      {/* Input Field, Send Button, Delete Button */}
      <form class="app__form">
        <FormControl class="app__formControl">
          <Input className="app__input" placeholder="Enter a message" value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton" type="submit" disabled={!input} size="small"
            variant="contained" color="primary" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
          {/* display delete button if username is asad2200 */}
          {userName === 'asad2200' ? (<button onClick={deleteAll}>DELETE</button>) : (<div></div>)}
        </FormControl>
      </form>

      {/* display message using Message.js component */}
      {/* - key is imp for reload only new component its avoid the previous cmponents 
          which is already loaded
          - FlipMove is responsible for animation
      */}
      <FlipMove>
        {
          messages.map(({ id, message }) => {
            return (< Message key={id} message={message} userName={userName} />)
          })
        }
      </FlipMove>
    </div >
  );
}

export default App;
