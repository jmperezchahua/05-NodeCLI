const commands = require("./commands");

// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
console.log("Ingresa algo...");

process.stdin.on("data", function (data) {
  const cmd = data.toString().trim(); // remueve la nueva línea
  const newCmd = cmd.split(" ");
  commands.commands(newCmd);
  //Cuando finalize la lectura de comandos debemos activar de nuevo el ingreso
  // process.stdout.write("\nprompt > ");
});

// const startTime = new Date();
// setTimeout(function () {
//   const endTime = new Date();
//   console.log("Time elapsed: ", endTime - startTime, "ms");
// }, 100);
// while (new Date() - startTime < 200) {}
