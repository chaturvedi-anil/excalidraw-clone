import { z } from "zod";

export const CreateUserSchema = z.object({
    username: 
        z.string({message: "please provide username!"}).min(3, {message: "username must be at least 3 character long!"}).max(50, {message: "username can not be  long than 50 character!"}),
    password: 
        z.string({message: "please provide password!"}).min(3, {message: "password must be at least 3 character long!"}).max(50, {message: "password can not be  long than 50 character!"}),
    name: 
        z.string({message: "please provide name!"}).min(3, {message: "name must be at least 3 character long!"}).max(50, {message: "name can not be  long than 50 character!"})
});

export const SigninSchema = z.object({
    username: 
        z.string({message: "please provide username!"}).min(3, {message: "username must be at least 3 character long!"}).max(50, {message: "username can not be  long than 50 character!"}),
    password: 
        z.string({message: "please provide password!"}).min(3, {message: "password must be at least 3 character long!"}).max(50, {message: "password can not be  long than 50 character!"}),
})

export const CreateRoomSchema = z.object({
    name: 
        z.string({message: "please provide name!"}).min(3, {message: "name must be at least 3 character long!"}).max(50, {message: "name can not be  long than 50 character!"})
})