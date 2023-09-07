import React, {useState, useEffect} from 'react';

export const ScoreRow = ({basePlayers, numberOfRounds, onRemove}) => {
    const [playerName, setPlayerName] = useState(basePlayers);
    const [rounds, setRoundScore] = useState(() =>
        Array.from({ length: numberOfRounds }, () => 0)
    );
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setRoundScore((prevRounds) => {
            const newRounds = [...prevRounds];
            if (newRounds.length < numberOfRounds) {
                // Add additional rounds if numberOfRounds increased
                for (let i = newRounds.length; i < numberOfRounds; i++) {
                    newRounds.push(0);
                }
            } else if (newRounds.length > numberOfRounds) {
                // Remove excess rounds if numberOfRounds decreased
                newRounds.splice(numberOfRounds);
            }
            return newRounds;
        });
    }, [numberOfRounds]);

    useEffect(() => {
        const newTotal = rounds.reduce((total, round) => total + round, 0);
        setTotal(newTotal)
    }, [rounds]);

    const handlePlayerNameChange = (e) => {
        setPlayerName(e.target.value);
    }
    const handleRoundChange = (roundNumber, e) => {
        const newScore = parseInt(e.target.value);
        const updatedRounds = [...rounds];
        updatedRounds[roundNumber - 1] = newScore;
        setRoundScore(updatedRounds);

    }
    const numberOfRoundInputs = () => {
        let inputs = [];
        for (let i = 1; i <= numberOfRounds; i++) {
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
