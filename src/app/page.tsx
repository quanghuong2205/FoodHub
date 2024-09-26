'use client';
import { Flex } from 'antd';
import ProductList from './_components/product-list';
import homeStyles from './home.module.scss';
import CategoryList from './_components/category-list';
import Mainlayout from '@/layouts/main-layout';

export default function Home() {
  return (
    <Mainlayout>
      <div className='page'>
        <div className={homeStyles.home}>
          <Flex
            vertical
            gap={30}>
            <CategoryList />
            <ProductList
              title='Trái cây tươi'
              category='66ebec43689da119f5b89b14'
            />
            <ProductList
              title='Xôi ngon'
              category='66ebec87689da119f5b89b16'
            />
            <ProductList
              title='Bánh mỳ'
              category='66ebec99689da119f5b89b17'
            />
          </Flex>
        </div>
      </div>
    </Mainlayout>
  );
}
