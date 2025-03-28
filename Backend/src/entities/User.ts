import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ticket } from "./Ticket";
import { Feedback } from "./Feedback";

@Entity("User_tbl_2008")
export class User {
    @PrimaryGeneratedColumn()
    UserID: number;

    @Column()
    Name: string;
    
// unique: true
    @Column({unique: true})
    Email: string;

    @Column()
    Username:string;

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
}