const login_btn = document.querySelector('.btn');
const nickname = document.querySelector('.nickname');

login_btn.addEventListener('click', e => {
    e.preventDefault();

    if(nickname.value !== ''){
        localStorage.setItem('user', JSON.stringify(nickname.value));

        window.open('index.html', '_self');
        localStorage.setItem('isReg', 'true');
    }else {
        alert('Пустые поля!');
    }
});

window.addEventListener('load', () => {
    const isReg = localStorage.getItem('isReg');

    if(!isReg) return;

    if(isReg === 'true'){
        window.open('index.html', '_self');
    }
});