/*
AUTHOR: Bryce Calhoun
DESCRIPTION: Script file for my webpage
*/

'use strict';


const HUD_BORDER_THICKNESS = 2;


document.addEventListener('DOMContentLoaded', () =>{

    resize_the_screen();

    window.addEventListener('resize', resize_the_screen);

    window.addEventListener('load', fade_in_elements);

    orbital_animation();

    theme_functionality();

    typewriter_effect();

});

const lock_the_screen_in_portrait = function(){

    if(screen.orientation){
        screen.orientation.lock('portrait');
    }
    
}


const resize_the_screen = function(){

    let link = document.getElementById('stylesheet');

    if(document.documentElement.clientWidth < 900){
        link.setAttribute("href","mobile.css");
        lock_the_screen_in_portrait();
    }
    else{
        link.setAttribute("href","desktop.css");
    }
    

}

const typewriter_effect = function(){

    const mainTxt = Array.from(document.querySelectorAll('.mainTxt'));
    const libraryTxt = Array.from(document.querySelectorAll('.libraryText'));
    let textElements = [...mainTxt, ...libraryTxt];

    for(let i = 0; i < textElements.length; i++){
        secondObserver.observe(textElements[i]);
    }

}

const theme_functionality = function(){

    const themeButton = document.getElementById('five');
    themeButton.addEventListener('click', change_colors);

}

const change_colors = function(){

    const backgroundVideo = document.getElementById('background-video');
    const style = getComputedStyle(backgroundVideo);
    const researchPoster = document.getElementById('researchPoster');
    
    color_inversion(backgroundVideo, style, researchPoster);  
}

const color_inversion = function(backgroundVideo, style, researchPoster){

    if(style.filter == 'invert(1)'){
        // white-to-black
        backgroundVideo.style.filter = 'invert(0)';
        invert_dots(0);
        invert_bars(0);
        researchPoster.style.filter = 'invert(1)';
        
    }
    else{
        // black-to-white
        backgroundVideo.style.filter = 'invert(1)';
        invert_dots(1);
        invert_bars(1);
    }

}

const invert_dots = function(boolean){

    const dots = Array.from(document.getElementsByClassName('dots'));
    const numDotsToSkip = 20;
    const indexBeforeSkip = 5;

    if(boolean == 0){
        
        // these loops stop after the first 5 dots becuase the bar inversion will
        // invert the rest of the dots automatically
        let counter = 0;
        while(counter < dots.length){
            dots[counter].style.filter = 'invert(1)';

            if(counter == indexBeforeSkip){
                counter = counter + numDotsToSkip;
            }
            else{
                counter++;
            }
        }
    }
    else{
        let counter = 0;
        while(counter < dots.length){
            dots[counter].style.filter = 'invert(0)';

            if(counter == indexBeforeSkip){
                counter = counter + numDotsToSkip;
            }
            else{
                counter++;
            }
        }
    }

}

const invert_bars = function(boolean){

    const bars = document.getElementsByClassName('blackBar');
    const researchImage = document.getElementById('researchPoster');
    
    if(boolean == 0){
        for(let i = 0; i < bars.length; i++){
            bars[i].style.filter = 'invert(1)';
        } 
    }
    else{
        for(let i = 0; i < bars.length; i++){
            bars[i].style.filter = 'invert(0)';
        }
    }
    researchImage.style.filter = 'invert(0)';
}

const orbital_animation = function(){
    const allDots = Array.from(document.getElementsByClassName('dots'));
    const instagramAndgithub = allDots.slice(allDots.length - 3, allDots.length);

    const center = document.getElementById('eight');
    const centerPosition = center.getBoundingClientRect();

    const h = centerPosition.left + centerPosition.width / 2;
    const k = centerPosition.top + centerPosition.height / 2;

    const r = 200;
    const speed = 0.005;
    animate_contact_orbit(instagramAndgithub, h, k, r, speed);
    animate_the_title_orbit();
}

const animate_contact_orbit = function(arrayOfElements, h, k, r, speed){
    for(let x = 0; x < arrayOfElements.length - 1; x++){
        if(x === 0){
            animation(arrayOfElements[x], h, k, r, speed, 0);
        }
        else{
            animation(arrayOfElements[x], h, k, r, speed, Math.PI);
        }
    }

}

