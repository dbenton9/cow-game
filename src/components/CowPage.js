import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client'

function Player(props) {
    // useEffect(() => {
    //   console.log(props.player.name, 'showBanner', props.player.score)
    // }, [props.player.score])

    return (
        <div>
            <h4>{props.player.name} </h4>
            <button className='decrement' onClick={() =>props.onClick(-1)}>-1</button>
            <div className='score'>{props.player.score + props.player.immortalScore} Cows</div>
            <button className='increment' onClick={() => props.onClick(1)}>+1</button>
            <button className='increment' onClick={() => props.onClick('immortal')}>Immortal Cows ({props.player.immortalScore})</button>
            <button className='graveyard' onClick={() => props.onClick('graveyard')}>Graveyard</button>
        </div>
    );
}

function AddPlayerForm() {
    return (
        <form onSubmit={this.handleSubmit}>
            <label> Add Player </label>
            <input type="text" id="name"></input>
            <input type="submit"></input>
        </form>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [{
                name: "Berkley",
                score: 0,
                immortalScore: 0,
            }, {
                name: "Shelby",
                score: 0,
                immortalScore: 0,
            }
            ],
        }
    }

    componentDidMount() {
        const data = window.localStorage.getItem('PLAYERS');
        if (JSON.parse(data) != null) {
            this.setState({
                players: JSON.parse(data)
            })
        }
    }

    scoreChange(value, index) {
        const changingPlayer = this.state.players[index]
        if (Number.isInteger(value)) {
            changingPlayer.score = changingPlayer.score + value
        } else if (value == 'immortal') {
            changingPlayer.immortalScore += 1
        } else if (value == 'graveyard') {
            changingPlayer.score = Math.ceil(changingPlayer.score * 0.5)
        }
        this.state.players.splice(index, 1, changingPlayer)
        this.setState({
            players: this.state.players,
        })

        window.localStorage.setItem('PLAYERS', JSON.stringify(this.state.players));
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        const playersList = this.state.players.map((player, index) => {
            return (
                <li key={index}>
                    <Player player={player} onClick={(value) => this.scoreChange(value, index)}/>
                </li>
            )
        });

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Add Player </label>
                    <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                    <input type="submit" value="submit"></input>
                </form>
                <ul>
                    {playersList}
                </ul>
            </div>
        )
    }
}

export default Game;
