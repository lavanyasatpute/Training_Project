import { AppDataSource } from "../config/data-source";
import { Evententity } from "../entities/event";

export class eventRepo{
    private appDataSource = AppDataSource.getRepository(Evententity);

    async AddEvent(Eventdata:Partial<Evententity>){
        const event = await this.appDataSource.create(Eventdata)
        await this.appDataSource.save(event);
        return `${Eventdata} this event added successfully...`
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

