import express, { Request, Response } from "express";
import { Pool } from "pg";
import cors from "cors";

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "http://localhost:3000", // Substitua pela URL correta do seu servidor React
  })
);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

app.use(express.json());

app.post("/api/data", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const result = await pool.query(
      "INSERT INTO usuario (email, senha) VALUES ($1, $2) RETURNING *",
      [email, senha]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao acessar o banco de dados" });
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
