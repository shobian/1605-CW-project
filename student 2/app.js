
const questionNumber = document.querySelector(".question-number");
const questionText  = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempts = 0;


//push the question into availableQuestions arry
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

//set question number and question options
function getNewQuestion(){
    //question option
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    //set quesstions
    //random question loader
    const questiomIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion =questiomIndex;
    questionText.innerHTML = currentQuestion.q;

    //get the index of the question from the avilable question array
    const index1 = availableQuestions.indexOf(questiomIndex);
    
    //removing the the current question from avialble array 
    availableQuestions.splice(index1,1);

    // console.log(questiomIndex);
    // console.log(availableQuestions);

    //set options for the lenths of the options
    const optionsLen = currentQuestion.options.length;
    for(let i = 0; i < optionsLen; i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = "";

    let animationDelay = 0.15;
    
    for (let i = 0; i<optionsLen; i++){
        //randomising the options
        const optionIndex = availableOptions[Math.floor(Math.random()  * availableOptions.length)];
        //get the positions of the option index from the available options
        const index2 = availableOptions.indexOf(optionIndex);
        //remove the optionIndex from the availableOptions, so not to repeat
        availableOptions.splice(index2,1);
        

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;

        option.style.animationDelay = animationDelay +"s";
        animationDelay = animationDelay + 0.15;
        option.classname = "option";
        optionContainer.appendChild(option)

        option.setAttribute("onclick", "getResult(this)");

    }

    //console.log(optionsLen)
    
    questionCounter++

    //console.log(questiomIndex)
}

//to get the input result 
function getResult(element){
    const id = parseInt(element.id);
    //
    if(id === currentQuestion.Answer){
        //set the green color to the correct option
        element.classList.add("correct");
        //update answer div green
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:" + correctAnswers);
    }else{
        //set the red color to the incorrect option
        element.classList.add("incorrect");
        //update answer div red
        updateAnswerIndicator("incorrect");

        //show the correct answer
        const optionsLen = optionContainer.children.length;
        for (let i =0; i<optionsLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.Answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempts++;
    unlickableOptions();
}

//after one try make options it unclickable
function unlickableOptions(){
    const optionsLen = optionContainer.children.length;
    for (let i = 0; i < optionsLen; i++){
        optionContainer.children[i].classList.add("already-answered")
    }
}

function answerIndicator(){
    answerIndicatorContainer.innerHTML = "";
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}

function next(){
    if(questionCounter === quiz.length){
        console.log("over")
        quizOver();
    }else{
        getNewQuestion();
    }
}


function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function quizOver(){
    //hide quiz box
    quizBox.classList.add("hide");
    //show quiz box
    resultBox.classList.remove("hide");
    quizResult();

}

function quizResult(){
    resultBox.querySelector(".total-questions").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempts;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = (attempts - correctAnswers);

    let points = (correctAnswers * 2) - ((attempts - correctAnswers));
    let promo = ""
    badge = "No"
    //const percentage = (correctAnswers/quiz.length)*100;
    if (points<=0){points=0}
    else if (points==4){badge="Bronze"}
    else if (points==7){badge="Silver"}
    else if (points==10){badge="Gold", promo="You got 10% discount from your next purchase",resultBox.querySelector(".discount").innerHTML = "10% Discount"}
    resultBox.querySelector(".points").innerHTML = points ;     //percentage.toFixed(2) + "%"
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + quiz.length;

    alert("Hi,\nThanks for participating in the quiz you got "+points+" points.\nYou also recieved "+badge+" badge from this quiz"+"\n"+promo)
}




////////////////////// onclick start quiz ////////////
function startQuiz(){
    //hide the main home box
    homeBox.classList.add("hide");
    //show the main quiz box
    quizBox.classList.remove("hide");
    //first we will set all questions in availableQuestions
    setAvailableQuestions();
    //second we will call getNewQiuestions
    getNewQuestion();
    //to create indicator of queation
    answerIndicator();
}