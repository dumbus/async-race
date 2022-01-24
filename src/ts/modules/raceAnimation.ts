import { startDriving, stopDriving } from './updateGarage';
import { renderResult, clearResult } from './utils';

type RaceFunction = (
  promises: Promise<{ result: { success: true }; id: number; time: number; car: Element }>[],
  ids: number[]
) => Promise<{ id: number; timeInSeconds: number; car: Element }>;

const raceAllCars: RaceFunction = async (
  promises: Promise<{ result: { success: true }; id: number; time: number; car: Element }>[],
  ids: number[]
) => {
  const promiseData = await Promise.race(promises);

  const result = promiseData.result.success;
  const id = promiseData.id;
  const time = promiseData.time;
  const car = promiseData.car;

  if (!result) {
    const failedPromiseIndex = ids.indexOf(id);
    const restPromises = [
      ...promises.slice(0, failedPromiseIndex),
      ...promises.slice(failedPromiseIndex + 1, promises.length)
    ];
    const restIds = [...ids.slice(0, failedPromiseIndex), ...ids.slice(failedPromiseIndex + 1, ids.length)];
    return raceAllCars(restPromises, restIds);
  }

  const timeInSeconds = Math.floor(time / 10) / 100;

  return { id, timeInSeconds, car };
};

export const startRace = async () => {
  const carItems = document.querySelectorAll('.car');
  const resetButton = <HTMLButtonElement>document.querySelector('.settings-controls-reset');
  const promisesArr: Promise<{ result: { success: true }; id: number; time: number; car: Element }>[] = [];
  const idsArr: number[] = [];

  carItems.forEach((carItem) => {
    const START_INDEX_OF_CAR_ID = 4;
    const currentCarIndex = +carItem.getAttribute('data-num');
    const currentCarId = +carItem.getAttribute('id').slice(START_INDEX_OF_CAR_ID);

    const promise = startDriving(currentCarId, currentCarIndex);
    promisesArr.push(promise);
    idsArr.push(currentCarId);
  });

  const winnerData = await raceAllCars(promisesArr, idsArr);

  const winnerCar = winnerData.car;
  const winnerName = winnerCar.querySelector('.car-header-name').textContent;
  const winnerTime = winnerData.timeInSeconds;
  renderResult(winnerName, winnerTime);
  resetButton.disabled = false;
};

export const resetRace = async () => {
  const carItems = document.querySelectorAll('.car');
  const raceButton = <HTMLButtonElement>document.querySelector('.settings-controls-race');
  const promisesArr: Promise<{ car: Element }>[] = [];
  const idsArr: number[] = [];

  carItems.forEach((carItem) => {
    const START_INDEX_OF_CAR_ID = 4;
    const currentCarIndex = +carItem.getAttribute('data-num');
    const currentCarId = +carItem.getAttribute('id').slice(START_INDEX_OF_CAR_ID);

    const promise = stopDriving(currentCarId, currentCarIndex);
    promisesArr.push(promise);
    idsArr.push(currentCarId);
  });

  await Promise.all(promisesArr);
  raceButton.disabled = false;
  clearResult();
};
