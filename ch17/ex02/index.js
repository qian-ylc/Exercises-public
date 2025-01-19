// https://github.com/octokit/octokit.js?tab=readme-ov-file#usage
// https://octokit.github.io/rest.js/v21/#usage
import { program } from "commander";
import { Octokit } from "octokit";
import { readFileSync } from "fs";

const token = readFileSync("ex02/token.txt", "utf8");
// const api = axios.create({
//     baseURL: 'https://api.github.com',
//     headers: {
//         'Authorization': `token ${token}`,
//         'Accept': 'application/vnd.github.v3+json',
//     },
// });
// const OWNER = 'qian-ylc';
// const REPO = 'Exercises-public';

// コマンドラインオプションの設定
// program
//   .option("-v, --verbose", "HTTP ログを出力する")
//   .option("-h, --help", "使い方を確認する")
//   .option("-i, --issue <issue>", "Issue を作成する")
//   .option("-c, --close <issue>", "Issue をクローズする")
//   .option("-g, --get", "オープンな Issue の Id と Title の一覧を表示する")
//   .parse(process.argv);
// const options = program.opts();
const options = {}

// -h または --help オプションの処理
if (options.help) {
  console.log("Usage: node index.mjs [options]");
  console.log("Option:");
  console.log("  -h, --help     使い方を確認する");
  console.log("  -v, --verbose  HTTP ログを出力する");
  console.log("  -i, --issue    Issue を作成する");
  console.log("  -c, --close    Issue をクローズする");
  console.log(
    "  -g, --get      オープンな Issue の Id と Title の一覧を表示する",
  );
  process.exit(0);
}

// fine-grained token認証
// For: https://github.com/qian-ylc/Exercises-public/issues
export async function authAndOctokit() {
  const octokit = new Octokit({ auth: token });
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log("Hello, %s", login);
  return octokit;
}

// Issue を作成
export async function createIssue(issue) {
  const octokit = await authAndOctokit();
  console.log(`Issue を作成します: ${issue}`);

  // ひとまずtitleだけでIssueを作成
  let result;
  await octokit
    .request("POST /repos/{owner}/{repo}/issues", {
      owner: "qian-ylc",
      repo: "Exercises-public",
      title: issue,
    })
    .then(({ data }) => {
      console.log(`Issue が作成されました: ${data.html_url}`);
      result = data;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}
if (options.issue) {
  createIssue(options.issue);
}

// 指定した Issue をクローズ
export async function closeIssue(issue) {
  const octokit = await authAndOctokit();
  console.log(`Issue をクローズします: ${issue}`);
  let result;

  // ひとまずissue numberで指定したissueをクローズ
  await octokit
    .request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
      owner: "qian-ylc",
      repo: "Exercises-public",
      issue_number: parseInt(issue),
      state: "closed",
    })
    .then(({ data }) => {
      console.log(`Issue がクローズされました: ${data.html_url}`);
      result = data;
    })
    .catch((error) => {
      console.log(error);
      result = error;
    });
  return result;
}
if (options.close) {
  closeIssue(options.close);
}

// オープンな Issue の Id と Title の一覧を表示
export async function listIssues() {
  const octokit = await authAndOctokit();
  console.log("オープンな Issue の Id と Title の一覧を表示します");
  let result;

  // List repository issues
  await octokit
    .request("GET /repos/{owner}/{repo}/issues", {
      owner: "qian-ylc",
      repo: "Exercises-public",
      state: "open",
    })
    .then(({ data }) => {
      data.forEach((issue) => {
        console.log(`Issue: ${issue.number} ${issue.title}`);
        result = issue;
      });
    })
    .catch((error) => {
      console.log(error);
      result = error;
    });
  return result;
}

if (options.get) {
  listIssues();
}

// HTTP ログを出力する処理
export async function verbose() {
  const octokit = await authAndOctokit();
  await octokit.hook.before("request", async (options) => {
    console.log(`HTTP ${options.method} ${options.url}`);
  });
  await octokit.hook.error("request", async (error, options) => {
    console.log(
      `HTTP ${options.method} ${options.url} failed: ${error.message}`,
    );
  });
  await octokit.hook.after("request", async (response, options) => {
    console.log(`HTTP ${options.method} ${options.url} ${response.status}`);
  });
}
if (options.verbose) {
  verbose();
}
