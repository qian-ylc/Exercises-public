export const LFtoCRLF = (x) => {
    const result = x.replace(/\n/, "\r\n")
    return result
}

export const CRLFtoLF = (x) => {
    const result = x.replace(/\r\n/, "\n")
    return result
}