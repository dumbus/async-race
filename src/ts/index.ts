import '../sass/style.scss';
import { createHeader, createGaragePage } from './modules/render';

function renderPage() {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.classList.add('container');

  container.append(createHeader());
  container.append(createGaragePage());
  body.append(container);
}

renderPage();
