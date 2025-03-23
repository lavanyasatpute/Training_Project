import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ticket } from "./Ticket";
import { Feedback } from "./Feedback";

@Entity()
export class Evententity {
    @PrimaryGeneratedColumn()
    EventID: number;

    @Column({name:"Title"})
    Title: string;

    @Column("text")
    Description: string;

    @Column()
    Schedule: Date;

    @Column()
    Location: string;

    @Column()
    Categories: string;

    @OneToMany(() => Ticket, (ticket) => ticket.Event)
    Tickets: Ticket[];

    @OneToMany(() => Feedback, (feedback) => feedback.Event)
    Feedbacks: Feedback[];
}
