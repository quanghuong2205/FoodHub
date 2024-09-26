import { ICartProductEntity } from '@/entities/cart.entity';
import { IProductDetailEntity } from '@/entities/product.entity';
import { useRef, useState } from 'react';

function useOptimisticUpdate(
  cart: ICartProductEntity[],
  handleSetCart: (cart: ICartProductEntity[]) => void,
) {
  /* Backup cart to rollback */
  const backupCart = useRef<ICartProductEntity[]>(cart);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const handleRollback = () => {
    handleSetCart(backupCart.current);
  };

  /* Hanlde optimistic add */
  const handleOptimisticAdd = (
    product: IProductDetailEntity,
    product_id: string,
    variant_id: string,
    quantity: number,
    asyncRequest: () => Promise<unknown>,
  ) => {
    /* Backup */
    if (isRequesting) return;
    backupCart.current = [...cart];

    /* Check if product already in cart */
    const existedProduct = cart.find(
      (p) => p.product_id === product_id && p.variant_id === variant_id,
    );

    /* Only update quantity */
    if (existedProduct) {
      handleSetCart(
        cart.map((p) =>
          p === existedProduct
            ? { ...p, quantity: existedProduct.quantity + quantity, checkout: true }
            : p,
        ),
      );
    } else {
      /* Push new product to the cart */
      /* Which variant has been picked for the product */
      const pickedVariant = product.variants.find((v) => v._id === variant_id);
      handleSetCart([
        ...cart,
        {
          product_id,
          variant_id,
          quantity,
          name: product.name,
          desc: product.desc,
          price: pickedVariant?.price ?? product.min_price,
          stock: product.stock,
          thumb_url: pickedVariant?.thumb_url ?? product.thumb_url,
          variants: product.variants,
          checkout: true,
        },
      ]);
    }

    /* Request */
    setIsRequesting(true);
    return asyncRequest()
      .catch(() => handleRollback())
      .finally(() => setIsRequesting(false));
  };

  /* Handle optimistic update */
  const handleOptimisticUpdate = (
    product_id: string,
    variant_id: string,
    quantity: number,
    asyncRequest: () => Promise<unknown>,
    checkout?: boolean,
  ) => {
    /* Backup */
    if (isRequesting) return;
    backupCart.current = [...cart];

    /* Update product */
    handleSetCart(
      cart.map((product) => {
        const existedProduct =
          product.product_id === product_id && product.variant_id === variant_id;
        return existedProduct
          ? {
              ...product,
              product_id,
              variant_id,
              quantity,
              checkout: checkout ?? product.checkout,
            }
          : product;
      }),
    );

    /* Request */
    setIsRequesting(true);
    return asyncRequest()
      .catch(() => handleRollback())
      .finally(() => setIsRequesting(false));
  };

  /* Handle optimistic remove */
  const handleOptimisticRemove = (
    product_id: string,
    variant_id: string,
    asyncRequest: () => Promise<unknown>,
  ) => {
    /* Backup */
    if (isRequesting) return;
    backupCart.current = [...cart];

    /* Remove product from cart */
    handleSetCart(
      cart.filter(
        (product) => !(product.product_id === product_id && product.variant_id === variant_id),
      ),
    );

    /* Request */
    setIsRequesting(true);
    return asyncRequest()
      .catch(() => handleRollback())
      .finally(() => setIsRequesting(false));
  };

  return { handleOptimisticAdd, handleOptimisticUpdate, handleOptimisticRemove, isRequesting };
}

export default useOptimisticUpdate;
