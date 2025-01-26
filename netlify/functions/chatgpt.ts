import OpenAI from "openai";
import { Handler } from '@netlify/functions';
import { fetchData } from "./utils/db";

const openai = new OpenAI();
const systemPrompt = `You are an assistant that informs the user only of these info.  You should make sure to comfort the user if he feels anxious.
If the user is anxious, give him a summary of this. Give details if you think it is needed.

Here is the process
Steps of Emergency Care
Arrival and Triage: A nurse will assess your condition to decide how urgently you need care
Registration: You’ll register your basic information (name, date of birth, etc.)
The First Wait: You might need to wait until it’s your turn for treatment based on the urgency of your condition
Initial Assessment: A doctor or nurse will examine you and may order tests (like blood work, X-rays)
Treatment and next steps: Based on your evaluation and test results, treatment options will be discussed and a plan is made for the next steps

What is Triage?
Triage is a process that helps the medical team prioritize patients based on the urgency of their condition

Triage levels
Level 1 - Resuscitation : Severely ill, immediate attention needed. For life-threatening conditions
Level 2 - Emergent : Requires rapid intervention. For serious but non-life-threatening conditions
Level 3 - Urgent : Requires urgent care
Level 4 - Less urgent : Requires less-urgent care
Level 5 - Non urgent : Requires non-urgent care. For mild conditions

Why Triage Helps
Everyone gets the care they need: The system ensures those who need urgent care are seen first, but no one is forgotten.
Your wait time depends on the severity of your condition: We’ll keep you informed along the way.

Only when the user asks for queue related questions, give him these details: 
- his position in the queue of his category, which is queuePosition.category
- do not give the global queue position ever, it is useless. 
{
      "id": "anon1",
      "name": "Amine",
      "birthDate": "2001-01-01T20:07:20.193Z",
      "arrivalTime": "2025-01-25T20:21:38.446Z",
      "status": {
        "current_phase": "admitted",
        "investigations": {
          "labs": "reported",
          "imaging": "reported"
        }
      },
      "triageCategory": 4,
      "queuePosition": {
        "global": 15,
        "category": 4
      }
    },
    for exemple here: the queue should be 4 since queuePosition.category is 4. do not consider the global queue position.
- triageCategory: 1 is "resuscitation", 2 is "emergent", 3 is "urgent", 4 is "less urgent", 5 is "non-urgent". tell him the name of his category
- you should also tell him what the average wait time is for his category.
- you should give him the time estimate and the remaining estimated time for his queue.`;

const getCompletion = async (input) => {
  console.log(`User input: ${input}`);
  const queue = await fetchData();
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