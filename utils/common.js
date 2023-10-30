export const getFilteredMovie = ({ movies, searchValue, filterValue }) => {
  const movieFilter = [...movies];

  const filtered = movieFilter.filter((movie) => {
    const movieSearchFilter =
      movie.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      movie.splot.toLowerCase().includes(searchValue.toLowerCase());

    const filterByCategory =
      movie.category === filterValue || filterValue === "all";

    if (searchValue && !filterValue) {
      return movieSearchFilter;
    }

    if (filterValue && !searchValue) {
      return filterByCategory;
    }

    if (searchValue && filterValue) {
      return movieSearchFilter && filterByCategory;
    }

    if (!searchValue && !filterValue) {
      return movie;
    }
  });
  return filtered;
};

export const deleteMovieFromArray = ({ allMovies, movieId }) => {
  const newMovieList = Array.from(allMovies);

  for (let i = 0; i < newMovieList.length; i++) {
    if (newMovieList[i]?._id === movieId) {
      newMovieList.splice(i, 1);

      return newMovieList;
    }
  }
};

export const getUpdatedOrRemovedMovieList = ({ allMovies, data }) => {
  let editMovie = false;
  const newMovieList = Array.from(allMovies);

  for (const oldMovie of newMovieList) {
    if (oldMovie._id === data._id) {
      editMovie = true;
      oldMovie.title = data.title;
      oldMovie.splot = data.splot;
    }
  }

  if (!editMovie) {
    newMovieList.unshift(data);
  }

  return newMovieList;
};
