interface typeCreateEvaluate extends baseInstance {
    metadata: EvaluateState
}

interface typeGetEvaluated extends baseInstance {
    metadata: EvaluateState
}

interface typeGetListEvaluated extends baseInstance {
    metadata: metadataListEvaluated,
}

interface metadataListEvaluated {
    count: number,
    rows: EvaluateState[],
    countReview: number,
    countStar: countStar[]
}

type state_reducer_evaluate = {
    evaluateList: EvaluateState[],
    loading: boolean,
    total: number,
    totalReview: number,
    pagination: basePagination,
    countStar: countStar[],
}

interface countStar {
    name: string,
    count: number,
    value: number,
}

interface paramCreateEvaluate {
    product_id: number,
    star: string,
    evaluate: string,
}

type Evaluate_User = {
    avatar: string,
    id: number,
    fullName: string,
    role_user: string,
    deleteFlg: string,
}

interface EvaluateState {
    id: number,
    evaluate: string,
    user_id: number,
    star?: number,
    user_evaluate?: Evaluate_User,
    user_id: number,
    product_id: number,
    updatedAt: string,
    createdAt: string,
}