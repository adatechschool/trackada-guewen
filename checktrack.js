import { existsSync, readFileSync } from "fs";

const data = readFileSync("track.json", "utf-8");
const parsedData = JSON.parse(data);
console.log(parsedData);
