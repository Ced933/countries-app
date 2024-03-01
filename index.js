"use strict";
// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
// 3 - Passer les données à une variable
// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP
// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);
// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
let arrayCountries = [];
const inputRange = document.querySelector('#inputRange');
console.log(inputRange.value);
const rangeValue = document.querySelector('#rangeValue');
let counterCountry;
inputRange.addEventListener('input', (e) => {
    rangeValue.innerHTML = e.target.value;
    countriesBox.innerHTML = "";
    console.log(inputRange.value);
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
    let newArr = arrayCountries.slice(-range);
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
createCart();
const alphabet = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchData();
    countriesBox.innerHTML = "";
    arrayCountries
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
const croissant = document.querySelector("#minToMax");
const minToMax = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchData();
    countriesBox.innerHTML = "";
    arrayCountries
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
const decroissant = document.querySelector("#maxToMin");
const maxToMin = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchData();
    countriesBox.innerHTML = "";
    arrayCountries
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
//  let arrayC = ['SOMALIA','KENYA','JERSEY','CHAD','DOMINICA','BENIN','AUSTRALIA']
//  arrayC.sort((a:any,b:any) =>(b-a));
//  console.log(arrayC);
// var people = [
//     { name: "Charlie", age: 28 },
//     { name: "Alice", age: 25 },
//     { name: "Bob", age: 30 },
//   ];
// people.sort(function(a:any,b:any) {return a.name.localeCompare(b.name)})
// console.log(people);
//  croissant.addEventListener('click', alphabet)
const countriesBox = document.querySelector('.countries-container');
const inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener('input', () => {
    let word = inputSearch.value.toLowerCase();
    console.log(word);
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
