interface NewsState {
    id: number,
    name: string,
    image: string,
    markdown_id: number | null;
    contentHTML: string | null;
    contentMarkdown: string | null;
    createdAt: string,
    updatedAt: string,
}

interface typeMetadataNews {
    count: number,
    rows: NewsState[],
}

interface metadataNews extends baseInstance {
    metadata: typeMetadataNews
}

interface metadataGetNewById extends baseInstance{
    metadata: NewsState
}

interface state_reducer_manageNews {
    newsList: NewsState[],
    loading: boolean,
    newsSelected: null | NewsState,
    pagination: basePagination,
    total: number
}

interface metadataNewsRp extends baseInstance {
    metadata: NewsState
}