var map = L.map('map').setView([53.91087015428646, 27.596459969284144], 15);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);

var marker = L.marker([53.91087015428646, 27.596459969284144]).addTo(map);


const formFields = document.querySelectorAll('.calculator');
const totalSumContainer = document.querySelector('[data-type="total-sum"]');
const connectUsBtn = document.getElementById('connectUsBtn');
const callBackBtn = document.getElementById('call-back-btn');
const modalLayout = document.getElementById('modal-layout');
const modal = document.getElementById('modal');
const modalCross = document.getElementById('modal-cross');
const modalFormBtn = document.getElementById('modal-form-btn');

document.addEventListener('DOMContentLoaded', totalSum());
connectUsBtn.addEventListener('click', toggleActivation);
callBackBtn.addEventListener('click', openModalWithForm);
modalLayout.addEventListener('click', closeModalWithForm);
modalCross.addEventListener('click', closeModalWithForm);
modalFormBtn.addEventListener('click', closeModalWithForm);

formFields.forEach(formField => {
  const input = formField.querySelector('.slider');
  const progress = formField.querySelector('.progress-bar');
  const sliderValue = formField.querySelector('.slider-value');

  input.addEventListener('input', (event) => {
    progress.style.width = ((event.target.value - event.target.min) * 100) / (event.target.max - event.target.min) + '%';
    sliderValue.style.left = ((event.target.value - event.target.min) * 100) / (event.target.max - event.target.min) + '%';
    sliderValue.innerHTML = event.target.value;
    totalSum();
  })
})

function totalSum() {
  let income = document.getElementById('income').value;
  let days = document.getElementById('days').value;
  let result = 0;

  if (income > 140) {
    income = income - 140;
    result = Math.round((income * 0.5 + 44.8) * days);
  } else {
    result = Math.round(income * 0.32 * days);
  }
  totalSumContainer.innerHTML = result;
}

function toggleActivation(event) {
  if (event.target.classList.contains('active')) {
    event.target.classList.remove('active');
  } else {
    event.target.classList.add('active');
  };
};

function openModalWithForm() {
  modalLayout.style.display = "block";
  modal.classList.add('opened');
  document.body.style.overflowY = "hidden";
}

function closeModalWithForm() {
  modalLayout.style.display = "none";
  modal.classList.remove('opened');
  document.body.style.overflowY = "scroll";
}