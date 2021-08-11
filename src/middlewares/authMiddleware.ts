import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { BusinessOwner } from "../entities/BusinessOwner";
import { Customer } from "../entities/Customer";
import { BusinessStaff } from "../entities/BusinessStaff";

const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, "123456789");
      req.user = await BusinessOwner.findOne(parseInt(decode.id));
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorize");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorize");
  }
};

const getBusinessUser = async (req: any, res: any, next: any) => {
  console.log("asda");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, "123456789");
      console.log("This is idd :; ", decode);
      const user = await BusinessOwner.findOne(decode.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).send("Not authorize");
    }
  }

  if (!token) {
    return res.status(401).send("Not authorize");
  }
};

const getCustomerUser = async (req: any, res: any, next: any) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, "123456789");
      const user = await Customer.findOne(decode.id);
      return res.status(200).json(user);
      next();
    } catch (error) {
      return res.status(401).send("Not authorize");
    }
  }

  if (!token) {
    return res.status(401).send("Not authorize");
  }
};

const getBusinessStaffUser = async (req: any, res: any, next: any) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, "123456789");
      const user = await BusinessStaff.findOne(decode.id);
      return res.status(200).json(user);
      next();
    } catch (error) {
      return res.status(401).send("Not authorize");
    }
  }

  if (!token) {
    return res.status(401).send("Not authorize");
  }
};

export { protect, getBusinessUser, getCustomerUser, getBusinessStaffUser };
