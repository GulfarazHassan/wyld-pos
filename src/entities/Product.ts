import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column()
  productCategoryId: String;

  @Column()
  name: String;

  @Column()
  numberOfVariants: Number;

  @Column()
  variantsText: String;

  @Column()
  images: String;

  @Column()
  description: String;

  @Column()
  price: Number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
