import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import React from "react";

const SelectCategoryMovie = ({
  selectedCategoryFilter,
  handleSelectFilterChange
}) => {
  return (
    <FormControl
      sx={{
        order: 1,
      }}
    >
      <InputLabel id="selectCategory">Category</InputLabel>
      <Select
        labelId="selectCategory"
        id="Filter"
        value={selectedCategoryFilter}
        label="Category"
        onChange={handleSelectFilterChange}
      >
        <MenuItem value="all">Todos</MenuItem>
        <Divider />
        <MenuItem value="terror">Terror</MenuItem>
        <Divider />
        <MenuItem value="comedia">Comedia</MenuItem>
        <Divider />
        <MenuItem value="accion">Accion</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectCategoryMovie;
