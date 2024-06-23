import { UserCredential } from 'firebase/auth';

declare module 'firebase/auth' {
    interface UserCredential {
        _tokenResponse: any;
    }
}

