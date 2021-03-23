import React from 'react';

const Card = (props) => {
  let { card, svgPath, onClick, selected, isInShowedSolution, allCards } = props;
  const cls = "board-card"
            + (selected ? " selected" : "")
            + (isInShowedSolution ? " highlight" : "");
  if (card === -1) {
    return (
      <div className={cls}>
        <img height="180" width="180" alt="" src="empty.svg" />
      </div>
    );
  } else {
    const fileStem =
      allCards[card].shape + "-" +
      allCards[card].color + "-" +
      allCards[card].filling + "-" +
      allCards[card].number

    const filePath = "./" + svgPath + "/" + fileStem + ".svg"

    return (
      <div className={cls} onClick={onClick}>
        <img height="180" alt={fileStem} src={filePath} />
      </div>
    );
  }
}

export default Card
