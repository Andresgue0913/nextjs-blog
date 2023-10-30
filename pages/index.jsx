import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import NewMovie from "../components/NewMovie";
import MoviePreview from "@/components/MoviePreview";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import SelectCategoryMovie from "@/components/SelectCategoryMovie";

export default function Home({ movies }) {
  const [allMovies, setAllMovies] = useState(movies);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [searchMovie, setSearchMovie] = useState("");

  useEffect(() => {
    handleButtonClick({
      filterValue: selectedCategoryFilter,
    });
  }, [selectedCategoryFilter]);

  const handleButtonClick = () => {
    filterData({
      searchValue: searchMovie,
      filterValue: selectedCategoryFilter,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      filterData({
        searchValue: searchMovie,
        filterValue: selectedCategoryFilter,
      });
    }
  };
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
    <Container
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          border: 1,
          boxShadow: 20,
          borderRadius: 3,
          borderColor: "primary.main",
          mx: "auto",
          p: 2,
        }}
      >
        <Typography variant="h2" color="primary" align="center" pb={2}>
          Movies
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gridGap: 15,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              sx={{
                width: "85%",
                order: 2,
              }}
              variant="outlined"
              type="text"
              value={searchMovie}
              onChange={handleSearchMovie}
              onKeyPress={handleKeyPress}
              label="Search Movie"
            />
            <IconButton
              sx={{
                order: 3,
              }}
              onClick={handleButtonClick}
              variant="contained"
              size="large"
              color="primary"
            >
              <SearchIcon />
            </IconButton>
            <SelectCategoryMovie
              handleSelectFilterChange={handleSelectFilterChange}
              selectedCategoryFilter={selectedCategoryFilter}
            />
          </Box>
          <NewMovie updateMovieList={updateMovieList} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
            mt: 3,
          }}
        >
          {allMovies.map(({ _id, title, splot }) => (
            <Card
              sx={{
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                p: 2,
              }}
              key={_id + title}
            >
              <MoviePreview
                id={_id}
                splot={splot}
                title={title}
                updateMovieList={updateMovieList}
                deleteMovieFromList={deleteMovieFromList}
              />
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
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
