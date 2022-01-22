import { ICar } from './interfaces';

export const createCarImage = (color: string) => {
  const carRoadIcon = document.createElement('div');
  carRoadIcon.classList.add('car-road-icon');

  carRoadIcon.innerHTML = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 20.07 20.07" style="enable-background:new 0 0 20.07 20.07;" xml:space="preserve">
    <g>
      <g>
        <path style="fill:${color};" d="M20.07,10.102c0,0-0.719-1.593-5.363-1.53c0,0-4.626-4.644-13.986,0.582
          c0,0,0.205,1.018-0.566,1.018c-0.159,0.765-0.322,1.769,0.203,2.294c1.146,0,1.257,0,1.266,0c-0.028-0.123-0.044-0.25-0.044-0.381
          c0-0.951,0.771-1.722,1.722-1.722s1.722,0.771,1.722,1.722c0,0.131-0.016,0.258-0.044,0.381h0.268h8.357h1.119
          c-0.027-0.123-0.043-0.25-0.043-0.381c0-0.951,0.771-1.722,1.721-1.722c1.297,0,2.037,1.318,1.906,2.092l1.762-0.182
          C19.801,10.687,20.07,10.102,20.07,10.102z M6.936,8.835H2.829c0,0,1.703-0.798,4.107-1.261V8.835z M7.827,8.835V7.427
          c3.442-0.498,6.143,1.408,6.143,1.408H7.827z"/>
        <path style="fill:${color};" d="M16.402,10.742c-0.734,0-1.33,0.595-1.33,1.33c0,0.733,0.596,1.329,1.33,1.329
          s1.514-0.596,1.514-1.329C17.916,11.336,17.137,10.742,16.402,10.742z M16.402,12.582c-0.283,0-0.512-0.229-0.512-0.511
          s0.229-0.512,0.512-0.512c0.281,0,0.512,0.229,0.512,0.512C16.914,12.353,16.683,12.582,16.402,12.582z"/>
        <path style="fill:${color};" d="M3.268,10.742c-0.734,0-1.329,0.595-1.329,1.33c0,0.733,0.595,1.329,1.329,1.329
          c0.735,0,1.33-0.596,1.33-1.329C4.597,11.336,4.003,10.742,3.268,10.742z M3.268,12.582c-0.282,0-0.512-0.229-0.512-0.511
          s0.23-0.512,0.512-0.512s0.512,0.229,0.512,0.512C3.78,12.353,3.55,12.582,3.268,12.582z"/>
        </g>
      </g>
    </svg>
  `;

  return carRoadIcon;
};

export const createCarBlock = (carParams: ICar) => {
  const car = document.createElement('div');
  const carHeader = document.createElement('div');
  car.classList.add('car');
  car.setAttribute('id', `car-${carParams.id}`);
  carHeader.classList.add('car-header');

  carHeader.innerHTML = `
    <button class="button button-blue car-header-select" id="car-header-select-${carParams.id}">Select</button>
    <button class="button button-blue car-header-remove" id="car-header-remove-${carParams.id}">Remove</button>
    <span class="car-header-name">${carParams.name}</span>
    <button class="car-header-button car-header-start" id="car-header-start-${carParams.id}">A</button>
    <button class="car-header-button car-header-stop" id="car-header-stop-${carParams.id}" disabled>B</button>
  `;

  const carRoad = document.createElement('div');
  carRoad.classList.add('car-road');

  const carRoadFlag = document.createElement('div');
  carRoadFlag.classList.add('car-road-flag');
  carRoadFlag.innerHTML = '&#127937';

  carRoad.append(createCarImage(carParams.color));
  carRoad.append(carRoadFlag);

  car.append(carHeader);
  car.append(carRoad);

  return car;
};
