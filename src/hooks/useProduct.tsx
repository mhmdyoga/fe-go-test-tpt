"use client";
import { CreateProductSchemaType, UpdateProductSchemaType } from "@/package/schema/product/productSchema";
import { productServices } from "@/package/utilities/services/products/productServices"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner";

export const useGetProducts = () =>  {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: () => productServices.getAllProduct()
    });

    return {
        data: data?.data,
        isError,
        isLoading
    }
}

export const useGetProductByID = (id: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => productServices.getProductByID(id)
    });

    return {
        data: data?.data,
        isLoading,
        isError
    }
}

type updateProductType = {
    id: string,
    payload: UpdateProductSchemaType
}

export const useProduct = (id?: string) => {

    const createProduct = useMutation({
        mutationFn: (payload: CreateProductSchemaType) => productServices.createProduct(payload),
        onSuccess: () => {
            toast.success('Upload Product Successfully!');
        },
        onError: (err) => {
            toast.error('Failed to upload product: ' + err)
        }
    });

    const updateProduct = useMutation({
        mutationFn: (payload: UpdateProductSchemaType) => productServices.updateProduct(id!, payload),
        onSuccess: () => {
            toast.success('Product successfully edited!');
        },
        onError: (err) => {
            toast.error('Error Edited Product: ' + err)
        }
    });


    const deletedProduct = useMutation({
        mutationFn: (id: string ) => productServices.deleteProduct(id),
        onSuccess: () => {
            toast.success("Product deleted successfully!")
        },
        onError: (err) => {
            toast.error('Failed to deleted Product!' + err)
        }
    })


    return {
        createProduct: createProduct.mutateAsync,
        updateProduct: updateProduct.mutateAsync,
        deletedProduct: deletedProduct.mutateAsync,
        isCreatingProduct: createProduct.isPending,
        isUpdatingProduct: updateProduct.isPending,
        deletingProduct: deletedProduct.isPending
    }
}