import '../public/reset.css';
import './style.scss';

import data from './assets/dataset.json';

const innerDataset = data;
console.log(innerDataset);

window.addEventListener('load', () => {
  let elements = Array.from(
    document.querySelectorAll('.main__breadcrumbs > ul > li'),
  );
  let link = elements.slice(-1)[0].firstChild;

  if (link.classList.contains('current-breadcrumb')) {
    link.onclick = (e) => {
      e.preventDefault();
    };
  }
});

const arrowArr = document.querySelectorAll('.description__results .arrow');
for (let arrow of arrowArr) {
  arrow.addEventListener('click', (e) => {
    e.target.parentElement.nextElementSibling.classList.toggle('label-closed');
    e.target.classList.toggle('arrow-param-rotate');
  });
}

const sortAreaArr = document.querySelectorAll('.sort__area');
for (let area of sortAreaArr) {
  area.addEventListener('click', (e) => {
    e.stopPropagation();
    let sortArrowArr = document.querySelectorAll('.sort__arrow');

    for (let arrow of sortArrowArr) {
      arrow.classList.toggle('arrow-sort-rotate');
    }
  });

  area.addEventListener('change', () => {
    let value = area.value;
    for (let area of sortAreaArr) {
      area.value = value;
    }
  });
}

let sortArrowArr = document.querySelectorAll('.sort__arrow');
document.querySelector('body').addEventListener('click', () => {
  for (let arrow of sortArrowArr) {
    if (arrow.classList.contains('arrow-sort-rotate')) {
      arrow.classList.remove('arrow-sort-rotate');
    }
  }
});

const numberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const prices = document.querySelectorAll('.price');
for (let price of prices) {
  price.textContent = numberWithSpaces(price.innerHTML);
}

const mileages = document.querySelectorAll('.mileage');
for (let mileage of mileages) {
  mileage.textContent = numberWithSpaces(mileage.innerHTML);
}
