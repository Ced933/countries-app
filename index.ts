// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

let arrayCountries:any = []

const inputRange:any = document.querySelector('#inputRange');
console.log(inputRange.value)
const rangeValue:any = document.querySelector('#rangeValue');

let counterCountry:any; 

inputRange.addEventListener('input',(e:any)=>{
    rangeValue.innerHTML = e.target.value;
    countriesBox.innerHTML ="";
   
     
})

const fetchData = async ()=>{
    await fetch('https://restcountries.com/v3.1/all')
    .then( (res) => res.json())
    .then( (data) => arrayCountries = data)
    console.log(arrayCountries)
}

// const createCart = async()=>{
//    await fetchData();
//     return arrayCountries
//        .map((country:any)=>{
//        countriesBox.innerHTML += `
//        <div class="card-container">
//        <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
//        <h3>${country.name.common}</h3>
//        <h4>${country.capital}</h4>
//        <p>Population: ${country.population}</p>
       
       
//        </div>`
//    })
   
// }
// createCart();

const sortCartAZ = async()=>{
    await fetchData();
    countriesBox.innerHTML ="";
     arrayCountries
        .map((country:any)=>{
            

       countriesBox.innerHTML += `
        <div class="card-container">
        <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
        <h3>${country.name.common}</h3>
        <h4>${country.capital}</h4>
        <p>Population: ${country.population}</p>
        </div>`
    }).sort((a:any,b:any)=> {return  b.name.common -a.name.common  })
    
 }
 const croissant:any = document.querySelector("#minToMax");

 croissant.addEventListener('click', sortCartAZ)










const countriesBox:any = document.querySelector('.countries-container')



const inputSearch:any = document.querySelector("#inputSearch");

inputSearch.addEventListener('input', ()=>{
    console.log(inputSearch.value)

})