//todo: calculate the actual hieight of all the children and set the new
//todo: height to be that value converted to 'vh' units (will be different for different devices).

'use strict';

let selectedIndex = undefined;

document.addEventListener("DOMContentLoaded", () => {
    section_expansion_functionality();
});

const section_expansion_functionality = function(){
    const sectionButtons = Array.from(document.getElementsByClassName("section-container"));
    sectionButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            if(!(selectedIndex == index)){
                if(selectedIndex != undefined){
                    const prev = Array.from(document.getElementsByClassName("section-container"))[selectedIndex];
                    prev.classList.remove("section-expanded");
                }
                selectedIndex = index;
                button.classList.add("section-expanded");
                return;
            }
            return;
        });
    });
}