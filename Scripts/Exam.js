"use strict";

// [+] Defining Variables
const examSection   = $.querySelector(".exam");
const timerValue    = $.querySelector(".exam-timer__value");
const questionCount = $.querySelector(".exam__question-count--value");
const questionValue = $.querySelector(".exam__question");
const answerButtons = $.querySelectorAll(".exam__button");
let questions = [];
let selfAnswers = [];
let responseTime = 90;
let currentQuestion = 0;

// [+] Functions
function startExam(){
    getQuestion();
    examSection.classList.add("main-section--active");
}
async function getQuestion(){
    let jsonPlaceholder = {
        numEasyQuestions: 999,
        numMediumQuestions: 999,
        numHardQuestions: 999
    };
    let postConfig = {
        method: "POST",    
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(jsonPlaceholder)
    };
    
    try{
        questions = await fetch("API/QuestionProvider.php", postConfig)
            .then(resolved => resolved);

        questions = await questions.json();

        questions.forEach((question) => {
            let newQuestion = {
                id : question.ID,
                answer : false
            };
 
            selfAnswers.push(newQuestion);
        });

        changeQuestion();    
        startTimer();
    }catch{
        alert("Please Connect To Server !");
        setTimeout(() => {
            window.location.reload();
        },1000)
    }
        
}
function startTimer(){
    let minCount = Math.floor(responseTime / 60);
    let secCount = responseTime % 60;

    timerValue.innerHTML = `${addZeroToNumber(minCount)} : ${addZeroToNumber(secCount)}`;
    timerValue.classList.contains("exam-timer__value--danger") && timerValue.classList.remove("exam-timer__value--roung");

     let questionTimeInterval = setInterval(() => {
         if(secCount === 0){
             if(minCount > 0){
                 minCount -= 1;
                 secCount = 60
             }
         }else{
             secCount -= 1;
         }
        timerValue.innerHTML = `${addZeroToNumber(minCount)} : ${addZeroToNumber(secCount)}`;

         (minCount === 0 && secCount <= 15) && timerValue.classList.add("exam-timer__value--danger");

        if(secCount === 0 && minCount === 0){
            examSection.classList.remove("main-section--active");
            showFinalReport(selfAnswers);
            clearInterval(questionTimeInterval);
        }
    }, 1000);
}

function changeQuestion(){
    if(!(currentQuestion + 1  > questions.length)){
        currentQuestion++;
        let contentQuestion = questions.find(question => question.ID === currentQuestion);
        questionCount.innerHTML = currentQuestion.toString();
        questionValue.innerHTML = contentQuestion.QuestionText;
        questionValue.dataset.id = currentQuestion;
    }else{
        showFinalReport(selfAnswers);
    }
}

function clickOnButtonHandler(){
    answerTheQuestion.call(this, false, this.dataset.id);
}

function answerTheQuestion(){
    let currentQuestionID = +currentQuestion;
    let answerType = this.dataset.id;

    answerType = (answerType === "true");

    let findQuestion = questions.find(question => question.ID === currentQuestionID);
    let targetAnswer = selfAnswers[currentQuestionID - 1];
    targetAnswer.answer = (findQuestion.IsTrue === answerType);
    selfAnswers.splice(currentQuestionID - 1, 1, targetAnswer);

    changeQuestion();
}

// [+] Event Handling
answerButtons.forEach(button => {
    button.addEventListener("click", clickOnButtonHandler);
})