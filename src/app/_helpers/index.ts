export function convertSnaps<T>(results) {
    return <T[]>results.docs.map(snap => {
        return {
            id: snap.id,
            ...<any>snap.data()
        }
    })
}
export const convertCamelCaseToTitleCase = (string: string) => {
    const result = string.replace(/([A-Z])/g, ' $1').trim()
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult
}
export const columnBuilder = <T>(data: T[], excludedColumns: string[]) => {
    if (!data?.length) return null
    return Object.keys(data[0]).map(item => {

        return { field: item, header: convertCamelCaseToTitleCase(item) }
    }).filter(item => excludedColumns.includes(item.field) === false).map(
        item => columnCasesBuilder(item)
    )
}
const columnCasesBuilder = (headerItem: { field: string, header: string }) => {
    switch (true) {
        case headerItem.field == 'noCDId':
            return { ...headerItem, header: 'NoCD Id' }
        case headerItem.field == 'isDXStatusSuccess':
            return { ...headerItem, header: 'is DX Status Success' }
        case headerItem.field == 'logoPath':
            return { ...headerItem, header: 'Stock Image' }
        case headerItem.field == 'nameOfStock':
            return { ...headerItem, header: 'Stock Name' }
        case headerItem.field == 'isREIT':
            return { ...headerItem, header: 'isREIT' }
        case headerItem.field == 'isIndex':
            return { ...headerItem, header: 'isIndex' }
        case headerItem.field == 'dateEntry':
            return { ...headerItem, header: 'Date Requested' }
        case headerItem.field == 'commissionsPlusVAT':
            return { ...headerItem, header: 'Commissions plus VAT' }
        case headerItem.field == 'positions':
            return { ...headerItem, header: 'Positions (Symbol | Market Value | No. of Shares)' }
        case headerItem.field == 'otherCharges':
            return { ...headerItem, header: 'Other Charges and Fees' }
        default:
            return headerItem
    }
}