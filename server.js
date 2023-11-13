import express from "express";
import { createServer } from "http";
import fs from "fs";
import cors from "cors";
import Papa from "papaparse";

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.post("/api/addtocsv", (req, res) => {
  const receivedData = req.body;

  // Read existing data from CSV file
  const existingData = [];
  fs.createReadStream("log.csv")
    .pipe(Papa.parse(Papa.NODE_STREAM_INPUT, { header: true }))
    .on("data", (row) => {
      existingData.push(row);
    })
    .on("end", () => {
      // Add received data to existing data
      existingData.push(receivedData);

      // Write data back to CSV file
      const csvData = Papa.unparse(existingData, { header: true });
      fs.writeFileSync("log.csv", csvData);

      console.log("Data berhasil ditambahkan ke file CSV");
      res.sendStatus(200);
    });
});

server.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
