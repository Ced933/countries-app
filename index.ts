const countriesBox:any = document.querySelector('.countries-container')
// toLocaleString() = séparateur de millier

// Le tableau ou seront stocké les données
let arrayCountries:any = [];
const inputRange:any = document.querySelector('#inputRange');
const rangeValue:any = document.querySelector('#rangeValue');

inputRange.addEventListener('input',(e:any)=>{
    rangeValue.innerHTML = e.target.value;
    countriesBox.innerHTML ="";
    console.log(inputRange.value)
    // à chaque fois que la valuer change tu rappel la fonction createCart 
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
  let newArr = arrayCountries.slice(0, range);

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
// au chargement tu appelles la fonction createCart 
window.addEventListener('load',createCart)

// --------------
// Ordre Alphabetique  
// --------------
const alphabet = async()=>{
    await fetchData();
    let range:number = inputRange.value;
    let newArr = arrayCountries.slice(0, range);
    
    countriesBox.innerHTML ="";
    newArr
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

// --------------
// Croissant 
// --------------
const croissant:any = document.querySelector("#minToMax");
const minToMax = async()=>{
    await fetchData();

    let range:number = inputRange.value;
    let newArr = arrayCountries.slice(0, range);

    countriesBox.innerHTML ="";
     newArr
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
// --------------
// Décroissant 
// --------------
const decroissant:any = document.querySelector("#maxToMin");
const maxToMin = async()=>{
    await fetchData();
    let range:number = inputRange.value;
    let newArr = arrayCountries.slice(0, range);
    countriesBox.innerHTML ="";
    newArr
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





const inputSearch:any = document.querySelector("#inputSearch");


inputSearch.addEventListener('input', ()=>{
   
    // il faut mettre toutes les recherches et les pays recherchés en miniscule 
    let word = inputSearch.value.toLowerCase();
    
    
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