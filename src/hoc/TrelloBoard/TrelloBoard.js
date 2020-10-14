import React from 'react';
import classes from './TrelloBoard.css';

const TrelloBoard = props => {
    return (
        <div className={classes.TrelloBoard}>
            <h2 className="text-">{props.heading}</h2>
            <div className={classes.TrelloBoardContainers}>
                {props.children}
            </div>
        </div>
    );
}

export default TrelloBoard;
