import axios from 'axios';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('data:', data);
        console.log('data.input:', data.input)
        const input = data.input;
        
        // send post request to HF inference API
        const result = await axios({
            method: 'POST',
            url: 'https://api-inference.huggingface.co/models/evannaderi/distilbert-base-uncased-finetuned-emotion',
            headers: { Authorization: 'Bearer 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' },
            data: JSON.stringify({ inputs: input })
        });

        console.log('result:', result.data);

        return new Response(JSON.stringify({ result: result.data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching analysis results:', error);
        return new Response('Internal Server Error', { status: 500 });
    }

};