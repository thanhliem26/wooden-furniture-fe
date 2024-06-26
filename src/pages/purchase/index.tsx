import HelmetComponent from '@/components/helmet';
import Purchase from '@/features/user/purchase';

function PurchasePage() {

  return (
    <HelmetComponent title="[do go thanh lanh] purchase">
      <Purchase />
    </HelmetComponent>
  )
}

export default PurchasePage