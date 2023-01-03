const URL = "https://restcountries.com/v3.1/name/";

function fetchCountries(name){     
    return fetch(URL+name);
};

export {fetchCountries};
