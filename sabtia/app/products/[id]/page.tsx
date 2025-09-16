import { notFound } from 'next/navigation';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

async function getProduct(id) {
  const res = await fetch(`http://localhost:8000/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

async function getSimilarProducts(id) {
  const res = await fetch(`http://localhost:8000/api/products/${id}/similar`, { cache: 'no-store' });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);
  const similarProducts = await getSimilarProducts(params.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img 
            src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg'} 
            alt={product.name_ar} 
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name_ar}</h1>
          <div className="flex items-center gap-4 mb-4">
            <img src={product.shop_logo || '/placeholder.svg'} alt={product.shop_name} className="w-12 h-12 rounded-full" />
            <span className="font-semibold text-lg">{product.shop_name}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Badge>{product.is_featured ? 'مميز' : 'عادي'}</Badge>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.total_reviews} مراجعات)</span>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-6">{product.description_ar}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-primary">{product.price} ج.م</span>
            {product.original_price && (
              <span className="text-xl text-muted-foreground line-through">{product.original_price} ج.م</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button size="lg" className="marketplace-button">
              <ShoppingCart className="h-5 w-5 mr-2" />
              أضف للسلة
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/checkout" className="flex items-center">
                شراء الآن <ArrowRight className="h-5 w-5 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">منتجات مشابهة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((p) => (
            <ProductCard key={p.id} product={{
              id: p.id,
              name: p.name_ar,
              price: p.price,
              originalPrice: p.original_price,
              vendor: 'محل السبتية', // Placeholder
              rating: p.rating,
              reviews: p.total_reviews,
              image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder.svg',
              badge: p.is_featured ? 'مميز' : null,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}