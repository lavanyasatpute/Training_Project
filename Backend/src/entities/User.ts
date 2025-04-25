import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Ticket } from "./Ticket";
import { Feedback } from "./Feedback";
import { Exclude } from "class-transformer";
import { RelationOfEventUser } from "./relation_between_events_user";
import { Evententity } from "./event";

@Entity("User_tbl_2008")
export class User {
    // @Exclude()
    @PrimaryGeneratedColumn('uuid')
    UserID: string;

    @Column()
    Name: string;

    @Column({ unique: true })
    Email: string;

    @Column()
    Username: string;

    @Exclude()
    @Column()
    Password: string;

    @Column()
    ContactDetails: string;

    @Column()
    role: string;

    @Column()
    location: string;

    @OneToMany(() => Ticket, ticket => ticket.purchaser)
    purchasedTickets: Ticket[];

    @OneToMany(() => Feedback, (feedback) => feedback.User)
    Feedbacks: Feedback[];

    @ManyToMany(() => RelationOfEventUser, (relationOfEventUser) => relationOfEventUser.userId)
    userId: RelationOfEventUser;

    @OneToMany(() => Evententity, (event) => event.CreatedBy)
    createdEvents: Evententity[];

    @Exclude()
    @Column({default:'active'})
    status:string
}

