import express from "express";
import gpt4all from "gpt4all";
import { config } from "dotenv";

// Creamos servidor
const app = express();

// Recuperamos variables de entorno
config();

// Puerto
const port = 3001;

// Sólo tratamos la raíz
app.get("/", async (req, res) => {
  // recuperamos entorno
  const api_host = process.env.API_HOST;
  const api_key = process.env.STABE_DIFFUSION_API_KEY;
  const engine_id = process.env.ENGINE_ID;

  /* Modelo */
  console.log("Inicializamos modelo...");
  const gptj = gpt4all.GPT4All("gpt4all-lora-quantized", true);

  // console.log(api_host);
  // console.log(api_key);
  // console.log(engine_id);

  console.log("Rellenamos Info...");
  const prompt_description =
    "You are a business consultant. Please write a short description for a product idea for an online shop inspired by the following concept: flutter";
  const messages_description = [{ role: "user", content: prompt_description }];
  const description =
    gptj.chat_completion(messages_description)["choices"][0]["message"][
      "content"
    ];

  console.log("1. Respuesta...");
  console.log(description);

  const prompt_name =
    'You are a business consultant. Please write a name of maximum 5 words for a product with the following description: "' +
    description +
    '"';
  const messages_name = [{ role: "user", content: prompt_name }];
  const name =
    gptj.chat_completion(messages_name)["choices"][0]["message"]["content"];

  console.log("2. Respuesta...");
  console.log(name);

  res.send(name);
});

// Escuchamos por el puerto port
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
