import React from 'react';
import CricketLiveMatches from './components/crickapi';
import OddsDisplay from './components/odds';

function App() {
  return (
    <div className="App">
      <h1>Live Cricket Betting and Odds</h1>
      <CricketLiveMatches />
      <OddsDisplay/>
    </div>
  );
}

export default App;

