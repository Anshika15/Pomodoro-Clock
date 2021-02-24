var timer = document.getElementById("timerdiv");

var sesmin = document.getElementById("sesmin");
var breakmin = document.getElementById("breakmin");

var txt = document.querySelector(".txt");

const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');

var sp = document.querySelector(".startp");
var sm = document.querySelector(".startm");
var bp = document.querySelector(".breakp");
var bm = document.querySelector(".breakm");


var stime = 0;
var btime = 0;
var sts = 0;
var stm = 0;
var  mode = null, paused = false;
var sessionId = 0, sId = null, bId = null;


function setSession() {
    if(!mode) txt.innerHTML = 'Set Time and Start';
    else txt.innerHTML = `${mode} ${sessionId}`;
}


function displayClock() {
    timer.innerHTML = (stm < 10 ? '0' : '') + stm + ':' + (sts < 10 ? '0' : '') + sts;
}

    
    
function pausefunction(){

    paused = true;
    if(mode === 'Session') {
        clearInterval(sId);
    }
    else if(mode === 'Break') {
        clearInterval(bId);
    }
    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
};


function breakCountdown() {
    if(!paused) {
        stm = btime;
        sts = 0;
    }
    else paused = false;
    mode = 'Break';
    setSession();
    displayClock();
    bId = setInterval(function() {
        if(sts === 0) {
            stm--;
            if(stm < 0) {
                stm = 0;
                sts = 0;
                clearInterval(bId);
                sessionCountdown();
            }
            else sts = 59;
        }
        else {
            sts--;
        }
        displayClock();
    }, 1000);
}


function sessionCountdown() {
    if(!paused) {    
        stm = stime;
        sts = 0;
        sessionId++;
    }
    else paused = false;
    mode = 'Session';
    setSession();
    displayClock();
    sId = setInterval(function() {
        if(sts === 0) {
            stm--;
            if(stm < 0) {
                stm = 0;
                sts = 0;
                clearInterval(sId);
                breakCountdown();
            }
            else sts = 59;
        }
        else {
            sts--;
        }
        displayClock();
    }, 1000);
}


startButton.addEventListener("click", startfunction);

function startfunction(){   


    startButton.style.display = "none";
    pauseButton.style.display = "inline-block";

    sp.disabled = true;
    bp.disabled = true;
    sm.disabled = true;
    bm.disabled = true;

    if(paused && mode === 'Break') breakCountdown();
    else sessionCountdown();
    
};

function resetfunction(){
    pauseButton.style.display = "none";
    startButton.style.display = "inline-block";
    sp.disabled = false;
    bp.disabled = false;
    sm.disabled = false;
    bm.disabled = false;
    stime = 8;
    btime = 5;
    sts = 0;
    stm = 0;
    mode = null;
    paused = false;
    sessionId = 0;
    if(sId) clearInterval(sId);
    if(bId) clearInterval(bId);
    setSession();
    displayClock();
    sesmin.innerHTML = `${stime} min`;
    breakmin.innerHTML = `${btime} min`;
}

sp.addEventListener('click', function(){

    if(stime < 59)
    {
        stime += 1;
    }
        sesmin.innerHTML = `${stime} min`;

    });

    sm.addEventListener('click', function(){

    if(stime > 0)
    {
        stime -= 1;
    }
        sesmin.innerHTML = `${stime} min`;

    });

    bp.addEventListener('click', function(){
         
    if(btime < 59)
    {
        btime += 1;
    }
        breakmin.innerHTML = `${btime} min`;

    });

    bm.addEventListener('click', function(){

    if(btime > 0)
    {
        btime -= 1;
    }
        breakmin.innerHTML = `${btime} min`;

    });


 pauseButton.addEventListener("click", pausefunction);
 resetButton.addEventListener("click", resetfunction);

 resetfunction();

