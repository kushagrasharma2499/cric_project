import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OddsDisplay = ({ matchId }) => {
  const [odds, setOdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'VjDNI6vQJEC7FFLuH1ZPYg';
  const baseUrl = 'https://cricket.sportdevs.com';

  const fetchOdds = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/odds/full-time-results?match_id=eq.${matchId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setOdds(response.data);
      } else {
        setOdds([]); 
      }
      setLoading(false);
    } catch (error) {
      setError('Error fetching odds.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (matchId) {
      fetchOdds();
    }
  }, [matchId]);

  if (loading) {
    return <p>Loading odds...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!odds || odds.length === 0) {
    return <p>No odds data available for this match.</p>;
  }

  return (
    <div className="odds-display">
      {odds.map((match, index) => (
        <div key={index} className="odds-match">
          <h3>Match ID: {match.match_id}</h3>
          
          {/* Display match status as Live or Finished */}
          <h4>Status: {match.is_live ? "Live" : "Finished"}</h4>

          {match.periods && match.periods.map((period, periodIndex) => (
            <div key={periodIndex} className="odds-period">
              <h4>Period: {period.period_type}</h4>
              {period.odds && period.odds.map((odd, oddIndex) => (
                <div key={oddIndex} className="odds-detail">
                  <p>
                    <strong>{odd.bookmaker_name}</strong>
                    <br />
                    Home Odds: {odd.home} (Movement: {odd.home_movement})
                    <br />
                    Away Odds: {odd.away} (Movement: {odd.away_movement})
                    <br />
                    Payout: {odd.payout}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OddsDisplay;
