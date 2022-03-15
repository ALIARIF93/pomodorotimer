const timeDisplay       = document.querySelector('.timeDisplay');
const taskInput         = document.querySelector('.taskInput');
const workTimeInput     = document.querySelector('.workTimeInput');
const breakTimeInput    = document.querySelector('.breakTimeInput');
const startButton       = document.querySelector('.startButton');
const afterStartButtons = document.querySelector('.afterStartButtons');
const resumeButton      = document.querySelector('.resumeButton');
const pauseButton       = document.querySelector('.pauseButton');
const stopButton        = document.querySelector('.stopButton');
const completdTasks     = document.querySelector('.completdTasks');
const fillInputBanner   = document.querySelector('.fillInputBanner');


var isBreak             = false;  //This variable will be true during break time
var notPaused           = true;   //This variable will be set to false when user will click on pause button
var countWorkMinutes    = 0;      // This variable will increment after every second during work time
var countBreakMinutes   = 0;      // This variable will increment after every second during break time     
var totalTimeMinutes    = 0;      // This taskCounter will increment once work time is over and break has started
var sec                 = 59;
var taskCounter         = 1;       // This variable increments after each task gets completed when user clicks stop button
var timer                         // This is the one second timer variable.
var blink               = false;   // This variable is used to blink current time when user will click on pause button.

const resetCounters = ()=>{      // This function resets values of all major variables used in this code.
    isBreak             = false;
    notPaused           = true;
    countWorkMinutes    = 0;
    countBreakMinutes   = 0;
    totalTimeMinutes    = 0;
    clear_timer         = true;
}


const resetCountBreakMinutes = ()=>{      // This function resets the value of countBreakMinutes variable.
    if (breakTimeInput.value > 1)     // Let say user inputs 5 as break time then this function will set countBreakMinutes variable to 4 and we wil cover this subtracted value in first iteration of 60 seconds window.
    countBreakMinutes    = breakTimeInput.value - 1;
    else                             // In case user enters work time as '1' then set it to zero as 60 second window will cover this minute.
    countBreakMinutes    = 0;
}

const resetCountWorkMinutes = ()=>{      // This function resets the value of countMinutes variable.
    if (workTimeInput.value > 1)     // Let say user inputs 25 as work time then this function will set countMinutes variable to 24 and we wil cover this subtracted value in first iteration of 60 seconds window.
    countWorkMinutes    = workTimeInput.value - 1;
    else                             // In case user enters work time as '1' then set it to zero as 60 second window will cover this minute.
    countWorkMinutes    = 0;
}


const disableInputFields = ()=>{ // This function will be called when user clicks on start button and input fields will get disabled.
    workTimeInput.disabled  = true;
    breakTimeInput.disabled = true;
    taskInput.disabled      = true;
}

const enableInputFields = ()=>{ // This function will be called when user clicks on stop button and input fields will get enabled.
    workTimeInput.disabled  = false;
    breakTimeInput.disabled = false;
    taskInput.disabled      = false;
}

const validateInputField = ()=>{ // This function will be called when user clicks on start button
                                // This function will return false in case input field is empty and user clicks on start button.
    if (taskInput.value=="")
    {
    fillInputBanner.classList.remove("d-none");
    return false;
    }
    return true;    
}


startButton.addEventListener('click', e => {
    if (validateInputField()) // If user has entered the task then continue.
    {
    disableInputFields();     // Input fields will remain disabled during current task duration.
    startButton.classList.add("d-none");    // Hide start button.
    afterStartButtons.classList.remove("d-none"); // Show the pause/resume buttons div.
    clear_timer=false;
    resetCountWorkMinutes();     
    sec   = 59; //reset the seconds variable.
    timer = setInterval(function(){  // This is the timer which will be called after every second.
        if (notPaused){             // This variable sets to false when user clicks on pause button and will stop incrementing minutes/seconds variables.            
        if (isBreak)                  // If break is going on then display break time counters.
        {
        timeDisplay.innerHTML=`Break ${countBreakMinutes}:${sec}`;    
        }
        else                        // If break is going on then display break time counters.
        timeDisplay.innerHTML=`${countWorkMinutes}:${sec}`;
        sec--;
        if(sec < 0)                 // 60 seconds window is complete.
        {
            sec = 59;               //reset the seconds variable vlaue.
            if (isBreak) {countBreakMinutes--;} // If current 60 second window was for break then decrement its variable value.
            else { 
            countWorkMinutes--;    // Otherwise decrement countMinutes variable.
            totalTimeMinutes++;    // This variable tracks total work time spent on current task.
            }
            if (countWorkMinutes < 0)   // Is Work Time window complete?
            {
            resetCountWorkMinutes();
            resetCountBreakMinutes();
            timeDisplay.innerHTML=`Break`;    
            timeDisplay.classList.add("timeDisplayOnBreak");
            isBreak=true;
            }
            else if(countBreakMinutes <0) // Is Break over?
            {
                timeDisplay.innerHTML='00:00';
                isBreak=false;
                timeDisplay.classList.remove("timeDisplayOnBreak");
                resetCountWorkMinutes();
                resetCountBreakMinutes();
            }
        
    }
}
else {
    if (blink) { timeDisplay.innerHTML=``;}
    else { timeDisplay.innerHTML=`${countWorkMinutes}:${sec+1}`;}
    blink = !blink;
}
    }, 1000);
}

})
            
    
pauseButton.addEventListener('click', e => {
    if(!isBreak) //Do not pause timer during break time
    {
    pauseButton.classList.add("d-none");
    resumeButton.classList.remove("d-none");
    notPaused = !(notPaused);
    }
})

resumeButton.addEventListener('click', e => {
    pauseButton.classList.remove("d-none");
    resumeButton.classList.add("d-none");
    notPaused = !(notPaused);
})

stopButton.addEventListener('click', e => {
    clearInterval(timer);
    enableInputFields();
    startButton.classList.remove("d-none");     // show start button
    afterStartButtons.classList.add("d-none"); //hide pause/resume/stop buttons div   
    if (isBreak)
    {
        timeDisplay.classList.remove("timeDisplayOnBreak");
        completdTasks.insertAdjacentHTML('beforeend',`<br> ${taskCounter} - ${taskInput.value} completed in ${Math.trunc(totalTimeMinutes/60)}h, ${totalTimeMinutes%60}m & 0s`);
        taskInput.value=="";
    }
    else
    completdTasks.insertAdjacentHTML('beforeend',`<br> ${taskCounter} - ${taskInput.value} completed in  ${Math.trunc(totalTimeMinutes/60)}h, ${totalTimeMinutes%60}m & ${59-sec}s`);
    taskCounter++;    
    resetCounters();
    timeDisplay.innerHTML=`00:00`;  
    taskInput.value="";
})


taskInput.addEventListener('input', e => {
    fillInputBanner.classList.add("d-none");
})
