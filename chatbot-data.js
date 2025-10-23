// RVVM School Chatbot Data with Direct API Integration

// ⚠️ WARNING: API key visible hai - sirf demo/testing ke liye
const GEMINI_API_KEY = 'AIzaSyCCT_l1DjDypxGx94YXiXQ1ryMMimuBf2k'; // Yaha apna real key paste karo
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// School ki basic information
const schoolContext = `
School Name: Radhika Vilas Vidya Mandir (RVVM)
Location: SH-1B, Chakia (Dalpatpur), Ballia, Uttar Pradesh
Contact: 070712 50111, +91 70712 50999
Email: radhikavilaschakia@gmail.com
WhatsApp: +91 70712 50999
Website: https://rvvm.netlify.app

Timings: Monday to Saturday, 8:00 AM - 3:00 PM
Classes: Nursery to Class 10
Medium: Nursery to 8th (English), 9th-10th (Hindi)
Board: U.P. Board

Facilities: Science Lab, Computer Lab, Playground, 24/7 Security, Fire Safety, School Bus, Scholarship for poor/orphan/handicapped students

Management:
Chairman: Mr. Ravi Shankar Singh
Director: Mr. Bhaskar Singh

Admission: Visit school office or contact via phone/email/WhatsApp
`;

// Predefined responses (fallback)
const chatbotData = {
    timing: {
        patterns: [
            "school timing", "school timings", "school time", "school hours", "school schedule",
            "scool timing", "schol timing", "skool timing", "school timin", "school timming",
            "school ka samay", "school kitne baje khulta", "school kab khulta hai",
            "scool ka samay", "iskool timing", "school ka smay", "skool ka time",
            "school ka tym", "timing kya hai", "school kb se kb tak"
        ],
        response: `📅 *RVVM School Timing:*

🕗 *सोमवार से शनिवार:* सुबह 8:00 AM से दोपहर 3:00 PM तक
📴 *रविवार:* अवकाश (Holiday)

📞 अधिक जानकारी: 070712 50111`
    },

    admission: {
        patterns: [
            "admission", "admissions", "admission process", "how to get admission",
            "admision", "admissn", "addmission", "dakhla", "pravesh",
            "admission kaise le", "dakhla kaise le"
        ],
        response: `📝 *RVVM Admission Process:*

✅ *Steps:*
1. School office visit करें (8 AM - 3 PM)
2. Admission form भरें
3. Documents submit करें

📞 *Contact:*
☎️ 070712 50111 / +91 70712 50999
📧 radhikavilaschakia@gmail.com
💬 WhatsApp: +91 70712 50999
🌐 Online: https://rvvm.netlify.app`
    },

    contact: {
        patterns: [
            "contact", "contact details", "phone number", "contact number",
            "contect", "cantact", "sampark", "phone number kya hai"
        ],
        response: `📞 *RVVM Contact:*

☎️ 070712 50111
📱 +91 70712 50999
📧 radhikavilaschakia@gmail.com
💬 WhatsApp: +91 70712 50999
🌐 https://rvvm.netlify.app`
    },

    address: {
        patterns: [
            "address", "location", "where is school", "school address",
            "addres", "adress", "pata", "school ka pata", "kaha hai"
        ],
        response: `📍 *RVVM Address:*

🏫 Radhika Vilas Vidya Mandir
SH-1B, Chakia (Dalpatpur)
Ballia, Uttar Pradesh, India

🚌 School bus facility available`
    },

    facilities: {
        patterns: [
            "facilities", "facility", "what facilities", "school facilities",
            "facilites", "suvidha", "school me kya hai"
        ],
        response: `🏫 *RVVM Facilities:*

🔬 Science Laboratory
💻 Computer Lab
⚽ Playground
⚡ 24/7 Power Backup
🛡️ 24/7 Security
🔥 Fire Safety
🚌 School Bus
🎓 Scholarship (गरीब, अनाथ, विकलांग छात्रों के लिए)`
    },

    classes: {
        patterns: [
            "classes", "which classes", "class available",
            "clasess", "kaun kaun si class", "konsi class tak"
        ],
        response: `📚 *RVVM Classes:*

🎒 *Nursery to Class 10*

📖 *Medium:*
• Nursery to 8th: English
• 9th to 10th: Hindi

📋 *Board:* U.P. Board`
    },

    fees: {
        patterns: [
            "fees", "fee structure", "school fees", "how much fees",
            "fess", "fees kitni hai", "kitna paisa"
        ],
        response: `💰 *RVVM Fees:*

Fees details के लिए contact करें:
☎️ 070712 50111 / +91 70712 50999

🎓 *Scholarship* available for poor, orphan & handicapped students`
    },

    default: {
        response: `❓ *Sorry, मुझे समझ नहीं आया।*

आप ये पूछ सकते हैं:
🕗 Timing | 📝 Admission | 📞 Contact
📍 Address | 🏫 Facilities | 📚 Classes

या call करें: 070712 50111`
    }
};

// Rate limiting
let apiCallCount = 0;
const MAX_API_CALLS = 250;

// Direct Gemini AI API call (no backend needed)
async function callGeminiAPI(userQuery) {
    if (apiCallCount >= MAX_API_CALLS) {
        console.log('⚠️ API limit reached today');
        return null;
    }

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are RVVM school's helpful assistant. Answer in Hindi/English mix (Hinglish) based on user's language.

School Information:
${schoolContext}

Important:
- Keep answers short (2-3 lines)
- Use emojis for better readability
- If info not available, ask to contact: 070712 50111
- Be friendly and helpful

User Question: ${userQuery}

Answer:`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 200,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        apiCallCount++;
        
        console.log(`✅ AI Response | Calls today: ${apiCallCount}/${MAX_API_CALLS}`);
        
        return data.candidates[0].content.parts[0].text;
        
    } catch (error) {
        console.error('❌ AI Error:', error.message);
        return null;
    }
}
