import { STATUS_ORDER } from '@/constants/index';
import { CarOutlined, CheckCircleOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';

export const DATA_ORDER_BY_STATUS = {
    [STATUS_ORDER.WAIT_CONFIRMATION]: {
        message: 'Đơn hàng đang chờ xác nhận',
        icon: LoadingOutlined,
        status: 'Chờ xác nhận',
        color: '#cece1d',
    },
    [STATUS_ORDER.CONFIRMED]: {
        message: 'Đơn hàng đã được xác nhận',
        icon: CheckCircleOutlined,
        status: 'Xác nhận',
        color: '#32a6d9'
    },
    [STATUS_ORDER.SHIPPED]: {
        message: 'Đơn hàng của bạn đang được giao',
        icon: CarOutlined,
        status: 'Đang giao',
        color: '#32a6d9',
    },
    [STATUS_ORDER.CANCELLED]: {
        message: 'Đơn hàng của bạn đã bị hủy',
        icon: DeleteOutlined,
        status: 'Đã hủy',
        color: 'red'
    },
    [STATUS_ORDER.DELIVERED]: {
        message: 'Đơn hàng của bạn đã dược giao thành công',
        icon: CarOutlined,
        status: 'Hoàn thành',
        color: '#26aa99'
    },
}