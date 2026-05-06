
import {z} from "zod";

export const CreateProductSchema = z.object({
    name: z.string().min(4, 'title harus minimal 4 karakter!'),
    price: z.coerce.number().int(),
    description: z.string().min(10, 'deskripsi minimal 10 karakter!'),
    category: z.string().min(1, 'category is required!'),
    stock: z.coerce.number().int(),
    isActive: z.coerce.boolean().default(true)
})

export const UpdateProductSchema = CreateProductSchema.partial();

export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;
export type UpdateProductSchemaType = z.infer<typeof UpdateProductSchema>;