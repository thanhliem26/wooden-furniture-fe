import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    PieChartOutlined,
  } from "@ant-design/icons";

export const STAFF_MANAGE_USER: string = 'STAFF_MANAGE_USER';
export const STAFF_REFRESH_MANAGE_USER: string = 'refreshToken';
export const STAFF_MANAGE_TOKEN: string = 'token';

export const iconMenu = {
    sale_contract_management: PieChartOutlined,
    expense: DesktopOutlined,
    progress: ContainerOutlined,
    manage_service_contract: AppstoreOutlined,
}

export const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "Authorization",
  REFRESHTOKEN: "x-rtoken-id",
  CONTENT_TYPE: "Content-Type"
};

export const ROlE = {
    1: 'ADMIN',
    2: 'USER',
    3: 'SHIPPER',
}

export const TAG_ROLE = {
  1: 'cyan',
  2: 'blue',
  3: 'magenta'
}

export const statusCode = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATED: 201,
  DELETED: 201,
  NO_CONTENT: 204,
}

export const ORIGIN_UPLOAD = {
  NORMAL: 'normal',
  AWS: 'aws'
}

export const TYPE_ADD_MINUS = {
  ADD: 'add',
  MINUS: 'minus',
}

export const TYPE_REPLY_COMMENT = {
  REPLY: 'reply',
  UPDATE: 'update',
}

export const STATUS_WS = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
}

export const TYPE_WS = {
  PING: 'PING',
  PONG: 'PONG',
  JOIN_ROOM: 'JOIN_ROOM',
  LEAVE_ROOM: 'LEAVE_ROOM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  UPDATE_COMMENT: 'UPDATE_COMMENT',
}

export const TYPE_PROVIDER_LOGIN = {
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
}

export const STATUS_ORDER_COLOR = {
  pending: 'grey',
  wait_confirmation: 'cyan',
  confirmed: 'lime',
  shipped :'blue',
  cancelled: 'red',
  delivered: 'green'
}

export const STATUS_ORDER = {
  PENDING: 'pending',
  WAIT_CONFIRMATION: 'wait_confirmation',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  CANCELLED: 'cancelled',
  DELIVERED: 'delivered',
}