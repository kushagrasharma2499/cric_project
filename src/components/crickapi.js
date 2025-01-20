import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OddsDisplay from './odds';

const CricketMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  const apiKey = 'VjDNI6vQJEC7FFLuH1ZPYg';
  const baseUrl = 'https://cricket.sportdevs.com';

  const fetchLiveMatches = async () => {
    try {
      const response = await axios.get(`${baseUrl}/matches-live`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching live matches:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  const handleMatchClick = (matchId) => {
    setSelectedMatchId(matchId);
  };

  return (
    <div className="matches-list">
      {loading ? (
        <p>Loading live matches...</p>
      ) : (
        <div>
          {matches.map((match) => (
            <div key={match.id} className="match-item">
              <h2>{match.name}</h2>
              <p>Status: {match.status.type} - {match.status.reason}</p>
              <div className="score-details">
                <p>
                  <strong>{match.home_team_name}: </strong>
                  {match.home_team_score.display} (Current: {match.home_team_score.current})
                </p>
                <p>
                  <strong>{match.away_team_name}: </strong>
                  {match.away_team_score.display} (Current: {match.away_team_score.current})
                </p>
              </div>

              {/* Button to view odds for this match */}
              <button onClick={() => handleMatchClick(match.id)}>View Odds</button>
            </div>
          ))}
        </div>
      )}

      {/* Pass selected matchId to OddsDisplay */}
      {selectedMatchId && <OddsDisplay matchId={selectedMatchId} />}
    </div>
  );
};

export default CricketMatches;


