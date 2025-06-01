import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Collapse, Card, Table } from 'react-bootstrap';
import './ScoreCard.css'; // We'll create this CSS file for custom styling

function ScoreCard({ player, index, onScoreChange, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  
  // Initialize checkbox state if not already in player data
  if (!player.checkboxes) {
    player.checkboxes = {
      red: Array(11).fill(false),
      yellow: Array(11).fill(false),
      blue: Array(11).fill(false),
      green: Array(11).fill(false)
    };
  }
  
  const toggleDetails = () => {
    setExpanded(!expanded);
  };
  
  const handleScoreChange = (newScore) => {
    onScoreChange(index, parseInt(newScore) || 0);
  };
  
  const handleCheckboxChange = (color, colIndex) => {
    const newCheckboxes = {
      ...player.checkboxes,
      [color]: [...player.checkboxes[color]]
    };
    
    newCheckboxes[color][colIndex] = !newCheckboxes[color][colIndex];
    onScoreChange(index, player.score, newCheckboxes);
  };
  
  // Generate column headers (2-12 ascending or 12-2 descending)
  const generateHeaders = (ascending) => {
    const numbers = ascending ? 
      Array.from({length: 11}, (_, i) => i + 2) : 
      Array.from({length: 11}, (_, i) => 12 - i);
    
    return numbers.map(num => (
      <th key={num} className="text-center p-1" style={{width: '30px'}}>{num}</th>
    ));
  };
  
  // Generate checkboxes for a row
  const generateCheckboxes = (color, ascending) => {
    return Array.from({length: 11}, (_, i) => {
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
        <td style={{textAlign: 'left', verticalAlign: 'middle'}}>
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
                {/* Score Input */}
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <label className="me-3 fs-5">Update Score:</label>
                  <input 
                    type="number" 
                    value={player.score} 
                    onChange={(e) => handleScoreChange(e.target.value)}
                    style={{width: '120px', fontSize: '1.2rem', padding: '8px'}}
                    className="form-control"
                  />
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