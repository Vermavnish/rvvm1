exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };
    
    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }
    
    // Only POST allowed
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        const { query, schoolContext } = JSON.parse(event.body);
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        
        // Check API key exists
        if (!GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY not found in environment variables');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'API key not configured',
                    fallback: true 
                })
            };
        }
        
        console.log('✅ API Key found, making request...');
        
        // Make API request
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are RVVM school's virtual assistant. Answer in Hindi/English mix (Hinglish).

School Information:
${schoolContext}

User Question: ${query}

Answer in 2-3 lines with emojis.`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 200,
                    }
                })
            }
        );
        
        // Check response
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error:', response.status, errorText);
            throw new Error(`API returned ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        
        // Check if response has expected structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error('❌ Unexpected API response structure:', data);
            throw new Error('Invalid API response structure');
        }
        
        const botResponse = data.candidates[0].content.parts[0].text;
        console.log('✅ AI Response generated successfully');
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response: botResponse })
        };
        
    } catch (error) {
        console.error('❌ Function Error:', error.message);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to get AI response',
                message: error.message,
                fallback: true 
            })
        };
    }
};
