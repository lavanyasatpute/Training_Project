import { IsNotEmpty, IsString, IsDate, IsOptional, Matches, IsNumber, IsPositive } from "class-validator";

export class EventDTO {
    @IsNotEmpty()
    @IsString()
    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Title: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Description: string;

    @IsNotEmpty()
    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Schedule: Date;


    @IsNotEmpty()
    @IsString()
    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Location: string;

    @IsOptional()
    @IsString()
    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Categories: string;

    @IsNumber()
    @IsPositive()
    regularPrice: number;

    @IsNumber()
    @IsPositive()
    vipPrice: number;

    @IsNumber()
    @IsPositive()
    vvipPrice: number;

    @IsNumber()
    @IsPositive()
    totalSeats: number;
}
