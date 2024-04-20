import {z} from "zod"

export const messageSchema=z.object({
    content:z.string().min(10,"Please enter a message").max(500,"Message too long"),
})


