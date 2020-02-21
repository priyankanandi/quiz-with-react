import React, { useEffect, useState } from 'react';

//component
import Modal from '../component/Modal/Modal';

//constants
import { questionsList } from '../api/questionsList';

const QuizContainer = (props) => {
    const [modalShow, setModal] = useState(false);
    const [disableButton, setDisable] = useState(true);
    const [quizList, setQuestion] = useState({});
    const [optionSelected, setAnswerObject] = useState({});
    const [counter, setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        setNextOrPreviousQuestion(0);
    },[]);
    
    const setNextOrPreviousQuestion = (index) => {
        setQuestion({
            id: questionsList[index].id,
            question: questionsList[index].question,
            answerOptions : questionsList[index].options,
            answerIndex: questionsList[index].answerindex,
            result: false,
        });
        
    }

    const handleStart = () => {
        setModal(true);   
    }

    const handlePrevious = () => {
        setCount(counter - 1)
        const preQue = quizList.id - 1;
        setNextOrPreviousQuestion(preQue);
        setDisable(false);
    }

    const handleNext = () => {
        setCount(counter + 1)
        const nextQue = quizList.id + 1 ;
        setNextOrPreviousQuestion(nextQue);
        if(optionSelected[nextQue]) {
          setDisable(false);
        } else {
          setDisable(true);
        }
    }

    const handleSelect = (event) => {
      var answerObject = optionSelected;
      var indexParsed = parseInt(event.target.value);
      var questionIndex = counter;
      answerObject[questionIndex] = indexParsed;    
      setAnswerObject(answerObject);
      setDisable(false);
    }

    const handleSubmit = (event) =>{
        let count = [];
        event.preventDefault();
        setQuestion({...quizList, result : true})
        setModal(false); 
        const answerindex=questionsList.map(list=> list.answerindex);
        for(var i=0 ; i < questionsList.length; i++) {
          if(optionSelected[i] === answerindex[i]){
            count.push(optionSelected[i] === answerindex[i])
          }
        }
        setTotalCount(count.length);
    }

    const renderAnswerOptions =(key,index)=> {
    return (
              <button 
                  type="button pointer" 
                  value={index}
                  className={`${optionSelected[counter] === index ? 'warning' : 'secondary'} options`}                                 
                  onClick={(e)=>handleSelect(e)} 
                  key={key}>{key}
              </button>
          )
    }

    const renderResult = (totalCount, length) => {
      if(totalCount === length) {
        return  <h1>Wowwww you got {totalCount}/{length}</h1>;
      } else {
        return <h1>{totalCount} correct answer out of {length}</h1>
      }
    }

    return (
        <>         
            {quizList.result ? (
                renderResult(totalCount, questionsList.length)
            ) : (
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
                    handleNext={handleNext} 
                    disabled={disableButton}
                    quizList={quizList}
                    questionNumber={quizList.id + 1}
                    handleSubmit={handleSubmit}
                    maxQuestions={questionsList.length}>
                    <p className='question'>{quizList.id + 1}. {quizList.question}</p>
                    {quizList.answerOptions.map(renderAnswerOptions)}
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