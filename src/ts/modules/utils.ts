import { getStore } from './store';

const carBrands = ['Audi', 'BMW', 'Ford', 'Honda', 'Kia', 'Lada', 'Mazda', 'Nissan', 'Renault', 'Toyota'];
const carModels = ['A4', '2-series', 'Focus', 'Accord', 'Carnival', 'CX-9', 'Altima', 'Logan', 'Avalon', 'Mustang'];
const itemsForColor = 'aAbBcCdDeEfF0123456789';
const states: string[] = [];
const animations: number[] = [];

export const getRandomName = () => {
  const randomBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
  const randomModel = carModels[Math.floor(Math.random() * carModels.length)];

  return `${randomBrand} ${randomModel}`;
};

export const getRandomColor = () => {
  let randomColor = '#';

  for (let i = 0; i < 6; i += 1) {
    randomColor += itemsForColor[Math.floor(Math.random() * itemsForColor.length)];
  }

  return randomColor;
};

export const checkDisablingNextGaragePage = () => {
  const carsCount = getStore().carsCount;
  const remainingCars = carsCount - getStore().carsPage * 7;

  if (remainingCars > 0) {
    return '';
  }

  return 'disabled';
};

export const checkDisablingPrevGaragePage = () => {
  if (getStore().carsPage !== 1) {
    return '';
  }

  return 'disabled';
};

export function setDefaultState() {
  states.push('ready');

  sessionStorage.setItem('dumbus-async-race-states', JSON.stringify(states));
}

export function setDefaultAnimation() {
  animations.push(null);

  sessionStorage.setItem('dumbus-async-race-animations', JSON.stringify(animations));
}

function getElementPosition(element: Element) {
  return element.getBoundingClientRect().left;
}

export const getDistanceBetweenElements = (car: Element) => {
  const CAR_IMAGE_WIDTH = 60;
  const carImage = car.querySelector('svg');
  const flagImage = car.querySelector('.car-road-flag');

  const carImagePosition = getElementPosition(carImage);
  const flagImagePosition = getElementPosition(flagImage);

  return flagImagePosition - carImagePosition + CAR_IMAGE_WIDTH;
};

export const animateCar = (car: HTMLElement, distance: number, duration: number, currentCarIndex: number) => {
  let startTime: number = null;
  let animationId: number = null;

  function step(timestamp: number) {
    if (!startTime) {
      startTime = timestamp;
    }

    const currentState = JSON.parse(sessionStorage.getItem('dumbus-async-race-states'))[currentCarIndex];
    const currentAnimationIndex = JSON.parse(sessionStorage.getItem('dumbus-async-race-animations'))[currentCarIndex];

    if (currentState === 'stopped' || currentAnimationIndex === null) {
      return;
    }

    const currentTime = timestamp - startTime;
    const passed = Math.round(currentTime * (distance / duration));

    car.style.transform = `translateX(${passed}px)`;

    if (passed < distance) {
      animationId = window.requestAnimationFrame(step);
    }
  }
  animationId = window.requestAnimationFrame(step);

  return animationId;
};

export const renderResult = (name: string, time: number) => {
  const garage = document.querySelector('.garage');
  const result = document.createElement('div');
  result.classList.add('result');
  result.style.display = 'block';

  result.innerHTML = `
    <h1>${name} went first (${time})!</h1>
  `;

  garage.append(result);
};

export const clearResult = () => {
  const result = document.querySelector('.result');
  result.remove();
};
