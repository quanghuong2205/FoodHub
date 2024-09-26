import Button from '@/shared/button';
import productStyles from '../product.module.scss';

function BuyNowButton() {
  return (
    <Button
      cls={productStyles['ctrl']}
      title='Mua ngay'
      variant='primary'
    />
  );
}

export default BuyNowButton;
