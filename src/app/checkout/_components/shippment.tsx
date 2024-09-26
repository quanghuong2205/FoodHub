import checkoutStyles from '../checkout.module.scss';

function Shipment() {
  return (
    <div className={checkoutStyles['section']}>
      <h3 className={checkoutStyles['section-title']}>Phương thức vận chuyển</h3>
    </div>
  );
}

export default Shipment;
