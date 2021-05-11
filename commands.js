const fs = require("fs");

const ls = () => {
  fs.readdir(".", function (err, files) {
    if (err) throw err;
    files.forEach((file) => process.stdout.write(file.toString() + "\n"));
    process.stdout.write("prompt > ");
  });
};

const commands = (input) => {
  switch (input) {
    case "pwd":
      process.stdout.write(process.argv[1]);
      break;
    case "date":
      process.stdout.write(Date());
      break;
    case "ls":
      ls();
      break;
    default:
      console.log("Ups! vuelve a escribir...");
  }
};

module.exports = {
  commands,
};
