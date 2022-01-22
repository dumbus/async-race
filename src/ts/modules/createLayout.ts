import { ICar, IWinner } from './interfaces';
import { createCarBlock } from './createCarBlock';
import { createWinnerBlock } from './createWinnerBlock';
import { getCars, getWinners, getCar } from './api';

function createSettings() {
  const settings = document.createElement('div');
  settings.classList.add('settings');

  settings.innerHTML = `
  <form class="form" id="create">
    <input class="input" id="create-name" name="name" type="text" autocomplete="off">
    <input class="color" id="create-color" name="color" type="color" value="#ffffff">
    <button class="button button-blue" id="create-submit" type="submit">Create</button>
  </form>

  <form class="form" id="update">
    <input class="input" id="update-name" name="name" type="text" autocomplete="off" disabled>
    <input class="color" id="update-color" name="color" type="color" value="#ffffff" disabled>
    <button class="button button-blue" id="update-submit" type="submit" disabled>Update</button>
  </form>

  <div class="settings-controls">
    <button class="button settings-controls-race">Race</button>
    <button class="button settings-controls-reset">Reset</button>
    <button class="button button-blue settings-controls-generate">Generate cars</button>
  </div>
  `;

  return settings;
}

export function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = `
  <nav class="header-nav">
    <button class="button header-nav-garage">To garage</button>
    <button class="button header-nav-winners">To winners</button>
  </nav>
  `;

  return header;
}

export const createGaragePage = async (page: number) => {
  const garage = document.createElement('section');
  const garageContent = document.createElement('div');
  garage.classList.add('garage');
  garageContent.classList.add('garage-content');

  const carsData = await getCars(page);

  garage.append(createSettings());
  garageContent.innerHTML = `
    <h2 class="garage-header">Garage (${carsData.count})</h2>
    <h3 class="garage-subheader">Page #1</h3>
    <div class="garage-cars">
      
    </div>

    <div class="additional-height"></div>

    <nav class="garage-nav">
      <button class="button garage-nav-prev" disabled>Prev</button>
      <button class="button garage-nav-next" disabled>Next</button>
    </nav>
  `;

  const carsContainer = garageContent.querySelector('.garage-cars');

  carsData.items.then((data: ICar[]) => {
    data.map((car) => {
      carsContainer.append(createCarBlock(car));
    });
  });

  garage.append(garageContent);

  return garage;
};

const getCarByWinnerId = async (id: number) => {
  const winnerCar = await getCar(id);

  return winnerCar;
};

export const createWinnersPage = async (page: number) => {
  const winners = document.createElement('section');
  winners.classList.add('winners');
  winners.classList.add('hidden');

  const winnersData = await getWinners(page);

  winners.innerHTML = `
    <h2 class="winners-header">Winners (${winnersData.count})</h2>
    <h3 class="winners-subheader">Page #1</h3>

    <table class="winners-table">
      <tr class="winners-table-row winners-table-row-headers">
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="winners-table-row-headers-wins">Wins</th>
        <th class="winners-table-row-headers-time">Best time (seconds)</th>
      </tr>
    </table>

    <nav class="winners-nav">
      <button class="button winners-nav-prev" disabled>Prev</button>
      <button class="button winners-nav-next" disabled>Next</button>
    </nav>
  `;

  const winnersContainer = winners.querySelector('.winners-table');

  winnersData.items.then((data: IWinner[]) => {
    data.map((winner) => {
      getCarByWinnerId(winner.id).then((car) => {
        winnersContainer.append(createWinnerBlock(winner, car));
      });
    });
  });

  return winners;
};