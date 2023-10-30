import { useState } from "react";
import MovieCategory from "./MovieCategory";
import { createMovie, updateMovie } from "@/lib/movieApi";
import { Button, TextField, Typography, Stack } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useFormik } from "formik";
import { addOrEditValidationSchema } from "@/utils/validations";

const Form = ({ updateMovieList, formData, forNewMovie = true, isEditing }) => {
  const [selectedOption, setSelectedOption] = useState(formData.category || ""); // Estado para almacenar la opción seleccionada

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    let _id = formData.id;
    const form = {
      _id,
      title: formik.values.title,
      splot: formik.values.splot,
      category: selectedOption,
    };
    let data;

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

  const formik = useFormik({
    initialValues: {
      title: formData.title || "",
      splot: formData.splot || "",
    },
    validationSchema: addOrEditValidationSchema,
    onSubmit: handleSubmit,
  });

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
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        fullWidth
        label="Splot"
        type="text"
        margin="dense"
        autoComplete="off"
        id="splot"
        variant="outlined"
        value={formik.values.splot}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.splot && Boolean(formik.errors.splot)}
        helperText={formik.touched.splot && formik.errors.splot}
      />
      <MovieCategory {...{ handleOptionChange, selectedOption }} />
      <Stack alignItems={"flex-end"}>
        <Button
          variant="contained"
          color="info"
          size="large"
          startIcon={<SaveAltIcon />}
          type="submit"
          onClick={formik.handleSubmit}
        >
          {forNewMovie ? "Add" : "Save"}
        </Button>
      </Stack>
    </>
  );
};

export default Form;
