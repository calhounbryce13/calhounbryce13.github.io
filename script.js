/*
AUTHOR: Bryce Calhoun
DESCRIPTION: Script file for my webpage
*/

'use strict';

document.addEventListener('DOMContentLoaded', () =>{
    const contactButton = document.getElementById("stickyContainer");
    const contactButtonText = contactButton.textContent;
    const nevermindButton = document.getElementById("closeContactButton");
    const form = document.forms["stickyForm"];


    resize_the_screen();

    contactButton.addEventListener('click', (event) => toggle_form(event, contactButtonText));
    nevermindButton.addEventListener('click', (event) => toggle_form(event, contactButtonText));
    
    form.addEventListener('submit', (event) => process_user_data(event, contactButtonText));
    
    window.addEventListener('resize', resize_the_screen);
});


///////////////////////////////////////////////////////////////////////////////

const lock_the_screen_in_portrait = function(){
    /*
    DESCRIPTION:
    INPUT(s):
    OUTPUT(S):
     */
    if(screen.orientation){
        screen.orientation.lock('portrait');
    }
}

const resize_the_screen = function(){
    /*
    DESCRIPTION: Function checks the viewport width to assign the
                appropriate stylesheet
    INPUT(s): None
    OUTPUT(S): None
     */
    let link = document.getElementById('stylesheet');
    if(document.documentElement.clientWidth < 900){
        link.setAttribute("href","mobile.css");
        lock_the_screen_in_portrait();
    }
    else{
        link.setAttribute("href","desktop.css");
    }
}

const toggle_form = function(event, text){
    event.preventDefault();
    const stickyContainer = document.getElementById("stickyContainer");
    const contactContainer = document.getElementById("contactContainer");
    if(stickyContainer.textContent == text){
        stickyContainer.textContent = "";
    }
    else{
        stickyContainer.textContent = text;
    }
    stickyContainer.classList.toggle("open");
    contactContainer.classList.toggle("show");
}


const close_form_onsubmit = function(bool){
    /*
    DESCRIPTION: Function closes the contact form
    INPUT(s): click event, original 'contact me' text
    OUTPUT(S): None
     */

    const contactContainer = document.getElementById("contactContainer");
    contactContainer.removeChild(contactContainer.firstChild);
    contactContainer.removeChild(contactContainer.firstChild);

    const responseText = document.createElement('p');
    responseText.style.color = "var(--signal-orange)";
    responseText.style.fontSize = "1.5vw";
    responseText.textContent = "Some text here please, and thank you!";

    contactContainer.appendChild(responseText);
    setTimeout(() =>{
        contactContainer.removeChild(responseText);
    }, 800)

}

const clear_form = function(){
    const inputs = Array.from(document.getElementsByClassName("myInputs"));
    inputs[0].value = "";
    inputs[1].value = "";
}

async function process_user_data(event, text){
    /*
    DESCRIPTION: Function to extract data and send an http request to the
                backend server at the 'mailer' endpoint.
    INPUT(s): click event
    OUTPUT(S): None
     */
    event.preventDefault();
    const form = event.target;
    const userName = form['userName'].value;
    const userMessage = form['userMssg'].value;
    const contactContainer = document.getElementById("contactContainer");
    const stickyContainer = document.getElementById("stickyContainer")
    
    let bool = false;
    if(!userName || !userMessage){
        window.alert("Please fill out the entire form!");
        return;
    }
    try{
        let promise = await fetch("https://stormy-falls-77234-de122eb1ad50.herokuapp.com/mailer",{
            headers:{
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({name: `${userName}`, message: `${userMessage}`}),
            method: 'POST'
            });
        let res = await promise.json();
        bool = res.success;
    }catch(error){
        console.log(error, "ERROR PROCESSING USER DATA");
    }
    contactContainer.classList.toggle("show");
    clear_form();
    const statusMessage = document.createElement("p");
    if(bool){
        statusMessage.textContent = "Your message was successfully recieved!";
    }
    else{
        statusMessage.innerHTML = "Hark! an error has occured <br> Please try again";
    }
    statusMessage.style.fontSize = "150%";
    statusMessage.style.color = "var(--signal-orange)";
    statusMessage.style.border = "none !important";
    statusMessage.style.zIndex = "2";
    statusMessage.style.position = "absolute";
    statusMessage.style.top = "10%";
    statusMessage.style.margin = "2vw";
    statusMessage.style.overflowWrap = "break-word";
    statusMessage.style.textAlign = "center";
    
    stickyContainer.appendChild(statusMessage);
    setTimeout(() =>{
        stickyContainer.removeChild(statusMessage);
        stickyContainer.classList.toggle("open");
        stickyContainer.textContent = text;
    }, 3000);

}