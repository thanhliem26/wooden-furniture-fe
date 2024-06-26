import HelmetComponent from '@/components/helmet';
import News from '@/features/user/news';

function NewsPage() {

  return (
    <HelmetComponent title="[do go thanh lanh] news">
      <News />
    </HelmetComponent>
  )
}

export default NewsPage