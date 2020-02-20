import React from "react";  

//component
import QuizContainer from './containers/QuizContainer';

const App = () => {
    return (
         <div className="quiz">
            <div className="text-center">
                <QuizContainer />
            </div>           
        </div>
    )
};

export default App;