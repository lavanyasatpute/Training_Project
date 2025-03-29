import { IsEmail, IsString, IsNotEmpty, Matches } from 'class-validator';
export class UserDTO {
    @IsNotEmpty()
    @IsString()
    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Name: string;

    @IsNotEmpty()
    @IsEmail()
    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Email: string;

    @IsNotEmpty()
    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Username: Date;

    @IsNotEmpty()
    @IsString()
    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Password: string;

    @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    @Matches(/^[0-9]+$/, { message: "ContactDetails must contain only digits." })
    @IsString()
    ContactDetails: string;

    // @IsNotEmpty()
    // @IsString()
    // @Matches(/^.*\S.*$/, { message: "The field must not be empty or contain only spaces" })
    Role: string;
}
