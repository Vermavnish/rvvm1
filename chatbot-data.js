// RVVM School Chatbot Data with Advanced API Integration
// Features: Multi-key rotation, Model fallback, Auto-retry, Error handling

// ==================== CONFIGURATION ====================

// Multiple API Keys (add 2-3 keys for load balancing)
const API_KEYS = [
    'AIzaSyAu92hVQQAOkuUVZn2Nylj5SDSvr5-cOT4',  // ← Replace with real key 1
    'AIzaSyCCivTv69IanKB8CwxdbuOGJ-2RWDDeOYM',  // ← Replace with real key 2 (optional)
    'AIzaSyCCT_l1DjDypxGx94YXiXQ1ryMMimuBf2k'   // ← Replace with real key 3 (optional)
];

// Multiple Models (fallback order: fast → stable → powerful)
const AI_MODELS = [
    'gemini-2.5-flash',        // Fastest, most reliable
    'gemini-flash-latest',     // Stable alternative
    'gemini-2.0-flash',        // Backup option
    'gemini-pro-latest'        // Powerful fallback
];

// Settings
const MAX_REQUESTS_PER_KEY = 250;  // Google free tier limit
const MAX_RETRIES = 2;              // Retry attempts per request
const RETRY_DELAY = 2000;           // 2 seconds between retries

// Tracking
let currentKeyIndex = 0;
let currentModelIndex = 0;
let keyUsageCount = Array(API_KEYS.length).fill(0);

// ==================== SCHOOL INFORMATION ====================

