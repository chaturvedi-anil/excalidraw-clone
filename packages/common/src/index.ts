import z from "zod";

export const signinSchema = z.object({
    email: z.string().min(3, {message: "must be at least 3 char long"}).max(50, {message: "must not be more than 50 char" }),
    password: z.string().min(5, {message: "must be at least 3 char long"}).max(50, {message: "must not be more than 32 char" })
});


export const signupSchema = z.object({
    name: z.string().min(3, {message: "must be at least 3 char long"}).max(50, {message: "must not be more than 50 char" }),
    email: z.string().min(3, {message: "must be at least 3 char long"}).max(50, {message: "must not be more than 50 char" }),
    password: z.string().min(3, {message: "must be at least 3 char long"}).max(50, {message: "must not be more than 32 char" })
})

