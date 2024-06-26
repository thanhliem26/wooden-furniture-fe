import HelmetComponent from '@/components/helmet';
import MainPage from '@/features/user/main';

function HomePage() {

  return (
    <HelmetComponent title="[TREC] do go thanh lanh">
      <MainPage />
    </HelmetComponent>
  )
}

export default HomePage
