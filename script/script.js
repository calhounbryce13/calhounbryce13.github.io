/*
AUTHOR: Bryce Calhoun
DESCRIPTION: Script file for my webpage
*/

'use strict';


document.addEventListener('DOMContentLoaded', () =>{

    dynamic_container_height_functionality();
    contact_form_functionality();
    dynamic_textarea_functionality();

    
});


///////////////////////////////////////////////////////////////////////////////


const toggle_modal = function(){
    const backdrop = Array.from(document.getElementsByClassName('backdrop'))[0];
    backdrop.classList.toggle('backdrop-show');

    const modal = Array.from(document.getElementsByClassName('contact-modal'))[0];
    modal.classList.toggle('modal-show');
}


const dynamic_textarea_functionality = function(){
    const textarea = Array.from(document.getElementsByTagName('textarea'))[0];
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    console.log(textarea.scrollHeight + 'px');

}

const contact_form_functionality = function(){

    const nevermindButton = document.getElementById("close-modal-button");
    const contactButton = document.getElementById("stickyContainer");
    const contactButtonText = contactButton.textContent;

    const form = document.forms["contact-me-form"];

    contactButton.addEventListener('click', () => toggle_modal());
    nevermindButton.addEventListener('click', (event) => toggle_modal());
    form.addEventListener('submit', (event) => process_user_data(event, contactButtonText));
}


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
    const collapsedHeightMobile = '5.5vh';
    const collapsedHeightDesktop = '6.5vh';
    const clickedButton = event.target;
    const parentContainer = clickedButton.parentNode.parentNode.parentNode;
    if(parentContainer.style.maxHeight == collapsedHeightMobile || parentContainer.style.maxHeight == collapsedHeightDesktop){
        let numChildren = (parentContainer.children).length;
        if(numChildren > 2){
            numChildren = numChildren - 1;
        }
        const newHeight = (get_height_of_tallest_child(parentContainer) * numChildren) / 10;
        parentContainer.style.maxHeight = newHeight + 'vh';
        clickedButton.classList.add('dynamic-container-button-expanded');
        parentContainer.style.overflowY = 'auto';
    }else{

        if(window.matchMedia("(max-width: 900px)").matches){
            parentContainer.style.maxHeight = collapsedHeightMobile;
        }
        else{
            parentContainer.style.maxHeight = collapsedHeightDesktop;
        }
        clickedButton.classList.remove('dynamic-container-button-expanded');
        parentContainer.style.overflowY = 'hidden';
    }
}

const set_initial_height = function(){
    const containers = Array.from(document.getElementsByClassName('blackBar'));
    const viewPortWidth = window.matchMedia("(max-width: 900px)");
    console.log(viewPortWidth);
    containers.forEach((singleContainer) => {
        if(viewPortWidth.matches){
            singleContainer.style.maxHeight = '5.5vh';
        }
        else{
            singleContainer.style.maxHeight = '6.5vh';
        }
    })
}

const dynamic_container_height_functionality = function(){
    set_initial_height();
    window.addEventListener('resize', set_initial_height);
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

async function process_user_data(event){
    /*
    DESCRIPTION: 
    INPUT(s): 
    OUTPUT(S): 
     */
    event.preventDefault();
    const form = event.target;
    const userName = form['userName'].value;
    const userMessage = form['userMssg'].value;
    
    let bool = false;
    if(!userName || !userMessage){
        window.alert("Please fill out the entire form!");
        return;
    }
    try{
        let promise = await fetch("https://calhounbryce13-backend.onrender.com/mailer",{
            headers:{
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({name: `${userName}`, message: `${userMessage}`}),
            method: 'POST'
            });
        let res = await promise.json();
        bool = res.success;
    }catch(error){
        console.log(error);
        window.alert("ERROR sending that request");
    }
    toggle_modal();
}