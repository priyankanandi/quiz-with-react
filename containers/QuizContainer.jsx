import React, { useEffect, useState } from 'react';

//component
import Modal from '../component/Modal/Modal';

//constants
import { questionsList } from '../constants/questionsList';

const QuizContainer = (props) => {
    const [modalShow, setModal] = useState(false);
    const [disableButton, setDisable] = useState(true);
    const [quizList, setQuestion] = useState({});
    const [answer, setAnswer] = useState(null);
    const [answerCount, setCount] = useState(0);
    useEffect(() => {
        setNextOrPreviousQuestion(0);
    },[]);
    
    const setNextOrPreviousQuestion = (index) => {
        setQuestion({
            id: questionsList[index].id,
            question: questionsList[index].question,
            correctAnswer : questionsList[index].answer,
            answerOptions : questionsList[index].options,
            result: false,
        });
        
    }

    const handleStart = () => {
        setModal(true);   
    }

    const handlePrevious = () => {
        const preQue = quizList.id - 2;
        setNextOrPreviousQuestion(preQue);
        setDisable(false);
    }

    const handleNext = (e) => {
        console.log(e)
        const nextQue = quizList.id;
        setNextOrPreviousQuestion(nextQue);
        setDisable(true);
    }

    const handleSelect = (id, selectedAnswer) => {
        setDisable(false);
        setAnswer(selectedAnswer)
        if(selectedAnswer === quizList.correctAnswer) {
            setCount(answerCount+1);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setQuestion({...quizList, result : true})
        setModal(false);   
    }

    return (
        <>
            {quizList.result ? (
                answerCount === questionsList.length ? (
                    <div>Wowwww you have got {answerCount}/{questionsList.length}</div>
                ):
                (
                    <div>{answerCount} correct answer out of {questionsList.length}</div>
                )
            ): (
            <>
            <h1>Are you excited to take Quiz</h1>
            <div>Click Start to begin</div>
            <div>
                <button type="button" className="info pointer" onClick={handleStart}>Start</button>
            </div>  
            {quizList && quizList.question ? (
                <Modal 
                    show={modalShow} 
                    handlePrevious={handlePrevious} 
                    handleNext={(e) => handleNext(e)} 
                    disabled={disableButton}
                    quizList={quizList}
                    handleSubmit={handleSubmit}
                    maxQuestions={questionsList.length}>
                    <p className='question'>{quizList.id}. {quizList.question}</p>
                    {quizList.answerOptions.map((list) => {
                        return (
                            <button type="button pointer" 
                                value={list}                                
                                className={`${answer === list ? 'warning' : 'secondary'} options`}                                 
                                onClick={()=>handleSelect(quizList.id, list)} 
                                key={list}>{list}</button>
                        )
                    })}
                </Modal>
            ) : (
                <div >loading...</div>
            )}
            </>
            )}
        </>        
    );
}

export default QuizContainer;