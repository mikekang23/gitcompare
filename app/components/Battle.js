import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types';
import Results from './Results';
import PlayerPreview from './PlayerPreview';
import PlayerInput from './PlayerInput';
import Instructions from './Instructions';

export default class Battle extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player
    })
  }

  handleReset(id) {
    this.setState({
      [id]: null
    })
  }

  render() {
    const {playerOne, playerTwo, battle} = this.state;

    if(battle===true){
      return <Results playerOne={playerOne} playerTwo={playerTwo} />
    }

    return (
      <React.Fragment>
        <Instructions />

        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null
              ?
              <PlayerInput
                onSubmit={(player) => {
                  this.handleSubmit('playerOne', player);
                }}
                label='Player 1'
              />
              :
              <PlayerPreview
                username={playerOne}
                label='Player One'
                onReset={() => {
                  this.handleReset('playerOne')
                }}
              />
            }
            {playerTwo === null ?
              <PlayerInput
                onSubmit={(player) => {
                  this.handleSubmit('playerTwo', player);
                }}
                label='Player 2'
              />
              :
              <PlayerPreview
                username={playerTwo}
                label='Player Two'
                onReset={() => {
                  this.handleReset('playerTwo')
                }}
              />
            }
          </div>

          {playerOne && playerTwo && (
            <button
              className="btn dark-btn btn-space"
              onClick={() => this.setState({battle: true})}
            >
            Battle
            </button>
          )}

        </div>
      </React.Fragment>
    )
  }
}
