const questions=[
    {
        question:"What does HTML Stand for?",
        options:["HyperText Markup Language","Hyper Markup Language"," Markup Language","Language"],
        answer:"HyperText Markup Language"
    },
    {
        question:"What does CSS Stand for?",
        options:["HyperText Markup Language","Cascading Style Sheets"," Markup Language","Language"],
        answer:"Cascading Style Sheets"
    },
    {
        question:"What does JS Stand for?",
        options:["HyperText Markup Language","Hyper Markup Language"," Markup Language","JavaScript"],
        answer:"JavaScript"
    },
    {
        question:"What does JVM Stand for?",
        options:["HyperText Markup Language","Java Vertual Machine"," Markup Language","JavaScript"],
        answer:"Java Vertual Machine"
    },
    {
        question:"What does DOM Stand for?",
        options:["HyperText Markup Language","Java Vertual Machine"," Document Object Model","JavaScript"],
        answer:"Document Object Model"
    }
]
let currentQuestion=0
let score=0
let selectedAnswers=new Array(questions.length).fill(null)
let timerDuration=20;
let timer;

let questionEl=document.getElementById("question")
let optionsEl=document.getElementById("options")
let nextBtn=document.getElementById("nextBtn")
let prevBtn=document.getElementById("prevBtn")
let scoreEl=document.getElementById("score")
let timeEl=document.getElementById("time")

function loadQuestions(){
    let q=questions[currentQuestion]
    questionEl.textContent=q.question
    optionsEl.innerHTML=""
    q.options.forEach(option=>{
       let li=document.createElement("li")
       li.innerHTML=`
       <label><input type="radio" name="option" value='${option}'>${option}</label>
         `
       optionsEl.appendChild(li)
    })
    if(selectedAnswers[currentQuestion]){
       let inputs=document.getElementsByName("option")
       for(let input of inputs){
        if(input.value===selectedAnswers[currentQuestion]){
            input.checked=true;
            break
        }
       }
    }
}
function getSelectedOption(){
    let selected=document.querySelector("input[name='option']:checked")
    return selected?selected.value:null;
}
function saveHighScore(newScore){
    let high=localStorage.getItem("highscore") || 0
    if(newScore>high){
        localStorage.setItem("highscore",newScore);
    }
}
function showScore(final=false){
    questionEl.textContent=final?"Time's Up!":"Quiz Completed"
    optionsEl.innerHTML=""
    nextBtn.style.display="none"
    prevBtn.style.display="none"
    scoreEl.textContent=`Your Score: ${score}/${questions.length}\n High 
    Score: ${localStorage.getItem("highscore")}`
    clearInterval(timer)
}
nextBtn.addEventListener("click",()=>{
    let selected=getSelectedOption();
    if(!selected){
        alert("Please select an option")
        return
    }
    selectedAnswers[currentQuestion]=selected;
    console.log(selected)
    if(selected === questions[currentQuestion].answer){
        score++;
        console.log(score)
    }
    currentQuestion++;
    if(currentQuestion<questions.length){
        loadQuestions();
    }else{
        saveHighScore(score);
        showScore();
    }
})
prevBtn.addEventListener("click",()=>{
     if(currentQuestion>0){
        currentQuestion--;
        loadQuestions();
     }
})
function startTimer(){
    timer=setInterval(()=>{
        timerDuration--;
        timeEl.textContent=timerDuration
        if(timerDuration<=0){
            alert("Time's up! Submitting your quiz!")
            for(let i=currentQuestion;i<questions.length;i++){
                if(selectedAnswers[i]===questions[i].answer){
                    score++
                }
                saveHighScore()
                showScore(true)
            }
        }
    },1000)
}
loadQuestions()
startTimer()
