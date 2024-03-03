
let arrayCountries:any = [];
const containerCard:any = document.querySelector(".countries-container")
const inputSearch:any = document.querySelector("#inputSearch");
const inputRange:any = document.querySelector("#inputRange");
const spanRangeValue:any = document.querySelector("#rangeValue");
let order:any = "";

async function fetchData (){
    await fetch('https://restcountries.com/v3.1/all').then((res)=>res.json()).then(data => arrayCountries = data)
    console.log(arrayCountries)
}
 
const buttons:any = document.querySelectorAll('.btnSort');

buttons.forEach((button:any) =>{
    button.addEventListener('click', (e:any)=> {
        // chaque id correspond a un type de rangement qu'on a établi dans le sort 
        order = e.target.id;
       console.log(order);
    //    il faut rejouer la fonction car il n'est pas au courant que la variable order qui etait de base vide a changer 
       displayCard();
    })
})

async function displayCard (){
    await fetchData();

    spanRangeValue.textContent = inputRange.value;
   
    containerCard.innerHTML = arrayCountries
    .slice(0, inputRange.value)
    .sort((a:any, b:any) =>{
        
        // order = 'maxToMin';
        if(order === 'minToMax'){
           return a.population - b.population
        }else if(order === 'maxToMin'){
            return  b.population - a.population
        }else if(order === 'alpha'){
            return   a.name.common.localeCompare(b.name.common)
        }
    })
    .filter((country:any)=>  country.name.common.toLowerCase().includes(inputSearch.value.toLowerCase()))
    .map((country:any) =>{
 return `
        <div class="card-container">
        <img class="flag" src=${country.flags.svg} alt=${country.flags.alt} />
        <h3>${country.name.common}</h3>
        <h4>${country.capital ? country.capital : "" }</h4>
        <p>Population: ${country.population.toLocaleString()}</p>
        </div>
`
    }).join("")
}

// a chaque fois qu'on change la value de range la fonction se rejoue 
inputRange.addEventListener('input', displayCard)
// a chaque fois qu'on tapera dans l'input displayCard sera rejouer 
inputSearch.addEventListener('input',displayCard)
window.addEventListener('load', displayCard)