const animate_the_title_orbit = function(){
    const speacialDot = document.getElementById('specialOne');
    const myNameDot = document.getElementById('three');
    const nameDotPosition = myNameDot.getBoundingClientRect();
    const h = Math.round(nameDotPosition.left + nameDotPosition.width / 2);
    const k = Math.round(nameDotPosition.top + nameDotPosition.height / 2);
    const r = window.innerWidth * 0.2;
    const speed = 0.006;
    const theta = Math.PI;

    console.log("h:", h, "k:", k);

    animation(speacialDot, h, k, r, speed, theta);

}

const animation = function(element, h, k, r, speed, theta){


    const move = function(){
        const x = h + r * Math.cos(theta) - element.offsetWidth / 2;
        const y = k + r * Math.sin(theta) - element.offsetHeight / 2;

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        theta += speed;

        requestAnimationFrame(move);
    }

    move();

}

const add_visibilty_to_fading_elements = function(i, fadingElementsArray){
    if(i == fadingElementsArray.length - 1){
        setTimeout(() => {
            fadingElementsArray[i].classList.add('visible');
        }, i * 2000);
    }
    else if(i == 2){
        setTimeout(() => {
            fadingElementsArray[i].classList.add('visible');
        }, i * 750);
    }
    setTimeout(() => {
        fadingElementsArray[i].classList.add('visible');
    }, i * 1000);

}

const make_fade_elements_array = function(){

    const fadingElementsArray = [];

    const one = document.querySelector('.fade-in-element.one');
    fadingElementsArray.push(one);
    const four = document.querySelector('.fade-in-element.four');
    fadingElementsArray.push(four);
    const two = document.querySelector('.fade-in-element.two');
    fadingElementsArray.push(two);
    const five = document.querySelector('.fade-in-element.five');
    fadingElementsArray.push(five);
    const three = document.querySelector('.fade-in-element.three');
    fadingElementsArray.push(three);

    return fadingElementsArray;

}

const fade_in_elements = function(){
    const fadingElementsArray = make_fade_elements_array();
    
    for(let i = 0; i < fadingElementsArray.length; i++){

        add_visibilty_to_fading_elements(i, fadingElementsArray);

    };
};

const secondObserver = new IntersectionObserver(function(entries, observer){

    const type = function(counter, text, element, entry){
        
        if(counter < text.length){
            element.textContent += text.charAt(counter);
            element.textContent += text.charAt(counter + 1);
            
            counter += 2;
            setTimeout(function(){
                type(counter, text, element, entry)
            }, 1);

        }
    
    }


    entries.forEach(entry =>{
        if(entry.isIntersecting){
            const element = entry.target;
            const text = entry.target.textContent;
            
            element.textContent = '';
            element.style.color = 'var(--main-alt)';
            let counter = 0;
            type(counter, text, element, entry);

            observer.unobserve(element);
        }

    });

    
}, {
    threshold: 0.8
});





/*
const observer = new IntersectionObserver(function(entries, observer){
    

    entries.forEach(entry=>{
        

        if(entry.isIntersecting){
        
            const hudelement_two = document.querySelector('.hudElement.two');

            
            for(let x = 0; x < 5; x++){

                setTimeout(function(){
                    if(x % 2 === 0){
                        entry.target.style.border = `${HUD_BORDER_THICKNESS}px solid white`;
                        if(x == 4){
                            for(let y = 0; y < 5; y++){
                                setTimeout(function(){
                                    if(y % 2 === 0){
                                        hudelement_two.style.border = `${HUD_BORDER_THICKNESS}px solid white`;
                                    }
                                    else{
                                        hudelement_two.style.border = `${HUD_BORDER_THICKNESS}px solid black`;
                                    }

                                }, y * 200)
                            }
                        }

                    }
                    else{
                        entry.target.style.border = `${HUD_BORDER_THICKNESS}px solid black`;

                    }

                }, x * 200)
                
                
            }
        
        }

    })


}, {
    threshold: 0.5
});
*/