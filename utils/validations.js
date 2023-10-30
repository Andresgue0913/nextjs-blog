import * as yup from "yup";

export const searchValidationSchema = yup.object({
  searchMovies: yup
    .string("Enter the movie")
    .required("enter the movie you want to see"),
});

export const addOrEditValidationSchema = yup.object({
  title: yup.string("Enter the title").required("Title is required"),
  splot: yup
    .string("Enter the plot")
    .min(10, "The plot should be of minimum 10 characters length")
    .required("Password is required"),
});
