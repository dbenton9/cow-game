import React, { useState, useEffect } from 'react';
import ScoreRow from "./ScoreRow";

export const ScoreBoard = ({numberOfRounds}) => {
    const [playersData, setPlayers] =useState( JSON.parse(localStorage.getItem('playersData')) ||
        [{name: 'shelby', rounds: [0]}]);
    const [newPlayerName, setNewPlayerName] = useState('');

    useEffect(() => {
        localStorage.setItem('playersData', JSON.stringify(playersData));
    }, [playersData]);

    useEffect(() => {
        setPlayers((prevPlayerStats) => {
            const newPlayersStats = [...prevPlayerStats];
            prevPlayerStats.map((player, index) => {
                if (player.rounds.length < numberOfRounds) {
                    // Add additional rounds if numberOfRounds increased
                    for (let i = player.rounds.length; i < numberOfRounds; i++) {
                        newPlayersStats[index].rounds.push(0);
                    }
                } else if (player.rounds.length > numberOfRounds) {
                    // Remove excess rounds if numberOfRounds decreased
                    newPlayersStats[index].rounds.splice(numberOfRounds);
                }
            });
            return newPlayersStats;
        });
    }, [numberOfRounds]);

    const handleAddPlayer = () => {
        if (newPlayerName.trim() !== '') {
            setPlayers([...playersData, {name: newPlayerName, rounds: Array.from({length: numberOfRounds}, () => 0)}]);
            setNewPlayerName('');
        }
    }

    const handleRemovePlayer = (index) => {
        const playNameToRemove = playersData[index];
        const shouldRemove = window.confirm(`Are you sure you want to remove ${playNameToRemove}?`);
        if (!shouldRemove) return;
        const updatedPlayers = [...playersData];
        updatedPlayers.splice(index, 1);
        setPlayers(updatedPlayers);
    }

    const roundHeaders = () => {
        let headers = [];
        let roundsLength = 0;
        if (playersData && playersData[0] && playersData[0].rounds) {
            roundsLength = playersData[0].rounds.length;
        }

        for (let i = 1; i <= roundsLength; i++) {
            headers.push(<td key={i}>Round {i}</td>)
        }
        return headers;
    }

    const updatePlayersData = (index, updatedRounds) => {
        setPlayers((prevPlayerStats) => {
            const newPlayersStats = [...prevPlayerStats];
            newPlayersStats[index] = { ...newPlayersStats[index], rounds: updatedRounds };
            return newPlayersStats;
        });

        let playersData = JSON.parse(localStorage.getItem('playersData'));
        playersData[index] = { ...playersData[index], rounds: updatedRounds };
        localStorage.setItem('playersData', JSON.stringify(playersData));
    };

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
                    {playersData.map((playerName, index) => (
                        <ScoreRow
                            playerData={playerName}
                            numberOfRounds={numberOfRounds}
                            onRemove={()=>handleRemovePlayer(index)}
                            updatePlayersData={(updatedRounds) => updatePlayersData(index, updatedRounds)}
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
