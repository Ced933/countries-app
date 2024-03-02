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
const countriesBox = document.querySelector('.countries-container');
// toLocaleString() = séparateur de millier
// Le tableau ou seront stocké les données
let arrayCountries = [];
const inputRange = document.querySelector('#inputRange');
const rangeValue = document.querySelector('#rangeValue');
inputRange.addEventListener('input', (e) => {
    rangeValue.innerHTML = e.target.value;
    countriesBox.innerHTML = "";
    console.log(inputRange.value);
    // à chaque fois que la valuer change tu rappel la fonction createCart 
    createCart();
});
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => arrayCountries = data);
    console.log(arrayCountries);
});
const createCart = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchData();
    console.log(arrayCountries);
    let range = inputRange.value;
    let newArr = arrayCountries.slice(0, range);
    console.log(newArr);
    countriesBox.innerHTML = "";
    return newArr
        .map((country) => {
        countriesBox.innerHTML += `
       <div class="card-container">
       <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
       <h3>${country.name.common}</h3>
       <h4>${country.capital ? country.capital : ""}</h4>
       <p>Population: ${country.population.toLocaleString()}</p>
       </div>`;
    });
});
// au chargement tu appelles la fonction createCart 
window.addEventListener('load', createCart);
// --------------
// Ordre Alphabetique  
// --------------
const alphabet = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchData();
    let range = inputRange.value;
    let newArr = arrayCountries.slice(0, range);
    countriesBox.innerHTML = "";
    newArr
        .sort((a, b) => { return a.name.common.localeCompare(b.name.common); }).map((country) => {
        countriesBox.innerHTML += `
        <div class="card-container">
            <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
             <h3>${country.name.common}</h3>
             <h4>${country.capital ? country.capital : ""}</h4>
             <p>Population: ${country.population.toLocaleString()}</p>  
        </div>
       
        `;
    });
});
const alphabetic = document.querySelector("#alpha");
alphabetic.addEventListener('click', alphabet);
// --------------
// Croissant 
// --------------
const croissant = document.querySelector("#minToMax");
const minToMax = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchData();
    let range = inputRange.value;
    let newArr = arrayCountries.slice(0, range);
    countriesBox.innerHTML = "";
    newArr
        .sort((a, b) => { return a.population - b.population; }).map((country) => {
        countriesBox.innerHTML += `
       
       <div class="card-container">
            <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
             <h3>${country.name.common}</h3>
             <h4>${country.capital ? country.capital : ""}</h4>
             <p>Population: ${country.population.toLocaleString()}</p>
              
              
             </div>
       
        `;
    });
});
croissant.addEventListener('click', minToMax);
// --------------
// Décroissant 
// --------------
const decroissant = document.querySelector("#maxToMin");
const maxToMin = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchData();
    let range = inputRange.value;
    let newArr = arrayCountries.slice(0, range);
    countriesBox.innerHTML = "";
    newArr
        .sort((a, b) => { return b.population - a.population; }).map((country) => {
        countriesBox.innerHTML += `
       
        <div class="card-container">
            <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
            <h3>${country.name.common}</h3>
            <h4>${country.capital ? country.capital : ""}</h4>
            <p>Population: ${country.population.toLocaleString()}</p>
        </div>
       
        `;
    });
});
decroissant.addEventListener('click', maxToMin);
const inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener('input', () => {
    // il faut mettre toutes les recherches et les pays recherchés en miniscule 
    let word = inputSearch.value.toLowerCase();
    let newArray = arrayCountries.filter((country) => {
        let lower = country.name.common.toLowerCase();
        return lower.includes(word);
    });
    countriesBox.innerHTML = "";
    newArray.map((country) => {
        countriesBox.innerHTML += `
       
        <div class="card-container">
            <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
            <h3>${country.name.common}</h3>
            <h4>${country.capital ? country.capital : ""}</h4>
            <p>Population: ${country.population.toLocaleString()}</p>
        </div>
         `;
    });
});
