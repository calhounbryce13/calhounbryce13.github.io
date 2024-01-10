'use strict';
const videoSpeed = 0.5;

document.addEventListener('DOMContentLoaded', function() {
    let Introvideo = document.getElementsByClassName("myVideo")[0];
    let BackgroundVideo = document.getElementById("background-video");


    BackgroundVideo.addEventListener('loadeddata', function() {
        BackgroundVideo.playbackRate = videoSpeed;
    });


    Introvideo.addEventListener("ended", function(){
        this.classList.add("hide-video");

        setTimeout(function(){

            // removing the video from the DOM
            Introvideo.parentNode.removeChild(Introvideo);
        }, 3000);
        
        

    });
    
});