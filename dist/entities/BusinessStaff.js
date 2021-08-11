"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessStaff = void 0;
const typeorm_1 = require("typeorm");
const BusinessOwner_1 = require("./BusinessOwner");
let BusinessStaff = class BusinessStaff extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], BusinessStaff.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BusinessStaff.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BusinessStaff.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BusinessStaff.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        default: null,
    }),
    __metadata("design:type", String)
], BusinessStaff.prototype, "profileImagePath", void 0);
__decorate([
    typeorm_1.Column({
        default: "businessStaff",
    }),
    __metadata("design:type", String)
], BusinessStaff.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BusinessOwner_1.BusinessOwner, (businessOwner) => businessOwner.businessStaff),
    __metadata("design:type", BusinessOwner_1.BusinessOwner)
], BusinessStaff.prototype, "businessOwner", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], BusinessStaff.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], BusinessStaff.prototype, "updated_at", void 0);
BusinessStaff = __decorate([
    typeorm_1.Entity("business_staff")
], BusinessStaff);
exports.BusinessStaff = BusinessStaff;
//# sourceMappingURL=BusinessStaff.js.map