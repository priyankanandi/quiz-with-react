import React from 'react'

//css
import "./Modal.css";

const Modal = (props) => {
    const hideModal = props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={hideModal}>
        
          <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Question {props.quizQuestion.id}/{props.maxQuestions}</h4>
              <button type="button" className='close' onClick={props.handleClose}>&times;</button>
            </div>

            <div className="modal-body">
              {props.children}
            </div>

            <div className="modal-footer">
              {props.quizQuestion.id > 1 && (
                <button type="button" className="btn btn-secondary" onClick={props.handlePrevious}>Previous</button>
              )}
              {props.quizQuestion.id < props.maxQuestions  && (
                <button type="button" className="btn btn-secondary" disabled={props.disabled} onClick={props.handleNext}>Next</button>
              )}
            </div>

          </div>
        </div>
      </div>
    );
  };

export default Modal;