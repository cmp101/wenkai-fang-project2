import React, { Component } from 'react'
import { rndPermute } from '../../utils/helper';
import Board from '../../components/Board';
import Card from '../../components/Card';
import { connect } from 'react-redux';
import deckOfCards from '../../utils/getCards';
import { setFound, clearSet } from '../../redux/action';
import Home from '../../components/Home';

let cards = deckOfCards;
class MainGame extends Component {
  constructor(props) {
      super(props);
      this.state = {
        deck: rndPermute(Array.apply(0, Array(cards.length)).map((x, y) => y)).filter(c=>cards[c].filling === 'Solid'),
        board: Array.apply(0, Array(12)).map((x, y) => -1),
        selected: [],
        solutions: [],
        alertMsg: null,
      };
  }

  componentDidMount() {
    this.onChangeDifficulty();
  }

  componentDidUpdate(prevProps, prevState) {
    const { state: { alertMsg, selected, deck, board } } = this;
    if (selected.length === 3 && alertMsg && board.length) {
      setTimeout(() => {
        alert(alertMsg);
        this.setState({alertMsg: null, selected: []})
      }, 100)
    }
    if (!deck.length && !board.length) {
      setTimeout(() => {
        alert('Congratulations! you win the game');
        this.setState({alertMsg: null, selected: []}, () => this.reset())
      }, 100)
    }
    if (!this.state.solutions.length && deck.length < 3) {
      setTimeout(() => {
        alert('Game over, try again !');
        this.reset();
      }, 100)
    }
  }

  reset = () => {
    const { difficulty } = this.props;
    let wantThisCard = c => difficulty === 0 ? cards[c].filling === 'Solid' : true;
    this.setState({
      deck: rndPermute(Array.apply(0, Array(cards.length)).map((x, y) => y).filter(wantThisCard)),
      board: Array.apply(0, Array(12)).map((x, y) => -1),
      selected: [],
      solutions: [],
    }, () => this.replenishBoard())
    this.props.clearSet();
  }

  drawThreeCards = () => {
    let {state, solve } = this;
    if(state.deck.length > 2) {
      state.board.push(state.deck.pop());
      state.board.push(state.deck.pop());      
      state.board.push(state.deck.pop());

      state.solutions = solve(state.board);
    }

    this.setState(state);
  }

  checkTriple = (a, b, c) => {
    const { allCards } = this.props;
    if (a === -1 || b === -1 || c === -1)
      return { result: 'error', msg: 'not a set: contains holes.' };
  
    let alleq = k => (
      allCards[a][k] === allCards[b][k] &&
      allCards[b][k] === allCards[c][k]
    );
    let alldiff = k => (
      allCards[a][k] !== allCards[b][k] &&
      allCards[a][k] !== allCards[c][k] &&
      allCards[b][k] !== allCards[c][k]
    );
  
    for (let k in allCards[a])
      if (!(alleq(k) || alldiff(k)))
        return { result: 'error', msg: 'not a set: ' + k.toString() };
  
    return { result: 'ok' };
  };

  toggleSelect = (crd0) => {
    let { state, props } = this;
    let sel = state.selected;
  
    if (state.board.findIndex(crd1 => crd1 === crd0) === -1  // no such card (internal error: wrong call to toggleSelect)
        || state.solutions.length === 0)                     // game over
      return;
  
    // if card is not in sel, add it; otherwise, remove it.
    if (crd0 !== -1) {
      let pos_in_sel = sel.findIndex(crd1 => crd1 === crd0);
      if (pos_in_sel === -1)
        sel.push(crd0)
      else
        sel.splice(pos_in_sel, 1);
    }
  
    // remove a selected set if applicable.
    if (sel.length === 3) {
      let result = this.checkTriple(sel[0], sel[1], sel[2]);
      if (result.result === 'ok') {
        let s = [];
  
        for (let grab in sel) {
          let ix0 = state.board.findIndex(crd => crd === sel[grab]);
          s.push(state.board[ix0]);
          state.board[ix0] = -1;
        }
        // state.selected = [];
        props.setsfound.unshift({val: s, thencount: state.solutions.length});
        props.setFound((props.setsfound));
        state.alertMsg = 'You have picked right set!';
        state = this.replenishBoard(state);
        return state;
      } else {
        state.alertMsg = 'The Set is not valid!'
        state.errmsg = result.msg;
        state = this.replenishBoard(state);
        return state;
      }
    } else {
      state.errmsg = 'select 3 cards';
    }
    this.setState(state);
  }

