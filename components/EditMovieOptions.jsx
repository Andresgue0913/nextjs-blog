import Form from "@/components/Form";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
};

const EditMovieOptions = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: movie, error } = useSWR(
    id ? `/api/movie/${id}` : null,
    fetcher
  );

  if (error) {
    return <div>Error</div>;
  }

  if (!movie) {
    return (
      <Container>
        <Typography gutterBottom variant="h5" component="div">Loading...</Typography>
      </Container>
    );
  }

  const formData = {
    title: movie.title,
    splot: movie.splot,
  };

  return (
    <Container sx={{
      display: "flex"
    }}>
      <Typography gutterBottom variant="h5" component="div">Editar peliculas</Typography>
      <Form forNewMovie={false} formData={formData}></Form>
    </Container> 
  );
};

export default EditMovieOptions;
