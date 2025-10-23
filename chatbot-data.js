// RVVM School Chatbot Data with Typo Tolerance
// School ki basic information (AI ko context dene ke liye)
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
// Har response ke liye 30-50 variations with common typos

const chatbotData = {
    // ========== SCHOOL TIMING ==========
    timing: {
        patterns: [
            // English correct
            "school timing", "school timings", "school time", "school hours", "school schedule",
            "what time school opens", "opening time", "closing time", "school start time",
            // English typos
            "scool timing", "schol timing", "skool timing", "school timin", "school timming",
            "schhool time", "schooll timing", "schol time", "timings of school", "school tym",
            "scool time", "school timng", "skul timing", "school timmings", "schoo timing",
            // Hindi variations
            "school ka samay", "school kitne baje khulta", "school kab khulta hai",
            "school ka time", "samay kya hai", "timing batao", "school kab se kab tak",
            // Hindi typos
            "scool ka samay", "iskool timing", "school ka smay", "skool ka time",
            "school kitne bje", "skul ka samay", "timing btao", "school kb khulta",
            // Hinglish
            "school ka tym", "timing kya hai", "school kb se kb tak", "time btao school ka",
            "kitne baje se kitne baje tak", "school open time", "school band kab hota",
            "skool kab khulta", "school close time", "holiday kab hai"
        ],
        response: `📅 *RVVM School Timing:*

🕗 *सोमवार से शनिवार:* सुबह 8:00 AM से दोपहर 3:00 PM तक

📴 *रविवार:* अवकाश (Holiday)

⏰ School समय पर खुलता है, कृपया समय का पालन करें।

📞 अधिक जानकारी के लिए संपर्क करें: 070712 50111`
    },

    // ========== ADMISSION ==========
    admission: {
        patterns: [
            // English correct
            "admission", "admissions", "admission process", "how to get admission",
            "admission procedure", "how to apply", "application process", "enroll",
            "enrollment", "how to join", "admission form", "admission kaise le",
            // English typos
            "admision", "admissn", "addmission", "admisssion", "admition", "admision prosess",
            "admissn process", "addmision", "how to get admision", "admision form",
            "admisson", "admisn", "admmission", "admisssion", "admishun",
            // Hindi correct
            "dakhla", "pravesh", "admission kaise le", "dakhla kaise le", "pravesh kaise le",
            "school me dakhla", "admission lena hai", "admission chahiye", "form kaha milega",
            // Hindi typos
            "dakhila", "dakhla kese le", "pravesh kese le", "admisn kese le",
            "school me dakhila", "dakhla lena h", "admisn chahiye", "form kha milega",
            // Hinglish
            "admission kaise hoga", "dakhla process", "form bharna hai", "admission kb hai",
            "dakhla kb se", "admission k liye kya chahiye", "admission kese lenge"
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

    // ========== CONTACT ==========
    contact: {
        patterns: [
            // English correct
            "contact", "contact details", "phone number", "contact number", "mobile number",
            "email", "email address", "how to contact", "phone", "call", "whatsapp number",
            // English typos
            "contect", "cantact", "kontact", "contct", "contact detals", "phon number",
            "fone number", "mobil number", "emial", "emal", "email adress", "contect number",
            "cantact details", "phn number", "whatsap", "whatsapp no", "whatapp",
            // Hindi correct
            "sampark", "phone number kya hai", "contact kaise kare", "number do",
            "phone number batao", "email kya hai", "whatsapp number", "kaise contact kare",
            // Hindi typos
            "samprk", "fone number", "contect kese kare", "number do", "fon number btao",
            "emal kya h", "whatapp number", "kese contact kre", "number chahiye",
            // Hinglish
            "contact kaise karu", "number btao", "phone number chahiye", "email id kya h",
            "whatsapp pr contact kr skte", "contact kese kre", "number de do"
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

    // ========== ADDRESS ==========
    address: {
        patterns: [
            // English correct
            "address", "location", "where is school", "school address", "school location",
            "where is rvvm", "school kaha hai", "direction", "map", "how to reach",
            // English typos
            "addres", "adress", "adres", "locaton", "loction", "were is school",
            "school addres", "school locaton", "wer is rvvm", "dirction", "how to reech",
            "school kha h", "school kha hai", "addrss", "locetion",
            // Hindi correct
            "pata", "school ka pata", "address batao", "kaha hai school", "school kahaan hai",
            "kaise pahunche", "location kya hai", "address kya hai",
            // Hindi typos
            "skool ka pata", "addres btao", "kha h school", "skool kahan h",
            "kese pahunche", "locatn kya h", "addres kya h", "pata btao",
            // Hinglish
            "school ka address kya hai", "location btao", "kaha pr h school",
            "address de do", "school kha pr hai", "kese jaaye", "map dikhao"
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

    // ========== FACILITIES ==========
    facilities: {
        patterns: [
            // English correct
            "facilities", "facility", "what facilities", "school facilities", "infrastructure",
            "what is available", "amenities", "lab", "library", "playground", "computer lab",
            // English typos
            "facilites", "facilitys", "facilty", "what facilites", "school facilty",
            "infrastructre", "what is avilable", "amenitys", "labb", "libarary", "play ground",
            "computer labb", "facilitis", "faciltiy",
            // Hindi correct
            "suvidha", "suvidhayen", "school me kya hai", "kya kya hai", "school ki suvidha",
            "lab hai kya", "library hai", "playground hai", "computer lab hai",
            // Hindi typos
            "suvidha kya h", "school me kya h", "kya kya h", "skool ki suvidha",
            "labb h kya", "libraary h", "playground h kya", "computer labb h",
            // Hinglish
            "school me kya kya facility hai", "facilities btao", "kya kya available hai",
            "lab library hai kya", "school me kya hai", "suvidha batao"
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

    // ========== CLASSES ==========
    classes: {
        patterns: [
            // English correct
            "classes", "which classes", "class available", "nursery to which class",
            "classes available", "which standard", "what classes", "class 10 hai kya",
            // English typos
            "clasess", "clases", "which clasess", "class avilable", "nursry to which class",
            "classess available", "which standrd", "what clasess", "class 10 h kya",
            // Hindi correct
            "kaun kaun si class", "class kya kya hai", "konsi class tak", "nursery se kitni class",
            "10th tak hai kya", "classes batao", "kaunsi kaksha",
            // Hindi typo
            "kaun kaun si clas", "clas kya kya h", "konsi clas tak", "nursry se kitni clas",
            "10th tk h kya", "classes btao", "kaunsi kaksha h",
            // Hinglish
            "school me konsi class hai", "kitni class tak hai", "nursery se 10th tak hai kya",
            "class kya kya available hai", "which classes available"
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

    // ========== FEES ==========
    fees: {
        patterns: [
            // English correct
            "fees", "fee structure", "school fees", "how much fees", "fees kitni hai",
            "monthly fees", "admission fees", "total fees", "fee details",
            // English typos
            "fess", "fee structre", "school fes", "how much fess", "fes kitni h",
            "monthly fess", "admision fees", "total fes", "fe details", "fees structur",
            // Hindi correct
            "fees kitni hai", "school ki fees", "kitna paisa lagta hai", "fees batao",
            "mahina kitna lagta", "admission me kitna", "total kitna",
            // Hindi typos
            "fes kitni h", "school ki fes", "kitna pesa lagta h", "fes btao",
            "mahina kitna lgta", "admisn me kitna", "total kitna h",
            // Hinglish
            "school ki fees kya hai", "kitna kharcha hai", "fees structure kya hai",
            "mahina ka kitna", "ek bar me kitna lagega"
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

    // ========== WEBSITE ==========
    website: {
        patterns: [
            // English correct
            "website", "website link", "online", "site", "web address", "url",
            "online portal", "school website", "rvvm website",
            // English typos
            "websit", "websyte", "webiste", "websit link", "onlin", "web addres",
            "online portel", "school websit", "rvvm websyt",
            // Hindi
            "website kya hai", "website link do", "online kya hai", "site batao",
            // Hindi typos
            "websit kya h", "websit link do", "onlin kya h", "site btao",
            // Hinglish
            "school ki website", "online website hai kya", "link bhejo"
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

    // ========== MANAGEMENT ==========
    management: {
        patterns: [
            // English
            "chairman", "director", "principal", "management", "who is chairman",
            "who is director", "school head", "management team", "owner",
            // English typos
            "charman", "directr", "principl", "managment", "who is charman",
            "who is directr", "school hed", "managment team", "ownar",
            // Hindi
            "chairman kaun hai", "director kaun hai", "principal kaun hai",
            "school ka malik", "adhyaksh", "management kaun hai",
            // Hindi typos
            "charman kon h", "director kon h", "principal kon h",
            "school ka maalik", "adhyaksh kon", "managment kon h",
            // Hinglish
            "chairman ka naam", "director kon hai", "school ke head"
        ],
        response: `👔 *RVVM Management:*

👨‍💼 *Chairman:*
Mr. Ravi Shankar Singh

👨‍💼 *Director:*
Mr. Bhaskar Singh

🎓 *Principal Information:*
Principal details publicly available नहीं हैं। School office से contact करें।

📞 *Management से contact:*
☎️ 070712 50111 / +91 70712 50999
📧 radhikavilaschakia@gmail.com

🏫 RVVM experienced aur dedicated management team के guidance में चलता है।`
    },

    // ========== DEFAULT / FALLBACK ==========
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
// Rate limiting
let apiCallCount = 0;
const MAX_API_CALLS = 250;

// Secure API call through Netlify Function
async function callGeminiAPI(userQuery) {
    if (apiCallCount >= MAX_API_CALLS) {
        console.log('⚠️ API limit reached. Using fallback.');
        return null;
    }

    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                query: userQuery,
                schoolContext: schoolContext 
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        if (data.fallback) {
            return null; // Use predefined responses
        }
        
        apiCallCount++;
        console.log(`✅ API Call ${apiCallCount}/${MAX_API_CALLS}`);
        
        return data.response;
        
    } catch (error) {
        console.error('❌ API Error:', error);
        return null;
    }
}
