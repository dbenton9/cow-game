import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Player extends React.Component {
  // render() {
  //   return (
  //       <div>
  //         <h3>{this.props.player.name} </h3>
  //         <button className='decrement' onClick={() => this.props.onClick(-1)}>-1</button>
  //         <div className='score'>{this.props.player.score} Cows</div>
  //         <button className='increment' onClick={() => this.props.onClick(1)}>+1</button>
  //       </div>
  //   )
  // }
// }

function Player(props) {
  // useEffect(() => {
  //   console.log(props.player.name, 'showBanner', props.player.score)
  // }, [props.player.score])

  return (
    <div>
      <h3>{props.player.name} </h3>
      <button className='decrement' onClick={() =>props.onClick(-1)}>-1</button>
      <div className='score'>{props.player.score} Cows</div>
      <button className='increment' onClick={() => props.onClick(1)}>+1</button>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [{
        name: "Berkley",
        score: 0,
      }, {
        name: "Shelby",
        score: 0,
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
    changingPlayer.score = changingPlayer.score + value
    this.state.players.splice(index, 1, changingPlayer) 
    this.setState({
      players: this.state.players,
    })

    window.localStorage.setItem('PLAYERS', JSON.stringify(this.state.players));
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
      <ul>
        {playersList}
      </ul>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
