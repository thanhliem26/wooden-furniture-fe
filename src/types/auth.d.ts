interface responseToken extends baseInstance {
    metadata: responseMetadataToken
}

interface responseActiveUser extends baseInstance {
    metadata: {
        user_active: boolean,
        user_id: number;
    }
}

interface responseMetaUploadImage {
    ETag: string,
    ServerSideEncryption: string,
    Location: string,
    key: string,
    Key: string,
    Bucket: string,
}

interface responseUploadImage extends baseInstance {
    metadata: responseMetaUploadImage
}

interface responseDeleteImage extends baseInstance {
    metadata: boolean
}

interface responseMetadataToken {
    user: responseUserToken,
    tokens: responseTokenToken
}

interface responseUserToken {
    id: number,
    fullName: string,
    email: string,
}

interface responseTokenToken {
    accessToken: string,
    refreshToken: string,
}

interface responseSingUp extends baseInstance {
    metadata: responseMetadataSingUp
}

interface responseMetadataSingUp {
    user: responseUserSingUp
}

interface responseUserSingUp {
    id: number,
    fullName: string,
    email: string,
}