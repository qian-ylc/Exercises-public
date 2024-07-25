export function detectFileType(data) { // data.buffer
    const view = new DataView(data);
    // true: 0x46445025 false: 0x25504446
    const signature = view.getUint32(0, false); // 先頭4バイトを取得 ビッグエンディアン 
    console.log(signature);
    switch (signature) {
        case 0x25504446:
            return "PDF";
        case 0x504b0304:
        case 0x504b0506:
        case 0x504b0708:
            return "ZIP";
        case 0x47494638:
        case 0x47494639:
            return "GIF";
        case 0x89504e47:
            return "PNG";
        default:
            return "UNKNOWN";
    }

}