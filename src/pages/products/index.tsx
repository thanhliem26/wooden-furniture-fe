import HelmetComponent from '@/components/helmet';
import Product from '@/features/user/products';

function ProductsPage() {

  return (
    <HelmetComponent title="Đồ gỗ Thành Lành">
      <Product />
    </HelmetComponent>
  )
}

export default ProductsPage