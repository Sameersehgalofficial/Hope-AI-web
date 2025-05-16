import React, { useState, useEffect, useRef } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

function VoiceEnabledHope() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const speechSynthesisRef = useRef(window.speechSynthesis);

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onresult = event => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      speakResponse(`You said: ${speechToText}`);
    };

    recognition.onerror = () => setListening(false);

    recognition.onend = () => setListening(false);
  }, []);

  const toggleListening = () => {
    if (!recognition) return alert('Your browser does not support voice.');
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  const speakResponse = (text) => {
    if (!voiceEnabled) return;
    if (!speechSynthesisRef.current) return;
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesisRef.current.speak(utterance);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggleListening}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <label style={{ marginLeft: 20 }}>
        <input
          type="checkbox"
          checked={voiceEnabled}
          onChange={() => setVoiceEnabled(!voiceEnabled)}
        /> Enable Voice Output
      </label>
      <p>Transcript: {transcript}</p>
    </div>
  );
}

export default VoiceEnabledHope;
