/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useProduct } from "@/hooks/useProduct";
import { CreateProductSchema, CreateProductSchemaType } from "@/package/schema/product/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Package } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateProductPage = () => {
  const router = useRouter();
  const { createProduct, isCreatingProduct } = useProduct();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateProductSchemaType>({
    resolver: zodResolver(CreateProductSchema as any),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      stock: 0,
      isActive: true,
    },
  });

  const onSubmit = async (payload: CreateProductSchemaType) => {
    await createProduct(payload);
    reset();
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10 md:px-12 items-center justify-center">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-lg">
            <Package className="w-5 h-5 text-zinc-300" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">Add Product</h1>
            <p className="text-zinc-500 text-sm">Fill in the details below</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-xs uppercase tracking-wider">Name</Label>
            <Input
              {...register("name")}
              placeholder="Product name"
              className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-600"
            />
            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-xs uppercase tracking-wider">Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Product description"
              rows={3}
              className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-600 resize-none"
            />
            {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-zinc-400 text-xs uppercase tracking-wider">Price (IDR)</Label>
              <Input
                {...register("price")}
                type="number"
                placeholder="0"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-600"
              />
              {errors.price && <p className="text-red-400 text-xs">{errors.price.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-400 text-xs uppercase tracking-wider">Stock</Label>
              <Input
                {...register("stock")}
                type="number"
                placeholder="0"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-600"
              />
              {errors.stock && <p className="text-red-400 text-xs">{errors.stock.message}</p>}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-xs uppercase tracking-wider">Category</Label>
            <Input
              {...register("category")}
              placeholder="e.g. Fashion, Electronics"
              className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-600"
            />
            {errors.category && <p className="text-red-400 text-xs">{errors.category.message}</p>}
          </div>

          {/* isActive Switch */}
          <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <div>
              <p className="text-sm font-medium text-white">Active</p>
              <p className="text-xs text-zinc-500">Product visible to customers</p>
            </div>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-emerald-500"
                />
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreatingProduct}
              className="flex-1 bg-white text-zinc-900 hover:bg-zinc-200 font-medium"
            >
              {isCreatingProduct ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;