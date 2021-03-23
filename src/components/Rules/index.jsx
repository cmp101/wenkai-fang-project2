import React from 'react';
import Home from '../Home';

const Rules = () => {
  return (
    <React.Fragment>
      <Home />
    <div className="App">
    <h3>
      Rules
    </h3>
    <div>
      <p>
      The object of the game is to identify a 'Set' of three cards from 12 cards laid out on the table. Each card has a variation of the following four features:
      </p>
      <ul>
        <li>
          <strong>COLOR:</strong> Each card is red, green, or blue.
        </li>
        <li>
          <strong>SYMBOL:</strong> Each card contains ovals, squiggles, or diamonds.
        </li>
        <li>
          <strong>NUMBER:</strong>  Each card has one, two, or three symbols.
        </li>
        <li>
          <strong>SHADING:</strong> Each card is solid, open, or striped.
        </li>
      </ul>
      <p>
        <strong>
          A set is called a 'legal set' if all three cards have:
        </strong>
      </p>

      <ul>
        <li>
          color: different on each card, symbol: the same on each card (oval), number: the same on each (two), shading: the same on each card (solid)
        </li>
        <li>
          color: different on each card, symbol: different on each card, number: different on each card, shading: different on each card
        </li>
        <li>
          color: the same on each card (green), symbol: the same on each card (diamond), number: different on each card, shading: different on each card
        </li>
      </ul>
    </div>
    </div>
    </React.Fragment>
  )
}

export default Rules;