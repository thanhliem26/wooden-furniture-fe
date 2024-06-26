import HelmetComponent from '@/components/helmet';
import Cart from '@/features/user/cart';

function CartPage() {

  return (
    <HelmetComponent title="[do go thanh lanh] cart">
      <Cart />
    </HelmetComponent>
  )
}

export default CartPage