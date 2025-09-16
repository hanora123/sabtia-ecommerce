"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: Product[];
}

interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY';
  payload: any;
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    default:
      return state;
  }
};

const getInitialState = (): CartState => {
    try {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : { items: [] };
        }
    } catch (error) {
        console.error("Failed to read cart from localStorage", error);
    }
    return { items: [] };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    try {
        localStorage.setItem('cart', JSON.stringify(state));
    } catch (error) {
        console.error("Failed to save cart to localStorage", error);
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  const { state, dispatch } = context;

  const addToCart = (product: Omit<Product, 'quantity'>, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(productId);
    } else {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  return { ...state, addToCart, removeFromCart, updateQuantity, cart: state.items };
};
