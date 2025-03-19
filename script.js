const rareDiseasePathophysiology = {
    "progeria": "Progeria (Hutchinson-Gilford syndrome) is caused by a mutation in the LMNA gene, leading to defective nuclear envelope function, premature cellular aging, and systemic degeneration.",
    "fatal familial insomnia": "A prion disease caused by mutations in the PRNP gene, leading to misfolded prion proteins that cause progressive neurodegeneration, particularly in the thalamus, resulting in severe sleep disturbances and eventual death.",
    "harlequin ichthyosis": "A severe genetic disorder caused by mutations in the ABCA12 gene, leading to a defective lipid transport protein. This results in thick, scaly skin that impairs the skin barrier function, causing dehydration and infection risk.",
    "fibrodysplasia ossificans progressiva": "A rare genetic disorder where soft tissues progressively turn into bone due to mutations in the ACVR1 gene, leading to severe joint immobility.",
    "kuru": "A neurodegenerative prion disease linked to the consumption of infected human brain tissue, leading to progressive loss of motor control, tremors, and eventual death.",
    "von hippel-lindau disease": "A genetic disorder caused by VHL gene mutations, leading to abnormal angiogenesis and tumor formation in multiple organs.",
    "stiff person syndrome": "An autoimmune neurological disorder where antibodies attack GAD65, impairing GABA production and causing progressive muscle stiffness and spasms.",
    "methemoglobinemia": "A blood disorder where hemoglobin is oxidized to methemoglobin, reducing oxygen delivery to tissues, leading to cyanosis and tissue hypoxia.",
    "xeroderma pigmentosum": "A DNA repair disorder where UV-induced DNA damage cannot be repaired, leading to extreme photosensitivity and high cancer risk.",
    "moebius syndrome": "A congenital neurological disorder caused by cranial nerve abnormalities, leading to facial paralysis and eye movement limitations.",
    "default": "I'm sorry, I don't have information on that rare disease yet."
};

function sendMessage() {
    let userInput = document.getElementById("user-input").value.toLowerCase().trim();
    let chatBox = document.getElementById("chat-box");

    if (userInput === "") return;

    // Display user message
    let userMessage = `<div class="user-message">${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    // Get bot response
    let botResponse = rareDiseasePathophysiology[userInput] || rareDiseasePathophysiology["default"];
    let botMessage = `<div class="bot-message">${botResponse}</div>`;
    chatBox.innerHTML += botMessage;

    // Clear input field
    document.getElementById("user-input").value = "";

    // Auto-scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow sending message by pressing "Enter"
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
