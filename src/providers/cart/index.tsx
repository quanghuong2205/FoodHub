'use client';
import { ICartProductEntity } from '@/entities/cart.entity';
import { createContext, useCallback, useEffect, useState } from 'react';
import useLocalCart from './local-cart.hook';
import useServerCart from './server-cart.hook';
import { useUserStore } from '@/zustand/user.store';
import { getCartApi, syncCartApi } from '@/services/cart.service';
import { IProductDetailEntity } from '@/entities/product.entity';
import useOptimisticUpdate from './optimistic-update';

interface ICartContextProps {
  products: ICartProductEntity[];
  isCartUpdating: boolean;
  isCartSyncing: boolean;
  handleResetCart: () => void;
  handleUpdateCart: (
    productId: string,
    variantId: string,
    quantity: number,
    checkout?: boolean,
  ) => Promise<void>;
  handleAddToCart: (
    product: IProductDetailEntity,
    productId: string,
    variantId: string,
    quantity: number,
  ) => Promise<void>;
  handleRemoveFromCart: (productId: string, variantId: string) => Promise<void>;
}
export const CartContext = createContext<ICartContextProps>({} as ICartContextProps);

interface CartProviderProps {
  children: React.ReactNode;
}

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ICartProductEntity[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const { user } = useUserStore();

  /* Handle update cart */
  const handleSetCart = useCallback((products: ICartProductEntity[]) => {
    setCart(products);
  }, []);

  /* Handle reset cart */
  const handleResetCart = useCallback(() => {
    setCart([]);
  }, []);

  /* Optimistic update */
  const { handleOptimisticAdd, handleOptimisticUpdate, handleOptimisticRemove, isRequesting } =
    useOptimisticUpdate(cart, handleSetCart);

  /* Local cart hook */
  const {
    handleAddToLocalCart,
    handleRemoveFromLocalCart,
    handleUpdateLocalCart,
    handleSaveLocalCart,
    getLocalCart,
  } = useLocalCart(
    cart,
    handleSetCart,
    handleOptimisticAdd,
    handleOptimisticUpdate,
    handleOptimisticRemove,
  );

  /* Server cart hook */
  const { handleAddToServerCart, handleUpdateServerCart, handleRemoveFromServerCart } =
    useServerCart(
      cart,
      handleSetCart,
      handleOptimisticAdd,
      handleOptimisticUpdate,
      handleOptimisticRemove,
    );

  /* Sync local cart with server cart when user sign in */
  useEffect(() => {
    const localCart = getLocalCart();
    /**
     * User has not been signed in or local cart is empty
     *  then have nothing to sync
     */
    if (!user || !localCart.length) return;

    const handler = async () => {
      setIsSyncing(true);

      /* Sync cart */
      await syncCartApi(localCart);

      /* Re-fetch to get cart products */
      const response = await getCartApi();

      /* Clear local cart */
      setCart(response.products);
      setIsSyncing(false);
      handleSaveLocalCart([]);
    };

    handler();
  }, [user, handleSaveLocalCart, getLocalCart]);

  return (
    <CartContext.Provider
      value={{
        isCartSyncing: isSyncing,
        isCartUpdating: isRequesting,
        products: cart,
        handleResetCart,
        handleUpdateCart: user ? handleUpdateServerCart : handleUpdateLocalCart,
        handleAddToCart: user ? handleAddToServerCart : handleAddToLocalCart,
        handleRemoveFromCart: user ? handleRemoveFromServerCart : handleRemoveFromLocalCart,
      }}>
      <>{children}</>
    </CartContext.Provider>
  );
}

export default CartProvider;
