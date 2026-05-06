"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetProducts, useProduct } from "@/hooks/useProduct";
import { MoreHorizontal, Pencil, Trash2, Plus, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/package/utilities/types/productTypes";

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useGetProducts();
  const router = useRouter();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
          <p className="text-zinc-400 text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <p className="text-red-400 text-sm">Failed to fetch products.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10 md:px-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-lg">
            <Package className="w-5 h-5 text-zinc-300" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">Products</h1>
            <p className="text-zinc-500 text-sm">{products?.length ?? 0} items total</p>
          </div>
        </div>
        <Button
          onClick={() => router.push("/products/create")}
          className="bg-white text-zinc-900 hover:bg-zinc-200 text-sm font-medium gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 bg-zinc-900 hover:bg-zinc-900">
              <TableHead className="text-zinc-400 font-medium text-xs uppercase tracking-wider w-8">#</TableHead>
              <TableHead className="text-zinc-400 font-medium text-xs uppercase tracking-wider">Name</TableHead>
              <TableHead className="text-zinc-400 font-medium text-xs uppercase tracking-wider">Category</TableHead>
              <TableHead className="text-zinc-400 font-medium text-xs uppercase tracking-wider">Price</TableHead>
              <TableHead className="text-zinc-400 font-medium text-xs uppercase tracking-wider">Stock</TableHead>
              <TableHead className="text-zinc-400 font-medium text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-zinc-400 font-medium text-xs uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((product: Product, index: number) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  index={index + 1}
                  formatPrice={formatPrice}
                  onEdit={() => router.push(`/products/${product.id}/edit`)}
                />
              ))
            ) : (
              <TableRow className="border-zinc-800 hover:bg-zinc-900">
                <TableCell colSpan={7} className="text-center text-zinc-500 py-16">
                  <div className="flex flex-col items-center gap-2">
                    <Package className="w-8 h-8 text-zinc-700" />
                    <p className="text-sm">No products yet</p>
                    <button
                      onClick={() => router.push("/products/create")}
                      className="text-xs text-zinc-400 underline underline-offset-2 hover:text-white transition-colors"
                    >
                      Add your first product
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Row Component
function ProductRow({
  product,
  index,
  formatPrice,
  onEdit,
}: {
  product: Product;
  index: number;
  formatPrice: (price: number) => string;
  onEdit: () => void;
}) {
  const { deletedProduct, deletingProduct } = useProduct(String(product.id));

  const handleDelete = async () => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    await deletedProduct(product.id);
  };

  return (
    <TableRow className="border-zinc-800 hover:bg-zinc-900/60 transition-colors">
      <TableCell className="text-zinc-600 text-sm">{index}</TableCell>
      <TableCell>
        <div>
          <p className="text-white font-medium text-sm">{product.name}</p>
          <p className="text-zinc-500 text-xs line-clamp-1 max-w-[200px]">{product.description}</p>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-zinc-300 text-sm">{product.category}</span>
      </TableCell>
      <TableCell>
        <span className="text-zinc-100 text-sm font-medium">{formatPrice(product.price)}</span>
      </TableCell>
      <TableCell>
        <span className={`text-sm font-medium ${product.stock <= 5 ? "text-red-400" : "text-zinc-300"}`}>
          {product.stock}
        </span>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            product.isActive
              ? "border-emerald-700 text-emerald-400 bg-emerald-950/50 text-xs"
              : "border-zinc-700 text-zinc-500 bg-zinc-900 text-xs"
          }
        >
          {product.isActive ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-zinc-900 border-zinc-800 text-zinc-100 min-w-[140px]"
          >
            <DropdownMenuItem
              onClick={onEdit}
              className="hover:bg-zinc-800 cursor-pointer gap-2 text-sm"
            >
              <Pencil className="w-3.5 h-3.5 text-zinc-400" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={deletingProduct}
              className="hover:bg-red-950 text-red-400 cursor-pointer gap-2 text-sm focus:text-red-400 focus:bg-red-950"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {deletingProduct ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}