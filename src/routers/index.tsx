import PublicLayout from '@/layouts/PublicLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout';
import PublicLayoutUser from '@/layouts/PublicLayoutUser';
import NotFound from '@/features/misc/NotFound';
import Admin from '@/features/admin';
import Forbidden from '@/features/misc/Forbidden';
import ManageUsers from '@/features/admin/manageUser';
import ManageCategory from '@/features/admin/manageCategory';
import ManageProduct from '@/features/admin/manageProducts';
import SettingStatic from '@/features/admin/settingStatic';
import ManageNews from '@/features/admin/manageNews';
import Verify from '@/features/misc/Verify';
import ActiveUser from '@/features/misc/ActiveUser';
import ManageContact from '@/features/admin/manageContact';
import ManageOrder from '@/features/admin/manageOrder';
import AboutUS from '@/features/admin/aboutUs';
import Statistical from '@/features/admin/statistical';
import { FC, lazy, LazyExoticComponent, Suspense } from 'react';
import LoadingScreen from '@/components/loading-screen';

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const HomePage = Loadable(lazy(() => import('@/pages/home')))
const IntroducePage = Loadable(lazy(() => import('@/pages/introduce')))
const CartPage = Loadable(lazy(() => import('@/pages/cart-order')))
const ProductPage = Loadable(lazy(() => import('@/pages/products')))
const ProductDetailPage = Loadable(lazy(() => import('@/pages/product-detail')))
const NewPage = Loadable(lazy(() => import('@/pages/news')))
const NewsDetailPage = Loadable(lazy(() => import('@/pages/news-detail')))
const ContactPage = Loadable(lazy(() => import('@/pages/contact')))
const PayPage = Loadable(lazy(() => import('@/pages/pay-component')))
const PurchasePage = Loadable(lazy(() => import('@/pages/purchase')))
const SignInPage = Loadable(lazy(() => import('@/pages/sign-in-page')))
const SignUpPage = Loadable(lazy(() => import('@/pages/sign-up-page')))

function RouterComponent() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayoutUser />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: '/introduce',
          element: <IntroducePage />
        },
        {
          path: '/cart',
          element: <CartPage />
        },
        {
          path: '/product',
          element: <ProductPage />
        },
        {
          path: '/product/:id',
          element: <ProductDetailPage />
        },
        {
          path: '/news',
          element: <NewPage />
        },
        {
          path: '/news/:id',
          element: <NewsDetailPage />
        },
        {
          path: '/contact',
          element: <ContactPage />
        },
        {
          path: "/pay",
          element: <PayPage />
        },
        {
          path: "/purchase",
          element: <PurchasePage />
        },
      ]
    },
    {
      path: "/login",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <SignInPage />
        },
        {
          path: "sing-up",
          element: <SignUpPage />,
        },
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Admin />
        },
        {
          path: "manage-users",
          element: <ManageUsers />
        },
        {
          path: "manage-category",
          element: <ManageCategory />
        },
        {
          path: "manage-products",
          element: <ManageProduct />
        },
        {
          path: "manage-news",
          element: <ManageNews />
        },
        {
          path: "setting_static",
          element: <SettingStatic />
        },
        {
          path: "manage-contact",
          element: <ManageContact />
        },
        {
          path: "manage-order",
          element: <ManageOrder />
        },
        {
          path: "about-us",
          element: <AboutUS />
        },
        {
          path: "statistical",
          element: <Statistical />
        },
      ]
    },
    {
      path: "/verify-email",
      element: <Verify />
    },
    {
      path: "/active-user",
      element: <ActiveUser />
    },
    {
      path: "/Forbidden",
      element: <Forbidden />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default RouterComponent
