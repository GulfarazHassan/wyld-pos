import jwt from "jsonwebtoken";

const generateToken = (id: any) => {
  return jwt.sign({ id }, "123456789", {
    expiresIn: "30d",
  });
};

export default generateToken;
