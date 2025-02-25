// --- IIFE 
'use strict'
console.log('reading js');

(function (){
    //copied code from ImageLeft from Canvas
    const sliderContent = document.querySelector('.a');

    // How wide is the original set of images?
    const sliderWidth = sliderContent.offsetWidth;

    // clone the set of images and assign them the class name of '.b'
    const cloned = sliderContent.cloneNode(true);
    cloned.className = "b";

    // add the clone to the DOM
    document.querySelector('.carousel-slide').appendChild(cloned);

    //get the :root element
    let root = document.querySelector(':root');

    // set the end of the left position based on the width of the slider
    const endLeftPos = `-${sliderWidth}px`;    
    root.style.setProperty('--sliderwidth', endLeftPos);

    //Add the animate class to start animating the slider
    document.querySelector('.carousel-slide').classList.add("animate");

    const imgs = document.querySelectorAll('.thumbnail');

    console.log(imgs)
    const overlays = document.querySelectorAll('.overlay');
    const btns = document.querySelectorAll('button');
    
    //Open overlay for each image
    imgs.forEach(function(value, index) {
        value.addEventListener('click', function(){
            const correspondingOverlay = overlays[index % 6];
            correspondingOverlay.classList.replace("hidden", "visible");

            document.querySelector('.animate').style.animationPlayState = 'paused';
        });
    });

    //Return to carousel from overlay 
    btns.forEach(function(button, index){
        button.addEventListener('click', function(){
            const correspondingOverlay = overlays[index];
            correspondingOverlay.classList.replace("visible", "hidden");

            document.querySelector('.animate').style.animationPlayState = 'running';
        });
    });


    

})();
