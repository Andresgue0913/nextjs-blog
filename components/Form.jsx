import Link from "next/link"
import { useRouter } from "next/dist/client/router"
import { useState } from "react"

const Form = ({formData, forNewMovie = true}) => {

  const router = useRouter();

  const [form, setForm] = useState({
    title: formData.title,
    splot: formData.splot,
  });
  const [message, setMenssage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(forNewMovie){
      await postData(form);
    }else {
    putData(form)
    }
  };

  const putData = async (form) => {
    setMenssage([])
    const {id} = router.query
    try {
      const res = await fetch(`/api/movie/${id}`, {
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
        setMenssage([])
        router.push("/");
      }
    } catch (error) {
      console.log(error)
  }
  }
  const postData = async (form) => {
    try {
      console.log(form);
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
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control my-2"
        type="text"
        placeholder="Title"
        autoComplete="off"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Splot"
        autoComplete="off"
        name="splot"
        value={form.splot}
        onChange={handleChange}
      />
      <button className="btn btn-primary w-100" type="submit">
        {forNewMovie ? "Agregar" : "editar"}
      </button>
      <Link href="/">
        <button className="btn btn-warning w-100 my-2">volver...</button>
      </Link>
      {message.map(({ message }) => (
        <p key={message}>{message}</p>
      ))}
    </form>
  );
};

export default Form;
