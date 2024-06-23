interface metadataMenu {
    id: number,
    label: string,
    href: string,
    icon
}

interface typeMenu extends baseInstance{
    metadata: metadataMenu[]
}
