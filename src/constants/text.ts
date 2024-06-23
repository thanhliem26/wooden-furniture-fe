export const getTextMinimum = (name: string, length: number) => {
    return `Minimum ${name} needs ${length} characters`
}

export const getTextMoreComment = (length: number) => {
    return ` Xem thêm ${length} câu trả lời`
}

const ERROR_TEXT = {
    NOTIFY_MESSAGE: 'Notification Error',
    ORDER_AUTH: 'Vui lòng đăng nhập trước khi order!',
    WARNING_PRE_ORDER: 'Bạn vui lòng order trước khi đặt hàng!',
    NOTIFY_WARNING_MESSAGE: 'Notify warning',
}

const SUCCESS_TEXT = {
    NOTIFY_MESSAGE: 'Notification Success', 
    CREATE_USER_DESCRIPTION: 'Create new user success. Please check email to verify before login!',
    LOGIN_DESCRIPTION: 'Login success',
    ACTIVE_USER_DESCRIPTION: 'Successful active user. You can login, now!',
    DELETE_NOTIFY: 'Notify delete success!',
}

const SHOW_TEXT = {
    SIGN_UP: 'Sing Up',
    SIGN_IN: 'Sing In',
    FACE_BOOK: 'Facebook',
    GOOGLE: 'Google',
    HOME_PAGE: 'Trang chủ',
    PRODUCT_PAGE: 'Sản Phẩm',
    STORE_PAGE: 'Cửa Hàng',
    CART: 'Giỏ hàng',
    CURRENT_ENDPOINT: '₫',
    EDIT: 'Sửa',
    EDIT_COMMENT: 'Sửa bình luận',
    DELETE_COMMENT: 'Xóa bình luận',
    CANCEL_COMMENT: 'Hủy bỏ',
    AGREE_COMMENT: 'Đồng ý',
    CONFIRM_DELETE_COMMENT: 'Bạn có chắc chắn muốn xóa bình luận này!',
    ACTION_LIKE_COMMENT: 'Like',
    ACTION_REPLY_COMMENT: 'Trả lời',
    HIDDEN_COMMENT: 'Ẩn câu trả lời',
    SEE_MORE_COMMENT: getTextMoreComment,
    QA: 'Hỏi đáp',
    REPORT_SPAM_COMMENT: 'Nếu thấy bình luận spam hãy report với admin nhé!',
}

const REQUIRED_TEXT = {
    FULL_NAME: 'Full name is required',
    EMAIL: 'Email is required',
    PASSWORD: 'Password is required',
    REPEAT_PASSWORD: 'Repeat password is required',
    CATEGORY: 'Category is required',
    LOGO: 'Logo is required',
    IMAGE: 'Image is required',
    ID: 'id is required',
}

const VALID_TEXT = {
    EMAIL: 'Email is not valid.',
    BOTH_NUMBER_CHARACTER: 'Password must contain both numbers and characters',
    REPEAT_PASSWORD_EQUAL: 'Repeat Password must match password',
    MINIUM_LENGTH: getTextMinimum,
    POSITIVE_NUMBER: 'value is a positive integer',
}

const VALIDATE_TEXT = {
    REQUIRED: REQUIRED_TEXT,
    VALID: VALID_TEXT,
}

const TEXT_COMMON = {
    ERROR_TEXT,
    SUCCESS_TEXT,
    SHOW_TEXT,
    VALIDATE_TEXT,
}

export default TEXT_COMMON;

