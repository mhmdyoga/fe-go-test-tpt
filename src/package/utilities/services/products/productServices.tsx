import { CreateProductSchemaType, UpdateProductSchemaType } from "@/package/schema/product/productSchema";
import { api } from "../../axiosInstansce/axiosInstances";
import { Product, Products } from "../../types/productTypes";
import { ResponseData } from "../../types/ResponseType";

export const productServices = {
    getAllProduct: async(): Promise<ResponseData<Products>> => {
        const {data} = await api.get('/products');
        console.log('Log dari service: ', data)
        return data
    },

    getProductByID: async(id: string): Promise<ResponseData<Product>> => {
        const {data} = await api.get(`/products/${id}`);
        return data;
    },

    createProduct: async(payload: CreateProductSchemaType): Promise<Product> => {
        const {data} = await api.post('/products', payload);
        return data;
    },

    updateProduct: async(id: string, payload: UpdateProductSchemaType): Promise<Partial<Product>> => {
        const {data} = await api.put(`/products/${id}`, payload);
        return data;
    },

    deleteProduct: async(id: string): Promise<Product> => {
        return await api.delete(`/products/${id}`);
    }
}