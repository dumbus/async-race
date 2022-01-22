import { ICar } from './interfaces';
import { createCarBlock } from './createCarBlock';
import { createHeader, createGaragePage, createWinnersPage } from './createLayout';
import { createCar, deleteCar, deleteWinner, updateCar } from './api';
import { addMenuListeners, addGarageUpdateListeners } from './listeners';
import { getStore } from './store';

async function updatePage() {
  const container = document.querySelector('.container');

  const garageBlock = await createGaragePage(getStore().carsPage);
  const winnersBlock = await createWinnersPage(getStore().winnersPage);

  container.innerHTML = '';
  container.append(createHeader());
  container.append(garageBlock);
  container.append(winnersBlock);

  addMenuListeners();
  addGarageUpdateListeners();
}

export const createCarByButton = async () => {
  const carsContainer = document.querySelector('.garage-cars');
  const carsItems = carsContainer.querySelectorAll('.car');
  const amountOfCars = document.querySelector('.garage-header');
  const nameInput = <HTMLInputElement>document.querySelector('#create-name');
  const colorInput = <HTMLInputElement>document.querySelector('#create-color');

  if (nameInput.value !== '') {
    const body = {
      name: nameInput.value,
      color: colorInput.value
    };

    const carData = await createCar(body);

    amountOfCars.innerHTML = `Garage (${+amountOfCars.innerHTML + 1})`;

    if (carsItems.length < 7) {
      carData.then((car: ICar) => {
        carsContainer.append(createCarBlock(car));
      });
    }
  }
};

export const deleteCarByButton = async (id: number) => {
  await deleteCar(id);
  await deleteWinner(id);

  await updatePage();
};

export const allowUpdatingCarByButton = () => {
  const nameInput = <HTMLInputElement>document.querySelector('#update-name');
  const colorInput = <HTMLInputElement>document.querySelector('#update-color');
  const updateButton = <HTMLButtonElement>document.querySelector('#update-submit');

  nameInput.disabled = false;
  colorInput.disabled = false;
  updateButton.disabled = false;
};

export const updateCarByButton = async (id: number) => {
  const nameInput = <HTMLInputElement>document.querySelector('#update-name');
  const colorInput = <HTMLInputElement>document.querySelector('#update-color');

  if (nameInput.value !== '') {
    const body = {
      name: nameInput.value,
      color: colorInput.value
    };

    const carData = await updateCar(id, body);
    console.log(carData);

    await updatePage();
  }
};

// export const createRandomCars = () => {

// }
