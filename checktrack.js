import { homedir } from "os";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const homePath = homedir();
console.log(homePath);
const trackPath = join(homePath, "Documents", "ADA", "projet");
console.log(trackPath);

// const trackPath = join(homePath, "Documents", "ADA", "projet");
// console.log(trackPath);

const data = readFileSync("track.json", "utf-8");
const parsedData = JSON.parse(data);
console.log(parsedData.projects);

// const adaPath = join(homePath, "ADA");

// if (existsSync(trackPath)) {
//   console.log("✅ dossier ada");
// } else {
//   console.log("❌ dossier ada");
// }

const projects = parsedData.projects;
for (const project of projects) {
  const projectPath = join(trackPath, project.name);
  console.log(project.name);
  console.log(projectPath);

  if (existsSync(projectPath)) {
    console.log("oui");
  } else {
    console.log("non");
    //   const gitPath = join(projectPath, ".git");
    //   if (!existsSync(gitPath)) {
    //     console.log("git n'est pas initialisé");
    //   } else {
    //     console.log(`❌ dossier du projet ${project.name}`);
    //     console.log("- le dossier n'existe pas ou n'est pas nommé correctement");
    //   }
    // }
    // }
    // }
  }
}
