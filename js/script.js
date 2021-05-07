const start_btn = document.querySelector('.start_btn');
const info_box = document.querySelector('.info_box');
const exit_btn = document.querySelector('.info_box .buttons .quit');
const continue_btn = document.querySelector('.info_box .buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const next_btn = document.querySelector('.next_btn');
const option_list = document.querySelector('.option_list');

const result_box = document.querySelector('.result_box');
const restart_btn = document.querySelector('.result_box .buttons .restart');
const quit_btn = document.querySelector('.result_box .buttons .quit');

let current_que = 0;
let user_score = 0;

let tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

let math;
let geography;
let history;
let it;
let physco;
let english;

let qValue;

window.addEventListener('load', () => {
    math = JSON.parse(localStorage.getItem('math'));
    geography = JSON.parse(localStorage.getItem('geography'));
    history = JSON.parse(localStorage.getItem('history'));
    it = JSON.parse(localStorage.getItem('it'));
    physco = JSON.parse(localStorage.getItem('physco'));
    english = JSON.parse(localStorage.getItem('english'));

    if(!math || !geography || !history || !it || !physco || !english){
        alert("Admin hasn't compiled yet quiz! You can pass other quizzes");
    }else if(!math && !geography && !history && !it && !physco && !english){
        alert("Admin hasn't compiled yet quiz!");
    }else {
        return;
    }
});

start_btn.addEventListener('click', e => {
    e.preventDefault();

    info_box.classList.add('activeInfo');
    const info_list = info_box.querySelector('.info_list');
    let info_tag = `
    <input type="submit" class="finish" onclick=(selectQuiz(this)) value="math">
    <input type="submit" class="finish" onclick=(selectQuiz(this)) value="it">
    <input type="submit" class="finish" onclick=(selectQuiz(this)) value="history">
    <input type="submit" class="finish" onclick=(selectQuiz(this)) value="english">
    <input type="submit" class="finish" onclick=(selectQuiz(this)) value="physco">
    <input type="submit" class="finish" onclick=(selectQuiz(this)) value="geography">
    `;

    info_list.innerHTML = info_tag;
});

function selectQuiz(el){
    qValue = el.value;

    const info_list = info_box.querySelector('.info_list');

    for(let i = 0; i < info_list.children.length; i++){
        info_list.children[i].classList.add('disabled');
    };

    if(qValue === 'math'){
        if(math === []){
            alert("Admin hasn't compiled yet quiz!");
        }else {
            quiz_box.classList.add('activeQuiz');
            quizLoad(math);
        }
    }else if(qValue === 'it'){
        if(it === []){
            alert("Admin hasn't compiled yet quiz!");
        }else {
            quiz_box.classList.add('activeQuiz');
            quizLoad(it);
        }
    }else if(qValue === 'geography'){
        if(geography === []){
            alert("Admin hasn't compiled yet quiz!");
        }else {
            quiz_box.classList.add('activeQuiz');
            quizLoad(geography);
        }
    }else if(qValue === 'physco'){
        if(physco === []){
            alert("Admin hasn't compiled yet quiz!");
        }else {
            quiz_box.classList.add('activeQuiz');
            quizLoad(physco);
        }
    }else if(qValue === 'history'){
        if(history === []){
            alert("Admin hasn't compiled yet quiz!");
        }else {
            quiz_box.classList.add('activeQuiz');
            quizLoad(history);
        }
    }else if(qValue === 'english'){
        if(english === []){
            alert("Admin hasn't compiled yet quiz!");
        }else {
            quiz_box.classList.add('activeQuiz');
            quizLoad(english);
        }
    }
};

exit_btn.addEventListener('click', e => {
    e.preventDefault();

    info_box.classList.remove('activeInfo');
});

// continue_btn.addEventListener('click', e => {
//     e.preventDefault();

//     quiz_box.classList.add('activeQuiz');
//     quizLoad();
// });

next_btn.addEventListener('click', e => {
    e.preventDefault();
    let arr;

    if(qValue == 'math'){
        arr = math;
    }else if (qValue == 'it'){
        arr = it; 
    }else if (qValue == 'english'){
        arr = english; 
    }else if (qValue == 'geography'){
        arr = geography; 
    }else if (qValue == 'history'){
        arr = history; 
    }else if (qValue == 'physco'){
        arr = physco; 
    }

    if(current_que < arr.length -1){
        current_que++;
        quizLoad(arr);
        next_btn.style.display = "none";
    }else {
        showResultBlock(arr);
    }
});

const quizLoad = () => {
    let currentQD;

    if(qValue == 'math'){
        currentQD = math[current_que];
    }else if (qValue == 'it'){
        currentQD = it[current_que]; 
    }else if (qValue == 'english'){
        currentQD = english[current_que]; 
    }else if (qValue == 'geography'){
        currentQD = geography[current_que]; 
    }else if (qValue == 'history'){
        currentQD = history[current_que]; 
    }else if (qValue == 'physco'){
        currentQD = physco[current_que]; 
    }

    const que_text = document.querySelector('.que_text');
    let option_tag = `<div class="option" id="a" data-checked="false"> ${currentQD.a} <span></span></div>
                      <div class="option" id="b" data-checked="false"> ${currentQD.b} <span></span></div>
                      <div class="option" id="c" data-checked="false"> ${currentQD.c} <span></span></div>
                      <div class="option" id="d" data-checked="false"> ${currentQD.d} <span></span></div>`;
    
    que_text.innerHTML = currentQD.question;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'getSelected(this)');
    };
};



