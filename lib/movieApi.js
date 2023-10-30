import toast from "react-hot-toast";

export const updateMovie = async (form) => {
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
        toast.error("Successfully edit!", error);
      }
    } else {
      toast.success("Successfully edit!");

      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createMovie = async (form) => {
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
      toast.error("Error created!");
      for (const key in data.error.errors) {
        let error = data.error.errors[key];
        setMenssage((oldmenssage) => [
          ...oldmenssage,
          { message: error.message },
        ]);
      }
    } else {
      toast.success("Successfully created!");
      return data.movie;
    }
  } catch (error) {
    console.log(error);
  }
};
