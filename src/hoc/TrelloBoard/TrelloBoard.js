import React from 'react';
import classes from './TrelloBoard.css';

const TrelloBoard = ({ heading, children }) => {
    return (
        <div className={classes.TrelloBoard}>
            <h2>{heading}</h2>
            <div className={classes.TrelloBoardContainers}>
                {children}
            </div>
        </div>
    );
}

export default TrelloBoard;
