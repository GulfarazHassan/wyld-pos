import * as yup from "yup";

export const createDto = yup.object().shape({
  productCategoryId: yup.string().required(),
  numberOfVariants: yup.number().required(),
  variantsText: yup.string().required(),
  images: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
});

export const updateDto = yup.object().shape({
  productId: yup.string().required(),
});
