
interface UserState {
    id: number,
    fullName: string,
    email: string,
    address: string,
    dateOfBirth: string,
    phoneNumber: string,
    role_user: string,
    sex: string,
    deleteFlg: number,
    avatar: string,
    avatar_support: string,
    key?: number,
    time_expired?: string | null,
    uid?: string | null,
    provider?: 'local' | 'google' | 'facebook',
    is_active?: '0' | '1'
}

interface UserStateEdit {
    id: number,
    fullName?: string,
    email?: string,
    address?: string,
    dateOfBirth?: string,
    phoneNumber?: string,
    role_user?: string,
    sex?: string,
    deleteFlg?: number,
    password?: string
}
interface metadataUser extends baseInstance{
    metadata: UserState
}

interface infoUser {
    id: number,
    fullName: string,
    email: string,
}

interface formDataSingUp {
    fullName: string,
    email: string,
    password: string,
    re_password: string,
    is_active?: '0' | '1',
}

interface formDataSingIn {
    email: string,
    password: string,
}

interface typeEditUser extends baseInstance {
    metadata: number[]
}

interface typeDeleteUser extends baseInstance {
    metadata: number[]
}

interface typeCreateUser extends baseInstance {
    metadata: UserState
}
