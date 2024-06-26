import HelmetComponent from '@/components/helmet';
import NewsDetail from '@/features/user/newsDetail';

function NewsDetailPage() {

  return (
    <HelmetComponent title="[do go thanh lanh] new detail">
      <NewsDetail />
    </HelmetComponent>
  )
}

export default NewsDetailPage