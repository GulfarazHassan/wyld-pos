import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BusinessOwner } from "./BusinessOwner";

@Entity("business_staff")
export class BusinessStaff extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column()
  name: String;

  @Column()
  email: String;

  @Column()
  password: String;

  @Column({
    default: null,
  })
  profileImagePath: String;

  @Column({
    default: "businessStaff",
  })
  role: String;

  @ManyToOne(
    () => BusinessOwner,
    (businessOwner) => businessOwner.businessStaff
  )
  businessOwner: BusinessOwner;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
