// Static disease data
const rareDiseasePathophysiology = {
    "progeria": "Progeria is caused by a mutation in the LMNA gene, leading to defective nuclear envelope function and premature aging.",
    "fatal familial insomnia": "A prion disease due to PRNP gene mutations, causing neurodegeneration and severe sleep disturbances.",
    "harlequin ichthyosis": "A disorder caused by ABCA12 mutations, leading to thick, scaly skin and impaired barrier function.",
    "fibrodysplasia ossificans progressiva": "A genetic disorder where soft tissues turn into bone due to ACVR1 gene mutations.",
    "kuru": "A neurodegenerative prion disease linked to consuming infected human brain tissue, causing loss of motor control.",
    "von hippel-lindau disease": "A genetic disorder due to VHL mutations, leading to abnormal tumor growth.",
    "stiff person syndrome": "An autoimmune disorder where antibodies attack GAD65, impairing GABA production and causing muscle stiffness.",
    "methemoglobinemia": "A disorder where hemoglobin is oxidized, reducing oxygen delivery and causing cyanosis.",
    "xeroderma pigmentosum": "A DNA repair disorder that prevents UV-damaged DNA repair, leading to extreme photosensitivity.",
    "moebius syndrome": "A congenital disorder affecting cranial nerves, causing facial paralysis and eye movement issues.",
    "default": "I'm sorry, I don't have information on that rare disease yet. I can search the web or X for more info if you'd like!"
};

// List of disease names for suggestions
const diseaseNames = Object.keys(rareDiseasePathophysiology).filter(disease => disease !== "default");

// Store conversation history
let chatHistory = [];

async function sendMessage() {
    let userInput = document.getElementById("user-input").value.toLowerCase().trim();
    let chatBox = document.getElementById("chat-box");

    if (userInput === "") return;

    // Display user message
    chatHistory.push({ user: userInput });
    let userMessage = `<div class="user-message">${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    // Determine bot response
    let botResponse;
    if (userInput.includes("show image") || userInput.includes("diagram")) {
        botResponse = "Would you like me to generate an image for this disease? Please confirm with 'yes' or 'no'.";
    } else if (userInput === "yes" && chatHistory.some(entry => entry.bot && entry.bot.includes("generate an image"))) {
        botResponse = "Generating an image... (e.g., a diagram of the disease's effects). Imagine a detailed visual here!";
    } else if (userInput === "no" && chatHistory.some(entry => entry.bot && entry.bot.includes("generate an image"))) {
        botResponse = "Okay, no image generated. How else can I assist you?";
    } else {
        botResponse = rareDiseasePathophysiology[userInput];
        if (!botResponse) {
            if (chatHistory.length > 1) {
                botResponse = `I see you asked about ${chatHistory[chatHistory.length - 2].user} before. Did you mean something related? Otherwise: ${await fetchGrokResponse(userInput)}`;
            } else {
                botResponse = await fetchGrokResponse(userInput);
            }
        }
    }

    // Display bot response
    chatHistory.push({ bot: botResponse });
    let botMessage = `<div class="bot-message">${botResponse}</div>`;
    chatBox.innerHTML += botMessage;

    // Clear input and suggestions
    document.getElementById("user-input").value = "";
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("suggestions").style.display = "none";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Simulated dynamic response from Grok (replace with real API call if integrated)
async function fetchGrokResponse(disease) {
    return `Fetching real-time data for "${disease}"... (e.g., from web/X search: potentially latest research or posts as of March 18, 2025). For now, I don’t have local info on this.`;
}

// Suggest diseases with tooltips
function suggestDiseases() {
    let input = document.getElementById("user-input").value.toLowerCase();
    let suggestionsBox = document.getElementById("suggestions");

    if (input === "") {
        suggestionsBox.innerHTML = "";
        suggestionsBox.style.display = "none";
        return;
    }

    let filteredDiseases = diseaseNames.filter(disease => disease.includes(input));
    if (filteredDiseases.length === 0) {
        suggestionsBox.innerHTML = "";
        suggestionsBox.style.display = "none";
        return;
    }

    suggestionsBox.innerHTML = filteredDiseases.map(disease => 
        `<div class="suggestion-item" onclick="selectSuggestion('${disease}')" title="${rareDiseasePathophysiology[disease]}">${disease}</div>`
    ).join("");
    suggestionsBox.style.display = "block";
}

// Select a suggestion
function selectSuggestion(disease) {
    document.getElementById("user-input").value = disease;
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("suggestions").style.display = "none";
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Handle file uploads
function handleFileUpload() {
    let file = document.getElementById("file-upload").files[0];
    let chatBox = document.getElementById("chat-box");

    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let content = e.target.result;
            let userMessage = `<div class="user-message">Uploaded file: ${file.name}</div>`;
            chatBox.innerHTML += userMessage;

            let botResponse = analyzeContent(content, file.type);
            let botMessage = `<div class="bot-message">${botResponse}</div>`;
            chatBox.innerHTML += botMessage;
            chatBox.scrollTop = chatBox.scrollHeight;
        };
        if (file.type.includes("image")) reader.readAsDataURL(file);
        else reader.readAsText(file);
    }
}

// Analyze uploaded content (simulated)
function analyzeContent(content, type) {
    return `Analyzed ${type}: ${content.substring(0, 50)}... (e.g., identified disease-related info as of March 18, 2025). Let me know what specific info you want!`;
}