import React from 'react'

const Board = (props) => {
  let row = [];
  let rows = [];
  let i;
  const { board, reveal } = props;
  for (i = 0; i < board.length; i++) {
    if (i > 0 && i % 3 === 0) {
      rows.push(<div key={i} className="board-row">{row}</div>);
      row = [];
    }
    row.push(<div key={i}>{reveal(i)}</div>);
  }
  if (row.length > 0) {
    rows.push(<div key={i} className="board-row">{row}</div>);
    row = [];
  }
  return <div>{rows}</div>;
  };


  export default Board