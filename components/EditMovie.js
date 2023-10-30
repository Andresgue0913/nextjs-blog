import Form from "./Form";
import { Button, Card, Typography, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditMovie = ({ updateMovieList, handleClick, splot, title, id }) => {
  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography gutterBottom variant="h5">
          Edit Movie
        </Typography>
        <Button variant="contained" color="warning" onClick={handleClick}>
          <CloseIcon />
        </Button>
      </Stack>
      <Form
        updateMovieList={updateMovieList}
        formData={{ splot, title, id }}
        forNewMovie={false}
        isEditing={true}
      />
    </Card>
  );
};

export default EditMovie;
