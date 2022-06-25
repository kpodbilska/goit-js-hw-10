
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

const searchCountry = e => {
  const search = searchBox.value.trim();

  fetchCountries(search)
    .then(data => {
      countriesData(data);
    })
    .catch(error => {
      if (search !== '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });

  e.preventDefault();
};

function countriesData(data) {
  if (data.length > 10) {
    clearData(list);
    clearData(info);

    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    clearData(list);
    clearData(info);

    return (list.innerHTML = data
      .map(
        item => `
                <li class = 'countries'>
                <img class="flagList" src = '${item.flags.svg}' />
                <p class='countryName'>${item.name}</p>
                </li>
                `
      )
      .join(''));
  } else {
    clearData(list);
    clearData(info);

    return (info.innerHTML = data
      .map(
        item => `
                <div class = 'country'>
                    <div class='countryBase'>
                    <img class='flag' src = '${item.flags.svg}' />
                    <h3>${item.name}</h3>
                    </div>
                    <div class = 'country-body'>
                        <p class='region'>Region: ${item.region}</p>
                        <p class='capital'>Capital: ${item.capital}</p>
                        <p class='population'>Population: ${item.population.toLocaleString()}</p>
                        <p class='languages'>Languages: ${item.languages[0].name}</p>
                    </div>
                </div>
                
                `
      )
      .join(''));
  }
}

searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function clearData(output) {
  output.innerHTML = '';
}

searchBox.insertAdjacentHTML('beforebegin', '<h1>Find country</h1>');
document.querySelector('#search-box').placeholder = 'Search for any country...';