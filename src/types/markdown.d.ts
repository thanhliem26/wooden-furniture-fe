type paramCreateMarkdown = {
    contentHTML: string,
    contentMarkdown: string,
    id: number | null;
}

type MarkdownState = {
    id: number,
    contentHTML: string,
    contentMarkDown: string,
    createdAt: string,
    updatedAt: string,
}

interface metaDataMarkdownCreate extends baseInstance {
    metadata: MarkdownState,
}

