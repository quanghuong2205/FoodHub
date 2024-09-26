import { useContext } from 'react';
import Image from 'next/legacy/image';
import cartStyles from '../cart.module.scss';
import CartItem, { CartItemSkeleton } from './item';
import { CartContext } from '@/providers/cart';
import { createRandomArray } from '@/utils/create-random-array';

function Cart() {
  /* Cart context */
  const { products, handleRemoveFromCart, handleUpdateCart, isCartSyncing, isCartUpdating } =
    useContext(CartContext);

  /* Hanlde update cart product */
  const handleCartProduct = async (productId: string, variantId: string, qty: number) => {
    /* Remove product */
    if (qty === 0) {
      return await handleRemoveFromCart(productId, variantId);
    }

    /* Update product */
    await handleUpdateCart(productId, variantId, qty);
  };

  return (
    <>
      {isCartSyncing && (
        <>
          {createRandomArray(3).map((id) => (
            <CartItemSkeleton key={id} />
          ))}
        </>
      )}
      {!isCartSyncing && products.length !== 0 && (
        <>
          {products.map((product) => (
            <CartItem
              handleCartProduct={handleCartProduct}
              isUpdating={isCartUpdating}
              item={product}
              key={product.variant_id ?? product.product_id}
            />
          ))}
        </>
      )}

      {!isCartSyncing && !products.length && (
        <div className={cartStyles['cart-empty']}>
          <Image
            src='/img/empty-cart.jpg'
            alt='empty-cart'
            layout='fill'
            objectFit='contain'
          />
        </div>
      )}
    </>
  );
}

export default Cart;
