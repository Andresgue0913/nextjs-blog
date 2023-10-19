import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import Link from "next/link";
import { useRouter } from "next/router";

const MoviePage = ({ success, error, movie }) => {
    const router = useRouter()

  if (!success) {
    return (
      <div className="container text-center muy-5">
        <h1>{error}</h1>
        <Link href="/">
          <button className="btn btn-success">Volver...</button>
        </Link>
      </div>
    );
  }

  const deleteData = async(id) => {
    try {
      await fetch (`/api/movie/${id}`,{
        method: "DELETE"
      })
      router.push("/")
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className="container">
      <h1>Detalle de la Pelicula</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-uppercase">{movie.title}</h5>
          </div>
          <p className="fw-light">{movie.splot}</p>
          <Link href="/">
            <button className="btn btn-success btn-sm me-2">Volver...</button>
          </Link>
          <Link href={`/${movie._id}/edit`}>
            <button className="btn btn-warning btn-sm me-2">Editar</button>
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => deleteData(movie._id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;

export async function getServerSideProps({ params }) {
  try {
    await conectarDB();

    const movie = await Movie.findById(params.id).lean();

    if (!movie) {
      return { props: { success: false, error: "pelicula no encontrada" } };
    }

    console.log(movie);
    movie._id = `${movie._id}`;

    return { props: { success: true, movie } };
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return { props: { success: false, error: "id no valido" } };
    }
    return { props: { success: false, error: "Error de servidor" } };
  }
}
