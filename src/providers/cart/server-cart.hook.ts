import { ICartProductEntity } from '@/entities/cart.entity';
import { IProductDetailEntity } from '@/entities/product.entity';
import { getCartApi, updateCartApi } from '@/services/cart.service';
import { useUserStore } from '@/zustand/user.store';
import { useEffect } from 'react';

function useServerCart(
  cart: ICartProductEntity[],
  handleSetCart: (cart: ICartProductEntity[]) => void,
  handleOptimisticAdd: (
    product: IProductDetailEntity,
    product_id: string,
    variant_id: string,
    quantity: number,
    asyncRequest: () => Promise<unknown>,
  ) => void,
  handleOptimisticUpdate: (
    product_id: string,
    variant_id: string,
    quantity: number,
    asyncRequest: () => Promise<unknown>,
    checkout?: boolean,
  ) => void,
  handleOptimisticRemove: (
    product_id: string,
    variant_id: string,
    asyncRequest: () => Promise<unknown>,
  ) => void,
) {
  const { user } = useUserStore();

  const handleUpdateServerCart = async (
    product_id: string,
    variant_id: string,
    quantity: number,
    checkout?: boolean,
  ) => {
    handleOptimisticUpdate(
      product_id,
      variant_id,
      quantity,
      async () => {
        await updateCartApi({ product_id, variant_id, quantity, checkout });
      },
      checkout,
    );
  };

  const handleAddToServerCart = async (
    product: IProductDetailEntity,
    product_id: string,
    variant_id: string,
    quantity: number,
  ) => {
    /* Optimistic add */
    handleOptimisticAdd(product, product_id, variant_id, quantity, async () => {
      const prevQty = cart.find(
        (p) => p.product_id === product_id && p.variant_id === variant_id,
      )?.quantity;

      await updateCartApi({
        product_id,
        variant_id,
        quantity: prevQty ? prevQty + quantity : quantity,
        checkout: true,
      });
    });
  };

  const handleRemoveFromServerCart = async (product_id: string, variant_id: string) => {
    handleOptimisticRemove(product_id, variant_id, async () => {
      await updateCartApi({ product_id, variant_id, quantity: 0 });
    });
  };

  /* Fetch cart from server (first login) */
  useEffect(() => {
    /* User has not been signed in */
    if (!user) return;

    /* Handle request to get products */
    getCartApi().then((res) => handleSetCart(res.products));
  }, [user, handleSetCart]);

  return {
    handleUpdateServerCart,
    handleAddToServerCart,
    handleRemoveFromServerCart,
  };
}

export default useServerCart;
