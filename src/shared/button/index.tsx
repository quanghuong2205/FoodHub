'use client';
import { Button as AntdButton } from 'antd';
import buttonStyles from './button.module.scss';
import classNames from 'classnames';

/* Types */
type VariantType = 'primary' | 'secondary' | 'outline';

interface VariantStyles {
  cls: string;
  type: 'primary' | 'link' | 'text' | 'default' | 'dashed' | undefined;
}

const styles: Record<VariantType, VariantStyles> = {
  primary: {
    cls: buttonStyles.primary,
    type: 'primary',
  },

  secondary: {
    cls: buttonStyles.secondary,
    type: 'primary',
  },

  outline: {
    cls: buttonStyles.outline,
    type: 'default',
  },
};

interface IButton {
  children?: React.ReactNode;
  variant: VariantType;
  title?: string;
  isLoading?: boolean;
  cls?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ variant, title, isLoading, cls, onClick, children, disabled }: IButton) {
  /* Get variant */
  const variantStyles = styles[variant];

  /* Render */
  return (
    <AntdButton
      loading={isLoading}
      className={classNames(variantStyles.cls, cls && cls, disabled && 'disable-btn')}
      type={variantStyles.type}
      title={title}
      onClick={() => onClick?.()}>
      {title}
      {children}
    </AntdButton>
  );
}

export default Button;
