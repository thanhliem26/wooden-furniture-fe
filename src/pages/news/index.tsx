import HelmetComponent from '@/components/helmet';
import News from '@/features/user/news';

function NewsPage() {

  return (
    <HelmetComponent title="[Đồ gỗ Thành Lành] News">
      <News />
    </HelmetComponent>
  )
}

export default NewsPage