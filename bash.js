const commands = require("./commands");

const fs = require("fs");

// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
console.log("Ingresa algo...");

process.stdin.on("data", function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea
  commands.commands(cmd);
  process.stdout.write("\nprompt > ");
});

fs.readdir(".", function (err, files) {
  if (err) throw err;
  files.forEach(function (file) {
    process.stdout.write(file.toString() + "\n");
  });
  process.stdout.write("prompt > ");
});
