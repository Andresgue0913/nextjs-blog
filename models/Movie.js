import moongose from "mongoose";

const MovieSchema = new moongose.Schema({
  title: {
    type: String,
    required: [true, "por favor ingrese el titulo"],
  },
  splot: {
    type: String,
    required: [true, "por favor ingrese el splot"],
  },
});

export default moongose.models.Movie || moongose.model("Movie", MovieSchema);
