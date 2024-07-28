export function isEmailAddress(address) {
    // ^[\w\]{1}: 最初の文字について
    // ((\.[\w\)|([\w\])){0,63}: 2文字目以降はドットと文字列、または文字列だけ、63回まで繰り返す
    // 符号を加える
    // ドメイン：長さが252文字まで
    // ユーザー名部分と同じ感じ
    let emailAddress =
        new RegExp(/^[\w\_\-\!]{1}((\.[\w\\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]+)|([\w\\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~])){0,63}@[\w\_\-\!\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]{1}((\.[\w\_\-\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]+)|([\w\_\-\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~])){0,251}$/)
    return emailAddress.test(address) ? true : false
}