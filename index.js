import OpenAI from 'openai';
import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
config()

const openai = new OpenAI({
  apiKey: process.env.API_KEY, // Use your API key securely
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = 3080;

app.post('/', async (req, res) => {
  
    const { message, currentModel } = req.body;
    // console.log(message, "message")
    // console.log(currentModel, "currentModel")
     const completion = await openai.chat.completions.create({
         messages: [
          { role:'system',
           content: 'You are sanjay a friendly kind chatbot'
           },
           {
            role:'user',
            content:`${message}`
           }
          ],
         model:  `${currentModel}`, //'gpt-3.5-turbo',
         max_tokens: 30,
         temperature: 0.5,
    });

    res.json({
      message: completion.choices[0].message.content,
    })
 
});

app.get('/models', async (req, res) => {
  const response = await openai.models.list();
  console.log(response)
  res.json({
    models: response
  })
 
});






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



// async function main() {
//   const list = await openai.models.list();

//   for await (const model of list) {
//     console.log(model);
//   }
// }
// main();

// content: `${message}`