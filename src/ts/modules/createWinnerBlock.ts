import { IWinner, ICar } from './interfaces';
import { createCarImage } from './createCarBlock';

export const createWinnerBlock = (winnerParams: IWinner, carParams: ICar) => {
  const winner = document.createElement('tr');
  winner.classList.add('winners-table-row');

  winner.innerHTML = `
    <td class="winner-number">${winnerParams.id}</td>
    <td class="winner-image">
    </td>
    <td class="winner-name">${carParams.name}</td>
    <td class="winner-wins">${winnerParams.wins}</td>
    <td class="winner-time">${winnerParams.time}</td>
    </tr>
  `;

  const winnerImage = winner.querySelector('.winner-image');
  winnerImage.append(createCarImage(carParams.color));

  return winner;
};
