import {
  createCarByButton,
  deleteCarByButton,
  allowUpdatingCarByButton,
  updateCarByButton,
  createRandomCarsByButton,
  paginateGaragePrev,
  paginateGarageNext,
  startDriving,
  stopDriving
} from './updatePages';
import { startRace, resetRace } from './raceAnimation';

let selectedCarIndex: number = undefined;

export const addMenuListeners = () => {
  const garageBtn = document.querySelector('.header-nav-garage');
  const winnersBtn = document.querySelector('.header-nav-winners');

  const garageBlock = document.querySelector('.garage');
  const winnersBlock = document.querySelector('.winners');

  garageBtn.addEventListener('click', () => {
    garageBlock.classList.remove('hidden');
    winnersBlock.classList.add('hidden');
  });

  winnersBtn.addEventListener('click', () => {
    winnersBlock.classList.remove('hidden');
    garageBlock.classList.add('hidden');
  });
};

export const addGarageUpdateListeners = () => {
  const START_INDEX_OF_DELETE_ID = 18;
  const START_INDEX_OF_UPDATE_ID = 18;
  const START_INDEX_OF_START_ID = 17;
  const START_INDEX_OF_STOP_ID = 16;
  const createCarButton = <HTMLButtonElement>document.querySelector('#create-submit');
  const updateCarButton = document.querySelector('#update-submit');
  const deleteCarButtons = document.querySelectorAll('.car-header-remove');
  const selectCarButtons = document.querySelectorAll('.car-header-select');
  const generateCarsButton = <HTMLButtonElement>document.querySelector('.settings-controls-generate');
  const garageNavPrev = document.querySelector('.garage-nav-prev');
  const garageNavNext = document.querySelector('.garage-nav-next');
  const carStartButtons = document.querySelectorAll('.car-header-start');
  const carStopButtons = document.querySelectorAll('.car-header-stop');

  createCarButton.addEventListener('click', createCarByButton);

  deleteCarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const buttonId = +button.getAttribute('id').slice(START_INDEX_OF_DELETE_ID);
      deleteCarByButton(buttonId);
    });
  });

  selectCarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const buttonId = +button.getAttribute('id').slice(START_INDEX_OF_UPDATE_ID);
      selectedCarIndex = buttonId;

      allowUpdatingCarByButton();
    });
  });

  updateCarButton.addEventListener('click', () => {
    updateCarByButton(selectedCarIndex);
  });

  generateCarsButton.addEventListener('click', createRandomCarsByButton);

  garageNavPrev.addEventListener('click', paginateGaragePrev);
  garageNavNext.addEventListener('click', paginateGarageNext);

  carStartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const buttonId = +button.getAttribute('id').slice(START_INDEX_OF_START_ID);
      const currentCarIndex = +button.getAttribute('data-num');

      const states = JSON.parse(sessionStorage.getItem('dumbus-async-race-states'));
      states[currentCarIndex] = 'driving';
      sessionStorage.setItem('dumbus-async-race-states', JSON.stringify(states));

      startDriving(buttonId, currentCarIndex);
    });
  });

  carStopButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const buttonId = +button.getAttribute('id').slice(START_INDEX_OF_STOP_ID);
      const currentCarIndex = +button.getAttribute('data-num');

      stopDriving(buttonId, currentCarIndex);
    });
  });
};

export const addRaceListeners = () => {
  const raceButton = <HTMLButtonElement>document.querySelector('.settings-controls-race');
  const resetButton = <HTMLButtonElement>document.querySelector('.settings-controls-reset');

  raceButton.addEventListener('click', () => {
    raceButton.disabled = true;
    startRace();
  });

  resetButton.addEventListener('click', () => {
    resetButton.disabled = true;
    resetRace();
  });
};
