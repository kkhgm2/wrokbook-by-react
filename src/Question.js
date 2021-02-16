import React from 'react';

function Question (props) {

    let judgeColor; 

    if(! props.isAnswered){
        judgeColor = null;
    } else if(props.isAnswered && props.answer == "correct") {
        judgeColor = "green";
    } else {
        judgeColor = "red";
    }

    return (
        <div>
            <input type="checkbox"  id={props.label} />
            <label htmlFor={props.label} name="label" data-answer={props.answer} className={judgeColor}>{props.txt} </label>
        </div>
    );
}

export default Question;
