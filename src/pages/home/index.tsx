import HelmetComponent from '@/components/helmet';
import MainPage from '@/features/user/main';

function HomePage() {

  return (
    <HelmetComponent title="[Đồ gỗ Thành Lành] Home">
      <MainPage />
    </HelmetComponent>
  )
}

export default HomePage
