'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

import Link from "next/link";

export function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the add to cart button
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    toast.success(`${product.name} has been added to your cart.`);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="marketplace-card group cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {product.badge && (
              <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
                {product.badge}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{product.name}</h4>
          <p className="text-sm text-muted-foreground mb-2">{product.vendor}</p>
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{product.price} ج.م</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{product.originalPrice} ج.م</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full marketplace-button-secondary" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              أضف للسلة
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
