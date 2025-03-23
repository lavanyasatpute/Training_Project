import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Evententity } from "./event";
import { User } from "./User";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    FeedbackID: number;

    @ManyToOne(() => Evententity, (event) => event.Feedbacks)
    Event: Event;

    @ManyToOne(() => User, (user) => user.Feedbacks)
    User: User;

    @Column("text")
    Comments: string;

    @Column()
    Rating: number;
}
