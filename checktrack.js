import { homedir } from "os";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const homePath = homedir();
console.log(homePath);
const trackPath = join(homePath, "ADA");
console.log(trackPath);

// const trackPath = join(homePath, "Documents", "ADA", "projet");
// console.log(trackPath);

const data = readFileSync("track.json", "utf-8");
const parsedData = JSON.parse(data);
console.log(parsedData);

for (const i of parsedData.projects) {
  if (existsSync(homePath)) {
    console.log("oui");
  } else {
    console.log("non");
  }
}
