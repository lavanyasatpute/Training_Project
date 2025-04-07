import { RelationOfEventUser } from "../entities/relation_between_events_user";
import { EventUserRepo } from "../repository/relation_of_Event_User.repository";
import { AppError } from "../utils/appError";


export class EventUserService {
    private eventUserRepo = new EventUserRepo()

    async AddEventUser(eventUser: Partial<RelationOfEventUser>) {
        if (!eventUser.eventId) throw new AppError("Event is missing please add event id", 404);
        if (!eventUser.userId) throw new AppError("User is missing please add user id", 404);
        const result = await this.eventUserRepo.AddEventUser(eventUser);
        return result
    }

    async DeleteEventUser(user_id: string,event_id:string) {
        if (!event_id && !user_id) throw new AppError("Id is missing please add valid Id", 404);
        const result = await this.eventUserRepo.DeleteEventUser(user_id,event_id);
        return result
    }

    async getFilteredEventUser(userId: string) {
        if(!userId) throw new AppError("User Id is missing",404)
        return await this.eventUserRepo.getFilteredEventUser(userId);
    }

    

}