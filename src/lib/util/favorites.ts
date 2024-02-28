export const saveFavorite = (favorites: []) => {
  window.localStorage.setItem('favorites', JSON.stringify(favorites))
}


export const loadGuestFavorites = () => {
  let favorites = window.localStorage.getItem('favorites')
  if (favorites) {
    return JSON.parse(favorites);
  }
  return [];
}