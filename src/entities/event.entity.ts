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
    startTime: Date;

    @Column({nullable: true})
    endTime: Date;
  
  }

  export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
  }