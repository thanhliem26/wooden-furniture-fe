interface state_reducer_manageCategories {
    categoryList: CategoryState[],
    loading: boolean,
    categorySelected: null | CategoryState,
    pagination: basePagination,
    total: number
}

interface typeMetadataCategory {
    count: number,
    rows: CategoryState[],
}

interface metadataCategory extends baseInstance {
    metadata: typeMetadataCategory
}

interface metadataCategoryRp extends baseInstance {
    metadata: CategoryState
}

interface CategoryState {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    key?: number,
}

interface CategoryStateEdit {
    id?: number,
    name: string,
    description?: string,
}