const schoolContext = `
═══════════════════════════════════════════════════════════════
                    RADHIKA VILAS VIDYA MANDIR (RVVM)
                    Complete School Information Database
═══════════════════════════════════════════════════════════════

📍 BASIC INFORMATION:
-------------------
School Name: Radhika Vilas Vidya Mandir (RVVM)
Established: 1993 (32+ years of excellence)
Location: SH-1B, Chakia (Dalpatpur), Ballia, Uttar Pradesh, India
Landmark: State Highway 1B, easily accessible from Chakia town
Area: Dalpatpur village, Chakia tehsil, Ballia district

📞 CONTACT DETAILS:
------------------
Primary Phone: 070712 50111
Secondary Phone: +91 70712 50999 (WhatsApp available)
Email: radhikavilaschakia@gmail.com
Official Website: https://rvvm.netlify.app
Facebook: Radhika Vilas Vidya Mandir (Official Page)
WhatsApp Support: Available Mon-Sat, 8 AM - 3 PM

🕐 SCHOOL TIMINGS:
-----------------
Working Days: Monday to Saturday
School Hours: 8:00 AM to 3:00 PM (7 hours daily)
Morning Assembly: 8:00 AM - 8:30 AM
Class Sessions: 8:30 AM - 2:30 PM
Break/Lunch: 12:00 PM - 12:30 PM (30 minutes)
Closing Time: 3:00 PM
Weekly Holiday: Sunday (full day off)
Annual Holidays: As per U.P. Board calendar + national holidays

📚 ACADEMIC INFORMATION:
-----------------------
Classes Offered: Nursery to Class 10th (complete primary + secondary education)

Class Structure:
- Pre-Primary: Nursery, LKG, UKG
- Primary: Class 1, 2, 3, 4, 5
- Upper Primary: Class 6, 7, 8
- Secondary: Class 9, 10

Medium of Instruction:
- Nursery to Class 8: English Medium (all subjects taught in English)
- Class 9 to 10: Hindi Medium (as per U.P. Board requirement)

Board Affiliation: 
- Uttar Pradesh Board (U.P. Board)
- DIOS (District Inspector of Schools) Ballia approved
- Government recognized

Subjects Taught:
Primary Classes (1-5): English, Hindi, Mathematics, Science, Social Studies, Computer Basics, Drawing, Physical Education
Upper Primary (6-8): English, Hindi, Mathematics, Science, Social Science, Computer Science, Sanskrit, Arts, Sports
Secondary (9-10): Hindi, English, Mathematics, Science (Physics, Chemistry, Biology), Social Science, Computer Application

Exam Pattern:
- Regular monthly tests and assessments
- Half-yearly examinations (September/October)
- Annual examinations (February/March)
- U.P. Board exams for Class 10 (February/March)

Academic Session: April to March (follows U.P. Board calendar)

👔 MANAGEMENT & GOVERNANCE:
--------------------------
Governed By: Shri Vindhyachal Seva Samiti (Registered Educational Trust)
Founded By: Late Vindhyachal Prasad Singh (1924-2009) - Visionary educationist and social worker
Chairman: Mr. Ravi Shankar Singh (Current)
Director: Mr. Bhaskar Singh (Current)
Principal: Contact school office for current principal details
Management Type: Private aided school under trust management
Legacy: Serving education for 32+ years with dedication to rural education development

🏫 FACILITIES & INFRASTRUCTURE:
------------------------------
1. Science Laboratory:
   - Well-equipped physics, chemistry, biology lab
   - Practical sessions for classes 6-10
   - Modern equipment and specimens
   - Safety measures and fire extinguishers

2. Computer Lab:
   - 20+ computers with internet connectivity
   - Latest software and educational tools
   - Coding and programming classes
   - Computer literacy for all students

3. Playground & Sports:
   - Large open ground for outdoor activities
   - Cricket, football, volleyball, badminton facilities
   - Athletics track for running events
   - Indoor games: Table tennis, chess, carom

4. Library:
   - 2000+ books collection (Hindi & English)
   - Reference books, encyclopedias, dictionaries
   - Story books, magazines, newspapers
   - Reading room for students

5. Safety & Security:
   - 24/7 security guards on duty
   - CCTV surveillance system
   - Fire safety equipment and fire extinguishers
   - Emergency exit routes
   - First-aid medical facility

6. Power & Infrastructure:
   - 24/7 power backup (generator and inverter)
   - Uninterrupted electricity for all seasons
   - Clean drinking water facility with RO system
   - Well-maintained classrooms with proper lighting and ventilation

7. Transportation:
   - School bus/van facility available
   - Multiple routes covering nearby villages
   - Trained and verified drivers
   - GPS tracking for safety
   - Routes: Chakia, Dalpatpur, surrounding areas

8. Other Amenities:
   - Separate washrooms for boys and girls
   - Clean and hygienic toilets
   - Filtered drinking water
   - Staff room and administrative office
   - Prayer/assembly hall

💰 FEES & SCHOLARSHIP:
---------------------
Fees Structure: Contact school office for detailed fee information (varies by class)
Payment Methods: Cash, Bank transfer, Online payment accepted
Fee Concession Available: Yes, for economically weaker sections
Scholarship Programs:
- Full scholarship for orphan students
- Fee concession for economically disadvantaged children
- Support for differently-abled (handicapped) students
- Merit-based scholarships for top performers
- Government scholarship assistance facilitated
Eligibility: Contact school office with required documents

📝 ADMISSION PROCESS:
--------------------
Admission Period: Generally March to May (for next academic session)
Online Enquiry: Available on https://rvvm.netlify.app
Walk-in Admission: Visit school office during working hours (8 AM - 3 PM, Mon-Sat)

Admission Steps:
1. Visit school office or call 070712 50111
2. Collect and fill admission form
3. Submit required documents (see below)
4. Attend principal/coordinator interview (if required)
5. Pay admission fee and first installment
6. Receive admission confirmation and student ID

Required Documents (General):
- Birth certificate (original + photocopy)
- Transfer certificate (TC) from previous school (if applicable)
- Aadhar card of student and parent
- Passport-size photographs (4-6 copies)
- Previous class mark sheet/report card
- Caste certificate (if applicable for reservation)
- Income certificate (for scholarship/fee concession)
- Medical fitness certificate (optional)

Age Criteria:
- Nursery: 3+ years
- LKG: 4+ years
- UKG: 5+ years
- Class 1: 6+ years
(As per government norms, +/- 6 months relaxation)

🎭 EXTRA-CURRICULAR ACTIVITIES:
------------------------------
Annual Events:
- Annual Day Function (cultural programs, prize distribution)
- Sports Day (athletic competitions, games)
- Independence Day (15 August) and Republic Day (26 January) celebrations
- Teacher's Day (5 September) and Children's Day (14 November)
- Saraswati Puja and other cultural festivals
- Science Exhibition and Project Competitions
- Inter-school competitions and debates

Cultural Activities:
- Dance, music, and drama classes
- Hindi and English poetry recitation
- Drawing and painting competitions
- Essay writing and debates
- Rangoli and craft competitions

Sports & Games:
- Cricket, Football, Volleyball, Badminton
- Athletics (running, long jump, high jump)
- Indoor games (Chess, Carom, Table Tennis)
- Yoga and physical fitness sessions
- Annual sports meet with prizes

🏆 ACHIEVEMENTS & RECOGNITION:
-----------------------------
- 32+ years of dedicated service to education
- Hundreds of successful alumni serving in various fields
- Consistent good results in U.P. Board examinations
- Recognition from District Education Department
- Active participation in inter-school competitions
- Community respect and trust for quality education

🌟 SCHOOL MOTTO & VISION:
------------------------
Motto: "शिक्षा के माध्यम से जीवन को रोशन करना" (Illuminating lives through education)
Vision: Nurturing young minds since 1993 with focus on holistic development
Mission: Providing quality education with moral values to rural students
Values: Discipline, Respect, Excellence, Integrity, Community Service

👨‍👩‍👧‍👦 PARENT-TEACHER INTERACTION:
---------------------------------
Parent-Teacher Meetings (PTM): Conducted quarterly or as needed
Progress Reports: Issued after each examination
Communication: Via phone, SMS, WhatsApp groups, notice board
Grievance Redressal: Principal and coordinator available for concerns
Parent Involvement: Encouraged in school events and activities

📱 ONLINE PRESENCE:
------------------
Official Website: https://rvvm.netlify.app
Features: Admission form, school information, gallery, contact details
Facebook Page: Radhika Vilas Vidya Mandir (for updates and announcements)
Email: radhikavilaschakia@gmail.com (for queries and suggestions)
WhatsApp: +91 70712 50999 (quick support during school hours)

🔔 IMPORTANT NOTES FOR PARENTS:
------------------------------
1. Students must reach school by 8:00 AM daily (punctuality important)
2. Proper school uniform is mandatory
3. Regular attendance required (minimum 75% for board eligibility)
4. Parents should check student diary daily for updates
5. Mobile phones not allowed for students during school hours
6. Any medical condition must be informed to school immediately
7. Transport facility available but optional
8. Library books must be returned on time
9. Respect for teachers and staff is essential
10. Active participation in school activities encouraged

📞 FOR ANY QUERY, CONTACT:
-------------------------
Office Phone: 070712 50111, +91 70712 50999
Email: radhikavilaschakia@gmail.com
WhatsApp: +91 70712 50999
Visit: SH-1B, Chakia (Dalpatpur), Ballia, UP
Timing: Monday to Saturday, 8:00 AM - 3:00 PM

═══════════════════════════════════════════════════════════════
            Trust RVVM for Quality Education Since 1993
═══════════════════════════════════════════════════════════════
`;

