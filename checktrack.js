import { homedir } from "os";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const homePath = homedir();
// console.log(homePath);
const trackPath = join(homePath, "Documents", "ADA", "projet");
// console.log(trackPath);

// const trackPath = join(homePath, "Documents", "ADA", "projet");
// console.log(trackPath);

const data = readFileSync("track.json", "utf-8");
const parsedData = JSON.parse(data);
// console.log(parsedData.projects);

const adaPath = join(homePath, "ADA");

if (existsSync(trackPath)) {
  console.log("✅ dossier ada");
} else {
  console.log("❌ dossier ada");
}

const projects = parsedData.projects;
for (const project of projects) {
  const projectPath = join(trackPath, project.name);
  console.log(project.name);
  // console.log(projectPath);

  // if (existsSync(projectPath)) {
  //   console.log("oui");
  // } else {
  //   console.log("non");
  // }

  // const folderPath = join(projectPath);
  if (existsSync(projectPath)) {
    console.log(`✅ dossier du projet ${project.required}`);
  } else {
    console.log(`❌ dossier du projet ${project.required}`);
    // console.log("- le dossier n'existe pas ou n'est pas nommé correctement");
  }

  const gitPath = join(projectPath, ".git");
  if (existsSync(gitPath)) {
    console.log("git est initialisé");
  } else {
    console.log("- git n'est pas initialisé");
  }

  // for (const project of projects) {
  // for (const file of project.required) {
  //   const filePath = join(trackPath, file);
  // console.log(project.required, file);
  // console.log(trackPath, filePath);

  //   if (existsSync(filePath)) {
  //     console.log("oui le fichier existe");
  //   } else {
  //     console.log("non le fichier n'existe pas");
  //   }
  // }

  for (const file of project.required) {
    const filePath = join(projectPath, file);

    if (existsSync(filePath)) {
      console.log(` fichier trouvé: ${file}`);
    } else {
      console.log(` fichier manquant: ${file}`);
    }
  }

  // }
}

const total = 2;
const partie = 12;

const pourcentage = Math.round((total / partie) * 100);

console.log(`❌ ${pourcentage}% des projet sont initialisé correctement`);
