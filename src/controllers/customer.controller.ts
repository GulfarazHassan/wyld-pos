import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Customer } from "../entities/Customer";
import generateToken from "../utils/generateToken";

export const create = async (req: Request, res: Response) => {
  const { name, email, password, profileImagePath } = req.body;
  const customerExist = await Customer.findOne({ email: email });
  if (customerExist) {
    return res
      .status(400)
      .json({ message: "Customer with this email already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const customer = Customer.create({
    name,
    email,
    password: hashPassword,
    profileImagePath,
  });

  await customer.save();
  return res.status(200).json({
    id: customer.id,
    businessName: customer.name,
    email: customer.email,
    profileImagePath: customer.profileImagePath,
    token: generateToken(customer.id),
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const customer: any = await Customer.findOne({ email: email });
  const compairPasswords = await bcrypt.compare(password, customer.password);
  if (compairPasswords) {
    return res.json({
      businessName: customer.name,
      email: customer.email,
      profileImagePath: customer.profileImagePath,
      token: generateToken(customer.id),
    });
  } else {
    return res.json({
      message: "Email or password incorrect",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { email, newPassword, oldPassword } = req.body;
  const user: any = await Customer.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ message: `User agains ${email} not exists.` });
  }
  const compairPasswords = await bcrypt.compare(oldPassword, user.password);

  if (!compairPasswords) {
    return res.status(401).json({ message: `Wrong old password` });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashPassword;
  await user.save();

  return res.status(200).json({ message: `Password updated` });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: `Missing id in params` });
  }

  const businessOwner: any = await Customer.findOne(id);
  if (!businessOwner) {
    return res.status(404).json({ message: `User agains ${id} not exists.` });
  }

  return res.json({
    id: businessOwner.id,
    name: businessOwner.name,
    email: businessOwner.email,
    profileImagePath: businessOwner.profileImagePath,
  });
};

export const getAll = async (req: Request, res: Response) => {
  const customers = await Customer.find();

  return res.json({
    customers,
  });
};
