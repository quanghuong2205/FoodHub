'use client';
import { Flex } from 'antd';
import ctrlStyles from './ctrl.module.scss';
import Image from 'next/legacy/image';
import classNames from 'classnames';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';

const regex = /^\+?(0*[0-9]*\.?[0-9]*) *(?:[€$£¥]|°[FC])?$/;
const isValidQty = (value: string) => regex.test(value);

interface IProductQtyControllerProps {
  stock: number;
  isUpdating: boolean;
  handleSetQty: (qty: number) => void;
  cls?: string;
  initQty?: number;
}

function ProductQtyController({
  cls,
  handleSetQty,
  stock,
  initQty,
  isUpdating,
}: IProductQtyControllerProps) {
  /* Save user input */
  const [input, setInput] = useState<string>(initQty ? initQty + '' : '0');
  const qty = useRef<number>(initQty || 0);
  const qtyHistory = useRef<string>('');

  /**
   * Handle set quantity
   */
  const handleType = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  /**
   * Save the qty before any changes
   */
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    qtyHistory.current = e.target.value;
  };

  /**
   *  If left the qty input is empty or enter invalid qty
   *      then set to value (before focus) by default
   */
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = isValidQty(value);
    console.log([value, isValid]);

    /* Typed quantity is invalid */
    if (!value || !isValid || (isValid && +value > stock)) {
      return setInput(qtyHistory.current);
    }

    qty.current = +value;
    handleSetQty(+value);
  };

  /* Hanlde incre qty */
  const handleIncQty = () => {
    const qty = +input;
    if (qty < stock) {
      handleSetQty(qty + 1);
      setInput(qty + 1 + '');
    }
  };

  /* Hanlde decre qty */
  const handleDecQty = () => {
    const qty = +input;
    if (qty > 0) {
      handleSetQty(qty - 1);
      setInput(qty - 1 + '');
    }
  };

  /* Update input If initQty changes */
  useEffect(() => {
    setInput(initQty ? initQty + '' : '0');
    qty.current = initQty || 0;
  }, [initQty]);

  return (
    <div className={classNames(ctrlStyles.ctrl, cls && cls)}>
      <Flex>
        <button
          className={classNames(ctrlStyles['ctrl-btn'], {
            ['disable-btn']: +input === 0 || isUpdating,
          })}
          onClick={handleDecQty}>
          <div>
            <Image
              src='/icon/minus.png'
              alt='minus'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </button>

        <input
          value={input}
          onChange={handleType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type='text'
          className={ctrlStyles['ctrl-input']}
        />

        <button
          className={classNames(ctrlStyles['ctrl-btn'], {
            ['disable-btn']: +input === stock || isUpdating,
          })}
          onClick={handleIncQty}>
          <div>
            <Image
              src='/icon/plus.png'
              alt='plus'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </button>
      </Flex>
    </div>
  );
}

export default ProductQtyController;
