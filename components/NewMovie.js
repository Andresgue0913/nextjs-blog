import { useState } from "react";
import Form from "./Form";
import {
  Button,
  Card,
  CardActionArea,
  Container,
  Stack,
  Typography,
} from "@mui/material";
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
    <Card
      sx={{
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography gutterBottom variant="h5">
          Create new movie
        </Typography>
        <Button variant="contained" color="warning" onClick={handleClick}>
          <CloseIcon />
        </Button>
      </Stack>
      <Form
        handleClose={handleClose}
        updateMovieList={updateMovieList}
        formData={formData}
      />
    </Card>
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
