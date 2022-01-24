import { startDriving, stopDriving } from './updatePages';
import { clearResult, renderResult } from './utils';
import { createWinner, updateWinner, getWinner } from './api';
import { updateWinnersPage } from './updatePages';
import { getStore, updateStoredWinnersCount } from './store';

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
  const winners = JSON.parse(sessionStorage.getItem('dumbus-async-race-winners'));

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

  if (winners.indexOf(winnerData.id) === -1) {
    let winnersCount = getStore().winnersCount;
    const newWinnerData = {
      id: winnerData.id,
      wins: 1,
      time: winnerTime
    };

    await createWinner(newWinnerData);
    winnersCount += 1;
    updateStoredWinnersCount(winnersCount);
    await updateWinnersPage();
  } else {
    const oldWinnerData = await getWinner(winnerData.id);

    if (oldWinnerData.time <= winnerData.timeInSeconds) {
      const updatedWinnerData = {
        wins: oldWinnerData.wins + 1,
        time: oldWinnerData.time
      };

      await updateWinner(winnerData.id, updatedWinnerData);
    } else {
      const updatedWinnerData = {
        wins: oldWinnerData.wins + 1,
        time: winnerData.timeInSeconds
      };

      await updateWinner(winnerData.id, updatedWinnerData);
    }

    await updateWinnersPage();
  }
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
