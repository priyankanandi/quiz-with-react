import React from 'react'

//css
import './Modal.css';

const Modal = (props) => {
    const hideModal = props.show ? 'modal display-block' : 'modal display-none';
    const disabled = props.disabled ? 'not-allowed' : 'pointer';
    return (
      <div className={hideModal}> 
          <div className='modal-main'>
            <div className='modal-title'>
              <h4>Question {props.questionNumber}/{props.maxQuestions}</h4>
            </div>

            <div className='modal-body'>
              {props.children}
            </div>

            <div className='modal-footer'>
                  {props.questionNumber > 1 && (
                  <button type='button' className='secondary' onClick={props.handlePrevious}>Previous</button>
                )}
                {props.questionNumber === props.maxQuestions ? (
                  <button type='button' className={`${disabled} success`} disabled={props.disabled} onClick={props.handleSubmit}>Submit</button>
                ) : 
                (props.questionNumber < props.maxQuestions  && (
                  <button type='button' className={`${disabled} secondary`} disabled={props.disabled}  onClick={props.handleNext}>Next</button>
                ))}
            </div>
            
          </div>
      </div>
    );
  };

export default Modal;