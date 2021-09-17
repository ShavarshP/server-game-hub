var fs = require("fs");

const writeFile = (name, data) => {
  fs.writeFileSync(
    "file_" + name + ".txt",
    JSON.stringify(data),
    function (err) {
      if (err) throw err;
    }
  );
};
const readFile = (name) =>
  fs.readFileSync("file_" + name + ".txt", (err, data) => {
    if (err) throw err;
    return data.toString();
  });

module.exports = { writeFile, readFile };
