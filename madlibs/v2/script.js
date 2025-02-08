

// ------ IIFE 
(function (){
    'use strict'
    console.log('reading js')


    const letterContainer = document.querySelector('.letter');
    const madlib = document.querySelector('.main-container');
    const form = document.querySelector('form');
    const envelopeContainer = document.querySelector('.envelope-container');
    const backEnvelopeContainer = document.querySelector('.back-envelope-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.querySelector('#name');
        const food = document.querySelector('#food');
        const place = document.querySelector('#place');
        const verb = document.querySelector('#verb');
        const noun = document.querySelector('#noun');
        const adj = document.querySelector('#adj');
        const activity = document.querySelector('#activity');
        const sender = document.querySelector('#sender');

        if (name.value === '') {
            alert('Please add a name');
            name.focus();
            return;
          } else if (food.value === '') {
            alert('Please add a food');
            food.focus();
            return;
          } else if (place.value === '') {
            alert('Please add a place');
            place.focus();
            return;
          } else if (verb.value === '') {
            alert('Please add a verb');
            verb.focus();
            return;
          } else if (noun.value === '') {
            alert('Please add a noun');
            noun.focus();
            return;
          } else if (adj.value === '') {
            alert('Please add an adjective');
            adj.focus();
            return;
          } else if (activity.value === '') {
            alert('Please add an activity');
            activity.focus();
            return;
          } else if (sender.value === '') {
            alert('Please add your name');
            sender.focus();
            return;
          } else {
            const myTextIntro = `Dear ${name.value},`;
            const myTextBody = `Greetings from ${place.value}! Yesterday I went to the ${noun.value}, and it was such a fun experience! The weather here has been great, perfect for ${activity.value}. I even got to try the local ${food.value}, and let me tell you, it tastes fantastic! Tomorrow I plan to ${verb.value}, which I've heard is a ${adj.value} experience here. I hope things back at home are good!`;
            const myTextSalutation = `Love, ${sender.value}` 
            letterContainer.innerHTML = `<p>${myTextIntro}</p><p>${myTextBody}</p><p>${myTextSalutation}</p>`;
        }

        envelopeContainer.style.visibility = 'hidden';
        backEnvelopeContainer.style.visibility = 'visible';
        document.querySelector('.envelope').style.visibility = 'hidden';
        document.querySelector('.back-envelope').style.visibility = 'visible';
    }

    

    )

})();