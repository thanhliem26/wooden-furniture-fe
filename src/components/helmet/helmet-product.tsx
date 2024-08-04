import { isJson } from '@/utils/index'
import React, { Fragment, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  product: ProductState
}

const HelmetProduct = ({ product, children }: Props) => {
  console.log("🚀 ~ product:", product)
  const images = useMemo(() => {
    return product?.images && isJson(product?.images)
      ? JSON.parse(product?.images)?.[0]?.url
      : [];
  }, [product]);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product?.name}</title>
        <meta name="description" content={product?.description} />
        <meta property="og:title" content={product?.name} />
        <meta property="og:description" content={product?.description} />
        <meta property="og:image" content={images} />
        <meta property="og:url" content={window.location.href} />
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "${product?.name}",
            "image": "${images}",
            "description": "${product?.description}",
            "brand": {
              "@type": "Brand",
              "name": "Đồ gỗ Thành Lành"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "VND",
              "price": "${product?.price}",
            }
          }
        `}
        </script>
      </Helmet>
      {children}
    </Fragment>
  )
}

export default HelmetProduct
