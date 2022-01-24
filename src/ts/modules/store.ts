let store = {
  carsPage: 1,
  winnersPage: 1,
  carsCount: 4,
  winnersCount: 1,
  sortBy: 'id',
  sortOrder: 'DESC'
};

if (sessionStorage.getItem('dumbus-async-race-store') !== null) {
  store = JSON.parse(sessionStorage.getItem('dumbus-async-race-store'));
} else {
  sessionStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
}

export const getStore = () => {
  return store;
};

export const updateStoredCarsPage = (page: number) => {
  store.carsPage = page;
  sessionStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
};

export const updateStoredWinnersPage = (page: number) => {
  store.winnersPage = page;
  sessionStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
};

export const updateStoredCarsCount = (count: number) => {
  store.carsCount = count;
  sessionStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
};

export const updateStoredWinnersCount = (count: number) => {
  store.winnersCount = count;
  sessionStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
};

export const toggleSortOrder = () => {
  if (store.sortOrder === 'ASC') {
    store.sortOrder = 'DESC';
  } else {
    store.sortOrder = 'ASC';
  }
  sessionStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
};

export const updateStoredSortBy = (sortBy: string) => {
  store.sortBy = sortBy;
  sessionStorage.setItem('dumbus-async-race-store', JSON.stringify(store));
};
