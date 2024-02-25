// pages/api/openai.ts

import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { messages } = req.body;
        const completion = await openai.chat.completions.create({
            messages,
            model: 'gpt-3.5-turbo',
        });
        res.status(200).json(completion.choices[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
