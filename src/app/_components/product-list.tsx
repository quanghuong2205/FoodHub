import homeStyles from '../home.module.scss';
import ProductCard from '@/components/product-card';
import { useProductsByCat } from '@/services/product.service';
import ProductCardSkeleton from '@/components/product-card/skeleton';
import { createRandomArray } from '@/utils/create-random-array';

interface IProductListProps {
  title: string;
  category: string;
}

function ProductList({ title, category }: IProductListProps) {
  const { isLoading, data } = useProductsByCat(category);
  console.log(data);

  return (
    <div className={homeStyles['product-list']}>
      <h3 className={homeStyles['product-list__title']}>{title}</h3>
      <div className='row g-2 g-md-1'>
        {isLoading && (
          <>
            {createRandomArray(6).map((id) => (
              <ProductCardSkeleton key={id} />
            ))}
          </>
        )}
        {!isLoading && data && (
          <>
            {data.products.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
