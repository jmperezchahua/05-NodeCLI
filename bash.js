// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea

  if ("pwd" === cmd) {
    process.stdout.write(process.argv[1]);
  } else if ("date" == cmd) {
    process.stdout.write(Date());
  } else {
    console.log("Fallaste...");
  }
  process.stdout.write("\nprompt > ");
});
