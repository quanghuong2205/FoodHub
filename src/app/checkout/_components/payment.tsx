import checkoutStyles from '../checkout.module.scss';

function Payment() {
  return (
    <div className={checkoutStyles['section']}>
      <h3 className={checkoutStyles['section-title']}>Phương thức thanh toán</h3>
    </div>
  );
}

export default Payment;
