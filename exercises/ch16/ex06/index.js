import * as fsPromises from "node:fs/promises";

fsPromises.truncate("./hello.txt", 1000)