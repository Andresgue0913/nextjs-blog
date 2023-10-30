import Form from "@/components/Form";
import { Container, Typography } from "@mui/material";

const AddNewMovieButton = () => {
  const formData = {
    title: "",
    splot: "",
  };

  return (
    <Container>
      <Typography gutterBottom variant="h5" component="div">
        Agregar Movie
      </Typography>
      <Form formData={formData} />
    </Container>
  );
};

export default AddNewMovieButton;
