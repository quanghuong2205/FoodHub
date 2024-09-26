import { Input } from 'antd';
import headerStyles from '../header.module.scss';

const { Search } = Input;

function HeaderSearch() {
  return (
    <div className={headerStyles.search}>
      <Search
        placeholder='Nhập thông tin tìm kiếm...'
        size='large'
      />
    </div>
  );
}

export default HeaderSearch;
