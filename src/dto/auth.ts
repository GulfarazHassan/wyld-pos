import * as yup from "yup";

export const authDto = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().trim().required(),
});

export const registerDto = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().trim().required(),
  businessName: yup.string().required(),
  logoImagePath: yup.string().required(),
});

export const changePasswordDto = yup.object().shape({
  email: yup.string().required().email(),
  oldPassword: yup.string().trim().required(),
  newPassword: yup.string().trim().required(),
});
