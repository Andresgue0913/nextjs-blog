import { useState } from "react";
import MovieCategory from "./MovieCategory";

const Form = ({ updateMovieList, formData, forNewMovie = true, isEditing }) => {
  const [message, setMenssage] = useState([]);
  const [selectedOption, setSelectedOption] = useState(""); // Estado para almacenar la opción seleccionada

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Actualiza el estado con el valor seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target["title"].value;
    const splot = e.target["splot"].value;
    let _id = formData.id;
    const form = { _id, title, splot, category: selectedOption };
    let data;
    console.log(e.target["category"]);

    try {
      if (forNewMovie) {
        data = await postData(form);
      } else if (isEditing) {
        data = await putData(form);
      }
      updateMovieList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const putData = async (form) => {
    setMenssage([]);
    try {
      const res = await fetch(`/api/movie/${form._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMenssage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message },
          ]);
        }
      } else {
        setMenssage([]);
        return data.data;
        //   router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMenssage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message },
          ]);
        }
      } else {
        return data.movie;
        // router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log(selectedOption)
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control my-2"
        type="text"
        placeholder="Title"
        autoComplete="off"
        name="title"
        defaultValue={formData.title}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Splot"
        autoComplete="off"
        name="splot"
        defaultValue={formData.splot}
      />
      <MovieCategory {...{ handleOptionChange, selectedOption }} />
      <button className="btn btn-primary w-100" type="submit">
        {forNewMovie ? "Agregar" : "editar"}
      </button>
      {message.map(({ message }) => (
        <p key={message}>{message}</p>
      ))}
    </form>
  );
};

export default Form;
