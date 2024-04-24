function resize(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    if (params && params.maxWidth) {
        maxWidth = params.maxWidth;
    }

    if (params && params.maxHeight) {
        maxHeight = params.maxHeight;
    }

    console.log({ maxWidth, maxHeight });
}

function resize1(params) {
    let maxWidth = 600;
    let maxHeight = 480;
    //paramsが存在しない場合、params.maxWidthが評価されない？
    maxWidth = params && params.maxWidth || maxWidth
    maxHeight = params && params.maxHeight || maxHeight

    console.log({ maxWidth, maxHeight });
}


function resize2(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    maxWidth = params?.maxWidth ?? maxWidth
    maxHeight = params?.maxHeight ?? maxHeight

    console.log({ maxWidth, maxHeight });
}

resize()
resize1()
resize2()
resize({ maxWidth: 1000, maxHeight: 1000 })
resize1({ maxWidth: 1000, maxHeight: 1000 })
resize2({ maxWidth: 1000, maxHeight: 1000 })

