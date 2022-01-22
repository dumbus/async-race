import { createCarByButton, deleteCarByButton, allowUpdatingCarByButton, updateCarByButton } from './updateGarage';

let selectedCarIndex: number = undefined;

export function addMenuListeners() {
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
}

export function addGarageUpdateListeners() {
  const START_INDEX_OF_DELETE_ID = 18;
  const START_INDEX_OF_UPDATE_ID = 18;
  const createCarButton = document.querySelector('#create-submit');
  const updateCarButton = document.querySelector('#update-submit');
  const deleteCarButtons = document.querySelectorAll('.car-header-remove');
  const selectCarButtons = document.querySelectorAll('.car-header-select');

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
}
