import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('events')
export class EventEntity {

    @PrimaryGeneratedColumn()
    eventId: string;

    @Column()
    userId: string;
    
    @Column()
    categoryId: string;

    @Column()
    status: Status;

    @Column({nullable: true})
    startTime: string;

    @Column({nullable: true})
    endTime: string;
  
  }

  export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
  }