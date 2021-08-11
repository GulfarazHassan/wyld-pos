import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("customer")
export class Customer extends BaseEntity {
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
    default: "customer",
  })
  role: String;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