  reveal = (ix) => {
    const { state, props: { allCards } } = this;
    let crd = state.board[ix];
    let issel = crd0 =>
      state.selected.findIndex(crd1 => crd1 === crd0) !== -1;

    let onclck = () => {
      this.setState(this.toggleSelect(crd));
    };

    let highlight = state.showSolution >= 0
                 && state.solutions.length > state.showSolution
                 && state.solutions[state.showSolution].findIndex(ix0 => ix0 === ix) !== -1;

    return <Card svgPath="svg"
                 card={crd}
                 selected={issel(crd)}
                 isInShowedSolution={highlight}
                 onClick={onclck}
                 allCards={allCards}
    />
  };

  solve = (cards) => {
    let solutions = [];
  
    for (let a = 0; a < cards.length; a++)
      for (let b = a + 1; b < cards.length; b++)
        for (let c = b + 1; c < cards.length; c++)
          if (this.checkTriple(cards[a], cards[b], cards[c]).result === 'ok')
            solutions.push([a, b, c]);
  
    return solutions;
  };
  
  
  replenishBoardCards = (targetSize, board, deck) => {
    while (board.length < targetSize) {
      board.unshift(-1);
    }
  
    while (board.length > targetSize && board[board.length - 1] === -1) {
      board.pop();
    }
  
    for (let i = 0; i < board.length; i++) {
      if (board[i] === -1) {
        if (board.length > targetSize &&
            i < board.length - 1 &&
            board[board.length - 1] !== -1) {
          board[i] = board.pop();
        }
        else if (i < targetSize && deck.length > 0) {
          board[i] = deck.pop();
        }
      }
    }
  
    while (board.length > targetSize && board[board.length - 1] === -1) {
      board.pop();
    }
    // this.setState({board});
  }
  
  
  replenishBoard = (stateAsProp) => {
    let {state, replenishBoardCards, solve, props } = this;
    if (stateAsProp) state = stateAsProp

    state.showSolution = -1;
    replenishBoardCards(12, state.board, state.deck);
    state.solutions = solve(state.board);

    if (props.difficulty === 1) {
      while (state.solutions.length === 0 && state.deck.length > 2) {
        state.board.push(state.deck.pop());
        state.board.push(state.deck.pop());      
        state.board.push(state.deck.pop());
        
        state.solutions = solve(state.board);
      }
    }
    this.setState(state);
    return state
  };

  onChangeDifficulty = () => {
      let {state, solve, props } = this;
      if (props.setsfound.length) {
        let foundCards = [];
        props.setsfound.map(set => foundCards = [...foundCards, ...set.val])
        cards = cards.filter((c,i) => foundCards.indexOf(i) === -1);
      }
      switch (props.difficulty) {
        case 1: {
          state.deck = rndPermute(Array.apply(0, Array(cards.length)).map((x, y) => y));
          state.board =  Array.apply(0, Array(12)).map((x, y) => -1);
          while (state.solutions.length === 0 && state.deck.length > 2) {
            state.board.push(state.deck.pop());
            state.board.push(state.deck.pop());      
            state.board.push(state.deck.pop());
            
            state.solutions = solve(state.board);
          }
          break;
        }
        case 2: {
          state.deck = rndPermute(Array.apply(0, Array(cards.length)).map((x, y) => y));
          state.board =  Array.apply(0, Array(12)).map((x, y) => -1);
          break;
        }
        default: {
          state.deck = rndPermute(Array.apply(0, Array(cards.length)).map((x, y) => y)).filter(c=>props.allCards[c].filling === 'Solid');
          state.board =  Array.apply(0, Array(12)).map((x, y) => -1);
        }
      }
      this.setState(state, () => this.replenishBoard());
  }

  render() {
    const { board } = this.state;
    return (
      <React.Fragment>
      <Home />
      <div className="App">
        <div>
          <div className="action-button">
            <button onClick={this.reset}>
              Reset Board
            </button>
            <button onClick={this.drawThreeCards}>
              Draw 3 cards
            </button>
          </div>
        </div>
        <div className="app-row">
          <Board board={board} reveal={ this.reveal }/>
        </div>
      </div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  console.log('state ', state)
  return {
    allCards: state.deck,
    setsfound: state.setsfound,
    difficulty: state.difficulty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFound: (payload) => dispatch(setFound(payload)),
    clearSet: () => dispatch(clearSet()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainGame)