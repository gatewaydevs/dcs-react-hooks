const fs = require('fs');
const path = require('path');

const parseOptionsString = (optionsString) => {
  const cleanOptionsString = optionsString.replace(" ", "");
  const optionsPairs = cleanOptionsString.split(",");

  try {
    const optionsMap = !!optionsPairs.length && new Map(optionsPairs.map((pair) => pair.split(":"))); //TODO: validate file options errors.
    return optionsMap;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const getFileOptions = (mdFilePath) => {
  const fileExists = fs.existsSync(mdFilePath);
  const content = fileExists && fs.readFileSync(mdFilePath, { encoding: 'utf8', flag: 'r' });
  const optionsString = content?.match(/(?<=<!-- +).+(?= +-->)/)?.[0];
  const options = optionsString && parseOptionsString(optionsString) || new Map();

  if (!options?.get("title")) options.set("title", content?.match(/(?<=#+ ).+/)?.[0] || getNameFromDir(mdFilePath.split(".")[0]));

  return options;
}

const getNameFromDir = (dirPath) => {
  const dirName = path.basename(dirPath);

  if (dirName === "_readme") return;

  const cleanDirName = dirName.replace(/^[\d\w][.\-_]/, "").replace(/[-_.]/, " ");
  const name = cleanDirName.charAt(0).toUpperCase() + cleanDirName.slice(1);
  return name;
}

const getMdSections = (fileNames, componentsNames, sectionPath) => {
  const cleanCompNames = componentsNames.map(componentName => path.basename(componentName).split(".")[0]);
  const sections = fileNames.reduce((sections, fileName) => {
    const filePath = path.join(sectionPath, fileName);
    const isDirectory = fs.statSync(filePath).isDirectory();
    
    if (isDirectory) return sections;
    
    if (path.extname(fileName) !== ".md") return sections;
    
    const cleanFileName = path.basename(fileName).split(".")[0];
    
    if (cleanCompNames.includes(cleanFileName) || cleanFileName === "_readme")
      return sections;
    
    const fileOptions = getFileOptions(filePath);

    sections.push({
      name: fileOptions.get("title") || cleanFileName.charAt(0).toUpperCase() + cleanFileName.slice(1),
      content: filePath,
    })

    return sections;
  }, []);
  
  return sections;
}

const getDirSections = (dirNames, sectionPath, deep) => 
  dirNames.reduce((sections, dirName) => {
    const dirPath = path.join(sectionPath, dirName);
    const isDirectory = fs.statSync(dirPath).isDirectory();

    if (!isDirectory) return sections;

    sections = sections.concat(setInnerSections(dirPath, deep));

    return sections;
  }, []);


let setInnerSections = (sectionPath, deep) => {
  const sectionReadme = path.join(sectionPath, "_readme.md");
  const readmeExists = fs.existsSync(sectionReadme);

  const fileOptions = readmeExists && getFileOptions(sectionReadme);
  const name = fileOptions && fileOptions.get("title") || getNameFromDir(sectionPath);
  const dirNames = fs.readdirSync(sectionPath)
  const componentsNames = dirNames.filter((dirName) => {
    const dirPath = path.join(sectionPath, dirName);
    let stats = fs.statSync(dirPath);
    return !stats.isDirectory() && [".js", ".jsx"].includes(path.extname(dirName))
  });

  const components = componentsNames.map(componentName => path.join(sectionPath, componentName));
  const sections = [...getDirSections(dirNames, sectionPath, deep), ...getMdSections(dirNames, componentsNames, sectionPath)];
  const sectionDepth = deep && (fileOptions && fileOptions.get("depth") || sections?.length);

  return [
    {
      name,
      content: readmeExists ? sectionReadme : undefined,
      sections,
      sectionDepth: parseInt(sectionDepth) ?? undefined,
      components
    }
  ]
}

let setSections = (sectionPath, deep = false) => {
  const sectionReadme = path.join(sectionPath, "_readme.md");
  const readmeExists = fs.existsSync(sectionReadme);

  const fileOptions = readmeExists && getFileOptions(sectionReadme);

  const name = fileOptions ? fileOptions.get("title") : getNameFromDir(sectionPath);

  const dirNames = fs.readdirSync(sectionPath)
  const componentsNames = dirNames.filter((dirName) => {
    const dirPath = path.join(sectionPath, dirName);
    let stats = fs.statSync(dirPath);
    return !stats.isDirectory() && [".js", ".jsx"].includes(path.extname(dirName));
  });

  const components = componentsNames.map(componentName => path.join(sectionPath, componentName));

  const sections = [...getMdSections(dirNames, componentsNames, sectionPath), ...getDirSections(dirNames, sectionPath, deep)];

  return [
    {
      name,
      content: readmeExists ? sectionReadme : undefined,
      components,
    },
    ...sections
  ]
}

module.exports = setSections;