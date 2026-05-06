
export type Products = {
    id: string
    name: string
    price: number
    description: string
    category: string
    stock: number
    isActive: boolean
}[]

export type Product = {
    id: string
    name: string
    price: number
    description: string
    stock: number
    category: string
    isActive: boolean
}