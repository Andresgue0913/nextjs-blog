import { useState } from "react";
import Form from "./Form";
import MovieCategory from "./MovieCategory";

const NewMovie = ({ updateMovieList }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const formData = {
    title: "",
    splot: "",
  };

  return show ? (
    <div className="container">
      <div>
        <h1 className="my-3">Agregar Movie</h1>
        <button className="btn btn-danger w-20 mb-2" onClick={handleClick}>
          Cerrar
        </button>
      </div>
      <Form updateMovieList={updateMovieList} formData={formData} />
    </div>
  ) : (
    <button className="btn btn-primary w-100 mb-2" onClick={handleClick}>
      Agregar
    </button>
  );
};

export default NewMovie;
