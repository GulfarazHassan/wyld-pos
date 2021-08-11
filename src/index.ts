import { createConnection } from "typeorm";
import express from "express";
import { ErrorHandler, NotFound } from "./middlewares/error";
import { businessOwnerRouter } from "./routes/BusinessOwner";
import { BusinessOwner } from "./entities/BusinessOwner";
import { customerRouter } from "./routes/Customer.routes";
import { Customer } from "./entities/Customer";
import { BusinessStaff } from "./entities/BusinessStaff";
import { businessStaffRouter } from "./routes/BusinessStaff.routes";
import { ProductCategory } from "./entities/ProductCategory";
import { Product } from "./entities/Product";
import { productCategoryRouter } from "./routes/ProductCategory.routes";
import { productRouter } from "./routes/Product.routes";

const app = express();

const main = async () => {
  try {
    // Local MySql
    // await createConnection({
    //   type: "mysql",
    //   host: "127.0.0.1",
    //   port: 3306,
    //   username: "root",
    //   password: "gulfaraz",
    //   database: "wyld_local",
    //   entities: [
    //     BusinessOwner,
    //     BusinessStaff,
    //     Customer,
    //     ProductCategory,
    //     Product,
    //   ],
    //   synchronize: true,
    // });

    // aws RDS
    await createConnection({
      type: "mysql",
      host: "database-1.cjk3d2sumtpo.eu-west-2.rds.amazonaws.com",
      port: 3306,
      username: "admin",
      password: "wyldadmin",
      database: "wyld",
      entities: [
        BusinessOwner,
        BusinessStaff,
        Customer,
        ProductCategory,
        Product,
      ],
      synchronize: true,
    });

    app.use(express.json());
    app.use(businessOwnerRouter);
    app.use(customerRouter);
    app.use(businessStaffRouter);
    app.use(productCategoryRouter);
    app.use(productRouter);
    console.log("Connected to database");
    app.use(NotFound);
    app.use(ErrorHandler);
    app.listen(8080, () => {
      console.log("app is running on port 8080");
    });
  } catch (error) {
    console.error("Unable to connect to database :: ", error);
  }
};

main();
