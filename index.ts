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
    console.log(inputRange.value)

   createCart();
     
})

const fetchData = async ()=>{
    await fetch('https://restcountries.com/v3.1/all')
    .then( (res) => res.json())
    .then( (data) => arrayCountries = data)
    console.log(arrayCountries)
}

const createCart = async()=>{
   await fetchData();
   console.log(arrayCountries);
   let range:number = inputRange.value;
  let newArr = arrayCountries.slice(-range);

   console.log(newArr);
   countriesBox.innerHTML ="";

    return newArr
       .map((country:any)=>{
       countriesBox.innerHTML += `
       <div class="card-container">
       <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
       <h3>${country.name.common}</h3>
       <h4>${country.capital ? country.capital : ""}</h4>
       <p>Population: ${country.population.toLocaleString()}</p>
       
       </div>`
   })
   
}
createCart();

const alphabet = async()=>{
    await fetchData();
    countriesBox.innerHTML ="";
     arrayCountries
     .sort((a:any,b:any)=> {return a.name.common.localeCompare(b.name.common)}).map((country:any)=>{
            

       countriesBox.innerHTML += `
       
       <div class="card-container">
            <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
             <h3>${country.name.common}</h3>
             <h4>${country.capital ? country.capital : ""}</h4>
             <p>Population: ${country.population.toLocaleString()}</p>
              
              
             </div>
       
        `
    })
    
 }

 const alphabetic:any = document.querySelector("#alpha");

 alphabetic.addEventListener('click', alphabet)




const croissant:any = document.querySelector("#minToMax");
const minToMax = async()=>{
    await fetchData();
    countriesBox.innerHTML ="";
     arrayCountries
     .sort((a:any,b:any)=> {return a.population - b.population}).map((country:any)=>{
            

       countriesBox.innerHTML += `
       
       <div class="card-container">
            <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
             <h3>${country.name.common}</h3>
             <h4>${country.capital ? country.capital : ""}</h4>
             <p>Population: ${country.population.toLocaleString()}</p>
              
              
             </div>
       
        `
    })
    
 }
 croissant.addEventListener('click', minToMax)

const decroissant:any = document.querySelector("#maxToMin");
const maxToMin = async()=>{
    await fetchData();
    countriesBox.innerHTML ="";
     arrayCountries
     .sort((a:any,b:any)=> {return  b.population - a.population}).map((country:any)=>{
            

       countriesBox.innerHTML += `
       
       <div class="card-container">
            <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
             <h3>${country.name.common}</h3>
             <h4>${country.capital ? country.capital : "" }</h4>
             <p>Population: ${country.population.toLocaleString()}</p>
              
              
             </div>
       
        `
    })
    
 }
 decroissant.addEventListener('click', maxToMin)
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








const countriesBox:any = document.querySelector('.countries-container')

const inputSearch:any = document.querySelector("#inputSearch");

inputSearch.addEventListener('input', ()=>{
   
    let word = inputSearch.value.toLowerCase();
    console.log(word);
    
    let newArray:any = arrayCountries.filter((country:any ) =>{
    let lower:string = country.name.common.toLowerCase();
    return lower.includes(word)
    })

    countriesBox.innerHTML= "";

    newArray.map( (country:any) =>{

        countriesBox.innerHTML += `
       
        <div class="card-container">
             <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
              <h3>${country.name.common}</h3>
              <h4>${country.capital ? country.capital : "" }</h4>
              <p>Population: ${country.population.toLocaleString()}</p>
               
               
              </div>
        
         `
    })
   

})