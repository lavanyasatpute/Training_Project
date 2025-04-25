import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Evententity } from "./event";

@Entity("RelationOfEventUser_2008")
export class RelationOfEventUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => User,{cascade:true})
  @JoinColumn({ name: "userId" })
  user: User;
  
  @Column()
  userId: string;
  
  @ManyToOne(() => Evententity,{cascade : true})
  @JoinColumn({ name: "eventId" })
  event: Evententity;
  
  @Column()
  eventId: string;
}