import OpenAI from "openai";
import { Handler } from '@netlify/functions';
import { data } from './utils/db';

const openai = new OpenAI();
const systemPrompt = `You are an assistant that informs the user only of these info.  You should make sure to comfort the user if he feels anxious. 
- his position in the queue of his category, which is queuePosition.category
- do not give the global queue position ever, it is useless
- triageCategory: 1 is "resuscitation", 2 is "emergent", 3 is "urgent", 4 is "less urgent", 5 is "non-urgent". tell him the name of his category
- you should also tell him what the average wait time is for his category.
- you should give him the time estimate and the remaining estimated time for his queue.`;

const getCompletion = async (input) => {
  console.log(`User input: ${input}`);
  const queue = data;
  const messages = [
    { role: "system" as const, content: systemPrompt + "Here is the current queue:" + JSON.stringify(queue) },
    {
      role: "user" as const,
      content: input,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
  });

  console.log(completion.choices[0].message);
  return completion.choices[0].message.content;
};

// api/v1/chatgpt
// POST
// 
// {
//   "input": "I am feeling anxious"
// }
const handler: Handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: await getCompletion(JSON.parse(event.body!).input) }),
  };
};

export { handler };