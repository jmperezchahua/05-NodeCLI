const fs = require("fs");
const readline = require("readline");

const ls = (dir = ".") => {
  //   fs.readdir(".", function (err, files) {
  //     if (err) throw err;
  //     files.forEach((file) => process.stdout.write(file.toString() + "\n"));
  //     process.stdout.write("prompt > ");
  //   });

  /*Usando "readdirSync" */
  filenames = fs.readdirSync(dir);
  filenames.forEach((file) => {
    process.stdout.write(file.toString() + "\n");
  });
};

const readFile = (file) => {
  const filteContent = fs.readFile(file, "utf8", function (err, data) {
    if (err) throw err;
    console.log(data);
  });
};

const readLineF = (file) => {
  //Iniciando readFile
  const readInterface = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    // console: false,
  });

  let count = 0;
  readInterface.on("line", function (line) {
    count++;
    if (count <= 5) console.log("Linea [" + count + "] " + line);
  });
};

const commands = ([...input]) => {
  const nextCommand = input.slice(1, input.length);

  switch (input[0]) {
    case "pwd":
      process.stdout.write(process.argv[1]);
      break;
    case "date":
      process.stdout.write(Date());
      break;
    case "ls":
      ls();
      break;
    case "echo":
      process.stdout.write(nextCommand.join(" "));
      break;
    case "cat":
      readFile(nextCommand[0]);
      break;
    case "head":
      readLineF(nextCommand[0]);
      break;
    default:
      console.log("Ups! vuelve a escribir...");
  }
};

module.exports = {
  commands,
};
