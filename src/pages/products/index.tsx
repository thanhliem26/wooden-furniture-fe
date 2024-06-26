import HelmetComponent from '@/components/helmet';
import Product from '@/features/user/products';

function ProductsPage() {

  return (
    <HelmetComponent title="[do go thanh lanh] product">
      <Product />
    </HelmetComponent>
  )
}

export default ProductsPage