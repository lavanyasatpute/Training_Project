import { Equal, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { EventDTO } from "../DTO/event.dto";
import { Evententity } from "../entities/event";
import { User } from "../entities/User";
import { AppError } from "../utils/appError";
import { ApprovalStatus } from "../constant/aprrovalStatus";
import { Status } from "../constant/status";
import { classToPlain } from "class-transformer";

export class eventRepo {
    private eventRepository = AppDataSource.getRepository(Evententity);
    private userRepository = AppDataSource.getRepository(User)

    /**
     * @description
     * this method is used to adding event 
     * @param createEventDto 
     * @param creatorId 
     * @returns 
     */
    async createEvent(createEventDto: EventDTO, creatorId: string): Promise<string> {
        const CreatedBy = await this.userRepository.findOne({ where: { UserID: creatorId } });

        if (!CreatedBy) {
            throw new AppError('Creator not found', 400);
        }

        const event = this.eventRepository.create({
            ...createEventDto,
            CreatedBy,
            availableSeats: createEventDto.totalSeats
        });

        await this.eventRepository.save(event);

        return `${createEventDto.Title} event added successfully.`;
    }


    // async AddEvent(Eventdata:EventDTO){
    //     const event = await this.appDataSource.create(Eventdata)
    //     await this.appDataSource.save(event);
    //     return `${Eventdata.Title} this event added successfully...`
    // }

    /**
     * @description
     * Delete the Event it means changed the status
     * @param Event_id 
     * @returns 
     */
    async DeleteEvent(Event_id: string) {

        if (!Event_id) {
            throw new AppError('Event_id not found', 400);
        }
        const eventName = await this.eventRepository.update({ EventID: Event_id }, { status: Status.INACTIVE });
        // await this.appDataSource.update(id);
        return `${eventName} is deleted successfully...`
    }

    /**
     * @description
     * Update the data
     * @param id 
     * @param updatedData 
     * @returns 
     */
    async updateEvent(event_id: string, updatedData: Partial<Evententity>) {
        if (!event_id) {
            throw new AppError('Event_id not found', 400);
        }
        if (!updatedData) {
            throw new AppError('updatedData not found', 400);
        }
        const eventName = await this.eventRepository.findOne({ where: { EventID: event_id } });
        await this.eventRepository.update(event_id, updatedData);
        return `${eventName?.Title} is updated successfully....`
    }

    async getAllEvent() {
        const currentDate = new Date();
        const data = await this.eventRepository.find({ where: { status: Status.ACTIVE, approvalStatus: ApprovalStatus.APPROVED ,Schedule:MoreThanOrEqual(currentDate)} });
        // if(!data) return "Data is not found please add event...."
        return (data)
    }

    async getFilterEvent(event_id: string) {
        if (!event_id) {
            throw new AppError('EventID not found', 400);
        }
        const filterData = await this.eventRepository.findOne({ where: { EventID: event_id } })
        // const filterData = await this.appDataSource.find({where:{EventID:filterValue}})
        return filterData
    }

    async getFilterEventCreatedByUser(user_id: string) {
        if (!user_id) {
            throw new AppError('UserId not found', 400);
        }
        const filterData = await this.eventRepository.find({ where: { CreatedBy: { UserID: user_id }, approvalStatus:ApprovalStatus.APPROVED }, relations: ['CreatedBy'] })
        // const filterData = await this.appDataSource.find({where:{EventID:filterValue}})
        // console.log(filterData);

        return filterData
    }

    async getEventStats(event_id: string) {
        if (!event_id) {
            throw new AppError("Evnent id is empty", 400)
        }
        const event = await this.eventRepository.findOne({
            where: { EventID: event_id },
            relations: ['tickets']
        });

        if (!event) {
            throw new AppError('Event not found', 400);
        }

        const regularTicketsCount = event.Tickets.filter(t => t.TicketType === 'regular').length;
        const vipTicketsCount = event.Tickets.filter(t => t.TicketType === 'vip').length;
        const vvipTicketsCount = event.Tickets.filter(t => t.TicketType === 'vvip').length;

        return {
            totalTickets: event.Tickets.length,
            regularTickets: regularTicketsCount,
            vipTickets: vipTicketsCount,
            vvipTickets: vvipTicketsCount,
            remainingSeats: event.availableSeats
        };
    }

    async aprroveEvent(event_id: string, user_id: string, aprrovalValue: boolean) {
        if (!event_id && !aprrovalValue) {
            throw new AppError('Event_id and aprrovalValue not found', 400);
        }
        if (!aprrovalValue) {
            const eventName = await this.eventRepository.findOne({ where: { EventID: event_id } });
            await this.eventRepository.update(event_id, { approvalStatus: ApprovalStatus.REJECT, approvedBy: { UserID: user_id } });
            return `${eventName?.Title} is Rejected successfully....`
        }
        const eventName = await this.eventRepository.findOne({ where: { EventID: event_id } });
        await this.eventRepository.update(event_id, { approvalStatus: ApprovalStatus.APPROVED });
        return `${eventName?.Title} is aprroved successfully....`

    }

    async getAllEventForAdmin(){
        const data = await this.eventRepository.find({ where: { status: Status.ACTIVE, approvalStatus: ApprovalStatus.PENDING } });
        // if(!data) return "Data is not found please add event...."
        return classToPlain(data)

    }
}
