import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { Ticket } from "./Ticket";
import { Feedback } from "./Feedback";
import { Exclude } from "class-transformer";
import { RelationOfEventUser } from "./relation_between_events_user";

@Entity("User_tbl_2008")
export class User {
    @Exclude()
    @PrimaryGeneratedColumn()
    UserID: number;

    @Column()
    Name: string;
    
// unique: true
    @Column({unique: true})
    Email: string;

    @Column()
    Username:string;

    @Exclude()
    @Column()
    Password: string;

    @Column()
    ContactDetails: string;
    
    @Column()
    role:string;

    @OneToMany(() => Ticket, (ticket) => ticket.User)
    Tickets: Ticket[];

    @OneToMany(() => Feedback, (feedback) => feedback.User)
    Feedbacks: Feedback[];

    @ManyToMany(() => RelationOfEventUser, (relationOfEventUser) => relationOfEventUser.userId)
    userId: RelationOfEventUser;

   
}