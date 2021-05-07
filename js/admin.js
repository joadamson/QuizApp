const start_btn = document.querySelector('.start_btn button');
const quiz_name = document.querySelector('.start_btn input');
const start_box = document.querySelector('.start_btn');
const question = document.querySelector('.question');
const answer = document.querySelector('.answer');
const a = document.querySelector('.a');
const b = document.querySelector('.b');
const c = document.querySelector('.c');
const d = document.querySelector('.d');
const add_btn = document.querySelector('.add');
const finish_btn = document.querySelector('.finish');
const next_btn = document.querySelector('.next');
const card = document.querySelector('.card');
const result_box = document.querySelector('.result_box');
let quizName = '';

start_btn.addEventListener('click', e => {
    e.preventDefault();
    const  math = localStorage.setItem('math', JSON.stringify([]));
    const  geography = localStorage.setItem('geography', JSON.stringify([]));
    const  history = localStorage.setItem('history', JSON.stringify([]));
    const  it = localStorage.setItem('it', JSON.stringify([]));
    const  physco = localStorage.setItem('physco', JSON.stringify([]));
    const  english = localStorage.setItem('english', JSON.stringify([]));

    const quiz = JSON.parse(localStorage.getItem(quizName));

    if(!quiz){
        console.log(quizName);
        if(quizName == 'math' || quizName == 'it' || quizName == 'engilsh' || quizName == 'geography' || quizName == 'history' || quizName == 'physco'){
            localStorage.setItem(quizName, JSON.stringify([]));
            card.classList.add('activeCard');
        }else {
            alert("Incorrect quiz names");
            window.location.reload();
        }
    }else {
        alert("Запомните вы редактируете уже созданный quiz!");
        card.classList.add('activeCard');
    }

    start_box.style.display = "none";
});

quiz_name.addEventListener('input', e => {
    const value = e.target.value;

    quizName = value;
});

add_btn.addEventListener('click', e => {
    e.preventDefault();

    if(question.value === "" && a.value === "" && b.value === "" && c.value === "" && c.value === "") alert('Поля не должны быть пустыми');

    if(question.value !== "" && a.value !== "" && b.value !== "" && c.value !== "" && c.value !== ""){
        const quiz = JSON.parse(localStorage.getItem(quizName));

        localStorage.setItem(quizName, JSON.stringify([...quiz,{
            question: question.value,
            answer: answer.value,
                a: a.value,
                b: b.value,
                c: c.value,
                d: d.value
            }
        ]));

        question.value = "";
        answer.value = "";
        a.value = "";
        b.value = "";
        c.value = "";
        d.value = "";
    }

});

finish_btn.addEventListener('click', e => {
    e.preventDefault();

    result_box.classList.add('activeResult');
    card.classList.remove('activeCard');

    result_box.innerHTML = `
        <i style="font-size:50px; text-align: center; color: #007bff;" class="fas fa-check"></i>
        <h2 style="text-align: center;">Complete!</h2>
        <button class="finish" onclick=(gotIt())>Got it</button>
    `;
});

function gotIt(){
    window.location.reload();
}

window.addEventListener('load', () => {
    const isAuth = localStorage.getItem('isAuth');

    if(isAuth) return;

    if(!isAuth){
        window.open('auth.html', '_self');
    }
});