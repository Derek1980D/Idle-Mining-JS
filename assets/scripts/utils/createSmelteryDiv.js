import { getElement } from "./getEle.js";

/**
 *
 * @param {string} name Name of the ore
 * @param {string} color Color for div styling
 */
export function createSmelteryDiv(name, color) {
  // copy the template div
  let smelteryDiv = getElement("ore-smelt-template");
  // replace any occurrences of template with parameter name
  let newinnerHTML = smelteryDiv.innerHTML.replace(/template/g, name);
    console.log(newinnerHTML);
  /// !!!!!!!!!! if game.progression isnt empty create 2 containers, one for the ore and one for the unlock ore else create 1
  //// !!!!!!!!!! remove create container from create unlock div
  // create a new ore div cointainer
  let newConatiner = document.createElement("div");
  newConatiner.setAttribute("id", name + "-smelt-div-container");
  newConatiner.setAttribute("class", "smelt-div-container-css");
  let mainDiv = getElement("smelt-play-area-contents-div");
  mainDiv.appendChild(newConatiner);
  // create a new div to contain the new html
  let newDiv = document.createElement("div");

  newDiv.setAttribute("id", name + "-smelt-div");
  newDiv.setAttribute("class", "smelt-div-css");
  newDiv.innerHTML = newinnerHTML;
  // append main div with the new ore div
  newConatiner.appendChild(newDiv);
  // new ore div elements specifc style
  newDiv.style.border = "2px solid " + color;
  
  
}
