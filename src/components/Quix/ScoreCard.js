import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Collapse, Card, Table } from 'react-bootstrap';
import './ScoreCard.css';

function ScoreCard({ player, index, onScoreChange, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  
  // Scoring scale based on number of checked boxes
  const scoringScale = {
    1: 1,
    2: 3,
    3: 6,
    4: 10,
    5: 15,
    6: 21,
    7: 28,
    8: 36,
    9: 45,
    10: 55,
    11: 66,
    12: 78
  };
  
  // Initialize checkbox state if not already in player data
  if (!player.checkboxes) {
    player.checkboxes = {
      red: Array(12).fill(false),
      yellow: Array(12).fill(false),
      blue: Array(12).fill(false),
      green: Array(12).fill(false)
    };
  }
  
  // Initialize penalty checkboxes if not already in player data
  if (!player.penalties) {
    player.penalties = Array(4).fill(false);
  }
  
  // Calculate score based on checked boxes and penalties
  const calculateScore = (checkboxes, penalties) => {
    let totalScore = 0;
    
    // Calculate score for each color
    ['red', 'yellow', 'blue', 'green'].forEach(color => {
      const checkedCount = checkboxes[color].filter(checked => checked).length;
      if (checkedCount > 0) {
        totalScore += scoringScale[checkedCount] || 0;
      }
    });
    
    // Subtract 5 points for each penalty
    const penaltyCount = penalties.filter(penalty => penalty).length;
    totalScore -= penaltyCount * 5;
    
    return totalScore;
  };
  
  // Calculate and display scores for each color (for the score breakdown)
  const getColorScores = () => {
    const scores = {};
    
    ['red', 'yellow', 'blue', 'green'].forEach(color => {
      const checkedCount = player.checkboxes[color].filter(checked => checked).length;
      scores[color] = checkedCount > 0 ? scoringScale[checkedCount] : 0;
    });
    
    return scores;
  };
  
  const colorScores = getColorScores();
  
  const toggleDetails = () => {
    setExpanded(!expanded);
  };
  
  const handleCheckboxChange = (color, colIndex) => {
    const newCheckboxes = {
      ...player.checkboxes,
      [color]: [...player.checkboxes[color]]
    };
    
    // Toggle the checkbox state
    newCheckboxes[color][colIndex] = !newCheckboxes[color][colIndex];
    
    // Calculate the new score based on the updated checkboxes
    const newScore = calculateScore(newCheckboxes, player.penalties);
    
    // Update player data with new checkbox state and score
    onScoreChange(index, newScore, newCheckboxes);
  };
  
  const handlePenaltyChange = (penaltyIndex) => {
    const newPenalties = [...player.penalties];
    newPenalties[penaltyIndex] = !newPenalties[penaltyIndex];
    
    // Calculate the new score with updated penalties
    const newScore = calculateScore(player.checkboxes, newPenalties);
    
    // Update player data with new penalties and score
    onScoreChange(index, newScore, null, newPenalties);
  };
  
  // Generate column headers (2-12 ascending or 12-2 descending)
  const generateHeaders = (ascending) => {
    const numbers = ascending ? 
      Array.from({length: 11}, (_, i) => i + 2) : 
      Array.from({length: 11}, (_, i) => 12 - i);
    
    const headers = numbers.map(num => (
      <th key={num} className="text-center p-1" style={{width: '30px'}}>{num}</th>
    ));
    
    // Add an extra empty header for the last checkbox
    headers.push(<th key="extra" className="text-center p-1" style={{width: '30px'}}></th>);
    
    return headers;
  };
  
  // Generate checkboxes for a row
  const generateCheckboxes = (color, ascending) => {
    // Generate the numbered checkboxes
    const checkboxes = Array.from({length: 11}, (_, i) => {
      const colIndex = ascending ? i : 10 - i;
      return (
        <td key={i} className="text-center p-1">
          <input 
            type="checkbox"
            className="form-check-input" 
            checked={player.checkboxes[color][colIndex]} 
            onChange={() => handleCheckboxChange(color, colIndex)}
            style={{width: '20px', height: '20px'}}
          />
        </td>
      );
    });
    
    // Add the extra checkbox at the end (index 11)
    checkboxes.push(
      <td key="extra" className="text-center p-1">
        <input 
          type="checkbox"
          className="form-check-input" 
          checked={player.checkboxes[color][11]} 
          onChange={() => handleCheckboxChange(color, 11)}
          style={{width: '20px', height: '20px'}}
        />
      </td>
    );
    
    return checkboxes;
  };
  
  return (
    <React.Fragment>
      <tr>
        <td style={{textAlign: 'center'}}>
          <Button 
            variant="outline-secondary" 
            onClick={toggleDetails}
            style={{
              padding: '8px 12px',
              fontSize: '1.2rem',
              width: '100%'
            }}
          >
            {expanded ? '▲' : '▼'}
          </Button>
        </td>
        <td style={{verticalAlign: 'middle', fontSize: '1.1rem'}}>{player.name}</td>
        <td style={{verticalAlign: 'middle', fontSize: '1.1rem'}}>{player.score}</td>
        <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
          <Button 
            variant="danger" 
            onClick={() => onRemove(index)}
            style={{
              padding: '8px',
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className="bi bi-trash" style={{fontSize: '1.2rem'}}></i>
          </Button>
        </td>
      </tr>
      <tr>
        <td colSpan="4" className="p-0">
          <Collapse in={expanded}>
            <div>
              <Card body className="border-0 p-3">
                {/* Score Breakdown */}
                <div className="d-flex justify-content-around mb-3 p-2 border rounded">
                  <div className="text-center">
                    <div style={{color: '#cc0000', fontWeight: 'bold'}}>Red</div>
                    <div>{colorScores.red}</div>
                  </div>
                  <div className="text-center">
                    <div style={{color: '#cccc00', fontWeight: 'bold'}}>Yellow</div>
                    <div>{colorScores.yellow}</div>
                  </div>
                  <div className="text-center">
                    <div style={{color: '#0000cc', fontWeight: 'bold'}}>Blue</div>
                    <div>{colorScores.blue}</div>
                  </div>
                  <div className="text-center">
                    <div style={{color: '#00cc00', fontWeight: 'bold'}}>Green</div>
                    <div>{colorScores.green}</div>
                  </div>
                  <div className="text-center">
                    <div style={{color: '#cc0000', fontWeight: 'bold'}}>Penalties</div>
                    <div className="d-flex gap-1">
                      {player.penalties.map((checked, i) => (
                        <input
                          key={i}
                          type="checkbox"
                          className="form-check-input"
                          checked={checked}
                          onChange={() => handlePenaltyChange(i)}
                          style={{width: '18px', height: '18px'}}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Color Rows with Checkboxes */}
                <div className="table-responsive">
                  <Table bordered size="sm" className="mb-0 quix-table">
                    {/* Headers for Red Row - Ascending (2-12) */}
                    <thead>
                      <tr>
                        <th style={{width: '20px'}}></th>
                        {generateHeaders(true)}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Red Row */}
                      <tr className="row-red">
                        <td></td>
                        {generateCheckboxes('red', true)}
                      </tr>
                      
                      {/* Yellow Row */}
                      <tr className="row-yellow">
                        <td></td>
                        {generateCheckboxes('yellow', true)}
                      </tr>
                    </tbody>
                    
                    {/* Headers for Blue/Green Row - Descending (12-2) */}
                    <thead>
                      <tr>
                        <th style={{width: '20px'}}></th>
                        {generateHeaders(false)}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Blue Row */}
                      <tr className="row-blue">
                        <td></td>
                        {generateCheckboxes('blue', false)}
                      </tr>
                      
                      {/* Green Row */}
                      <tr className="row-green">
                        <td></td>
                        {generateCheckboxes('green', false)}
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card>
            </div>
          </Collapse>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ScoreCard;