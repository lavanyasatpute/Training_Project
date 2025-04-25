export enum Role {
    Admin = "admin",
    User = "user",
    Manager = "manager"
}

export interface IUser {
    Name: string;
    Email: string;
    Username: string;
    Password: string;
    ContactDetails: string;
    role: Role;
    location:string
}