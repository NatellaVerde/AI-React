import { useEffect, useState } from 'react';
import './App.css';
import ChatBot from './components/ui/ChatBot';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message));
   });

   return (
      <div className="p-4">
         {message}
         <ChatBot />
      </div>
   );
}

export default App;
