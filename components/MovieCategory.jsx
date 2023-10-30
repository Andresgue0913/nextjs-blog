import {
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";

const MovieCategory = ({ selectedOption, handleOptionChange }) => {
  return (
    <Container>
      <FormControl
        aria-labelledby="Category"
        name="controlled-radio-buttons"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <FormLabel id="Category">Select a category</FormLabel>
        <RadioGroup>
          <FormControlLabel
            value="terror"
            checked={selectedOption === "terror"}
            control={<Radio />}
            label="Terror"
          />
          <FormControlLabel
            value="comedia"
            checked={selectedOption === "comedia"}
            control={<Radio />}
            label="comedia"
          />
          <FormControlLabel
            value="accion"
            checked={selectedOption === "accion"}
            control={<Radio />}
            label="accion"
          />
        </RadioGroup>
      </FormControl>
    </Container>
  );
};

export default MovieCategory;
