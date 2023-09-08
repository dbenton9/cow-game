import React, { useState } from 'react';
import ScoreRow from "./ScoreRow";

export const ScoreBoard = ({numberOfRounds}) => {
    const [players, setPlayers] =useState( ['Player 1', 'Player 2'])
    const [newPlayerName, setNewPlayerName] = useState('');

    const handleAddPlayer = () => {
        console.log(players)
        if (newPlayerName.trim() !== '') {
            setPlayers([...players, newPlayerName]);
            setNewPlayerName('');
        }
    }

    const handleRemovePlayer = (index) => {
        const playNameToRemove = players[index];
        const shouldRemove = window.confirm(`Are you sure you want to remove ${playNameToRemove}?`);
        if (!shouldRemove) return;
        const updatedPlayers = [...players];
        updatedPlayers.splice(index, 1);
        setPlayers(updatedPlayers);
    }

    const roundHeaders = () => {
        let headers = [];
        for (let i = 1; i <= numberOfRounds; i++) {
            headers.push(<td key={i}>Round {i}</td>)
        }
        return headers;
    }

    return (
        <div>
            <h3>Score Board</h3>
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Score</td>
                    {roundHeaders()}
                </tr>
                </thead>
                <tbody>
                    {players.map((playerName, index) => (
                        <ScoreRow
                            key={index}
                            basePlayers={playerName}
                            numberOfRounds={numberOfRounds}
                            onRemove={()=>handleRemovePlayer(index)}
                        />
                    ))}
                    <tr>
                        <td>
                            <input
                                type="text"
                                placeholder="New Player"
                                value={newPlayerName}
                                onChange={(e) => setNewPlayerName(e.target.value)}
                                />
                        </td>
                        <td colSpan="5">
                            <button onClick={handleAddPlayer}>Add Player</button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
}

export default ScoreBoard;
