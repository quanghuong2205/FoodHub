import Image from 'next/legacy/image';
import productStyles from '../product.module.scss';

function FavouriteButton() {
  return (
    <button className={productStyles['product-love']}>
      <Image
        src={'/icon/heart-outline.png'}
        alt='heaert icon'
        layout='fill'
        objectFit='contain'
      />
    </button>
  );
}

export default FavouriteButton;
