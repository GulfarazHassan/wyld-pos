import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { BusinessStaff } from "./BusinessStaff";

@Entity("business_owner")
export class BusinessOwner extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column()
  businessName: String;

  @Column()
  email: String;

  @Column()
  password: String;

  @Column({
    default: null,
  })
  logoImagePath: String;

  @Column({
    default: "businessOwner",
  })
  role: String;

  @OneToMany(
    () => BusinessStaff,
    (businessStaff) => businessStaff.businessOwner,
    { eager: true }
  )
  businessStaff: BusinessStaff[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
