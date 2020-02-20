import React, { useEffect, useState } from 'react';
import cx from 'classnames';

//component
import Modal from '../component/Modal/Modal';

//constants
import { questionsList } from '../constants/questionsList';

const QuizContainer = (props) => {
    // const [loading, setLoader] = useState(false);
    const [modalShow, setModal] = useState(false);
    const [disableButton, setDisable] = useState(true);
    const [quizQuestion, setQuestion] = useState({});
    const [answer, setAnswer] = useState(null);
    const [answerList, setAllAnswer] = useState([]);

    useEffect(() => {
        setData(0);
    },[]);
    
    const setData = (index) => {
        setQuestion({
            id: questionsList[index].id,
            question: questionsList[index].question,
            answer : questionsList[index].answer,
            answerOptions : questionsList[index].options,
        });
        
    }

    const handleStart = () => {
        setModal(true);   
    }

    const hideModal = () => {
        setModal(false);
    }

    const handlePrevious = () => {
        const previousQuestion = quizQuestion.id - 2;
        setData(previousQuestion);
        setDisable(false);
    }

    const handleNext = () => {
        const nextQuestion = quizQuestion.id;
        setData(nextQuestion);
        setDisable(true);
        // setAllAnswer([
        //     ...answerList,
        //     answer
        // ]);
    }

    const handleSelect = (event) => {
        const selectedAnswer =  event.target.value;
        setAnswer(selectedAnswer);
        setDisable(false);
        setAllAnswer(selectedAnswer); 
        console.log(answerList)
    }

   

    return (
        <div className='m-3'>
            <button type="button" className="btn btn-info" onClick={handleStart}>Start</button>
            {quizQuestion && quizQuestion.id ? (
                <Modal 
                    show={modalShow} 
                    handleClose={hideModal} 
                    handlePrevious={handlePrevious} 
                    handleNext={handleNext} 
                    disabled={disableButton}
                    quizQuestion={quizQuestion}
                    maxQuestions={questionsList.length}>
                    <p className='question'>{quizQuestion.id}. {quizQuestion.question}</p>
                    {quizQuestion.answerOptions.map((list) => {
                        return (
                            <button type="button" 
                                value={list}                                
                                className={cx('options btn btn-secondary', {
                                    'btn-warning' : answer === list,
                                })}
                                onClick={handleSelect} 
                                key={list}>{list}</button>
                        )
                    })}
                </Modal> 
            ): (
                <div className='spinner-border' />
            )}
        </div>        
    );
}

export default QuizContainer;