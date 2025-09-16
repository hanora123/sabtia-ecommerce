import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const productSchema = z.object({
  name_en: z.string().min(1, "Product name is required"),
  name_ar: z.string().min(1, "Product name in Arabic is required"),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock_quantity: z.coerce.number().int("Stock must be a whole number"),
  category_id: z.string().min(1, "Category is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  defaultValues?: Partial<ProductFormValues>;
  categories: { id: string; name_en: string }[];
}

export function ProductForm({ onSubmit, defaultValues, categories }: ProductFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{defaultValues ? "Edit Product" : "Add New Product"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name_en">Product Name (English)</Label>
              <Input id="name_en" {...register("name_en")} />
              {errors.name_en && <p className="text-red-500 text-sm">{errors.name_en.message}</p>}
            </div>
            <div>
              <Label htmlFor="name_ar">Product Name (Arabic)</Label>
              <Input id="name_ar" {...register("name_ar")} />
              {errors.name_ar && <p className="text-red-500 text-sm">{errors.name_ar.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="description_en">Description (English)</Label>
            <Textarea id="description_en" {...register("description_en")} />
          </div>
          <div>
            <Label htmlFor="description_ar">Description (Arabic)</Label>
            <Textarea id="description_ar" {...register("description_ar")} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" step="0.01" {...register("price")} />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div>
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input id="stock_quantity" type="number" {...register("stock_quantity")} />
              {errors.stock_quantity && <p className="text-red-500 text-sm">{errors.stock_quantity.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="category_id">Category</Label>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
          </div>

          <Button type="submit">{defaultValues ? "Save Changes" : "Add Product"}</Button>
        </CardContent>
      </Card>
    </form>
  );
}
