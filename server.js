import express from "express";
import { createServer } from "http";
import fs from "fs";
import csv from "csv-parser";
import cors from "cors";
import createCsvWriter from "csv-writer";

const app = express();
const createCsv = createCsvWriter.createObjectCsvWriter;
const server = new createServer(app);

app.use(cors());
app.use(express.json()); // Middleware untuk menguraikan data JSON

app.post("/api/addtocsv", (req, res) => {
  const receivedData = req.body; // Data yang dikirim dari klien

  // Baca data yang sudah ada dari file CSV
  const existingData = [];
  fs.createReadStream("log.csv")
    .pipe(csv())
    .on("data", (row) => {
      existingData.push(row);
    })
    .on("end", () => {
      // Tambahkan data yang diterima ke dalam data yang sudah ada
      existingData.push(receivedData);

      // Tulis kembali data ke dalam file CSV
      const csvWriter = createCsv({
        path: "log.csv",
        header: [
          { id: "Resolution", title: "Resolution" },
          { id: "Throughput", title: "Throughput" },
          { id: "BufferTime", title: "BufferTime" },
          { id: "Delay", title: "Delay" },
          { id: "Latency", title: "Latency" },
          { id: "Rtt", title: "Rtt" },
          { id: "DecodedFrames", title: "DecodedFrames" },
          { id: "DecodedFrames", title: "DecodedFrames" },
          { id: "PlayTime", title: "PlayTime" },
          { id: "PauseTime", title: "PauseTime" },
          { id: "StreamBandwidth", title: "StreamBandwidth" },
          { id: "EstimatedBandwidth", title: "EstimatedBandwidth" },
        ],
      });

      csvWriter
        .writeRecords(existingData)
        .then(() => {
          console.log("Data berhasil ditambahkan ke file CSV");
          res.sendStatus(200); // Kirim respons sukses
        })
        .catch((error) => {
          console.error("Gagal menambahkan data ke file CSV:", error);
          res.sendStatus(500); // Kirim respons kesalahan server
        });
    });
});

// app.post("/api/logs", (req, res) => {
//   const receivedData = req.body; // Data yang dikirim dari klien

//   // Lakukan sesuatu dengan data yang diterima, misalnya, simpan ke dalam log file
//   const logEntry = `${new Date().toISOString()}: ${JSON.stringify(
//     receivedData
//   )}`;

//   // Simpan data ke dalam log file (contoh: log.txt)
//   fs.appendFile("log.txt", logEntry + "\n", (err) => {
//     if (err) {
//       console.error("Gagal menyimpan data ke log file:", err);
//       res.sendStatus(500); // Kirim respons kesalahan server
//     } else {
//       console.log("Data berhasil disimpan ke log file:", logEntry);
//       res.sendStatus(200); // Kirim respons sukses
//     }
//   });
// });

server.listen(3000, () => {
  console.log("Server bejalan di port 3000");
});
