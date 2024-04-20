import {z} from "zod"

export const verifySchema=z.object({
    code:z.string().length(6,"verify cose lenght must be 6")
})



