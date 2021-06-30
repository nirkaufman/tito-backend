import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    userId: string;

    @Column()
    userName: string;

    @Column()
    bussinessId: string;
  
  }