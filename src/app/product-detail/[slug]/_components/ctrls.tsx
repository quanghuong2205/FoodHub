import AddToCartButton from './add-to-cart';
import BuyNowButton from './buy-now';
import productStyles from '../product.module.scss';
import { IOption } from './options';
import useInforModal from '../infor-modal.hook';
import { IProductDetailEntity } from '@/entities/product.entity';

function ProductCtrls({
  option,
  productDetail,
}: {
  option: IOption;
  productDetail: IProductDetailEntity;
}) {
  const { InforModal, handleOpenModal } = useInforModal('hello', 'infor modal');

  /* Validate product option before add to cart */
  const handleValidateOption = (): boolean => {
    /* Have not picked variant id */
    if (!option.variant_id) {
      handleOpenModal('Loại sản phẩm', 'Vui lòng chọn loại sản phẩm');
      return false;
    }

    /* Have not picked quantity */
    if (!option.quantity) {
      handleOpenModal('Số lượng sản phẩm', 'Vui lòng chọn số lượng sản phẩm');
      return false;
    }

    return true;
  };

  /* Handle in case operation is success */
  return (
    <>
      <InforModal />
      <div className={productStyles['ctrls']}>
        <AddToCartButton
          option={option}
          handleValidateOption={handleValidateOption}
          productDetail={productDetail}
        />
        <BuyNowButton />
      </div>
    </>
  );
}

export default ProductCtrls;
