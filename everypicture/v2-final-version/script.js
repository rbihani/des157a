// --- IIFE 
'use strict'
console.log('reading js');

(function (){
    const imgs = document.querySelectorAll('.carousel-slide');
    const overlays = document.querySelectorAll('.overlay');
    const btns = document.querySelectorAll('button');
    
    //Open overlay for each image
    imgs.forEach(function(value, index) {
        console.log(value, index)

        value.addEventListener('click', function(){
            const correspondingOverlay = overlays[index];
            correspondingOverlay.classList.replace("hidden", "visible");
        });
    });

    //Return to carousel from overlay 
    btns.forEach(function(button, index){
        button.addEventListener('click', function(){
            console.log('clicking ', index, ' button');
            const correspondingOverlay = overlays[index];
            correspondingOverlay.classList.replace("visible", "hidden");
        });
    });
    

})();
