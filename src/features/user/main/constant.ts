import { createContext } from "react";

export const defaultValueMainPage: StaticPageState = {
    id: 0,
    Images: JSON.stringify([]),
    ImageSP: JSON.stringify([]),
    productShow: {
        top1: {
            category_id: 0,
            category_name: '',
            data: [],
            total: 0
        },
        top2: {
            category_id: 0,
            category_name: '',
            data: [],
            total: 0
        },
        top3: {
            category_id: 0,
            category_name: '',
            data: [],
            total: 0
        },
    },
    type: 0,
}

const MainPageContext = createContext(defaultValueMainPage);

export default MainPageContext;