interface metadataAboutUs extends baseInstance {
    metadata: typeMetadataAboutUs
}

interface responseAboutUsCreate extends baseInstance {
    metadata: AboutUsState
}

interface typeMetadataAboutUs {
    count: number,
    rows: AboutUsState[],
}

interface AboutUsState {
    id: number,
    name: string,
    address: string,
    address_link: string,
    phone_number: string,
    email: string,
    logo: string,
    image: string,
    is_active: string,
    markdown_id: number | null,
    contentHTML?: string,
    contentMarkdown?: string,
}

interface state_reducer_manageAboutUs {
    aboutUsList: AboutUsState[],
    loading: boolean,
    aboutUsSelected: null | AboutUsState,
    pagination: basePagination,
    total: number
}
