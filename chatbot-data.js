// RVVM School Chatbot Data with Direct API Integration
// ⚠️ WARNING: API key is visible in source code

const GEMINI_API_KEY = 'AIzaSyCCT_l1DjDypxGx94YXiXQ1ryMMimuBf2k'; // ← PASTE YOUR API KEY HERE
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// School Information Context
const schoolContext = `
School Name: Radhika Vilas Vidya Mandir (RVVM)
Location: SH-1B, Chakia (Dalpatpur), Ballia, Uttar Pradesh
Contact: 070712 50111, +91 70712 50999
Email: radhikavilaschakia@gmail.com
WhatsApp: +91 70712 50999
Website: https://rvvm.netlify.app

Timings: Monday to Saturday, 8:00 AM - 3:00 PM (Sunday holiday)
Classes: Nursery to Class 10
Medium: Nursery to 8th (English), 9th-10th (Hindi)
Board: U.P. Board

Facilities: Science Lab, Computer Lab, Playground, 24/7 Security, Power Backup, Fire Safety, School Bus, Scholarship for poor/orphan/handicapped students

Management:
Chairman: Mr. Ravi Shankar Singh
Director: Mr. Bhaskar Singh
Founder: Lt. Vindhyachal Prasad Singh (1924-2009)
Governed by: Shri Vindhyachal Seva Samiti

Admission: Visit school office during working hours or contact via phone/email/WhatsApp
`;

