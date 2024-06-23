//base instance 
interface baseInstance {
    message: string,
    status: number,
    options?: responseOptionBase,
}

interface baseDelete extends baseInstance {
    metadata: number[]
}

interface orderDetailList extends baseInstance {
    metadata: metadataOrderList[];
}

interface metadataOrderList {
    address: string,
    createdAt: string,
    email: string,
    id: number,
    name: string,
    note: string,
    order_id: number,
    order_status: string,
    phone_number: string,
    productId: number,
    quantity: number,
    user_id: number,
    updatedAt: string,
    product_data: ProductDataOrder,
    evaluate_id: number | null,
}

interface ProductDataOrder {
    id: number,
    description: string,
    images: string,
    name: string,
    price: number,
    updatedAt: string,
}

interface baseUpdate extends baseInstance {
    metadata: number[]
}

interface basePagination {
    current?: number,
    pageSize?: number,
}

interface paginationQuery {
    page?: number,
    limit?: number,
}

interface baseSearchQuery extends paginationQuery {
    name: string;
}

interface responseOptionBase {
    limit: number,
}

//hoc
interface resize {
    width: number;
    height: number;
}

interface typeImageS3 {
    url: string,
    origin: string,
    name: string,
    is_delete?: boolean,
}