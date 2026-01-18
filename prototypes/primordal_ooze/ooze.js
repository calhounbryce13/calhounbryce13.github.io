


'use strict';



document.addEventListener('DOMContentLoaded', () => {

    primordial_ooze();




});



const primordial_ooze = function(){
    const oozes = document.querySelectorAll('.ooze');
    oozes.forEach((ooze, i) => {
        const duration = 60 + Math.random() * 60;  
        const delay = -Math.random() * duration;    // staggered
        const x = 10 + Math.random() * 80;           // 10%–90%
        const size = 30 + Math.random() * 80;        // 20px–100px

        ooze.style.setProperty('--duration', `${duration}s`);
        ooze.style.setProperty('--delay', `${delay}s`);
        ooze.style.setProperty('--x', `${x}%`);
        ooze.style.setProperty('--size', `${size}px`);
    });
}