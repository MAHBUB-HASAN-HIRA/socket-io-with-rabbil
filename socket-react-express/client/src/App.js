import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
	const [chats, setChats] = useState([]);
  const socket = io.connect("http://localhost:4000/");
  useEffect(() => {
    socket.on('msg', payload => {
      setChats([...chats, payload]);
      
    })
  })
	return (
		<div className="App">
			<header className="App-header">
				{chats.map((chat, index) => (
					<h1 key={index}>{chat}</h1>
				))}
			</header>
		</div>
	);
}

export default App;
