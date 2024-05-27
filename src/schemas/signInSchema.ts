import { z } from "zod";

export const singInSchema=z.object({
    identifier:z.string(),  // can also use username instead of identifier
    password:z.string(),
})

