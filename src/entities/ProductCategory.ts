import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("product_category")
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column()
  businessId: String;

  @Column()
  title: String;

  @Column()
  image: String;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
