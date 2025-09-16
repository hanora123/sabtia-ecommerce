'use client';

import { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { ListingForm, ListingFormValues } from '@/components/listing-form';
import { NewProductForm, NewProductFormValues } from '@/components/new-product-form';
import { useAuth } from '@/hooks/use-auth'; // Import useAuth

// Define the types for the data we expect from the API
interface ProductListing {
  id: string;
  price: number;
  stock_quantity: number;
  is_active: boolean;
  product: {
    name_en: string;
  };
}

interface Product {
    id: string;
    name_en: string;
}

interface Category {
    id: string;
    name_en: string;
}

const API_URL = 'http://localhost:8000/api';
// const VENDOR_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'; // Hardcoded vendor_id for now

export default function VendorDashboard() {
  const { vendorId, isAuthenticated } = useAuth(); // Use useAuth hook
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreatingNewProduct, setIsCreatingNewProduct] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      if (!vendorId) return; // Don't fetch if vendorId is not available
      try {
        const [listingsRes, categoriesRes] = await Promise.all([
            fetch(`${API_URL}/vendors/${vendorId}/listings`, { credentials: 'include' }), // Include cookies
            fetch(`${API_URL}/categories`, { credentials: 'include' }) // Include cookies
        ]);
        setListings(await listingsRes.json());
        setCategories(await categoriesRes.json());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, [vendorId]); // Depend on vendorId

  // Search for products
  useEffect(() => {
    async function searchProducts() {
      if (debouncedSearchQuery.length > 2) {
        try {
          const res = await fetch(`${API_URL}/products?search=${debouncedSearchQuery}`, { credentials: 'include' }); // Include cookies
          setSearchResults(await res.json());
        } catch (error) {
          console.error('Failed to search products:', error);
        }
      }
    }
    searchProducts();
  }, [debouncedSearchQuery]);

  const handleCreateListing = async (data: ListingFormValues) => {
    if (!selectedProduct || !vendorId) return;
    try {
        const res = await fetch(`${API_URL}/product-listings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, product_id: selectedProduct.id, vendor_id: vendorId }), // Use vendorId from auth
            credentials: 'include' // Include cookies
        });
        const newListing = await res.json();
        setListings([...listings, { ...newListing, product: { name_en: selectedProduct.name_en } }]);
        setIsAddListingOpen(false);
        setSelectedProduct(null);
    } catch (error) {
        console.error('Failed to create listing:', error);
    }
  }

  const handleCreateNewProduct = async (data: NewProductFormValues) => {
    if (!vendorId) return;
    try {
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, vendor_id: vendorId }), // Use vendorId from auth
            credentials: 'include' // Include cookies
        });
        const newProductWithListing = await res.json();
        setListings([...listings, { ...newProductWithListing.listing, product: { name_en: newProductWithListing.name_en } }]);
        setIsAddListingOpen(false);
        setIsCreatingNewProduct(false);
    } catch (error) {
        console.error('Failed to create new product:', error);
    }
  }

  const resetDialog = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedProduct(null);
    setIsCreatingNewProduct(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
            <p className="text-muted-foreground">Manage your product listings.</p>
          </div>
          <Dialog open={isAddListingOpen} onOpenChange={(isOpen) => { setIsAddListingOpen(isOpen); if (!isOpen) resetDialog(); }}>
            <DialogTrigger asChild>
              <Button>Add New Listing</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add a new product listing</DialogTitle>
              </DialogHeader>
              {isCreatingNewProduct ? (
                <NewProductForm onSubmit={handleCreateNewProduct} categories={categories} />
              ) : selectedProduct ? (
                <ListingForm onSubmit={handleCreateListing} productName={selectedProduct.name_en} />
              ) : (
                <div className="space-y-4">
                  <Input 
                    placeholder="Search for a product in our catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {searchResults.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-2 border rounded-md">
                        <span>{product.name_en}</span>
                        <Button size="sm" onClick={() => setSelectedProduct(product)}>Sell this product</Button>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Can't find the product?</p>
                    <Button variant="link" onClick={() => setIsCreatingNewProduct(true)}>Create a new product</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Product Listings</CardTitle>
            <CardDescription>A list of all the products you are currently selling.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">{listing.product.name_en}</TableCell>
                    <TableCell>
                      <Badge variant={listing.is_active ? "outline" : "secondary"}>
                        {listing.is_active ? 'Active' : 'Archived'}
                      </Badge>
                    </TableCell>
                    <TableCell>${listing.price}</TableCell>
                    <TableCell>{listing.stock_quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