// ==================== PREDEFINED RESPONSES ====================

const chatbotData = {
    timing: {
        patterns: [
            "school timing", "school timings", "school time", "school hours", "school schedule",
            "scool timing", "schol timing", "skool timing", "school timin", "school timming",
            "school ka samay", "school kitne baje khulta", "school kab khulta hai",
            "scool ka samay", "iskool timing", "school ka smay", "skool ka time",
            "school ka tym", "timing kya hai", "school kb se kb tak", "time btao"
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
            "admission kaise le", "dakhla kaise le", "admission chahiye"
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
🌐 https://rvvm.netlify.app`
    },

    contact: {
        patterns: [
            "contact", "contact details", "phone number", "contact number",
            "contect", "cantact", "sampark", "number do", "phone chahiye"
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
            "addres", "pata", "school ka pata", "kaha hai"
        ],
        response: `📍 *RVVM Address:*

🏫 Radhika Vilas Vidya Mandir
SH-1B, Chakia (Dalpatpur)
Ballia, Uttar Pradesh, India

🚌 School bus facility available
📞 Directions: 070712 50111`
    },

    facilities: {
        patterns: [
            "facilities", "facility", "what facilities", "school facilities",
            "facilites", "suvidha", "school me kya hai"
        ],
        response: `🏫 *RVVM Facilities:*

🔬 Science Lab | 💻 Computer Lab | ⚽ Playground
⚡ 24/7 Power | 🛡️ Security | 🔥 Fire Safety
🚌 School Bus | 🎓 Scholarship

📞 More info: 070712 50111`
    },

    classes: {
        patterns: [
            "classes", "which classes", "class available",
            "clasess", "kaun kaun si class", "konsi class tak"
        ],
        response: `📚 *RVVM Classes:*

🎒 Nursery to Class 10

📖 *Medium:*
• Nursery-8th: English
• 9th-10th: Hindi

📋 Board: U.P. Board`
    },

    fees: {
        patterns: [
            "fees", "fee structure", "school fees", "how much fees",
            "fess", "fees kitni hai", "kitna paisa"
        ],
        response: `💰 *RVVM Fees:*

Fees details के लिए संपर्क करें:
☎️ 070712 50111 / +91 70712 50999

🎓 Scholarship available for poor, orphan & handicapped students`
    },

    management: {
        patterns: [
            "chairman", "director", "principal", "management",
            "charman", "chairman kaun", "director kaun"
        ],
        response: `👔 *RVVM Management:*

👨‍💼 Chairman: Mr. Ravi Shankar Singh
👨‍💼 Director: Mr. Bhaskar Singh
🕊️ Founder: Lt. Vindhyachal Prasad Singh (1924-2009)

📞 Contact: 070712 50111`
    },

    default: {
        response: `❓ *मुझे समझ नहीं आया।*

पूछ सकते हैं:
🕗 Timing | 📝 Admission | 📞 Contact
📍 Address | 🏫 Facilities | 📚 Classes

या call करें: 070712 50111`
    }
};

// ==================== SMART API KEY & MODEL ROTATION ====================

function getNextAvailableKey() {
    // Find key with available quota
    for (let i = 0; i < API_KEYS.length; i++) {
        const keyIndex = (currentKeyIndex + i) % API_KEYS.length;
        if (keyUsageCount[keyIndex] < MAX_REQUESTS_PER_KEY) {
            currentKeyIndex = keyIndex;
            return { key: API_KEYS[keyIndex], index: keyIndex };
        }
    }
    return null; // All keys exhausted
}

function getNextModel() {
    currentModelIndex = (currentModelIndex + 1) % AI_MODELS.length;
    return AI_MODELS[currentModelIndex];
}

function getTotalUsage() {
    return keyUsageCount.reduce((sum, count) => sum + count, 0);
}

function getMaxCapacity() {
    return API_KEYS.length * MAX_REQUESTS_PER_KEY;
}

// ==================== ADVANCED API CALL WITH RETRY & FALLBACK ====================

async function callGeminiAPI(userQuery, retryCount = 0, modelIndex = 0) {
    // Check if all keys exhausted
    const keyInfo = getNextAvailableKey();
    if (!keyInfo) {
        console.log('⚠️ All API keys quota exhausted for today');
        return null;
    }

    const currentModel = AI_MODELS[modelIndex];
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent`;

    try {
        const attemptInfo = `[Key ${keyInfo.index + 1}/${API_KEYS.length}] [Model: ${currentModel}] [Retry ${retryCount + 1}/${MAX_RETRIES + 1}]`;
        console.log(`🤖 Calling Gemini AI ${attemptInfo}...`);

        const response = await fetch(`${apiUrl}?key=${keyInfo.key}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                      text: `You are the official virtual assistant of Radhika Vilas Vidya Mandir (RVVM), Ballia.

Your role: Help students, parents, and visitors with accurate school information.

Communication Style:
- Answer in Hindi/English mix (Hinglish) matching user's language
- Keep responses concise (2-4 lines maximum)
- Use appropriate emojis for engagement
- Be professional, friendly, and helpful
- Address users respectfully (आप, Sir/Madam)

Guidelines:
- Use ONLY information from the school database provided below
- If specific information is not available, politely ask to contact: 070712 50111
- For admission queries, encourage office visit or call
- For fees/scholarship, direct to office as fees vary by class
- Always provide phone/email for detailed queries
- Maintain school's reputation with positive language

Complete School Information Database:
${schoolContext}

User Question: ${userQuery}



Answer:`
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

        // Handle different error codes
        if (!response.ok) {
            const status = response.status;
            
            // Server overloaded or rate limit
            if (status === 503 || status === 429) {
                console.log(`⚠️ Server overloaded (${status})`);
                
                // Try different model first
                if (modelIndex < AI_MODELS.length - 1) {
                    console.log(`🔄 Switching to next model...`);
                    await sleep(RETRY_DELAY);
                    return callGeminiAPI(userQuery, retryCount, modelIndex + 1);
                }
                
                // Then retry with delay
                if (retryCount < MAX_RETRIES) {
                    console.log(`⏳ Retrying in ${RETRY_DELAY/1000}s...`);
                    await sleep(RETRY_DELAY);
                    return callGeminiAPI(userQuery, retryCount + 1, 0);
                }
            }
            
            // Quota exceeded for this key - try next key
            if (status === 429) {
                console.log(`⚠️ Key ${keyInfo.index + 1} quota exceeded, trying next key...`);
                keyUsageCount[keyInfo.index] = MAX_REQUESTS_PER_KEY; // Mark as exhausted
                return callGeminiAPI(userQuery, retryCount, modelIndex);
            }
            
            throw new Error(`API returned ${status}`);
        }

        // Success - parse response
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response structure');
        }

        // Update usage count
        keyUsageCount[keyInfo.index]++;
        const totalUsage = getTotalUsage();
        const maxCapacity = getMaxCapacity();
        
        console.log(`✅ Success! | Key ${keyInfo.index + 1}: ${keyUsageCount[keyInfo.index]}/${MAX_REQUESTS_PER_KEY} | Total: ${totalUsage}/${maxCapacity}`);
        
        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        
        // Try next model on error
        if (modelIndex < AI_MODELS.length - 1) {
            console.log(`🔄 Trying different model...`);
            await sleep(RETRY_DELAY);
            return callGeminiAPI(userQuery, retryCount, modelIndex + 1);
        }
        
        // Retry with delay
        if (retryCount < MAX_RETRIES) {
            console.log(`🔄 Retrying (${retryCount + 1}/${MAX_RETRIES})...`);
            await sleep(RETRY_DELAY);
            return callGeminiAPI(userQuery, retryCount + 1, 0);
        }
        
        console.error('❌ All attempts failed, using fallback');
        return null;
    }
}

