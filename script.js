/*
AUTHOR: Bryce Calhoun
DESCRIPTION: Script file for my webpage
            
*/

'use strict';

document.addEventListener('DOMContentLoaded', () =>{
    resize_the_screen();

    const form = document.forms["stickyForm"];
    form.addEventListener('submit', (event) => process_user_data(event));
    window.addEventListener('resize', resize_the_screen);
});


///////////////////////////////////////////////////////////////////////////////

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

async function process_user_data(event){
    event.preventDefault();
    
    const form = event.target;

    try{
        const userName = form['userName'].value;
        const userMessage = form['userMssg'].value;
        if(!userName || !userMessage){
            window.alert("Please fill out the entire form!");
            return;
        }
    }catch(error){
        console.log("ERROR VALIDATING USER DATA")
    }
    
    try{
        let promise = await fetch("https://stormy-falls-77234-de122eb1ad50.herokuapp.com/testing",{
            headers:{
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({name: `${userName}`, message: `${userMessage}`}),
            method: 'POST'
            });
        let res = await promise.json();
        console.log(res);

    }catch(error){
        console.log("ERROR PROCESSING USER DATA");
    }


}