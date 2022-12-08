import React from "react";
import classes from "../App.module.css";

const Square = ({ val, chooseSquare }) => {
    return (
        <div onClick={chooseSquare} className={classes.square}>
            {val}
        </div>
    );
}

export default Square;