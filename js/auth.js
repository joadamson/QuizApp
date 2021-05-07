const username = document.querySelector('.nickname');
const password = document.querySelector('.password');
const btn = document.querySelector('.btn');

btn.addEventListener('click', e => {
    e.preventDefault();

    if(username.value === "" && password.value === "") alert("Пустые поля!");

    if(username.value !== "" && password.value !== ""){

        function user(){
            if(username.value === 'admin' && password.value === 'admin'){
                alert('Welcome!');
                window.open('admin.html', '_self');
                localStorage.setItem('isAuth', 'true');
            }else {
                alert('Wrong username, password or id');
                localStorage.setItem('isAuth', 'false');
                username.value = "";
                password.value = "";
            }
        }

        user();
    }
});

window.addEventListener('load', () => {
    const isAuth = localStorage.getItem('isAuth');

    if(!isAuth) return

    if(isAuth === 'true'){
        window.open('admin.html', '_self');
    }
});