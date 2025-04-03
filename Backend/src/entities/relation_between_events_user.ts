import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { User } from "./User";
import { Evententity } from "./event";

@Entity("RelationOfEventUser_2008")
export class RelationOfEventUser {
    @PrimaryGeneratedColumn({ type: 'int' })
    id : number;

    @ManyToMany(() => User, (user) => user.UserID)
    @Column({ type: 'int' })
    userId: User;

    @ManyToMany(() => Evententity, (event) => event.EventID)
    @Column({ type: 'int' })
    EventId: Evententity;
}
