'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const listingSchema = z.object({
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock_quantity: z.coerce.number().int("Stock must be a whole number"),
});

export type ListingFormValues = z.infer<typeof listingSchema>;

interface ListingFormProps {
  onSubmit: (data: ListingFormValues) => void;
  productName: string;
}

export function ListingForm({ onSubmit, productName }: ListingFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-lg font-medium">Create listing for: <strong>{productName}</strong></h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="price">Your Price</Label>
          <Input id="price" type="number" step="0.01" {...register("price")} />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <Label htmlFor="stock_quantity">Stock Quantity</Label>
          <Input id="stock_quantity" type="number" {...register("stock_quantity")} />
          {errors.stock_quantity && <p className="text-red-500 text-sm">{errors.stock_quantity.message}</p>}
        </div>
      </div>
      <Button type="submit">Create Listing</Button>
    </form>
  );
}
