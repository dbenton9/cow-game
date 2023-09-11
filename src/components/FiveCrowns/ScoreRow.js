import React, {useState, useEffect} from 'react';

export const ScoreRow = ({playerData, onRemove, updatePlayersData}) => {
    const [playerName, setPlayerName] = useState(playerData.name);
    const [rounds, setRoundScore] = useState(playerData.rounds);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // BUG: calculating total off of old 'rounds' when numberOfRounds is changed
        console.log("calc rounds: " + rounds)
        const newTotal = rounds.reduce((total, round) => total + round, 0);
        setTotal(newTotal)
    }, [rounds]);

    const handlePlayerNameChange = (e) => {
        // BUG: player name is not updated in localStorage
        setPlayerName(e.target.value);
    }
    const handleRoundChange = (roundNumber, e) => {
        const newScore = parseInt(e.target.value);
        const updatedRounds = [...rounds];
        updatedRounds[roundNumber - 1] = newScore;
        setRoundScore(updatedRounds);
        updatePlayersData(updatedRounds);
    }
    const numberOfRoundInputs = () => {
        let inputs = [];
        for (let i = 1; i <= playerData.rounds.length; i++) {
            inputs.push(
                <td key={i}>
                    <input
                        type="number"
                        value={rounds[i - 1]} // Subtract 1 because the array is 0-based
                        onChange={(e) => handleRoundChange(i, e)}
                    />
                </td>
            );
        }
        return inputs;
    };


    return (
        <tr align="center">
            <td><input type="text" value={playerName} onChange={handlePlayerNameChange}/></td>
            <td>{total}</td>
            {numberOfRoundInputs()}
            <td>
                <button onClick={onRemove}>Remove</button>
            </td>
        </tr>
    )
}

export default ScoreRow;
