import React from 'react';
import classes from './TrelloBoard.css';
import globalClasses from '../../index.css';

const TrelloBoard = ({ heading, children }) => {
    return (
        <div className={[classes.TrelloBoard, globalClasses.ChalkFont].join(" ")}>
            <h2>{heading}</h2>
            <div className={classes.TrelloBoardContainers}>
                {children}
            </div>
        </div>
    );
}

export default TrelloBoard;
