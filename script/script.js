/*
AUTHOR: Bryce Calhoun
DESCRIPTION: Script file for my webpage
*/

'use strict';


document.addEventListener('DOMContentLoaded', () =>{

    dynamic_container_height_functionality();
    const contactButton = document.getElementById("stickyContainer");
    const contactButtonText = contactButton.textContent;
    const nevermindButton = document.getElementById("closeContactButton");
    const form = document.forms["stickyForm"];


    contactButton.addEventListener('click', (event) => toggle_form(event, contactButtonText));
    nevermindButton.addEventListener('click', (event) => toggle_form(event, contactButtonText));
    
    form.addEventListener('submit', (event) => process_user_data(event, contactButtonText));
    
});


///////////////////////////////////////////////////////////////////////////////


const get_height_of_tallest_child = function(parent){
    let maxHeight = 0;
    for(let i = 0; i < parent.children.length; i++){
        if(parent.children[i].scrollHeight > maxHeight){
            maxHeight = parent.children[i].scrollHeight;
        }
    }
    return maxHeight;
}

const toggle_container_height = function(event){
    const collapsedHeight = '5.5vh';
    const clickedButton = event.target;
    const parentContainer = clickedButton.parentNode.parentNode.parentNode;
    if(parentContainer.style.maxHeight == collapsedHeight){
        let numChildren = (parentContainer.children).length;
        if(numChildren > 2){
            numChildren = numChildren - 1;
        }
        const newHeight = (get_height_of_tallest_child(parentContainer) * numChildren) / 10;
        parentContainer.style.maxHeight = newHeight + 'vh';
        clickedButton.style.transform = 'rotate(90deg)';
        parentContainer.style.overflowY = 'auto';

    }else{
        parentContainer.style.maxHeight = collapsedHeight;
        clickedButton.style.transform = 'rotate(180deg)';
        parentContainer.style.overflowY = 'hidden';


    }

}

const dynamic_container_height_functionality = function(){
    const buttons = Array.from(document.getElementsByClassName('dynamic-container-button'));
    buttons.forEach((singleButton) => {
        singleButton.addEventListener('click', (event) => toggle_container_height(event));
    });
}


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

const toggle_form = function(event, text){
        /*
    DESCRIPTION: 
    INPUT(s): 
    OUTPUT(S): 
     */
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
        /*
    DESCRIPTION: 
    INPUT(s): 
    OUTPUT(S): 
     */
    const inputs = Array.from(document.getElementsByClassName("myInputs"));
    inputs[0].value = "";
    inputs[1].value = "";
}

const style_text = function(statusMessage){
        /*
    DESCRIPTION: 
    INPUT(s): 
    OUTPUT(S): 
     */
    statusMessage.style.fontSize = "150%";
    statusMessage.style.color = "var(--accent-color)";
    statusMessage.style.border = "none !important";
    statusMessage.style.zIndex = "2";
    statusMessage.style.position = "absolute";
    statusMessage.style.top = "10%";
    statusMessage.style.margin = "2vw";
    statusMessage.style.overflowWrap = "break-word";
    statusMessage.style.textAlign = "center";
}

const display_message = function(stickyContainer, statusMessage, text){
        /*
    DESCRIPTION: 
    INPUT(s): 
    OUTPUT(S): 
     */
    stickyContainer.appendChild(statusMessage);
    setTimeout(() =>{
        stickyContainer.removeChild(statusMessage);
        stickyContainer.classList.toggle("open");
        stickyContainer.textContent = text;
    }, 3000);

}

const create_text = function(bool){
        /*
    DESCRIPTION: 
    INPUT(s): 
    OUTPUT(S): 
     */
    const statusMessage = document.createElement("p");
    if(bool){
        statusMessage.textContent = "Your message was successfully recieved!";
    }
    else{
        statusMessage.innerHTML = "Hark! an error has occured <br> Please try again";
    }
    return statusMessage;
}

const clear_form_and_show_message = function(contactContainer, stickyContainer, bool, text){
        /*
    DESCRIPTION: 
    INPUT(s): 
    OUTPUT(S): 
     */
    contactContainer.classList.toggle("show");
    clear_form();
    const statusMessage = create_text(bool);
    style_text(statusMessage);
    display_message(stickyContainer, statusMessage, text);
}

async function process_user_data(event, text){
    /*
    DESCRIPTION: 
    INPUT(s): 
    OUTPUT(S): 
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
    clear_form_and_show_message(contactContainer, stickyContainer, bool, text);
}