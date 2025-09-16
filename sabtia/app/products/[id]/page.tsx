import { notFound } from 'next/navigation';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
    // This needs to be updated to work with the new model if required
    return [];
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
          <p className="text-lg text-muted-foreground mb-6">{product.description_ar}</p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">الباعة</h2>
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>اسم المحل</TableHead>
                            <TableHead>السعر</TableHead>
                            <TableHead>التقييم</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {product.listings.map(listing => (
                            <TableRow key={listing.id}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <img src={listing.shop_logo || '/placeholder.svg'} alt={listing.shop_name} className="w-10 h-10 rounded-full" />
                                        <span className="font-semibold">{listing.shop_name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-lg">{listing.price} ج.م</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{listing.rating}</span>
                                        <span className="text-muted-foreground">({listing.total_reviews} مراجعات)</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button className="marketplace-button">
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                        أضف للسلة
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

      {similarProducts.length > 0 && (
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
      )}
    </div>
  );
}
