
(function (){
    'use strict'
    console.log('running js');
    const img = document.querySelector('img');
    const p = document.querySelector('p');

    img.addEventListener('click', function (event) {
        console.log(img.classList.replace('blur', 'resize'))
        p.style.display = 'flex';
    })
})();
