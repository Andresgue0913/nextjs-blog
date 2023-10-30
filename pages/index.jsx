import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import NewMovie from "../components/NewMovie";
import MoviePreview from "@/components/MoviePreview";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  Box,
} from "@mui/material";
import SelectCategoryMovie from "@/components/SelectCategoryMovie";
import { useFormik } from "formik";
import { searchValidationSchema } from "../utils/validations";
import {
  getFilteredMovie,
  deleteMovieFromArray,
  getUpdatedOrRemovedMovieList,
} from "@/utils/common";
import SearchBar from "@/components/SearchBar";

export default function Home({ movies }) {
  const [allMovies, setAllMovies] = useState(movies);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  useEffect(() => {
    handleButtonClick({
      filterValue: selectedCategoryFilter,
    });
  }, [selectedCategoryFilter]);

  const handleButtonClick = () => {
    filterData({
      searchValue: formik.values.searchMovies,
      filterValue: selectedCategoryFilter,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      filterData({
        searchValue: formik.values.searchMovies,
        filterValue: selectedCategoryFilter,
      });
    }
  };

  const handleSelectFilterChange = (event) => {
    setSelectedCategoryFilter(event.target.value);
  };

  const filterData = ({ searchValue, filterValue }) => {
    const filtered = getFilteredMovie({ movies, filterValue, searchValue });
    setAllMovies(filtered);
  };

  const deleteMovieFromList = (movieId) => {
    const newMovieList = deleteMovieFromArray({ allMovies, movieId });
    setAllMovies(newMovieList);
  };

  const updateMovieList = (data) => {
    const newMovieList = getUpdatedOrRemovedMovieList({ allMovies, data });
    setAllMovies(newMovieList);
  };

  const formik = useFormik({
    initialValues: {
      searchMovies: "",
    },
    validationSchema: searchValidationSchema,
    onSubmit: handleButtonClick,
  });

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
            <SearchBar formik={formik} handleKeyPress={handleKeyPress} />
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
