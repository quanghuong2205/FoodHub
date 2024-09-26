'use client';
import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import env from '@/configs/env';

interface IServerImageProps {
  url: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
  className?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: 'center' | 'top' | 'bottom';
}

function ServerImage({
  url,
  alt,
  loading,
  priority,
  className,
  objectFit,
  objectPosition,
}: IServerImageProps) {
  const [finalSrc, setFinalSrc] = useState(`${env.SERVER_URL}/${url}`);

  const handleError = () => {
    setFinalSrc('/img/fail-to-load.png');
  };

  useEffect(() => {
    setFinalSrc(`${env.SERVER_URL}/${url}`);
  }, [url]);

  return (
    <Image
      src={finalSrc}
      alt={alt}
      layout='fill'
      placeholder='blur'
      blurDataURL='/product-img/cam.jpg'
      onError={handleError}
      loading={loading}
      priority={priority}
      className={className}
      objectFit={objectFit ?? 'cover'}
      objectPosition={objectPosition ?? 'center'}
    />
  );
}

export default ServerImage;
