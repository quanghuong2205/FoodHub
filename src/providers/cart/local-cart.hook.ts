import { LOCAL_CART_KEY } from '@/constant/local-storage.key';
import { ICartProductEntity } from '@/entities/cart.entity';
import { IProductDetailEntity, IProductEntity } from '@/entities/product.entity';
import { getProductByIdsApi } from '@/services/product.service';
import { getUniqueStrings } from '@/utils/get-unique';
import { getLocalStorage, saveToLocalStorage } from '@/utils/local-storage';
import { useUserStore } from '@/zustand/user.store';
import { useCallback, useEffect, useRef } from 'react';

export interface ILocalCartProduct {
  product_id: string;
  variant_id: string;
  quantity: number;
  checkout: boolean;
}

/* Handle get cart from local storage */
const getLocalCart = (): ILocalCartProduct[] => {
  const cart = getLocalStorage(LOCAL_CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

/* Handle match server products with local cart */
const matchWithLocalProducts = (
  serverProducts: IProductEntity[],
  localProducts: ILocalCartProduct[],
): ICartProductEntity[] => {
  return localProducts.reduce<ICartProductEntity[]>((acc, localP) => {
    const serverProduct = serverProducts.find((serverP) => serverP._id === localP.product_id)!;
    const { name, desc, min_price, stock, thumb_url, variants } = serverProduct;

    /* Which variant has been picked for the product */
    const pickedVariant = localP.variant_id
      ? variants.find((v) => v._id === localP.variant_id)
      : undefined;

    /* Match product */
    acc.push({
      product_id: localP.product_id,
      name,
      desc,
      stock,
      variants,
      variant_id: localP.variant_id,
      quantity: localP.quantity,
      thumb_url: pickedVariant?.thumb_url ?? thumb_url,
      price: pickedVariant?.price ?? min_price,
      checkout: localP.checkout,
    });
    return acc;
  }, []);
};

function useLocalCart(
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
  const localCart = useRef(getLocalCart());

  /* Handle save cart */
  const handleSaveLocalCart = useCallback((products: ILocalCartProduct[]) => {
    saveToLocalStorage(LOCAL_CART_KEY, JSON.stringify(products));
    localCart.current = products;
  }, []);

  const handleMatchLocalWithServerProducts = async () => {
    /* The cart has multiple products with same Id but different variant
      then just get unique product Ids (to request detail from server)
    */
    const uniqueProductIds = getUniqueStrings(
      localCart.current.map((product) => product.product_id),
    );

    /* Request server to get detail and match */
    const response = await getProductByIdsApi(uniqueProductIds);
    return matchWithLocalProducts(response.products, localCart.current);
  };

  /* Handle add new product to local cart */
  const handleAddToLocalCart = async (
    productDetail: IProductDetailEntity,
    product_id: string,
    variant_id: string,
    quantity: number,
  ) => {
    handleOptimisticAdd(productDetail, product_id, variant_id, quantity, async () => {
      /* Save local cart */
      const existedProduct = localCart.current.find(
        (p) => p.product_id === product_id && p.variant_id === variant_id,
      );
      handleSaveLocalCart(
        existedProduct
          ? localCart.current.map((p) =>
              p === existedProduct ? { ...p, quantity: p.quantity + quantity, checkout: true } : p,
            )
          : [
              ...localCart.current,
              {
                product_id,
                variant_id,
                quantity,
                checkout: true,
              },
            ],
      );
      await handleMatchLocalWithServerProducts();
    });
  };

  /* Handle update product properties in local cart */
  const handleUpdateLocalCart = async (
    productId: string,
    variantId: string,
    quantity: number,
    checkout?: boolean,
  ) => {
    handleOptimisticUpdate(
      productId,
      variantId,
      quantity,
      async () => {
        /* Save local cart */
        handleSaveLocalCart(
          localCart.current.map((product) => {
            if (product.product_id === productId && product.variant_id === variantId) {
              return {
                ...product,
                quantity: quantity > 0 ? quantity : 0,
                checkout: checkout ? checkout : product.checkout,
              };
            }
            return product;
          }),
        );

        /* Fetch cart from server */
        await handleMatchLocalWithServerProducts();
      },
      checkout,
    );
  };

  /* Handle remove product from local cart */
  const handleRemoveFromLocalCart = async (productId: string, variantId: string) => {
    handleOptimisticRemove(productId, variantId, async () => {
      /* Save local cart */
      handleSaveLocalCart(
        localCart.current.filter(
          (p) => !(p.product_id === productId && p.variant_id === variantId),
        ),
      );

      /* Fetch cart from server */
      await handleMatchLocalWithServerProducts();
    });
  };

  useEffect(() => {
    if (user) return;
    handleMatchLocalWithServerProducts().then((products) => handleSetCart(products));
  }, [user, handleSetCart]);

  return {
    handleUpdateLocalCart,
    handleAddToLocalCart,
    handleRemoveFromLocalCart,
    getLocalCart,
    handleSaveLocalCart,
  };
}

export default useLocalCart;
