import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import EventForm from './components/EventForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="antialiased">
      {!showForm ? (
        <LandingPage onGetStarted={() => setShowForm(true)} />
      ) : (
        <EventForm onBack={() => setShowForm(false)} />
      )}
    </div>
  );
}

export default App;
