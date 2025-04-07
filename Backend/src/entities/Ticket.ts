import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Evententity } from "./event";
import { User } from "./User";

export enum TicketType {
    REGULAR = 'regular',
    VIP = 'vip',
    VVIP = 'vvip'
}

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    TicketID: number;

    @ManyToOne(() => Evententity, (event) => event.Tickets)
    Event: Evententity;

    @ManyToOne(() => User, (user) => user.purchasedTickets)
    purchaser: User;

    @Column({
        type: 'enum',
        enum: TicketType,
        default: TicketType.REGULAR
    })
    TicketType: string;

    @CreateDateColumn()
    PurchaseDate: Date;

    @Column({ nullable: true })
    seatNumber: string;


    @Column('decimal', { precision: 10, scale: 2 })
    Price: number;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