// Predefined Responses (Fallback + Fast Answers)
const chatbotData = {
    timing: {
        patterns: [
            "school timing", "school timings", "school time", "school hours", "school schedule",
            "scool timing", "schol timing", "skool timing", "school timin", "school timming",
            "school ka samay", "school kitne baje khulta", "school kab khulta hai",
            "scool ka samay", "iskool timing", "school ka smay", "skool ka time",
            "school ka tym", "timing kya hai", "school kb se kb tak", "time btao school ka",
            "kitne baje se kitne baje tak", "school open time", "school band kab hota"
        ],
        response: `📅 *RVVM School Timing:*

🕗 *सोमवार से शनिवार:* सुबह 8:00 AM से दोपहर 3:00 PM तक

📴 *रविवार:* अवकाश (Holiday)

⏰ School समय पर खुलता है, कृपया समय का पालन करें।

📞 अधिक जानकारी के लिए संपर्क करें: 070712 50111`
    },

    admission: {
        patterns: [
            "admission", "admissions", "admission process", "how to get admission",
            "admission procedure", "how to apply", "application process",
            "admision", "admissn", "addmission", "admisssion", "admition",
            "dakhla", "pravesh", "admission kaise le", "dakhla kaise le", "pravesh kaise le",
            "school me dakhla", "admission lena hai", "admission chahiye",
            "dakhila", "dakhla kese le", "pravesh kese le", "admisn kese le"
        ],
        response: `📝 *RVVM Admission Process:*

✅ *Process Steps:*
1. School office में working hours में visit करें
2. Admission form भरें
3. आवश्यक documents submit करें
4. Fees payment करें

🕗 *Visit Timing:* सोमवार से शनिवार, 8:00 AM - 3:00 PM

📞 *Contact for Admission:*
☎️ Phone: 070712 50111 / +91 70712 50999
📧 Email: radhikavilaschakia@gmail.com
💬 WhatsApp: +91 70712 50999

🌐 *Online Form:* https://rvvm.netlify.app पर जाकर admission enquiry form भरें

📍 *Address:* SH-1B, Chakia (Dalpatpur), Ballia, UP`
    },

    contact: {
        patterns: [
            "contact", "contact details", "phone number", "contact number", "mobile number",
            "email", "email address", "how to contact", "phone", "call", "whatsapp number",
            "contect", "cantact", "kontact", "contct", "contact detals",
            "sampark", "phone number kya hai", "contact kaise kare", "number do",
            "phone number batao", "email kya hai", "whatsapp number", "kaise contact kare"
        ],
        response: `📞 *RVVM Contact Details:*

☎️ *Phone Numbers:*
📱 070712 50111
📱 +91 70712 50999

📧 *Email:*
✉️ radhikavilaschakia@gmail.com

💬 *WhatsApp:*
📲 +91 70712 50999

🌐 *Website:*
🔗 https://rvvm.netlify.app

📘 *Facebook:*
👉 Radhika Vilas Vidya Mandir

🕗 *Contact Timing:* सोमवार से शनिवार, 8:00 AM - 3:00 PM`
    },

    address: {
        patterns: [
            "address", "location", "where is school", "school address", "school location",
            "where is rvvm", "school kaha hai", "direction", "map", "how to reach",
            "addres", "adress", "adres", "locaton", "loction",
            "pata", "school ka pata", "address batao", "kaha hai school", "school kahaan hai",
            "kaise pahunche", "location kya hai", "address kya hai"
        ],
        response: `📍 *RVVM School Address:*

🏫 *Full Address:*
Radhika Vilas Vidya Mandir
SH-1B, Chakia (Dalpatpur)
Ballia, Uttar Pradesh
India

🗺️ *Landmark:* Chakia, Ballia

🚌 *How to Reach:*
School SH-1B highway पर स्थित है। Chakia area में पूछकर आसानी से पहुँच सकते हैं।

🚗 School bus facility भी उपलब्ध है।

📞 Direction के लिए call करें: 070712 50111

🌐 Map: https://rvvm.netlify.app पर visit करें`
    },

    facilities: {
        patterns: [
            "facilities", "facility", "what facilities", "school facilities", "infrastructure",
            "what is available", "amenities", "lab", "library", "playground", "computer lab",
            "facilites", "facilitys", "facilty",
            "suvidha", "suvidhayen", "school me kya hai", "kya kya hai", "school ki suvidha"
        ],
        response: `🏫 *RVVM Facilities:*

🔬 *Science Laboratory*
💻 *Computer Lab*
⚽ *Playground*
⚡ *Power Backup (24/7)*
🛡️ *24/7 Security*
🔥 *Fire Safety*
🚌 *School Bus/Transport Facility*
🎓 *Scholarship* (गरीब, अनाथ और विकलांग छात्रों के लिए)

🎭 *Extra Activities:*
• Annual Function
• Cultural Programs
• Sports Activities

🏆 RVVM में students की safety aur education के लिए सभी modern facilities उपलब्ध हैं।

📞 अधिक जानकारी: 070712 50111`
    },

    classes: {
        patterns: [
            "classes", "which classes", "class available", "nursery to which class",
            "classes available", "which standard", "what classes",
            "clasess", "clases", "which clasess",
            "kaun kaun si class", "class kya kya hai", "konsi class tak", "nursery se kitni class"
        ],
        response: `📚 *RVVM Classes Available:*

🎒 *Nursery से Class 10th तक*

👶 Nursery
📖 Class 1 to 8
📘 Class 9
📙 Class 10

📖 *Medium of Instruction:*
• Nursery to 8th: *English Medium*
• Class 9th to 10th: *Hindi Medium*

📋 *Board:* U.P. Board (Uttar Pradesh Board)

🎓 Quality education छोटे बच्चों से लेकर 10th तक के students के लिए।

📞 Class-wise details: 070712 50111`
    },

    fees: {
        patterns: [
            "fees", "fee structure", "school fees", "how much fees", "fees kitni hai",
            "monthly fees", "admission fees", "total fees", "fee details",
            "fess", "fee structre", "school fes", "kitna paisa lagta hai", "fees batao"
        ],
        response: `💰 *RVVM Fees Information:*

🔒 Fees structure की detailed information publicly available नहीं है।

📞 *Fees जानने के लिए contact करें:*

☎️ Phone: 070712 50111 / +91 70712 50999
📧 Email: radhikavilaschakia@gmail.com
💬 WhatsApp: +91 70712 50999

🎓 *Special Facility:*
School गरीब, अनाथ और विकलांग छात्रों के लिए *Scholarship* provide करता है।

🏫 Office visit करके complete fee details प्राप्त कर सकते हैं।

🕗 Visit Time: सोमवार से शनिवार, 8:00 AM - 3:00 PM`
    },

    website: {
        patterns: [
            "website", "website link", "online", "site", "web address", "url",
            "websit", "websyte", "webiste", "website kya hai", "website link do"
        ],
        response: `🌐 *RVVM Online Presence:*

🔗 *Official Website:*
https://rvvm.netlify.app

📘 *Facebook Page:*
Radhika Vilas Vidya Mandir

📱 *Online Admission Form:*
Website पर जाकर admission enquiry form भर सकते हैं।

💻 Website पर आपको मिलेगा:
• School information
• Admission details
• Contact information
• Photo gallery
• Updates & announcements

🌐 Visit करें और school के बारे में complete information पाएं!`
    },

    management: {
        patterns: [
            "chairman", "director", "principal", "management", "who is chairman",
            "who is director", "school head", "management team", "owner",
            "charman", "directr", "managment", "chairman kaun hai", "director kaun hai"
        ],
        response: `👔 *RVVM Management:*

👨‍💼 *Chairman:*
Mr. Ravi Shankar Singh

👨‍💼 *Director:*
Mr. Bhaskar Singh

🕊️ *Founder:*
Lt. Vindhyachal Prasad Singh (1924-2009)

🏛️ *Governed by:*
Shri Vindhyachal Seva Samiti

🎓 *Principal Information:*
Principal details के लिए school office से संपर्क करें।

📞 *Management से contact:*
☎️ 070712 50111 / +91 70712 50999
📧 radhikavilaschakia@gmail.com

🏫 RVVM experienced aur dedicated management team के guidance में चलता है।`
    },

    default: {
        response: `❓ *Sorry, मुझे आपका सवाल समझ नहीं आया।*

आप ये सवाल पूछ सकते हैं:

📝 *Admission Process*
🕗 *School Timing*
📞 *Contact Details*
📍 *School Address*
🏫 *Facilities*
📚 *Classes Available*
💰 *Fees Structure*
🌐 *Website*
👔 *Management*

या फिर direct contact करें:
☎️ 070712 50111 / +91 70712 50999
📧 radhikavilaschakia@gmail.com
💬 WhatsApp: +91 70712 50999`
    }
};

