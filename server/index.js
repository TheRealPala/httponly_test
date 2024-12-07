const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Per leggere i cookie

const app = express();

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000", // Origine consentita
  credentials: true, // Abilita l'invio di cookie e altre credenziali
  methods: ["GET", "POST", "OPTIONS"], // Consenti i metodi necessari
};

app.use(cors(corsOptions));

app.get("/api/set-cookie", (req, res) => {
  res.cookie("myCookie", "cookieValue", {
    httpOnly: true, // Il cookie non può essere letto dal client tramite JavaScript
    secure: false, // Deve essere `true` in produzione con HTTPS
    sameSite: "lax", // Imposta il cookie come cross-origin
  });
  res.json({ message: "Cookie impostato!" });
});

app.get("/api/get-cookie", (req, res) => {
  const cookieValue = req.cookies.myCookie; // Legge il valore del cookie
  if (cookieValue) {
    res.json({ cookie: cookieValue });
  } else {
    res.status(403).json({ message: "Cookie non trovato!" });
  }
});

app.get("/api/delete-cookie", (req, res) => {
  if (req.cookies.myCookie) {
    res.clearCookie("myCookie",{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.json({message: "cookie cleared"});
  } else {
      res.status(403).json({ message: "Cookie non presente, non puoi eseguire richieste!" });
  }
});

const PORT = 5012;
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
