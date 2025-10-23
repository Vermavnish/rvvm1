// RVVM Chatbot Script with AI Integration

// Levenshtein Distance for typo tolerance
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

// Find predefined match (fallback)
function findPredefinedMatch(userInput) {
    userInput = userInput.toLowerCase().trim();
    
    // Exact pattern matching
    for (let category in chatbotData) {
        if (category === 'default') continue;
        
        const patterns = chatbotData[category].patterns;
        for (let pattern of patterns) {
            if (userInput.includes(pattern.toLowerCase())) {
                return chatbotData[category].response;
            }
            
            // Fuzzy match with Levenshtein distance
            if (levenshteinDistance(userInput, pattern) <= 3) {
                return chatbotData[category].response;
            }
        }
    }
    
    return null;
}

// Main response function with AI
async function getBotResponse(userQuery) {
    // Step 1: Try predefined responses first (instant + free)
    const predefinedResponse = findPredefinedMatch(userQuery);
    if (predefinedResponse) {
        console.log('✅ Using predefined response (instant)');
        return predefinedResponse;
    }
    
    // Step 2: Try AI if predefined not found
    console.log('🔍 No predefined match, trying AI...');
    const aiResponse = await callGeminiAPI(userQuery);
    
    if (aiResponse) {
        return aiResponse;
    }
    
    // Step 3: Fallback to default
    console.log('⚠️ AI failed, using default response');
    return chatbotData.default.response;
}

// Display message
function displayMessage(message, isUser = false) {
    const chatBody = document.getElementById('chatbotBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (!isUser) {
        contentDiv.innerHTML = message.replace(/\n/g, '<br>');
    } else {
        contentDiv.textContent = message;
    }
    
    messageDiv.appendChild(contentDiv);
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatBody = document.getElementById('chatbotBody');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    
    typingDiv.appendChild(contentDiv);
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Send message function
async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const userMessage = inputField.value.trim();
    
    if (userMessage === '') return;
    
    // Display user message
    displayMessage(userMessage, true);
    inputField.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get bot response (with AI)
    const botResponse = await getBotResponse(userMessage);
    
    // Remove typing indicator
    removeTypingIndicator();
    
    // Display bot response
    displayMessage(botResponse, false);
}

// Handle Enter key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Quick query buttons
function sendQuickQuery(query) {
    const inputField = document.getElementById('userInput');
    inputField.value = query;
    sendMessage();
}

// Toggle chatbot
function toggleChatbot() {
    const chatBody = document.getElementById('chatbotBody');
    const footer = document.querySelector('.chatbot-footer');
    const btn = document.querySelector('.minimize-btn');
    
    if (chatBody.style.display === 'none') {
        chatBody.style.display = 'block';
        footer.style.display = 'flex';
        btn.textContent = '−';
    } else {
        chatBody.style.display = 'none';
        footer.style.display = 'none';
        btn.textContent = '+';
    }
}

// Initialize
window.addEventListener('load', () => {
    console.log('🎓 RVVM Chatbot initialized successfully!');
    console.log(`📊 AI calls today: ${apiCallCount}/${MAX_API_CALLS}`);
});
