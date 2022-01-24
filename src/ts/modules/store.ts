let store = {
  carsPage: 1,
  winnersPage: 1,
  carsCount: 4
};

if (localStorage.getItem('dumbus-async-race-store') !== null) {
  store = JSON.parse(localStorage.getItem('dumbus-async-race-store'));
} else {
  localStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
}

export function getStore() {
  return store;
}

export function updateStoredCarsPage(page: number) {
  store.carsPage = page;
  localStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
}

export function updateStoredWinnersPage(page: number) {
  store.winnersPage = page;
  localStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
}

export function updateStoredCarsCount(count: number) {
  store.carsCount = count;
  localStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
}
