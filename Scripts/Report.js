// [+] Defining Variables
const reportSection         = $.querySelector(".report");
const reportTitle           = $.querySelector(".report__title");
const reportIcon            = $.querySelector(".report__img");
const reportQuestionCount   = $.querySelector(".report__detail-value--quesCount");
const reportCorrectPercent  = $.querySelector(".report__detail-value--percent");
const reportCorrectAnswer   = $.querySelector(".report__chart-value--correct");
const reportWrongAnswer     = $.querySelector(".report__chart-value--falsy");
const reportCorrectProgress = $.querySelector(".report__progress-value--correct")
const reportWrongProgress   = $.querySelector(".report__progress-value--falsy")

// [+] Functions
function showFinalReport(answers){
    if(!reportSection.classList.contains("main-section--active")){
        examSection.classList.remove("main-section--active");
        reportSection.classList.add("main-section--active");

        // [+] Excavating Information
        let  questionCount, correctAnswerCount = 0, wrongAnswerCount = 0, correctPercent, wrongPercent;
        answers.forEach((answer) => {
             if(answer.answer === true){
                 correctAnswerCount++;
             }else{
                 wrongAnswerCount++;
             }
        });

        questionCount = answers.length;
        correctPercent = ((correctAnswerCount * 100) / questionCount);
        wrongPercent = ((wrongAnswerCount * 100) / questionCount);

        if(correctPercent < 75){
            reportTitle.innerHTML = "متاسفانه شما در امتحان ورودی اولیه ناسا قبول نشدید !";
            reportIcon.setAttribute("src", "Asset/Logos/Rejected.svg");
        }

        // [+] Fill Information
        reportQuestionCount.innerHTML       = questionCount.toString();
        reportCorrectPercent.innerHTML      = `${Math.ceil(correctPercent)}%`;
        reportCorrectAnswer.innerHTML       = correctAnswerCount.toString();
        reportWrongAnswer.innerHTML         = wrongAnswerCount.toString();
        reportCorrectProgress.style.cssText = `width:${correctPercent}%;`;
        reportWrongProgress.style.cssText   = `width:${wrongPercent}%;`;
    }

}