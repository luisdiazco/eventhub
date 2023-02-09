import * as yup from "yup";

export const eventlistForm = yup.object().shape({
  distance: yup.number("Distance must be a number").positive("Distance must be a positive number").required("Distance is required"),
  keyword: yup.string("Keyword must be a string").required("Keyword is required"),
  minPrice: yup.number("Min price must be a number").positive("Min price must be a positive number").required("Min price is required"),
  maxPrice: yup.number("Max price must be a number").positive("Max price must be a positive number").required("Max price is required"),
});
