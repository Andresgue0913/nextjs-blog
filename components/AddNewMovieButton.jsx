import Form from "@/components/Form"


const AddNewMovieButton = () => {

  const formData = {
    title: "",
    splot: ""
  }

  return (
    <div className="container">
      <h1 className="my-3">Agregar Movie</h1>
      <Form formData={formData} />
    </div>
  )
}

export default AddNewMovieButton