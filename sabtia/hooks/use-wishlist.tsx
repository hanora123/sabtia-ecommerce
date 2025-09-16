"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: Product[];
}

interface WishlistAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'TOGGLE_ITEM';
  payload: Product;
}

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      if (state.items.find(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    case 'TOGGLE_ITEM': {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
            return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
        } else {
            return { ...state, items: [...state.items, action.payload] };
        }
    }
    default:
      return state;
  }
};

const getInitialState = (): WishlistState => {
    try {
        if (typeof window !== 'undefined') {
            const storedWishlist = localStorage.getItem('wishlist');
            return storedWishlist ? JSON.parse(storedWishlist) : { items: [] };
        }
    } catch (error) {
        console.error("Failed to read wishlist from localStorage", error);
    }
    return { items: [] };
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, getInitialState());

  useEffect(() => {
    try {
        localStorage.setItem('wishlist', JSON.stringify(state));
    } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
    }
  }, [state]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  const { state, dispatch } = context;

  const isInWishlist = (productId: number) => {
    return state.items.some(item => item.id === productId);
  }

  const toggleWishlist = (product: Product) => {
    dispatch({ type: 'TOGGLE_ITEM', payload: product });
  };

  return { ...state, toggleWishlist, isInWishlist, wishlist: state.items };
};
