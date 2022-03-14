const timeDisplay = document.querySelector('.timeDisplay');
const taskInput = document.querySelector('.taskInput');
const workTimeInput = document.querySelector('.workTimeInput');
const breakTimeInput = document.querySelector('.breakTimeInput');
const startButton = document.querySelector('.startButton');
const afterStartButtons = document.querySelector('.afterStartButtons');
const resumeButton = document.querySelector('.resumeButton');
const pauseButton = document.querySelector('.pauseButton');
const stopButton = document.querySelector('.stopButton');
const completdTasks = document.querySelector('.completdTasks');
const fillInputBanner = document.querySelector('.fillInputBanner');


var Break       = false;
var notPaused   = true;
var countMinutes= 0;
var countBreakMinutes=0;
var totalTimeMinutes=0;
var clear_timer= false;
var sec;
var counter=1;
startButton.addEventListener('click', e => {
    if (taskInput.value=="")
    fillInputBanner.classList.remove("d-none");
    else
    {
    fillInputBanner.classList.add("d-none");
    workTimeInput.disabled = true;
    breakTimeInput.disabled = true;
    taskInput.disabled = true;
    pauseButton.classList.remove("d-none");
    resumeButton.classList.add("d-none");

    e.preventDefault();
    startButton.classList.add("d-none");
    afterStartButtons.classList.remove("d-none");
    clear_timer=false;
    if (workTimeInput.value > 1)
    countMinutes=workTimeInput.value - 1;
    else
    countMinutes=0;
    totalTime=0;
    sec = 60;
    var timer = setInterval(function(){
        if (Break)
        timeDisplay.innerHTML=`Break`;
        else
        timeDisplay.innerHTML=`${countMinutes}:${sec}`;
        if (clear_timer == true){
            clearInterval(timer);
            timeDisplay.innerHTML=`00:00`;
        }
        if(notPaused)
        sec--;
        if(sec < 0)
        {
            sec = 60;
            if (Break) {countBreakMinutes++;}
            else
            {
            countMinutes--;
            totalTimeMinutes++;
            }
            if (countMinutes < 0)
            {
            if (workTimeInput.value>1)
                countMinutes=workTimeInput.value - 1;
            else
                countMinutes=0;
            
            timeDisplay.innerHTML=`Break`;
            timeDisplay.classList.add("timeDisplayOnBreak");
            Break=true;
            }
            else if(countBreakMinutes== breakTimeInput.value)
            {
                timeDisplay.innerHTML='00:00';
                Break=false;
                timeDisplay.classList.remove("timeDisplayOnBreak");
                if (workTimeInput.value>1)
                    countMinutes = workTimeInput.value - 1;
                else
                    countMinutes=0;
                countBreakMinutes=0;
            }
        }
    }, 1000);

}
})
            
    
pauseButton.addEventListener('click', e => {
    pauseButton.classList.add("d-none");
    resumeButton.classList.remove("d-none");
    notPaused = !(notPaused);
})

resumeButton.addEventListener('click', e => {
    pauseButton.classList.remove("d-none");
    resumeButton.classList.add("d-none");
    notPaused = !(notPaused);
})

stopButton.addEventListener('click', e => {
    workTimeInput.disabled = false;
    breakTimeInput.disabled = false;
    taskInput.disabled = false;
  
    startButton.classList.remove("d-none");
    afterStartButtons.classList.add("d-none");   
    if (Break)
    {
        timeDisplay.classList.remove("timeDisplayOnBreak");
        completdTasks.insertAdjacentHTML('beforeend',`<br> ${counter}- ${taskInput.value} completed in ${totalTimeMinutes} minutes and 0 seconds`);
        taskInput.value=="";
    }
    else
    completdTasks.insertAdjacentHTML('beforeend',`<br> ${counter}- ${taskInput.value} completed in ${totalTimeMinutes} minutes and ${60 - sec} seconds`);
    counter++;    
    Break       = false;
    notPaused   = true;
    countMinutes= 0;
    countBreakMinutes=0;
    totalTimeMinutes=0;
    clear_timer=true;
    timeDisplay.innerHTML=`00:00`;  
    taskInput.value=="";
})


taskInput.addEventListener('input', e => {
    fillInputBanner.classList.add("d-none");
})
