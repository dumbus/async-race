import { ICreatedCar } from './interfaces';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const winners = `${base}/winners`;

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, {
    method: 'GET'
  });

  return {
    items: response.json(),
    count: response.headers.get('X-total-count')
  };
};

export const getWinners = async (page: number, limit = 10, sort = 'id', order = 'DESC') => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
    method: 'GET'
  });

  return {
    items: response.json(),
    count: response.headers.get('X-total-count')
  };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'GET'
  });

  return response.json();
};

export const createCar = async (body: ICreatedCar) => {
  const response = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'DELETE'
  });

  return response.json();
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'DELETE'
  });

  return response.json();
};

export const updateCar = async (id: number, body: ICreatedCar) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};
