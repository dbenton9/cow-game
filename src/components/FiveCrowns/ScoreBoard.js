import React, { useState } from 'react';
import ScoreRow from "./ScoreRow";

export const ScoreBoard = () => {
    const [players, setPlayers] =useState( ['Player 1', 'Player 2'])
    const [newPlayerName, setNewPlayerName] = useState('');

    const handleAddPlayer = () => {
        if (newPlayerName.trim() !== '') {
            setPlayers([...players, newPlayerName]);
            setNewPlayerName('');
        }
    }

    const handleRemovePlayer = (index) => {
        const updatedPlayers = [...players];
        updatedPlayers.splice(index, 1);
        setPlayers(updatedPlayers);
    }
    return (
        <div>
            <h3>Score Board</h3>
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Round 1</td>
                    <td>Round 2</td>
                    <td>Round 3</td>
                    <td>Score</td>
                </tr>
                </thead>
                <tbody>
                    {players.map((playerName, index) => (
                        <ScoreRow
                            key={index}
                            basePlayers={playerName}
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
