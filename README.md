# API Log CSV

API ini digunakan untuk mencatat log statistik dengan parameter-parameter berikut:

- **Resolution**: Resolusi
- **Bandwidth**: Bandwidth
- **Frames**: Jumlah frame
- **Latency**: Latensi
- **RTT**: Round Trip Time
- **Cubic**: Cubic Parameter

Berikut adalah contoh hasil keluaran dari API dalam bentuk tabel:

| Resolution | Bandwidth | Frames               | Latency   | RTT                       | Cubic  |
|------------|-----------|----------------------|-----------|---------------------------|--------|
| 640x360    | 499 Kbps  | 361 decoded, 3 dropped | 518 ms | srtt 261 ms, rto 891 ms   | cwnd 7 |
| 426x240    | 321 Kbps  | 361 decoded, 3 dropped | 518 ms | srtt 235 ms, rto 915 ms   | cwnd 7 |

Dalam contoh ini, data statistik diorganisir dalam bentuk tabel yang memudahkan untuk melihat masing-masing parameter. Anda dapat menggunakan format ini sebagai referensi dalam dokumen atau catatan Anda terkait API Log CSV.


# Jalankan API ini dengan perintah pada terminal  :

``` npm run dev ```
