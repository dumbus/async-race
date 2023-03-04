import { createHeader, createGaragePage, createWinnersPage } from './createLayout';
import { addMenuListeners, addGarageUpdateListeners, addRaceListeners } from './listeners';
import { getStore } from './store';

export const renderPage = async () => {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.classList.add('container');

  const garageBlock = await createGaragePage(getStore().carsPage);
  const winnersBlock = await createWinnersPage(getStore().winnersPage, getStore().sortBy, getStore().sortOrder);

  container.append(createHeader());
  container.append(garageBlock);
  container.append(winnersBlock);
  body.append(container);

  addMenuListeners();
  addGarageUpdateListeners();
  addRaceListeners();
};

export default renderPage;
