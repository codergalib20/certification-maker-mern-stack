const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const port = process.env.PORT || 5000
const app = express();
const pdfTemplate = require("./documents");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    console.log("Response home page");
})
app.post("/api/post-data", (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile(`certificate.pdf`, error => {
        if (error) {
            return res.send(Promise.reject());
        }
        return res.send(Promise.resolve());
    })
})
app.get("/api/get-certificate", (req, res) => {
    console.log(`${__dirname}/certificate.pdf`);
    res.sendFile(`${__dirname}/certificate.pdf`);
})

app.listen(port, () => {
    console.log(`Application running in port no is : ${port}`);
})