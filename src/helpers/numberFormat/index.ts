export const numberFormat = (val: number, loc: string, cur: string) => {
    return new Intl.NumberFormat(loc, { style: 'currency', currency: cur, maximumFractionDigits: 2}).format(val)
}