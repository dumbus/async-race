import { createHeader, createGaragePage, createWinnersPage } from './createLayout';
import { addMenuListeners, addGarageUpdateListeners } from './listeners';

export const renderPage = async () => {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.classList.add('container');

  const garageBlock = await createGaragePage(1);
  const winnersBlock = await createWinnersPage(1);

  container.innerHTML = '';
  container.append(createHeader());
  container.append(garageBlock);
  container.append(winnersBlock);
  body.append(container);

  addMenuListeners();
  addGarageUpdateListeners();
};

export default renderPage;
