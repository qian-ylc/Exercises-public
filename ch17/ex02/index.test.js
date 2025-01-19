import { Octokit } from "octokit";
import {
  createIssue,
  closeIssue,
  listIssues,
  authAndOctokit,
} from "./index.js";

// それぞれのoctokit.request()をモックする
// ないと、Must use import to load ES Module: /Users/qian/node_modules/octokit/dist-bundle/index.js
jest.mock("octokit", () => {
  return { Octokit: jest.fn() };
});
console.log = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe("ユーザー認証", () => {
  it("ユーザー認証をして、octokitモジュールを返す", async () => {
    Octokit.mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: jest
            .fn()
            .mockResolvedValue({ data: { login: "testuser" } }),
        },
      },
    }));
    const octokit = await authAndOctokit();
    expect(octokit.rest.users.getAuthenticated).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith("Hello, %s", "testuser");
  });
});

describe("createIssue", () => {
  it("正常系: 指定されたissueを作成する", async () => {
    Octokit.mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: jest
            .fn()
            .mockResolvedValue({ data: { login: "testuser" } }),
        },
      },
      request: jest.fn().mockResolvedValue({
        data: { html_url: "https://github.com/OWNER/REPO/issues/1" },
      }),
    }));
    const issueTitle = "Test Issue";
    await createIssue(issueTitle);
    expect(console.log).toHaveBeenCalledWith("Issue を作成します: Test Issue");
    expect(console.log).toHaveBeenCalledWith(
      "Issue が作成されました: https://github.com/OWNER/REPO/issues/1",
    );
  });

  it("作成失敗の場合、エラーを投げる", async () => {
    const errorMessage = "Issue creation failed";
    Octokit.mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: jest
            .fn()
            .mockResolvedValue({ data: { login: "testuser" } }),
        },
      },
      request: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }));
    
    await createIssue("Test Issue");
    expect(console.log).toHaveBeenCalledWith(new Error(errorMessage));
  });
});

describe("closeIssue", () => {
  it("正常系: 指定されたissueをクローズする", async () => {
    Octokit.mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: jest
            .fn()
            .mockResolvedValue({ data: { login: "testuser" } }),
        },
      },
      request: jest.fn().mockResolvedValue({
        data: { html_url: "https://github.com/OWNER/REPO/issues/1" },
      }),
    }));
    const issueTitle = "Test Issue";
    await closeIssue(issueTitle);
    expect(console.log).toHaveBeenCalledWith("Issue をクローズします: Test Issue");
    expect(console.log).toHaveBeenCalledWith(
      "Issue がクローズされました: https://github.com/OWNER/REPO/issues/1",
    );
  });
  it("失敗の場合、エラーを投げる", async () => {
    const errorMessage = "Issue close failed";
    Octokit.mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: jest
            .fn()
            .mockResolvedValue({ data: { login: "testuser" } }),
        },
      },
      request: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }));
    
    await closeIssue("Test Issue");
    expect(console.log).toHaveBeenCalledWith(new Error(errorMessage));
  });
});

describe("listIssues", () => {
  it("正常系: オープンなIssueのIdとTitleの一覧を表示する", async () => {
    Octokit.mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: jest
            .fn()
            .mockResolvedValue({ data: { login: "testuser" } }),
        },
      },
      request: jest.fn().mockResolvedValue({
        data: [
          { number: 1, title: "Test Issue 1" },
          { number: 2, title: "Test Issue 2" },
        ],
      }),
    }));
    await listIssues();
    expect(console.log).toHaveBeenCalledWith("Issue: 1 Test Issue 1");
    expect(console.log).toHaveBeenCalledWith("Issue: 2 Test Issue 2");
  });
  it("失敗の場合、エラーを投げる", async () => {
    const errorMessage = "Issue list failed";
    Octokit.mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: jest
            .fn()
            .mockResolvedValue({ data: { login: "testuser" } }),
        },
      },
      request: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }));
    
    await listIssues();
    expect(console.log).toHaveBeenCalledWith(new Error(errorMessage));
  });
});