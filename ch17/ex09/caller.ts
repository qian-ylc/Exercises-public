// npx ts-node caller.ts
import {
    TaskManager,
    isLowOrCompletedTask,
    not,
} from "./task";
import type { PriorityTask } from "./task";

const user1 = { id: 1, name: "Alice" };
const user2 = { id: 2, name: "Bob" };

const taskManager = new TaskManager<PriorityTask>();

taskManager.add({
    title: "テキストを読む",
    completed: false,
    user: user1,
    priority: "high",
});

taskManager.add({
    title: "質問表を書く",
    completed: false,
    user: user1,
    priority: "middle",
});

taskManager.add({
    title: "質問表を確認する",
    completed: false,
    user: user2,
    priority: "low",
});

taskManager.add({
    title: "問題を作成する",
    completed: false,
    user: user2,
    priority: "middle",
});

taskManager.completeTask(user1);
taskManager.completeTask("質問表を確認する");

console.log("1");
console.log(taskManager.getTasks());
console.log("2");
console.log(taskManager.getTasks(not(isLowOrCompletedTask)));

/**
1
[
  {
    title: 'テキストを読む',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'high'
  },
  {
    title: '質問表を書く',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'middle'
  },
  {
    title: '質問表を確認する',
    completed: true,
    user: { id: 2, name: 'Bob' },
    priority: 'low'
  },
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
2
[
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
 */
