'use strict';

const videoSpeed = 0.5;

document.addEventListener('DOMContentLoaded', function() {
    const openingClip = document.getElementsByClassName("myVideo")[0];
    const BackgroundVideo = document.getElementById("background-video");
    const themeButton = document.getElementById("themeChange");
    //const contactLink = document.getElementById("staticAnchor");

    //* EVENT HANDLER FOR THEME BUTTON
    themeButton.addEventListener("click", () => {
        
        const headerBlock = document.getElementById("myHeader");
        const copyright = document.getElementById("copyright");
        const nav = document.getElementById("localNavigation");
        

        //* checking if the filter is already set to no invert
        if(BackgroundVideo.style.filter == "invert(1)" ){
            BackgroundVideo.style.filter = "invert(0)";
            headerBlock.style.backgroundColor = "rgba(255, 255, 255, 0.9)"; 
            headerBlock.style.color = "var(--main-theme)";
            themeButton.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            themeButton.style.color = "white"; 
            copyright.style.color = "white";
            nav.style.borderBottom = "3px solid white";
            //contactLink.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            //contactLink.style.color = "white";
        }
        else{
            BackgroundVideo.style.filter = "invert(1)";
            headerBlock.style.backgroundColor = "var(--main-theme)";
            headerBlock.style.color = "white";
            themeButton.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            themeButton.style.color = "var(--main-theme)";
            copyright.style.color = "black";
            nav.style.borderBottom = "3px solid var(--main-theme)";
            //contactLink.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
            //contactLink.style.color = "var(--main-theme)";
        }
        for(let x = 0; x < 8; x++){
            if(x > 3 && x < 6){
                continue;
            }
            const anchor = document.getElementsByClassName("fancy-link")[x];
            if(anchor.style.color == "var(--main-theme)"){
                anchor.style.color = "white";
            }
            else{
                anchor.style.color = "var(--main-theme)";
            }
        }
    });

    //* EVENT HANDLER FOR BACKGROUND VIDEO
    BackgroundVideo.addEventListener('loadeddata', () => {
        BackgroundVideo.playbackRate = videoSpeed;
    });

    //* EVENT HANDLER FOR OPENING CLIP
    openingClip.addEventListener("ended", function() {
        this.classList.add("hide-video");
        setTimeout(() => {
            openingClip.parentNode.removeChild(openingClip);
        }, 3000);
    });
    
});



