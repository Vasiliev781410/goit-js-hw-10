import './css/styles.css';
import {fetchCountries} from "./fetchCountries.js";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inp = document.querySelector("#search-box");
const btnStart = document.querySelector("#start");
const countryList = document.querySelector(".country-list");

function inputResult(data){
  console.log(data);
  countryList.innerHTML = "";
  if (data.length < 2) {  
    
  };
  const markup = data.map((country) => `<li class="country__item"><img class="country__image" src=${country.flags.png} alt="flag of "+${country.altSpellings[1]} width="30" height="30"> <span> ${country.name.common}</span></li>`).join("");
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
         

function search(){     
   
    fetchCountries(inp.value)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {              
        if (data.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          return;
        };
        inputResult(data);     
      })
      .catch(error => {
        // Error handling
      });
};

btnStart.addEventListener("click",search);