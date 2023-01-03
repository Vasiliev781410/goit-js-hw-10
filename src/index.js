import './css/styles.css';
import {fetchCountries} from "./fetchCountries.js";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inp = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");

function inputResult(data){
  console.log(data);
  countryList.innerHTML = "";
  if (data.length < 2) {  
    
  };
  const markup = data.map((country) => `<li class="country__item"><img class="country__image" src=${country.flags.svg} alt="flag of "+${country.altSpellings[1]} width="30" height="30"> <span> ${country.name.common}</span></li>`).join("");
  countryList.insertAdjacentHTML("beforeend", markup);

  countryItems = countryList.children;
  for (let index = 0; index < countryItems.length; index++) {
    const countryItem = countryItems[index];
    countryItem.style.display  = "flex";
    if (data.length > 2) {  
      countryItem.style.alignItems = "center";
    }else{
      countryItem.style.fontSize = "38px";
      countryItem.style.alignItems = "baseline";
    };   
    countryItem.style.gap = "10px";
    countryItem.style.marginBottom = "10px";
  };     
};

let name = "";

function search(){ 
  name = inp.value.trim();
  console.log(name);    
  if (name === ""){
    countryList.innerHTML = "";
    return;
  }     
    fetchCountries(name)
      .then(response => {
        if (!response.ok) {      
          throw new Error(response.status);                    
        }        
        return response.json();
      })
      .then(data => {              
        if (data.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          countryList.innerHTML = "";
          return;
        };
        inputResult(data);     
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryList.innerHTML = "";
      });
};

inp.addEventListener("input",debounce(search,DEBOUNCE_DELAY));