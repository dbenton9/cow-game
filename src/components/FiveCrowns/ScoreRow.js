import React, { useState, useEffect } from 'react';

export const ScoreRow = ({basePlayers, onRemove}) => {
    const [playerName, setPlayerName] = useState(basePlayers);
    const [round1, setRound1Score] = useState(0);
    const [round2, setRound2Score] = useState(0);
    const [round3, setRound3Score] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newTotal = round1 + round2 + round3;
        setTotal(newTotal)
    }, [round1, round2, round3]);

    const handlePlayerNameChange = (e) => {
        setPlayerName(e.target.value);
    }
    const handleRoundChange = (roundNumber, e) => {
        const newScore = parseInt(e.target.value);
        switch(roundNumber) {
            case 1:
                setRound1Score(newScore);
                break;
            case 2:
                setRound2Score(newScore);
                break;
            case 3:
                setRound3Score(newScore);
                break;
            default:
                break;
        }
    }


    return (
        <tr align="center">
            <td><input type="text" value={playerName} onChange={handlePlayerNameChange}/></td>
            <td>
                <input type="number" value={round1} onChange={(e) => handleRoundChange(1, e)} />
            </td>
            <td>
                <input type="number" value={round2} onChange={(e) => handleRoundChange(2, e)} />
            </td>
            <td>
                <input type="number" value={round3} onChange={(e) => handleRoundChange(3, e)} />
            </td>
            <td>{total}</td>
            <td>
                <button onClick={onRemove}>Remove</button>
            </td>
        </tr>
    )
}

export default ScoreRow;
