// RVVM Chatbot Script with Advanced Typo Tolerance

// Levenshtein Distance Algorithm for fuzzy matching
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

// Find best matching response
function findBestMatch(userInput) {
    userInput = userInput.toLowerCase().trim();
    
    // First: Exact pattern matching
    for (let category in chatbotData) {
        if (category === 'default') continue;
        
        const patterns = chatbotData[category].patterns;
        for (let pattern of patterns) {
            if (userInput.includes(pattern.toLowerCase())) {
                return chatbotData[category].response;
            }
        }
    }
    
    // Second: Fuzzy matching with Levenshtein distance
    let bestMatch = null;
    let bestScore = Infinity;
    const threshold = 3; // Maximum 3 character difference allowed
    
    for (let category in chatbotData) {
        if (category === 'default') continue;
        
        const patterns = chatbotData[category].patterns;
        for (let pattern of patterns) {
            const distance = levenshteinDistance(userInput, pattern);
            if (distance < bestScore && distance <= threshold) {
                bestScore = distance;
                bestMatch = chatbotData[category].response;
            }
        }
    }
    
    if (bestMatch) {
        return bestMatch;
    }
    
    // Third: Word-by-word matching
    const userWords = userInput.split(' ');
    for (let category in chatbotData) {
        if (category === 'default') continue;
        
        const patterns = chatbotData[category].patterns;
        for (let pattern of patterns) {
            const patternWords = pattern.toLowerCase().split(' ');
            let matchCount = 0;
            
            for (let userWord of userWords) {
                for (let patternWord of patternWords) {
                    if (levenshteinDistance(userWord, patternWord) <= 2) {
                        matchCount++;
                    }
                }
            }
            
            if (matchCount >= Math.min(userWords.length, patternWords.length) * 0.6) {
                return chatbotData[category].response;
            }
        }
    }
    
    // Default response if nothing matches
    return chatbotData.default.response;
}

// Display message in chat
function displayMessage(message, isUser = false) {
    const chatBody = document.getElementById('chatbotBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Format bot messages with proper line breaks
    if (!isUser) {
        contentDiv.innerHTML = message.replace(/\n/g, '<br>');
    } else {
        contentDiv.textContent = message;
    }
    
    messageDiv.appendChild(contentDiv);
    chatBody.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Send message function
function sendMessage() {
    const inputField = document.getElementById('userInput');
    const userMessage = inputField.value.trim();
    
    if (userMessage === '') return;
    
    // Display user message
    displayMessage(userMessage, true);
    
    // Clear input field
    inputField.value = '';
    
    // Get bot response with slight delay for natural feel
    setTimeout(() => {
        const botResponse = findBestMatch(userMessage);
        displayMessage(botResponse, false);
    }, 500);
}

// Handle Enter key press
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

// Toggle chatbot (minimize/maximize)
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

// Initialize chatbot
window.addEventListener('load', () => {
    console.log('RVVM Chatbot initialized successfully! 🎓');
});