const getSelected = (answer) => {
    let arr;

    if(qValue == 'math'){
        arr = math;
    }else if (qValue == 'it'){
        arr = it; 
    }else if (qValue == 'english'){
        arr = english; 
    }else if (qValue == 'geography'){
        arr = geography; 
    }else if (qValue == 'history'){
        arr = history; 
    }else if (qValue == 'physco'){
        arr = physco; 
    }

    answer.dataset.checked = true;
    let user_answer = null;

    for(let i = 0; i < option_list.children.length; i++){
        if(answer.dataset.checked){
            user_answer = answer.id;
        }
    };

    if(user_answer == arr[current_que].answer){
        user_score++;
        answer.classList.add('correct');
        answer.insertAdjacentHTML("beforeend", tickicon);
    }else {
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML("beforeend", crossicon);

        for(let i = 0; i < option_list.children.length; i++){
            if(option_list.children[i].id === arr[current_que].answer){
                option_list.children[i].setAttribute('class', 'option correct');
                option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
            }
        }
    }

    for(let i = 0; i < option_list.children.length; i++){
        option_list.children[i].classList.add('disabled');
    };

    next_btn.style.display = 'block';
};

function showResultBlock(){

    let arr;

    if(qValue == 'math'){
        arr = math;
    }else if (qValue == 'it'){
        arr = it; 
    }else if (qValue == 'english'){
        arr = english; 
    }else if (qValue == 'geography'){
        arr = geography; 
    }else if (qValue == 'history'){
        arr = history; 
    }else if (qValue == 'physco'){
        arr = physco; 
    }

    info_box.classList.remove('activeInfo');
    quiz_box.classList.remove('activeQuiz');
    result_box.classList.add('activeResult');
    const score_Text = document.querySelector('.score_text');
    const user = JSON.parse(localStorage.getItem('user'));
    const complete_Text = result_box.querySelector('.complete_text');

    if(user_score > 0){
        let completeTag = `${user} you've completed the quiz!`;
        let userTag = `<span>congrats, you got <p> ${user_score} </p> out of <p> ${arr.length} </p></span>`;
        score_Text.innerHTML = userTag;
        complete_Text.innerHTML = completeTag;
    }else{
        let completeTag = `${user}  you've completed the quiz!`;
        let userTag = `<span>Sorry, you got only <p> ${user_score} </p> out of <p> ${arr.length} </p></span>`;
        score_Text.innerHTML = userTag;
        complete_Text.innerHTML = completeTag;
    }

    restart_btn.addEventListener('click', e => {
        e.preventDefault();

        window.location.reload();
    });

    quit_btn.addEventListener('click', e => {
        e.preventDefault();

        localStorage.setItem('isReg', 'false');

        window.open('reg.html', '_self');
    })
}

window.addEventListener('load', () => {
    const isReg = localStorage.getItem('isReg');
    
    if(isReg) return;

    if(!isReg){
        window.open('reg.html', '_self');
    }
});