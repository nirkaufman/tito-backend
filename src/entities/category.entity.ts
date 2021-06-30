import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    categoryId: string;

    @Column()
    categoryName: string;
  
  }