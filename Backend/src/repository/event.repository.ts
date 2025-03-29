import { AppDataSource } from "../config/data-source";
import { EventDTO } from "../DTO/event.dto";
import { Evententity } from "../entities/event";

export class eventRepo{
    private appDataSource = AppDataSource.getRepository(Evententity);

    async AddEvent(Eventdata:EventDTO){
        const event = await this.appDataSource.create(Eventdata)
        await this.appDataSource.save(event);
        return `${Eventdata.Title} this event added successfully...`
    }

    async DeleteEvent(id:number){
        const eventName = await this.appDataSource.findOne({ where: { EventID: id } });
        await this.appDataSource.delete(id);
        return `${eventName} is deleted successfully...`
    }

    async updateEvent(id:number,updatedData:Partial<Evententity>){
        const eventName = await this.appDataSource.findOne({ where: { EventID: id } });
        await this.appDataSource.update(id,updatedData);
        return `${eventName} is updated successfully....`
    }

    async getAllEvent(){ 
        const data = await this.appDataSource.find();
        // if(!data) return "Data is not found please add event...."
        return data
    }

    async getFilterEvent(filterValue:Partial<Evententity>){
        const filterData = await this.appDataSource.find({where:filterValue})
    }



}

