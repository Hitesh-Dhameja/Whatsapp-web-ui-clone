import { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios'

function App() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        console.log(response.data)
        setMessages(response.data)
      })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('bc1538e9324c705e1b7b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])
  return (
    <div className='app'>
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>

  );
}

export default App;
