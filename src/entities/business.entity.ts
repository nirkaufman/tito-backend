import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('businesses')
export class BusinessEntity {

    @PrimaryGeneratedColumn()
    bussinessId: string;

    @Column()
    businessName: string;
  
  }