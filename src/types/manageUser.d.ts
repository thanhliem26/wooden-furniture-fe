interface typeMetadataUser {
    count: number,
    rows: UserState[],
}

interface metadataAllUser extends baseInstance {
    metadata: typeMetadataUser
}

interface state_reducer_manageUser {
    userList: UserState[],
    loading: boolean,
    userSelected: null | UserState,
    pagination: basePagination,
    total: number
}