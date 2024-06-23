type paramCreateContact = {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    content: string;
}

interface ContactState extends paramCreateContact {
    id: number;
    user_id: number;
    is_read: string;
    createdAt?: string;
    updatedAt?: string;
}

type responseCreateContact = baseInstance & {
    metadata: ContactState
}

type state_reducer_manageContact = {
    contactList: ContactState[],
    loading: boolean,
    contactSelected: null | ContactState,
    pagination: basePagination,
    total: number
}

interface responseGetListContact extends baseInstance {
    metadata: typeMetadataContact
}

type typeMetadataContact = {
    count: number,
    rows: ContactState[],
}