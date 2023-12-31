import { getElement } from "./getEle.js";

/**
 * function to create an ore div and add it to the ore play area
 * 
 * @param {string} name Name of the ore
 * @param {string} color Color for div styling
 */
export function createOreDiv(name, color) {
  // copy the template div
  let oreDiv = getElement("ore-template");
  // replace any occurrences of template with parameter name
  let newinnerHTML = oreDiv.innerHTML.replace(/template/g, name);

  /// !!!!!!!!!! if game.progression isnt empty create 2 containers, one for the ore and one for the unlock ore else create 1
  //// !!!!!!!!!! remove create container from create unlock div
  // create a new ore div cointainer
  let newConatiner = document.createElement("div");
  newConatiner.setAttribute("id", name + "-div-container");
  newConatiner.setAttribute("class", "ore-div-container-css");
  let mainDiv = getElement("ore-play-area-contents-div");
  mainDiv.appendChild(newConatiner);
  // create a new div to contain the new html
  let newDiv = document.createElement("div");
  
  newDiv.setAttribute("id", name + "-div");
  newDiv.setAttribute("class", "ore-div-css");
  newDiv.innerHTML = newinnerHTML;
  // append main div with the new ore div
  newConatiner.appendChild(newDiv);
  // new ore div elements specifc style
  newDiv.style.border = "2px solid " + color;
  let minerDiv = getElement(name + "-miner-div");
  minerDiv.style.border = "1px solid " + color;
  let sellDiv = getElement("sell-" + name + "-div");
  sellDiv.style.border = "1px solid " + color;
  sellDiv.style.borderBottomLeftRadius = "15px";
  sellDiv.style.borderBottomRightRadius = "15px";
  sellDiv.style.marginTop = "3px";

}
