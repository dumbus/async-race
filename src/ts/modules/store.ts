let store = {
  carsPage: 1,
  winnersPage: 1
};

if (localStorage.getItem('dumbus-store') !== null) {
  store = JSON.parse(localStorage.getItem('dumbus-store'));
} else {
  localStorage.setItem('dumbus-store', JSON.stringify(store));
}

export function getStore() {
  return store;
}

export function updateStoredCarsPage(page: number) {
  store.carsPage = page;
  localStorage.setItem('dumbus-store', JSON.stringify(store));
}

export function updateStoredWinnersPage(page: number) {
  store.winnersPage = page;
  localStorage.setItem('dumbus-store', JSON.stringify(store));
}
