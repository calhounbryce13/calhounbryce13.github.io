'use strict';


document.addEventListener('DOMContentLoaded', function() {
    let Introvideo = document.getElementsByClassName("myVideo")[0];
    let BackgroundVideo = document.getElementById("background-video");


    BackgroundVideo.addEventListener('loadeddata', function() {
        BackgroundVideo.playbackRate = 0.5;
    });


    Introvideo.addEventListener("ended", function(){
        this.classList.add("hide-video");

    });
    
});