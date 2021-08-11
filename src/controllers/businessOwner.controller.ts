import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { BusinessOwner } from "../entities/BusinessOwner";
import generateToken from "../utils/generateToken";

export const createBusinessOwner = async (req: Request, res: Response) => {
  const { businessName, email, password, logoImagePath } = req.body;
  const businessExist = await BusinessOwner.findOne({ email: email });
  if (businessExist) {
    return res
      .status(400)
      .json({ message: "Business with this email already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const businessOwner = BusinessOwner.create({
    businessName,
    email,
    password: hashPassword,
    logoImagePath,
  });

  await businessOwner.save();
  return res.json({
    id: businessOwner.id,
    businessName: businessOwner.businessName,
    email: businessOwner.email,
    logoImagePath: businessOwner.logoImagePath,
    token: generateToken(businessOwner.id),
  });
};

export const loginBusinessOwner = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const businessOwner: any = await BusinessOwner.findOne({ email: email });
  const compairPasswords = await bcrypt.compare(
    password,
    businessOwner.password
  );
  if (compairPasswords) {
    return res.json({
      id: businessOwner.id,
      businessName: businessOwner.businessName,
      email: businessOwner.email,
      logoImagePath: businessOwner.logoImagePath,
      token: generateToken(businessOwner.id),
    });
  } else {
    return res.json({
      message: "Email or password incorrect",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { email, newPassword, oldPassword } = req.body;
  const user: any = await BusinessOwner.findOne({ email });

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

export const getBusinessOwnerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: `Missing id in params` });
  }

  const businessOwner: any = await BusinessOwner.findOne(id);
  if (!businessOwner) {
    return res.status(404).json({ message: `User agains ${id} not exists.` });
  }

  return res.json({
    id: businessOwner.id,
    businessName: businessOwner.businessName,
    email: businessOwner.email,
    logoImagePath: businessOwner.logoImagePath,
  });
};

export const getAllBusinessOwners = async (req: Request, res: Response) => {
  const businessOwners = await BusinessOwner.find();

  return res.json({
    businessOwners,
  });
};
