"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const error_1 = require("./middlewares/error");
const BusinessOwner_1 = require("./routes/BusinessOwner");
const BusinessOwner_2 = require("./entities/BusinessOwner");
const Customer_routes_1 = require("./routes/Customer.routes");
const Customer_1 = require("./entities/Customer");
const BusinessStaff_1 = require("./entities/BusinessStaff");
const BusinessStaff_routes_1 = require("./routes/BusinessStaff.routes");
const ProductCategory_1 = require("./entities/ProductCategory");
const Product_1 = require("./entities/Product");
const ProductCategory_routes_1 = require("./routes/ProductCategory.routes");
const Product_routes_1 = require("./routes/Product.routes");
const app = express_1.default();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection({
            type: "mysql",
            host: "database-1.cjk3d2sumtpo.eu-west-2.rds.amazonaws.com",
            port: 3306,
            username: "admin",
            password: "wyldadmin",
            database: "wyld",
            entities: [
                BusinessOwner_2.BusinessOwner,
                BusinessStaff_1.BusinessStaff,
                Customer_1.Customer,
                ProductCategory_1.ProductCategory,
                Product_1.Product,
            ],
            synchronize: true,
        });
        app.use(express_1.default.json());
        app.use(BusinessOwner_1.businessOwnerRouter);
        app.use(Customer_routes_1.customerRouter);
        app.use(BusinessStaff_routes_1.businessStaffRouter);
        app.use(ProductCategory_routes_1.productCategoryRouter);
        app.use(Product_routes_1.productRouter);
        console.log("Connected to database");
        app.use(error_1.NotFound);
        app.use(error_1.ErrorHandler);
        app.listen(8080, () => {
            console.log("app is running on port 8080");
        });
    }
    catch (error) {
        console.error("Unable to connect to database :: ", error);
    }
});
main();
//# sourceMappingURL=index.js.map