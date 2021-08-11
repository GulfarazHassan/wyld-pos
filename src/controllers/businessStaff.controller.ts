import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { BusinessStaff } from "../entities/BusinessStaff";
import { BusinessOwner } from "../entities/BusinessOwner";
import { Customer } from "../entities/Customer";
import generateToken from "../utils/generateToken";

export const create = async (req: Request, res: Response) => {
  const { name, email, password, profileImagePath, businessStaffId } = req.body;
  const businessOwner = await BusinessOwner.findOne(businessStaffId);
  if (!businessOwner) {
    return res.status(400).json({
      message: `Business_Owner with this id=${businessStaffId} not exists`,
    });
  }
  const businessStaffExist = await BusinessStaff.findOne({ email: email });
  if (businessStaffExist) {
    return res.status(400).json({
      message: `Business_Staff with this email=${email} already exists`,
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const createBusinessStaff = BusinessStaff.create({
    name,
    email,
    password: hashPassword,
    profileImagePath,
    businessOwner: businessOwner,
  });

  await createBusinessStaff.save();
  return res.json({
    id: createBusinessStaff.id,
    businessName: createBusinessStaff.name,
    email: createBusinessStaff.email,
    profileImagePath: createBusinessStaff.profileImagePath,
    token: generateToken(createBusinessStaff.id),
    businessOwner: createBusinessStaff.businessOwner,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const businessStaff: any = await BusinessStaff.findOne({ email: email });
  if (!businessStaff) {
    return res.status(400).json({
      message: `Business_Staff with this email=${email} not exists`,
    });
  }
  const compairPasswords = await bcrypt.compare(
    password,
    businessStaff.password
  );
  if (compairPasswords) {
    return res.json({
      businessName: businessStaff.name,
      email: businessStaff.email,
      profileImagePath: businessStaff.profileImagePath,
      token: generateToken(businessStaff.id),
    });
  } else {
    return res.json({
      message: "Email or password incorrect",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { email, newPassword, oldPassword } = req.body;
  const user: any = await BusinessStaff.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ message: `Business_Staff agains ${email} not exists.` });
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

  const user: any = await BusinessStaff.findOne(id);
  console.log("sadsa :: ", user);
  if (!user) {
    return res
      .status(404)
      .json({ message: `Business_Staff agains ${id} not exists.` });
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    profileImagePath: user.profileImagePath,
  });
};

export const getAll = async (req: Request, res: Response) => {
  const users = await BusinessStaff.find();

  return res.status(200).json({
    business_staff: users,
  });
};
