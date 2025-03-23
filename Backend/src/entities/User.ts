import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ticket } from "./Ticket";
import { Feedback } from "./Feedback";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    UserID: number;

    @Column()
    Name: string;

    @Column({ unique: true })
    Email: string;

    @Column()
    Password: string;

    @Column()
    ContactDetails: string;

    @OneToMany(() => Ticket, (ticket) => ticket.User)
    Tickets: Ticket[];

    @OneToMany(() => Feedback, (feedback) => feedback.User)
    Feedbacks: Feedback[];
}
