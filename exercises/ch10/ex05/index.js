import { Person } from "./person.js";
import { Teacher as TeacherRename } from "./person.js"; // 名前変更を伴うインポート
import { Student as StudentRename } from "./person.js"; // 再エクスポート
// export { Student, Student as StudentRename } from "./person.js"; // 再エクスポート

const alice = new Person("Alice", 30);
alice.sayName(); // My name is Alice

const bob = new TeacherRename("Bob", 40, "English");
bob.saySubject(); // I teach English

const charlie = new StudentRename("Charlie", 10, 5);
charlie.sayGrade(); // Charlie is in grade 5

export { StudentRename }; // 再エクスポート



