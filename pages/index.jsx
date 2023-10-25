import Head from "next/head";
import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import NewMovie from "../components/NewMovie";
import MoviePreview from "@/components/MoviePreview";

import { useEffect, useState } from "react";

export default function Home({ movies }) {
  const [allMovies, setAllMovies] = useState(movies);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [searchMovie, setSearchMovie] = useState("");

  useEffect(() => {
    filterData({
      searchValue: searchMovie,
      filterValue: selectedCategoryFilter,
    });
  }, [selectedCategoryFilter, searchMovie]);

  const handleSearchMovie = (e) => {
    setSearchMovie(e.target.value);
  };

  const handleSelectFilterChange = (event) => {
    setSelectedCategoryFilter(event.target.value);
  };

  const filterData = ({ searchValue, filterValue }) => {
    const movieFilter = [...movies];

    const filtered = movieFilter.filter((movie) => {
      const movieSearchFilter =
        movie.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        movie.splot.toLowerCase().includes(searchValue.toLowerCase());

      const filterByCategory =
        movie.category === selectedCategoryFilter ||
        selectedCategoryFilter === "all";
      
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

    setAllMovies(filtered);
  };

  const deleteMovieFromList = (movieId) => {
    const newMovieList = Array.from(allMovies);

    for (let i = 0; i < newMovieList.length; i++) {
      if (newMovieList[i]?._id === movieId) {
        newMovieList.splice(i, 1);

        setAllMovies(newMovieList);
      }
    }
  };

  const updateMovieList = (data) => {
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

    setAllMovies(newMovieList);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>Movies</h1>
        <div className="mb-2">
          <input
            type="text"
            value={searchMovie}
            onChange={handleSearchMovie}
            placeholder="Buscar películas"
          />
          <select
            className="mb-2"
            name="Filter"
            id="Filter"
            value={selectedCategoryFilter}
            onChange={handleSelectFilterChange}
          >
            <option value="all">Todos</option>
            <option value="terror">Terror</option>
            <option value="comedia">Comedia</option>
            <option value="accion">Accion</option>
          </select>
        </div>
        <NewMovie updateMovieList={updateMovieList} />
        {allMovies.map(({ _id, title, splot }) => (
          <div className="card mb-2" key={_id + title}>
            <div className="card-body">
              <div className="h5 text-uppercase">{title}</div>
              <MoviePreview
                id={_id}
                splot={splot}
                title={title}
                updateMovieList={updateMovieList}
                deleteMovieFromList={deleteMovieFromList}
              />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    await conectarDB();

    const res = await Movie.find({});

    return { props: { movies: JSON.parse(JSON.stringify(res)) } };
  } catch (error) {
    console.log(error);
  }
}
