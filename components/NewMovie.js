import { useState } from "react";
import Form from "./Form";
import { Button, CardActionArea, Container, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const NewMovie = ({ updateMovieList }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  let handleClose = () => {
    setShow(!show);
  };

  const formData = {
    title: "",
    splot: "",
  };

  return show ? (
    <Container>
      <CardActionArea>
        <Typography gutterBottom variant="h5">
          Agregar Movie
        </Typography>
        <Button variant="contained" color="warning" onClick={handleClick}>
          <CloseIcon />
        </Button>
      </CardActionArea>
      <Form
        handleClose={handleClose}
        updateMovieList={updateMovieList}
        formData={formData}
      />
    </Container>
  ) : (
    <Fab
      onClick={handleClick}
      color="error"
      aria-label="add"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
    >
      <AddIcon />
    </Fab>
  );
};

export default NewMovie;
