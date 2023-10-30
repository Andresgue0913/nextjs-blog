import { useState} from "react";
import MovieCategory from "./MovieCategory";
import { createMovie, updateMovie } from "@/lib/movieApi";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const Form = ({ updateMovieList, formData, forNewMovie = true, isEditing }) => {
  const [message, setMessage] = useState([]);
  const [selectedOption, setSelectedOption] = useState(formData.category || ''); // Estado para almacenar la opción seleccionada
  const [title, setTitle] = useState(formData.title || '');
  const [splot, setSplot] = useState(formData.splot || '');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSplotChange = (event) => {
    setSplot(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let _id = formData.id;
    const form = { _id, title, splot, category: selectedOption };
    let data;
    console.log(formData.category);

    try {
      if (forNewMovie) {
        data = await createMovie(form);
      } else if (isEditing) {
        data = await updateMovie(form);
      }
      updateMovieList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label="Title"
        type="text"
        margin="dense"
        autoComplete="off"
        id="title"
        variant="outlined"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <TextField
        fullWidth
        label="Splot"
        type="text"
        margin="dense"
        autoComplete="off"
        id="splot"
        variant="outlined"
        value={splot}
        onChange={handleSplotChange}
        required
      />
      <MovieCategory {...{ handleOptionChange, selectedOption }} />
      <Stack alignItems={"flex-end"}>
        <Button
          variant="contained"
          color="info"
          size="large"
          startIcon={<SaveAltIcon />}
          type="submit"
          onClick={handleSubmit}
        >
          {forNewMovie ? "Add" : "Save"}
        </Button>
      </Stack>
      {message.map(({ message }) => (
        <Typography gutterBottom variant="h5" key={message}>
          {message}
        </Typography>
      ))}
    </>
  );
};

export default Form;
