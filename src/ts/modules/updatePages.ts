import { createHeader, createGaragePage, createWinnersPage } from './createLayout';
import { getRandomName, getRandomColor, getDistanceBetweenElements, animateCar } from './utils';
import { addMenuListeners, addGarageUpdateListeners, addRaceListeners } from './listeners';
import { getStore, updateStoredCarsPage, updateStoredWinnersPage } from './store';
import {
  createCar,
  deleteCar,
  deleteWinner,
  updateCar,
  createRandomCars,
  startEngine,
  stopEngine,
  driveEngine
} from './api';

const updatePage = async () => {
  const container = document.querySelector('.container');

  const garageBlock = await createGaragePage(getStore().carsPage);
  const winnersBlock = await createWinnersPage(getStore().winnersPage);

  container.innerHTML = '';
  container.append(createHeader());
  container.append(garageBlock);
  container.append(winnersBlock);

  addMenuListeners();
  addGarageUpdateListeners();
  addRaceListeners();
};

export const updateWinnersPage = async () => {
  const container = document.querySelector('.container');
  const winners = document.querySelector('.winners');
  winners.remove();

  const winnersBlock = await createWinnersPage(getStore().winnersPage);
  container.append(winnersBlock);

  addMenuListeners();
};

export const createCarByButton = async () => {
  const nameInput = <HTMLInputElement>document.querySelector('#create-name');
  const colorInput = <HTMLInputElement>document.querySelector('#create-color');

  if (nameInput.value !== '') {
    const body = {
      name: nameInput.value,
      color: colorInput.value
    };

    await createCar(body);

    updatePage();
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

    await updateCar(id, body);
    await updatePage();
  }
};

export const createRandomCarsByButton = async () => {
  const bodiesArr = [];

  for (let i = 0; i < 100; i += 1) {
    const body = {
      name: getRandomName(),
      color: getRandomColor()
    };

    bodiesArr.push(body);
  }

  await createRandomCars(bodiesArr);

  await updatePage();
};

export const paginateGarageNext = async () => {
  updateStoredCarsPage(getStore().carsPage + 1);
  await updatePage();
};

export const paginateGaragePrev = async () => {
  updateStoredCarsPage(getStore().carsPage - 1);
  await updatePage();
};

export const startDriving = async (id: number, currentCarIndex: number) => {
  const startButton = <HTMLButtonElement>document.querySelector(`#car-header-start-${id}`);
  startButton.disabled = true;

  const stopButton = <HTMLButtonElement>document.querySelector(`#car-header-stop-${id}`);
  stopButton.disabled = false;

  const carData = await startEngine(id);
  const velocity = carData.velocity;
  const distance = carData.distance;
  const time = Math.round(distance / velocity);

  const car = document.querySelector(`#car-${id}`);
  const carImage = car.querySelector('.car-road-icon-div');
  const distanceInPx = getDistanceBetweenElements(car);

  const animationId = animateCar(<HTMLElement>carImage, distanceInPx, time, currentCarIndex);
  const states = JSON.parse(sessionStorage.getItem('dumbus-async-race-states'));
  const animations = JSON.parse(sessionStorage.getItem('dumbus-async-race-animations'));
  animations[currentCarIndex] = animationId;
  sessionStorage.setItem('dumbus-async-race-animations', JSON.stringify(animations));

  const result = await driveEngine(id);
  if (!result.success) {
    states[currentCarIndex] = 'stopped';
    sessionStorage.setItem('dumbus-async-race-states', JSON.stringify(states));
    window.cancelAnimationFrame(animationId);
  }

  return { result, id, time, car };
};

export const stopDriving = async (id: number, currentCarIndex: number) => {
  const stopButton = <HTMLButtonElement>document.querySelector(`#car-header-stop-${id}`);
  stopButton.disabled = true;

  await stopEngine(id);

  const startButton = <HTMLButtonElement>document.querySelector(`#car-header-start-${id}`);
  startButton.disabled = false;

  const car = document.querySelector(`#car-${id}`);
  const carImage = <HTMLElement>car.querySelector('.car-road-icon-div');

  const states = JSON.parse(sessionStorage.getItem('dumbus-async-race-states'));
  states[currentCarIndex] = 'stopped';
  sessionStorage.setItem('dumbus-async-race-states', JSON.stringify(states));

  const animations = JSON.parse(sessionStorage.getItem('dumbus-async-race-animations'));
  const currentCarAnimationId = animations[currentCarIndex];
  window.cancelAnimationFrame(currentCarAnimationId);

  animations[currentCarIndex] = null;
  sessionStorage.setItem('dumbus-async-race-animations', JSON.stringify(animations));

  carImage.style.transform = 'translateX(0)';
  states[currentCarIndex] = 'ready';
  sessionStorage.setItem('dumbus-async-race-states', JSON.stringify(states));

  return { car: car };
};

export const paginateWinnersNext = async () => {
  updateStoredWinnersPage(getStore().winnersPage + 1);
  await updateWinnersPage();

  const winners = document.querySelector('.winners');
  winners.classList.remove('hidden');
};

export const paginateWinnersPrev = async () => {
  updateStoredWinnersPage(getStore().winnersPage - 1);
  await updateWinnersPage();

  const winners = <HTMLElement>document.querySelector('.winners');
  winners.classList.remove('hidden');
};
