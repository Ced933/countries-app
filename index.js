"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let arrayCountries = [];
const containerCard = document.querySelector(".countries-container");
const inputSearch = document.querySelector("#inputSearch");
const inputRange = document.querySelector("#inputRange");
const spanRangeValue = document.querySelector("#rangeValue");
let order = "";
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch('https://restcountries.com/v3.1/all').then((res) => res.json()).then(data => arrayCountries = data);
        console.log(arrayCountries);
    });
}
const buttons = document.querySelectorAll('.btnSort');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        // chaque id correspond a un type de rangement qu'on a établi dans le sort 
        order = e.target.id;
        console.log(order);
        //    il faut rejouer la fonction car il n'est pas au courant que la variable order qui etait de base vide a changer 
        displayCard();
    });
});
function displayCard() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchData();
        spanRangeValue.textContent = inputRange.value;
        containerCard.innerHTML = arrayCountries
            .slice(0, inputRange.value)
            .sort((a, b) => {
            // order = 'maxToMin';
            if (order === 'minToMax') {
                return a.population - b.population;
            }
            else if (order === 'maxToMin') {
                return b.population - a.population;
            }
            else if (order === 'alpha') {
                return a.name.common.localeCompare(b.name.common);
            }
        })
            .filter((country) => country.name.common.toLowerCase().includes(inputSearch.value.toLowerCase()))
            .map((country) => {
            return `
        <div class="card-container">
        <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
        <h3>${country.name.common}</h3>
        <h4>${country.capital ? country.capital : ""}</h4>
        <p>Population: ${country.population.toLocaleString()}</p>
        </div>
`;
        }).join("");
    });
}
// a chaque fois qu'on change la value de range la fonction se rejoue 
inputRange.addEventListener('input', displayCard);
// a chaque fois qu'on tapera dans l'input displayCard sera rejouer 
inputSearch.addEventListener('input', displayCard);
window.addEventListener('load', displayCard);
