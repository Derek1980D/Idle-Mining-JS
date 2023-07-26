import { getElement } from "./getEle.js";

/**
 *
 * function to create a smeltery div and add it to the smeltery play area
 * 
 * @param {object} name the ore to create a smeltery for 
 * 
 */
export function createSmelteryDiv(ore) {
  // copy the template div
  let smelteryDiv = getElement("ore-smelt-template");
  // replace any occurrences of template with parameter name
  let newinnerHTML = smelteryDiv.innerHTML.replace(/template/g, ore.name);
   

  // create a new ore div cointainer
  let newConatiner = document.createElement("div");
  newConatiner.setAttribute("id", ore.name + "-smelt-div-container");
  newConatiner.setAttribute("class", "smelt-div-container-css");
  let mainDiv = getElement("smelt-play-area-contents-div");
  mainDiv.appendChild(newConatiner);
  // create a new div to contain the new html
  let newDiv = document.createElement("div");

  newDiv.setAttribute("id", ore.name + "-smelt-div");
  newDiv.setAttribute("class", "smelt-div-css");
  newDiv.innerHTML = newinnerHTML;
  // append main div with the new ore div
  newConatiner.appendChild(newDiv);
  // new ore div elements specifc style
  newDiv.style.border = "2px solid " + ore.color;
  
  
}
