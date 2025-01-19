import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import { authAndOctokit, createIssue, closeIssue, listIssues} from './index.js';

/*
  Register the adapters and persisters we want to use. This way all future
  polly instances can access them by name.
*/
Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('Simple Example', function () {
  it('fetches a post', async function () {
    /*
      Create a new polly instance.

      Connect Polly to fetch. By default, it will record any requests that it
      hasn't yet seen while replaying ones it has already recorded.
    */
    const polly = new Polly('Simple Example', {
      adapters: ['node-http'], // Hook into `fetch`
      persister: 'fs', // Read/write to/from local-storage
      logLevel: 'info' // Log requests to console
    });

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    const post = await response.json();
    expect(response.status).toBe(200);
    expect(post.id).toBe(1);

    /*
      Calling `stop` will persist requests as well as disconnect from any
      connected adapters.
    */
    await polly.stop();
  });
});

describe("ユーザー認証", () => {
    it("ユーザー認証をして、octokitモジュールを返す", async () => {
        // OctokitWithDefaultsにあるプロパティで検証
        const response = await authAndOctokit();
        expect(response).toHaveProperty('rest');
    });
});

// 各メソッドの戻り値には期待されたプロパティがあるかどうか
// pollyで異常系(ネットワーク接続エラーなど)のテスト？
describe("createIssue", () => {
    it("正常系: 指定されたissueを作成する", async () => {
        const issueTitle = "Test Issue";
        const response = await createIssue(issueTitle);
        expect(response).toHaveProperty('html_url');
    });
});

describe("closeIssue", () => {
    it("正常系: 指定されたissueをクローズする", async () => {
        const issueNumber = 10;
        const response = await closeIssue(issueNumber);
        expect(response).toHaveProperty('html_url');
    });

    it("異常系: 指定されたissueが存在しない", async () => {
        const issueNumber = 50;
        const response = await closeIssue(issueNumber);
        expect(response).toEqual(new Error("HttpError: Not Found - https://docs.github.com/rest/issues/issues#update-an-issue"));
    });
});

describe("listIssues", () => {
    it("正常系: Issue一覧を取得する", async () => {
        const response = await listIssues();
        expect(response).toHaveProperty('issue');
    });
});




