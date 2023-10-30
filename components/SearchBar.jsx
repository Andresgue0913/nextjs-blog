import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ formik, handleKeyPress }) => {
  return (
    <>
      <TextField
        sx={{
          width: "85%",
          order: 2,
        }}
        variant="outlined"
        type="text"
        name="searchMovies"
        value={formik.values.searchMovies}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        onKeyPress={handleKeyPress}
        label="Search Movie"
        error={
          formik.touched.searchMovies && Boolean(formik.errors.searchMovies)
        }
        helperText={formik.touched.searchMovies && formik.errors.searchMovies}
      />
      <IconButton
        sx={{
          order: 3,
        }}
        onClick={formik.handleSubmit}
        variant="contained"
        size="large"
        color="primary"
      >
        <SearchIcon />
      </IconButton>
    </>
  );
};

export default SearchBar;
