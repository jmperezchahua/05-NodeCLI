const fs = require("fs");
const readline = require("readline");

const ls = (dir = ".") => {
  filenames = fs.readdirSync(dir);
  filenames.forEach((file) => {
    process.stdout.write(file.toString() + "\n");
  });
};

const readLineFile = (file, cmd) => {
  let data = {
    lines: [],
    linesNumber: 0,
  };
  const stream = fs.createReadStream(file);

  stream.on("error", (err) => {
    process.stdout.write(err + "\n");
    process.stdout.write("prompt > ");
  });

  const readInterface = readline.createInterface({
    input: stream,
  });

  readInterface
    .on("line", (line) => {
      data.lines.push(line);
      data.linesNumber++;

      if (cmd === "head") {
        if (data.linesNumber <= 5) {
          process.stdout.write(line + "\n");
        }
      } else if (cmd === "cat") {
        process.stdout.write(line + "\n");
      }
    })
    .on("close", () => {
      if (cmd === "tail") {
        const dataLong = data.lines.length;
        for (let index = dataLong - 5; index < dataLong; index++) {
          process.stdout.write(data.lines[index] + "\n");
        }
      } else if (cmd === "sort") {
        const newData = [...data.lines].sort();
        newData.forEach((ele) => process.stdout.write(ele + "\n"));
      } else if (cmd === "wc") {
        process.stdout.write(data.linesNumber + "\n");
      } else if (cmd === "uniq") {
        const newData = [...data.lines].filter((ele, index, array) => {
          return array.indexOf(ele) === index;
        });
        newData.forEach((ele) => process.stdout.write(ele + "\n"));
      }

      process.stdout.write("prompt > ");
    });
};

const commands = ([...input]) => {
  const nextCommand = input.slice(1, input.length);

  switch (input[0]) {
    case "pwd":
      process.stdout.write(process.argv[1] + "\n");
      process.stdout.write("prompt > ");
      break;
    case "date":
      process.stdout.write(Date() + "\n");
      process.stdout.write("prompt > ");
      break;
    case "ls":
      ls();
      process.stdout.write("prompt > ");
      break;
    case "echo":
      process.stdout.write(nextCommand.join(" ") + "\n");
      process.stdout.write("prompt > ");
      break;
    case "cat":
      readLineFile(nextCommand[0], "cat");
      break;
    case "head":
      readLineFile(nextCommand[0], "head");
      break;
    case "tail":
      readLineFile(nextCommand[0], "tail");
      break;
    case "sort":
      readLineFile(nextCommand[0], "sort");
      break;
    case "wc":
      readLineFile(nextCommand[0], "wc");
      break;
    case "uniq":
      readLineFile(nextCommand[0], "uniq");
      break;
    default:
      process.stdout.write("Comando no reconocido :(" + "\n");
      process.stdout.write("prompt > ");
  }
};

module.exports = {
  commands,
};
