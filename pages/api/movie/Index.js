import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";

export default async function handler(req, res) {
  await conectarDB();

  const { method } = req;
  console.log(method);
  switch (method) {
    case "POST":
      try {
        const movie = new Movie(req.body);
        await movie.save();
        return res.status(200).json({ success: true, movie });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ succes: false, error: "Falla del servidor" });
  }
}
