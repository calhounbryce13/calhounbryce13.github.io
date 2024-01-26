'use strict';
const videoSpeed = 0.5;


document.addEventListener('DOMContentLoaded', function() {
    let openingClip = document.getElementsByClassName("myVideo")[0];
    let BackgroundVideo = document.getElementById("background-video");


    BackgroundVideo.addEventListener('loadeddata', () => {
        BackgroundVideo.playbackRate = videoSpeed;
    });


    openingClip.addEventListener("ended", function() {
        this.classList.add("hide-video");

        setTimeout(() => {

            // removing the video from the DOM
            openingClip.parentNode.removeChild(openingClip);
        }, 3000);
        
        

    });
    
});