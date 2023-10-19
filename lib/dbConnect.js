import moongose from "mongoose";

const URI_MONGO = process.env.URI_MONGO;

const conectarDB = async () => {
  try {
    await moongose.connect(URI_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb conectado");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default conectarDB;
