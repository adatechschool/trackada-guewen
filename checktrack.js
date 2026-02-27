// homedir() permet de récupérer le dossier personnel de l'utilisateur
import { homedir } from "os";
// existsSync permet de vérifier si un fichier ou dossier existe
// readFileSync permet de lire un fichier
import { existsSync, readFileSync } from "fs";
// join permet de créer des chemins correctement
import { join } from "path";

// On récupère le chemin du dossier personnel (ex: C:/Users/guewen)
const homePath = homedir();
// on construit le chemin vers le dossier projet
const trackPath = join(homePath, "Documents", "ADA", "projet");

// On lit le fichier track.json
// Ce fichier contient la liste des projets et des fichiers requis
const data = readFileSync("track.json", "utf-8");
// On convertit le texte JSON en JavaScript
const parsedData = JSON.parse(data);
// On construit le chemin vers le dossier ADA
const adaPath = join(homePath, "ADA");

// On vérifie si le dossier ADA/projet existe
if (existsSync(trackPath)) {
  console.log("✅ dossier ada");
} else {
  console.log("❌ dossier ada");
}

// On récupère la liste des projets du fichier track.json
const projects = parsedData.projects;
// On parcourt tous les projets un par un (la boucle parent)
for (const project of projects) {
  // On crée le chemin vers le dossier du projet
  const projectPath = join(trackPath, project.name);
  // On affiche le nom du projet (avec de la couleur cyan)
  console.log(`"\x1b[36m${project.name}\x1b[0m"`);

  // On vérifie si le dossier du projet existe(écrit en vert si il existe et en jaune si il n'existe pas)
  if (existsSync(projectPath)) {
    console.log(`"\x1b[32m ✅ dossier du projet ${project.required}\x1b[0m"`);
  } else {
    console.log(`"\x1b[33m ❌ dossier du projet ${project.required}\x1b[0m"`);
  }

  // On crée le chemin vers le dossier .git
  const gitPath = join(projectPath, ".git");
  // On vérifie si git est initialisé(écrit en vert si initialisé et en rouge si pas initialisé)
  if (existsSync(gitPath)) {
    console.log("\x1b[32m ✅ git est initialisé\x1b[0m");
  } else {
    console.log("\x1b[31m ❌ - git n'est pas initialisé\x1b[0m");
  }

  // On crée un tableau vide pour stocker les fichiers manquants
  const noFiles = [];
  // On vérifie tous les fichiers requis
  for (const file of project.required) {
    // On crée le chemin vers le fichier
    const filePath = join(projectPath, file);
    // Si le fichier existe (en vert)
    if (existsSync(filePath)) {
      console.log(`"\x1b[32m  fichier trouvé: ${file}\x1b[0m"`);
    } else {
      // Sinon on ajoute le fichier dans la liste des fichiers manquants
      noFiles.push(file);
    }
  }

  // Si il manque 1 seul fichier(ecrit en magenta)
  if (noFiles.length === 1) {
    console.log(`"\x1b[35m - fichier manquant : ${noFiles[0]}\x1b[0m"`);
    //Si il manque plusieurs fichiers(écrit en magenta)
  } else if (noFiles.length > 0) {
    //On récupère tous les fichiers sauf le dernier
    const firstFiles = noFiles.slice(0, noFiles.length - 1);
    // On récupère le dernier fichier
    const lastFile = noFiles[noFiles.length - 1];
    // On affiche les fichiers manquants avec virgule pour les premier et avec un et pour le dernier
    console.log(
      `"\x1b[35m - fichier manquant : ${firstFiles.join(", ")} et ${lastFile}\x1b[0m"`,
    );
  }
}
//code couleur pour les texte dans le terminal(inutile sa mre permet juste d'avoir les code a disposition)
const red = "\\x1b[31m";
const green = "\\x1b[32m";
const reset = "\\x1b[0m";
const yellow = "\x1b[33m";
const blue = "\x1b[34m";
const Magenta = "\x1b[35m";
const Cyan = "\x1b[36m";

let successCount = 0; // nombre de projets initialisé
let totalCount = 0; // nombre total de projets

// On parcourt les projets pour calculer le pourcentage
for (const project of projects) {
  const projectPath = join(trackPath, project.name);
  const gitPath = join(projectPath, ".git");
  // On augmente le nombre total de projets (c'est juste le nom que je lui ai donnémais mais sa peut avoir n'importe quelle autres nom)
  totalCount++;

  // Si git est initialisé alors on augmente le nombre de succès (c'est juste le nom que je lui ai donnémais mais sa peut avoir n'importe quelle autres nom)
  if (existsSync(gitPath)) {
    successCount++;
  } else {
  }
}

function getResultMessage(successCount, totalCount) {
  let percentage;

  // Calcul du pourcentage
  if (totalCount === 0) {
    percentage = 0;
    // pas de projets → 0%
  } else {
    percentage = (successCount / totalCount) * 100;
    // arrondi à l'entier le plus proche
    percentage = Math.round(percentage);
  }

  // Choix de l'icône (✅ si tout est bon, ❌ sinon)
  let icon;
  if (percentage === 100) {
    icon = "✅";
  } else {
    icon = "❌";
  }

  // envoie le message final(en vert)
  return `\x1b[32m${icon} ${percentage}% des projets sont initialisés correctement (${successCount}/${totalCount})\x1b[0m`;
}

// Affiche le résultat final
console.log(getResultMessage(successCount, totalCount));
