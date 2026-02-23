import { homedir } from "os";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const homePath = homedir();
console.log(homePath);
const trackPath = join(homePath, "ADA");
console.log(trackPath);

if (existsSync(trackPath)) {
  console.log("oui");
} else {
  console.log("non");
}

// const data = readFileSync("track.json", "utf-8");
// const parsedData = JSON.parse(data);
// console.log(parsedData);
