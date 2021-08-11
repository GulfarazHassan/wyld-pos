import * as yup from "yup";

export const createDto = yup.object().shape({
  businessId: yup.string().required(),
  title: yup.string().required(),
  image: yup.string().required(),
});

export const updateDto = yup.object().shape({
  productCategoryId: yup.string().required(),
});
