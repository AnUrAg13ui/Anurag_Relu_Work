const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const results = [];
  fs.createReadStream("Resultant_data.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.render("index", { records: results, columns: Object.keys(results[0] || {}) });
    });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
