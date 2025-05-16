import React, { useState, useEffect } from 'react'; import VoiceEnabledHope from './VoiceEnabledHope';

const App = () => {
  const [response, setResponse] = useState("Hello, I'm HOPE. What would you like to ask me?");
  const [listening, setListening] = useState(false);

  // Speech synthesis
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
    window.speechSynthesis.speak(utterance);
  };

  // Speech recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("User said:", transcript);
      handleUserInput(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
      setResponse("Sorry, I didn't catch that.");
      speak("Sorry, I didn't catch that.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleUserInput = (input) => {
    const lower = input.toLowerCase();

    let reply = "I'm still learning, but I heard you!";
    if (lower.includes("hello") || lower.includes("hi")) {
      reply = "Hi Sameer, how can I assist you today?";
    } else if (lower.includes("who are you")) {
      reply = "I'm HOPE, your personal AI designed and developed with OpenAI precision.";
    } else if (lower.includes("weather")) {
      reply = "I'll soon fetch live weather updates for you. Stay tuned!";
    } else if (lower.includes("money")) {
      reply = "We're working on your wealth dashboard, king!";
    }

    setResponse(reply);
    speak(reply);
  };

  useEffect(() => {
    speak(response);
  }, []);

  return ( <button onClick={startListening} style={styles.listenButton}>
  {listening ? "Listening..." : "Speak to HOPE"}
</button>
    <div style={styles.container}>
      <div style={styles.hopeEye}>
        <div style={styles.eyeCenter}></div>
      </div>

      <p style={styles.responseText}>{response}</p>

      <button onClick={startListening} style={styles.listenButton}>
        {listening ? "Listening..." : "Speak to HOPE"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#aee6e6',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Helvetica, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
  },
  hopeEye: {
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    width: 120,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    border: '4px solid #00cccc',
  },
  eyeCenter: {
    backgroundColor: '#ff3333',
    width: 30,
    height: 30,
    borderRadius: '50%',
  },
  responseText: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  listenButton: {
    padding: '12px 25px',
    fontSize: 16,
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#0077b6',
    color: '#fff',
    cursor: 'pointer',
  },
};
const startListening = () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support voice recognition.');
    return;
  }

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  setListening(true);
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    handleUserInput(transcript);
  };

  recognition.onerror = () => {
    setListening(false);
    speak("Sorry, I didn't catch that.");
  };

  recognition.onend = () => {
    setListening(false);
  };
};
export default App;
