interface state_reducer_manageProducts {
    productList: ProductState[],
    loading: boolean,
    productSelected: null | ProductState,
    pagination: basePagination,
    total: number
}

interface ProductState {
    id: number,
    name: string,
    category_name: string,
    price: number,
    stock_quantity: number,
    images: string,
    category_id: number,
    description: string,
    createdAt: string,
    updatedAt: string,
    markdown_id: number | null,
    contentHTML: string,
    contentMarkdown: string,
    key?: number,
}

interface typeMetadataProduct {
    count: number,
    rows: ProductState[],
}

interface metadataProduct extends baseInstance {
    metadata: typeMetadataProduct
}

interface metaDataRangePrice extends baseInstance {
    metadata: rangePriceProduct
}

interface rangePriceProduct {
    minPrice: number,
    maxPrice: number,
}


interface metadataProductRp extends baseInstance {
    metadata: ProductState
}

interface ProductStateEdit {
    id?: number,
    name: string,
    price: number,
    stock_quantity: number,
    images?: string,
    category_id: number,
    description?: string,
}

type ParamGetProductDifferent = {
    id: number, 
    category_id: number, 
    limit?: number, 
    page?: number
}
