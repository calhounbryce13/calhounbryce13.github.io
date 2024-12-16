'use strict';

const videoSpeed = 0.5;

document.addEventListener('DOMContentLoaded', function() {
    const BackgroundVideo = document.getElementById("background-video");

    //* EVENT HANDLER FOR BACKGROUND VIDEO
    BackgroundVideo.addEventListener('loadeddata', () => {
        BackgroundVideo.playbackRate = videoSpeed;
    });

    
    
});



