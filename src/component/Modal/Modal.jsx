import React from 'react'

//css
import "./Modal.css";

const Modal = (props) => {
    const hideModal = props.show ? "modal display-block" : "modal display-none";
    const disabled = props.disabled ? 'not-allowed' : 'pointer';
    return (
      <div className={hideModal}> 
          <div className="modal-main">
            <div>
              <h4 className="modal-title">Question {props.quizList.id}/{props.maxQuestions}</h4>
            </div>

            <div className="modal-body">
              {props.children}
            </div>

            <div>
              {props.quizList.id > 1 && (
                <button type="button" className="secondary" onClick={props.handlePrevious}>Previous</button>
              )}
              {props.quizList.id === props.maxQuestions  ? (
                <button type="button" className={`${disabled} success`} disabled={disabled} onClick={props.handleSubmit}>Submit</button>
              ) : 
              (props.quizList.id < props.maxQuestions  && (
                <button type="button" className={`${disabled} secondary`} disabled={disabled}  onClick={props.handleNext}>Next</button>
              ))}
            </div>
            
          </div>
      </div>
    );
  };

export default Modal;