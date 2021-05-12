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

const readLineFile = (file, cmd) => {
  //Iniciando readFile
  const readInterface = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
  });

  let count = 0;
  readInterface.on("line", function (line) {
    count++;
    if (cmd === "head") {
      if (count >= 5) readInterface.close();
    }
  });

  // readInterface.on("history")
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
      readLineFile(nextCommand[0]);
      break;
    case "head":
      readLineFile(nextCommand[0], "head");
      break;
    case "tail":
      readLineFile(nextCommand[0], "tail");
      break;
    default:
      console.log("Ups! vuelve a escribir...");
  }
};

module.exports = {
  commands,
};