// Helper function for delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== LEVENSHTEIN DISTANCE (TYPO TOLERANCE) ====================

function levenshteinDistance(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

// ==================== FIND PREDEFINED MATCH ====================

function findPredefinedMatch(userInput) {
    userInput = userInput.toLowerCase().trim();
    
    for (let category in chatbotData) {
        if (category === 'default') continue;
        
        const patterns = chatbotData[category].patterns;
        for (let pattern of patterns) {
            // Exact match
            if (userInput.includes(pattern.toLowerCase())) {
                return chatbotData[category].response;
            }
            
            // Fuzzy match (typo tolerance)
            if (levenshteinDistance(userInput, pattern) <= 3) {
                return chatbotData[category].response;
            }
        }
    }
    
    return null;
}

// ==================== STATUS LOGGING ====================

function logStatus() {
    const totalUsage = getTotalUsage();
    const maxCapacity = getMaxCapacity();
    console.log(`\n📊 API Usage Status:`);
    console.log(`Total: ${totalUsage}/${maxCapacity} requests used`);
    API_KEYS.forEach((key, i) => {
        const keyShort = key.substring(0, 15) + '...';
        console.log(`  Key ${i + 1}: ${keyUsageCount[i]}/${MAX_REQUESTS_PER_KEY} (${keyShort})`);
    });
    console.log(`Current Model: ${AI_MODELS[currentModelIndex]}\n`);
}
