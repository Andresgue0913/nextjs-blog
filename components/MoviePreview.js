import React, { useState } from "react";
import EditMovie from "./EditMovie";

const MoviePreview = ({
  id,
  splot,
  title,
  updateMovieList,
  deleteMovieFromList,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  const handleShowEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/movie/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        deleteMovieFromList(id);
      }
    } catch (error) {
      console.error("Error al eliminar la película:", error);
    }
  };

  if (showEditForm) {
    return (
      <EditMovie
        {...{
          updateMovieList,
          handleClick: handleShowEditForm,
          splot,
          title,
          id,
        }}
      />
    );
  }
  if (!showOptions) {
    return (
      <div className="container">
        <p className="fw-light">{showOptions ? "Agregar" : `${splot}`}</p>
        <div>
          <button className="btn btn-success me-2" onClick={handleShowOptions}>
            Back
          </button>
          <button className="btn btn-warning me-2" onClick={handleShowEditForm}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <p className="fw-light">{showOptions ? "..." : `${splot}`}</p>
        <button className="btn btn-info me-2" onClick={handleShowOptions}>
          More info...
        </button>
      </div>
    );
  }
};

export default MoviePreview;
