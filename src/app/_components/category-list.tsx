import { devCategories } from '@/entities/category.entity';
import homeStyles from '../home.module.scss';
import Image from 'next/legacy/image';
import { Flex } from 'antd';
import Link from 'next/link';

function CategoryList() {
  return (
    <div className={homeStyles['category']}>
      <h3 className={homeStyles['category__title']}>Danh mục</h3>
      <div className='row g-1'>
        {devCategories.map((category) => (
          <div
            className='col col-1 col-md-3'
            key={category.id}>
            <div className={homeStyles['category-item']}>
              <Link href=''>
                <Flex
                  vertical
                  align='center'>
                  <div className={homeStyles['category-item__thumb']}>
                    <div>
                      <Image
                        src={category.thumb_url}
                        alt={category.name}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                  </div>
                  <span className={homeStyles['category-item__name']}>{category.name}</span>
                </Flex>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
