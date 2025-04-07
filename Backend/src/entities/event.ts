import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, RelationId, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Ticket } from "./Ticket";
import { Feedback } from "./Feedback";
import { RelationOfEventUser } from "./relation_between_events_user";
import { User } from "./User";

@Entity("Event_tbl")
export class Evententity {
    @PrimaryGeneratedColumn('uuid')
    EventID: string;

    @Column({ name: "Title" })
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

    @ManyToMany(() => RelationOfEventUser, (relationOfEventUser) => relationOfEventUser.eventId)
    relationOfEventUser: RelationOfEventUser[];

    @ManyToOne(() => User, (user) => user.createdEvents, { nullable: false })
    CreatedBy: User;

    @RelationId((event: Evententity) => event.CreatedBy)
    CreatedById: number;

    @Column({ default: "active" })
    status: string

    @Column('decimal', { precision: 10, scale: 2 })
    regularPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    vipPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    vvipPrice: number;

    @Column('int', { default: 0 })
    totalSeats: number;

    @Column('int', { default: 0 })
    availableSeats: number;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
