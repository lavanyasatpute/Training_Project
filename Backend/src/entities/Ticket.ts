import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Evententity } from "./event";
import { User } from "./User";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    TicketID: number;

    @ManyToOne(() => Evententity, (event) => event.Tickets)
    Event: Evententity;

    @ManyToOne(() => User, (user) => user.Tickets)
    User: User;

    @Column()
    TicketType: string;

    @Column()
    PurchaseDate: Date;
}