// Rate Limiting
let apiCallCount = 0;
const MAX_API_CALLS = 250; // Google Gemini free tier daily limit

// Call Gemini AI API Directly
async function callGeminiAPI(userQuery) {
    // Check daily limit
    if (apiCallCount >= MAX_API_CALLS) {
        console.log('⚠️ Daily API limit reached (250/250)');
        return null;
    }

    try {
        console.log('🤖 Calling Gemini AI directly...');
        
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are RVVM school's helpful virtual assistant. Answer in Hindi/English mix (Hinglish) based on user's language preference.

School Information:
${schoolContext}

Important Instructions:
- Keep answers short and concise (2-3 lines maximum)
- Use emojis to make responses engaging
- If information is not available in school context, politely ask user to contact: 070712 50111
- Be friendly, helpful, and professional
- Match the language style of the user's question

User Question: ${userQuery}

Helpful Answer:`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 200,
                    topP: 0.95,
                    topK: 40
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error:', response.status, errorText);
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        
        // Validate response structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error('❌ Invalid API response structure');
            throw new Error('Invalid response from AI');
        }

        apiCallCount++;
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        console.log(`✅ AI Response generated | Calls today: ${apiCallCount}/${MAX_API_CALLS}`);
        
        return aiResponse;
        
    } catch (error) {
        console.error('❌ Gemini API Error:', error.message);
        return null;
    }
}

