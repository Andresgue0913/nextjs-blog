import Form from "./Form";

const EditMovie = ({ updateMovieList, handleClick, splot, title, id }) => {
  return (
    <div className="container">
      <div>
        <h1 className="my-3">Editar Movie</h1>
        <button className="btn btn-danger w-20 mb-2" onClick={handleClick}>
          Cerrar
        </button>
      </div>
      <Form
        updateMovieList={updateMovieList}
        formData={{ splot, title, id }}
        forNewMovie={false}
        isEditing={true}
      />
    </div>
  );
};

export default EditMovie;
