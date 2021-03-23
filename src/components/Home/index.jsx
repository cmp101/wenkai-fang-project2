import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeDifficulty } from '../../redux/action';

const Home = (props) => {
  const { changeDifficulty, difficulty } = props;
  let location = useLocation().pathname;
  location = location.split('/')[1];
  return (
    <div className="App">
    <h1>
      SET: The Card Game
    </h1>
    <nav className='custom-navbar'>
      <ul className='ml-3 mb-4 nav nav-pills'>
        <li className='nav-item'>
          <Link to="/" className={`nav-link ${ !location && 'active' }`}>Home</Link>
        </li>
      </ul>
    </nav>

    { !location && (
    <React.Fragment>
      <div className="difficulty-level" style={ { marginLeft: '29px' } }>
        <label>Difficulty: </label> 
        <label><input type="radio" value={ 0 } checked={difficulty === 0} onChange={() => changeDifficulty(0)}/> Easy </label>
        <label><input type="radio" value={ 1 } checked={difficulty === 1} onChange={() => changeDifficulty(1)}/> Medium </label>
        <label><input type="radio" value={ 2 } checked={difficulty === 2} onChange={() => changeDifficulty(2)}/> Hard </label>
      </div>
      <ol class="list-group">
      <li class="list-group-item">
        <Link to="/main-game"> 1. Play Game</Link>
      </li>
      <li class="list-group-item">
        <Link to="/rules"> 2. Rules</Link>
      </li>
    </ol>
    </React.Fragment>
    )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    difficulty: state.difficulty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeDifficulty: (payload) => dispatch(changeDifficulty(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)