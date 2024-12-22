// OneDriveに指定されたファイルをアップロードする
// https://learn.microsoft.com/ja-jp/onedrive/developer/rest-api/api/driveitem_put_content?view=odsp-graph-online
// テキストファィルをアップロードできるが、画像ファイルはまだ処理できなさそう

// const getMe = async () => {
//     const accessToken = window.prompt('アクセストークンを入力してください');
//     try {
//         const response = await fetch('https://graph.microsoft.com/v1.0/me', {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//     } catch (e) {
//         console.error(e);
//     }
//     if (!response.ok) {
//         throw new Error(`HTTP status ${response.status}`);
//     }
//     return await response.json();
// }

// 最初には、アクセストークンの入力を求める
const accessToken = window.prompt('アクセストークンを入力してください');

const uploadFileToOneDrive = async (fileName, fileData, fileType) => {
    if (!accessToken) {
        alert('アクセストークンがありません');
        return;
    }
    // 事前作成されたNew Folderにアップロード
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:/New Folder/${fileName}:/content`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': fileType,
        },
        body: fileData,
    });
    if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
    }
}

// キャンセルの時に、動作をキャンセル
document.querySelector('input[type="file"]').addEventListener('cancel', (e) => { });
document.querySelector('input[type="file"]').addEventListener('change', (e) => {
    const fileName = e.target.files[0].name;
    const fileType = e.target.files[0].type;
    const fileData = new FormData();
    // e.target.files[0]を直接追加？
    fileData.append('file', e.target.files[0]);
    console.log(e.target.files[0]);
    console.log(fileData);
    // ファィルが選択されたら、ボタンを有効にする
    const button = document.querySelector('button');
    button.disabled = false;

    document.querySelector('button').addEventListener('click', async () => {
        await uploadFileToOneDrive(fileName, fileData, fileType);
    });
})
