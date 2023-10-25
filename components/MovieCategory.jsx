import React from "react";

const MovieCategory = ({ selectedOption, handleOptionChange }) => {
  return (
    <div>
      <fieldset>
        <legend name="category">Select a category</legend>
        <div>
          <input
            type="radio"
            value="terror"
            name="category"
            checked={selectedOption === "terror"}
            onChange={handleOptionChange}
          />
          <label htmlFor="terror"> Terror </label>
        </div>

        <div>
          <input
            type="radio"
            value="comedia"
            name="category"
            checked={selectedOption === "comedia"}
            onChange={handleOptionChange}
          />
          <label htmlFor="comedia"> Comedia </label>
        </div>

        <div>
          <input
            type="radio"
            value="accion"
            name="category"
            checked={selectedOption === "accion"}
            onChange={handleOptionChange}
          />
          <label htmlFor="accion"> Accion </label>
        </div>
      </fieldset>
    </div>
  );
};

export default MovieCategory;
