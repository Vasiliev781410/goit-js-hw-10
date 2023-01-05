import './css/styles.css';
import {fetchCountries} from "./fetchCountries.js";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inp = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

function decorCountryArrayItems(countryItems,lengthCountryArray){  
  for (let index = 0; index < countryItems.length; index++) {
    const countryItem = countryItems[index];
    countryItem.style.display  = "flex";
    if (lengthCountryArray > 2) {  
      countryItem.style.alignItems = "center";
    }else{
      countryItem.style.fontSize = "38px";
      countryItem.style.alignItems = "baseline";
    };   
    countryItem.style.gap = "10px";
    countryItem.style.marginBottom = "10px";
  }; 
}    
//aboutCountryElements
function decorCountryInfo(countryInfoList){  
  countryInfoList.style.listStyleType = "none";
  for (let index = 0; index < countryInfoList.children.length; index++) {
    const countryInfoItem = countryInfoList.children[index];
    countryInfoItem.style.fontSize = "20px";       
    countryInfoItem.style.fontWeight = "700";
    countryInfoItemValues = document.querySelectorAll(".country__infoValue");
    countryInfoItemValues.forEach(countryInfoItemValue => {
      countryInfoItemValue.style.fontWeight = "400";
    });    
  };  
};   

function createCountryElements(data){
  //console.log(data);
  let markup = data.map((country) => `<li class="country__item"><img class="country__image" src=${country.flags.svg} alt="flag of "+${country.altSpellings[1]} width="30" height="30"> <span> ${country.name.official}</span></li>`).join("");
  countryList.insertAdjacentHTML("beforeend", markup);
  decorCountryArrayItems(countryList.children,data.length);  
   
  if (data.length < 2) { 
    const country = data[0];
    let markupInfo = "";     
    const markupInfo1 = `<li class="country__infoItem"> Capital: <span class="country__infoValue"> ${country.capital[0]}</span></li>`;
    const markupInfo2 = `<li class="country__infoItem"> Population: <span class="country__infoValue"> ${country.population}</span></li>`;                                   
    const languages = Object.values(country.languages).join(", ");   
    const markupInfo3 = `<li class="country__infoItem"> Languages: <span class="country__infoValue"> ${languages}</span></li>`; 
    markupInfo = markupInfo1 + markupInfo2 + markupInfo3;
    markupInfo = `<ul class="country__infoList">`+markupInfo+`</ul>`;
    countryInfo.insertAdjacentHTML("beforeend", markupInfo);  
    //decorCountryInfo(countryInfo.firstChild);   
  };  
};

let name = "";

function search(){   
  //console.log(name);    
  if (inp.value.trim() === "" || inp.value.trim() === name){  
    return;
  }  
  name = inp.value.trim(); 
  countryList.innerHTML = "";  
  countryInfo.innerHTML = "";     
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
          return;
        };
        createCountryElements(data);     
      })
      .catch(error => {
        //console.log(name); 
        //inp.value = "";
        Notiflix.Notify.failure('Oops, there is no country with that name');        
      });
};
// слушаем
inp.addEventListener("input",debounce(search,DEBOUNCE_DELAY));