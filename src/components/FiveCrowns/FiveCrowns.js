import React, {useState, useEffect} from 'react';
import ScoreBoard from "./ScoreBoard";
import Container from "react-bootstrap/Container";
export const FiveCrowns = () => {
    const [numberOfRounds, setNumberOfRounds] = useState(localStorage.getItem('numberOfRounds') || 1);

    const handleNumberOfRoundsChange = (e) => {
        setNumberOfRounds(parseInt(e.target.value));
    }

    useEffect(() => {
        localStorage.setItem('numberOfRounds', numberOfRounds);
    }, [numberOfRounds]);

    // create a loop to create 13 option tags
    const options = () => {
        let options = [];
        for (let i = 1; i <= 13; i++) {
            options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }

    return (
        <Container>
            <h1>Five Crowns</h1>
            <div>
                <h3>Settings</h3>
                <div>
                    <label htmlFor="rounds">Number of Rounds</label>
                    <select onChange={(e)=>handleNumberOfRoundsChange(e)} value={numberOfRounds}>
                        {options()}
                    </select>
                </div>
            </div>
            <ScoreBoard numberOfRounds={numberOfRounds}/>
        </Container>
    );
}

export default FiveCrowns;
