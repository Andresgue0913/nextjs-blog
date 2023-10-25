export const updateMovie = async (form) => {
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
