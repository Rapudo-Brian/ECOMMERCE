const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve the frontend from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API route to get products
app.get("/api/products", (req, res) => {
    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Failed to read data" });
            return;
        }
        const products = JSON.parse(data).products;
        res.json(products);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
