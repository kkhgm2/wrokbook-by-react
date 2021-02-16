import React from 'react';
import Question from './Question';

class Parts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            currentQuestion: 1,
            isAnswered: false,
            isCorrect: false,
        }
    }
    
    render(){
        const obj = this.props.questions[this.state.currentQuestion];
        if(! obj) {
            return (
                <div>
                    <p>正解数 {this.state.score}</p>
                    <p>終わり！！！</p>
                </div>
            )
        }

        let displayResult ;
        if (this.state.isCorrect && this.state.isAnswered) {
            displayResult = <p> 正解やったね！！</p>
        } else if (! this.state.isCorrect && this.state.isAnswered) {
            displayResult = <p> 間違い、ブッブーXXX</p>
        }

        const sentence = obj.quiz; 
        const option = obj.option;

        return(
        <div>
            <p>第{this.state.currentQuestion}問</p>
            {displayResult}
            <p>{sentence}</p>
                {/* {this.renderingQuestions(option)} */}
                {/* 以下を動的にしたい！！！！ */}
                <div className="answer-column">
                    <Question label={option[0].label} txt={option[0].text} answer={option[0].answer} isAnswered={this.state.isAnswered} />
                    <Question label={option[1].label} txt={option[1].text} answer={option[1].answer} isAnswered={this.state.isAnswered} />
                    <Question label={option[2].label} txt={option[2].text} answer={option[2].answer} isAnswered={this.state.isAnswered} />
                    <Question label={option[3].label} txt={option[3].text} answer={option[3].answer} isAnswered={this.state.isAnswered} />
                    <Question label={option[4].label} txt={option[4].text} answer={option[4].answer} isAnswered={this.state.isAnswered} />
                </div>

                <div id="add_button">
                    <input type="button" value="次の問題" id="next" data-end_quiz="5" onClick={ () => this.next()}/>
                    <input type="button" value="答え" onClick={() => this.check_the_answer(option)} />
                </div>
        </div>
        );
    }

    next() {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            isAnswered: false
        });

        const element = document.querySelector('.answer-column');
        const div = element.querySelectorAll('div');

        for(let i = 0; i < div.length; i++){
            div[i].querySelectorAll('input')[0].checked = false ;
        }
    }

    // 設定された正解数と、選択した正解すうが一致していれば、加点する
    check_the_answer(option) {
        let correctResult = [];
        let correctAmount = [];
        const element = document.querySelector('.answer-column');

        for(let i = 0; i < option.length; i++){
            const div = element.querySelectorAll('div')[i];
            const isChecked = div.querySelectorAll('input')[0].checked;
            const isCorrect = div.querySelectorAll('label')[0].dataset.answer == "correct";

            if(isCorrect) correctAmount.push(isCorrect);
            if (isChecked && isCorrect)  correctResult.push(true);
        }

        //選択した正解数の比較
        let addScore = 0;
        let result = false;
        if(correctResult.length == correctAmount.length) {
            addScore = 1;
            result = true;
        }

        this.setState({ 
            score: this.state.score + addScore, 
            isAnswered: true,
            isCorrect: result 
        })
    }

    // renderingQuestions (option) {
    //     for(let i = 0; i < option.length; i ++) {
    //         const element = option[i];
    //         const label = element.label;
    //         const txt = element.text;
    //         const answer = element.answer;
    //         <Question label={label} txt={txt} answer={answer}/>
    //     }
    // }
}

export default Parts;