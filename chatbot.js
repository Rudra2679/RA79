document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotHeader = document.getElementById('chatbot-header');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    
    let isOpen = false;
    
    // Toggle chatbot visibility
    chatbotHeader.addEventListener('click', function() {
        isOpen = !isOpen;
        chatbotBody.style.display = isOpen ? 'flex' : 'none';
        chatbotToggle.textContent = isOpen ? '−' : '+';
    });
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Simulate bot response (in a real app, this would call an API)
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.style.marginBottom = '10px';
        messageDiv.style.maxWidth = '80%';
        messageDiv.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
        messageDiv.style.backgroundColor = sender === 'user' ? '#e3f2fd' : '#f1f1f1';
        messageDiv.style.padding = '10px';
        messageDiv.style.borderRadius = '5px';
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `<strong>Nutri:</strong> ${text}`;
        } else {
            messageDiv.innerHTML = `<strong>You:</strong> ${text}`;
        }
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Generate bot responses
    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello there! How can I assist you with your nutrition questions today?";
        } else if (lowerMessage.includes('calorie') || lowerMessage.includes('diet')) {
            return "I can help you track calories and plan meals. Check out our 'Meal Plan' section for personalized recommendations!";
        } else if (lowerMessage.includes('recipe') || lowerMessage.includes('cook')) {
            return "We have thousands of healthy recipes! Try our 'Recipe Maker' to find dishes based on ingredients you have.";
        } else if (lowerMessage.includes('allerg') || lowerMessage.includes('intoleran')) {
            return "You can set your dietary restrictions in your Profile. I'll then filter recipes accordingly!";
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! Let me know if you have any other nutrition questions.";
        } else {
            return "I'm still learning! For now, I can help with: meal planning, recipes, calorie tracking, and dietary needs. Try asking about those!";
        }
    }
    
    // Event listeners
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Auto-open for first-time visitors
    if (!localStorage.getItem('chatbotShown')) {
        setTimeout(() => {
            isOpen = true;
            chatbotBody.style.display = 'flex';
            chatbotToggle.textContent = '−';
            localStorage.setItem('chatbotShown', 'true');
        }, 3000);
    }
});