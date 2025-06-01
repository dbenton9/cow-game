import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/Container";
import ScoreCard from './ScoreCard';

function ScoreBoard() {
  // Initialize players from localStorage or with default empty array
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem('quixPlayers')) || []
  );
  const [newPlayerName, setNewPlayerName] = useState('');
  
  // Save players to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quixPlayers', JSON.stringify(players));
  }, [players]);
  
  // Add a new player
  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== '') {
      setPlayers([...players, {
        name: newPlayerName,
        score: 0,
        checkboxes: {
          red: Array(11).fill(false),
          yellow: Array(11).fill(false),
          blue: Array(11).fill(false),
          green: Array(11).fill(false)
        }
      }]);
      setNewPlayerName('');
    }
  };
  
  // Remove a player
  const handleRemovePlayer = (index) => {
    const playerToRemove = players[index];
    const shouldRemove = window.confirm(`Are you sure you want to remove ${playerToRemove.name}?`);
    if (!shouldRemove) return;
    
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };
  
  // Update player score or checkboxes
  const updateScore = (index, newScore, newCheckboxes = null) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[index] = {
        ...updatedPlayers[index],
        score: newScore
      };
      
      if (newCheckboxes) {
        updatedPlayers[index].checkboxes = newCheckboxes;
      }
      
      return updatedPlayers;
    });
  };
  
  // Reset all scores to zero
  const resetScores = () => {
    const confirm = window.confirm('Are you sure you want to reset all scores to zero?');
    if (!confirm) return;
    
    setPlayers(prevPlayers => 
      prevPlayers.map(player => ({
        ...player,
        score: 0,
        checkboxes: {
          red: Array(11).fill(false),
          yellow: Array(11).fill(false),
          blue: Array(11).fill(false),
          green: Array(11).fill(false)
        }
      }))
    );
  };
  
  // Clear the entire scoreboard
  const clearBoard = () => {
    const confirm = window.confirm('Are you sure you want to clear the entire scoreboard?');
    if (!confirm) return;
    setPlayers([]);
  };
  
  return (
    <Container>
      <h3>Quix ScoreBoard</h3>
      
      {/* Player List */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{width: '50px'}}></th>
            <th>Player</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <ScoreCard
              key={index}
              player={player}
              index={index}
              onScoreChange={updateScore}
              onRemove={handleRemovePlayer}
            />
          ))}
        </tbody>
      </Table>
      
      {/* Add Player Form */}
      <div className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="New Player Name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            className="form-control"
            style={{fontSize: '1.1rem', padding: '10px'}}
          />
          <Button 
            onClick={handleAddPlayer} 
            style={{fontSize: '1.1rem', padding: '10px 20px'}}
          >
            Add Player
          </Button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="d-grid gap-2 d-md-flex mb-4">
        <Button 
          variant="warning" 
          onClick={resetScores} 
          size="lg"
          className="me-md-2 mb-2 mb-md-0"
          style={{flex: 1}}
        >
          Reset Scores
        </Button>
        <Button 
          variant="danger" 
          onClick={clearBoard}
          size="lg"
          style={{flex: 1}}
        >
          Clear Board
        </Button>
      </div>
    </Container>
  );
}

export default ScoreBoard;