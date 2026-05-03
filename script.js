// Decorative image used in multiple places
const FRAME_ORNAMENT =
  "https://www.figma.com/api/mcp/asset/639ec850-8e33-4680-b96b-4e21badaa0e6";

// Main image shown for each question
const QUESTION_IMAGES = [
  "./assets/question_thumbnails/q1.png",
  "./assets/question_thumbnails/q2.png",
  "./assets/question_thumbnails/q3.png",
  "./assets/question_thumbnails/q4.png",
  "./assets/question_thumbnails/q5.png",
  "./assets/question_thumbnails/q6.png",
  "./assets/question_thumbnails/q7.png",
  "./assets/question_thumbnails/q8.png",
  "./assets/question_thumbnails/q9.png",
  "./assets/question_thumbnails/q10.png"
];

// Single navigation button images (from Figma)
const PREV_BUTTON_IMAGE = "https://www.figma.com/api/mcp/asset/011337ee-adde-4c7a-aebd-0c6f5bca3d77";
const NEXT_BUTTON_IMAGE = "https://www.figma.com/api/mcp/asset/faf23fc3-195d-4013-9e12-97df9803d1b1";

// Result image for each plant type
const RESULT_IMAGES = {
  C: "https://www.figma.com/api/mcp/asset/c05b8491-6a0d-4b3c-9178-f2455a7770a4",
  S: "https://www.figma.com/api/mcp/asset/e8b91998-3aa4-4f2f-b1e9-39134204fede",
  F: "https://www.figma.com/api/mcp/asset/439dd6fd-445a-43eb-bc0f-64ad06541146",
  O: "https://www.figma.com/api/mcp/asset/23530370-2a70-49b1-b750-9bd4a7aaf139"
};

// Quiz questions
const QUESTIONS = [
  {
    label: "Question 1",
    text: "Your ideal weekend looks like...",
    options: [
      "Staying home in a cozy corner",
      "Going out with lots of friends",
      "Wandering somewhere peaceful",
      "Doing something elegant or creative"
    ]
  },
  {
    label: "Question 2",
    text: "When you're stressed, you...",
    options: [
      "Need space and disappear",
      "Talk it out with everyone",
      "Go for a walk, journal, or daydream",
      "Pretend you're fine"
    ]
  },
  {
    label: "Question 3",
    text: "Pick a color palette",
    options: [
      "assets/q5o1.png",
      "assets/q5o2.png",
      "assets/q5o3.png",
      "assets/q5o4.png"
    ]
  },
  {
    label: "Question 4",
    text: "In a friend group, you are...",
    options: [
      "The quiet one with secret chaos",
      "The energetic sunshine beam",
      "The calm listener",
      "The stylish mysterious one"
    ]
  },
  {
    label: "Question 5",
    text: "Which place feels most magical?",
    options: [
      "A desert at sunset",
      "A flower field in summer",
      "A misty forest",
      "A beautiful greenhouse"
    ]
  },
  {
    label: "Question 6",
    text: "Pick a snack:",
    options: [
      "Salty chips",
      "Fresh fruit",
      "Tea and biscuits",
      "Tiny fancy pastries"
    ]
  },
  {
    label: "Question 7",
    text: "How do people usually describe you?",
    options: [
      "Tough but lovable",
      "Cheerful and warm",
      "Gentle and thoughtful",
      "Unique and dramatic"
    ]
  },
  {
    label: "Question 8",
    text: "Your dream room would have...",
    options: [
      "Minimal furniture and cozy lighting",
      "Big windows and colorful decor",
      "Plants everywhere and soft blankets",
      "Fairy lights, sparkles and pretty art"
    ]
  },
  {
    label: "Question 9",
    text: "Which weather matches your personality?",
    options: [
      "Dry and breezy",
      "Bright sunny day",
      "Light rain",
      "A cool spring morning"
    ]
  },
  {
    label: "Question 10",
    text: "Choose an object:",
    options: [
      "A tiny pocketknife",
      "A sunflower-shaped mug",
      "An old book",
      "A crystal necklace"
    ]
  }
];

// Result text shown at the end
const RESULTS = {
  S: {
    name: "You are a Sunflower",
    description:
      "You are warm, cheerful, and make every room brighter. People orbit around you like delighted bees in a tiny social galaxy."
  },
  C: {
    name: "You are a Cactus",
    description:
      "Quiet, resilient, and secretly softer than people expect. You thrive in your own space and survive storms like a tiny desert wizard."
  },
  F: {
    name: "You are a Fern",
    description:
      "Thoughtful, calm, and a little dreamy. You grow best in peaceful places and have the vibe of a forest that gives excellent advice."
  },
  O: {
    name: "You are an Orchid",
    description:
      "Creative, elegant, and beautifully unique. You bloom in your own way, like a rare treasure hidden in a glass garden."
  }
};

// Current question number
let currentQuestionIndex = 0;

// Stores the selected option index for each question
let answers = new Array(QUESTIONS.length).fill(null);

// Shortcut helper so the code stays beginner friendly
function getElement(id) {
  return document.getElementById(id);
}

// Show only one screen at a time
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach(function (screen) {
    screen.classList.remove("active");
  });

  getElement(screenId).classList.add("active");
}

// Add the same ornament image everywhere it is needed
function setAllOrnaments() {
  const ornamentImages = document.querySelectorAll(".orn img, .badge-orn img");

  ornamentImages.forEach(function (image) {
    image.src = FRAME_ORNAMENT;
  });
}

// Update the question screen with the current question data
function renderQuestion() {
  const question = QUESTIONS[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];

  getElement("q-badge-label").textContent = question.label;
  getElement("q-text").textContent = question.text;
  getElement("q-img").src = QUESTION_IMAGES[currentQuestionIndex];
  getElement("prev-img").src = PREV_BUTTON_IMAGE;
  getElement("next-img").src = NEXT_BUTTON_IMAGE;
  getElement("btn-prev").disabled = currentQuestionIndex === 0;
  
  // Enable next button only if an option is selected (or it's the last question)
  const hasSelectedAnswer = answers[currentQuestionIndex] !== null;
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
  getElement("btn-next").disabled = !hasSelectedAnswer && !isLastQuestion;

  // Long question text needs a little extra room
  const questionText = getElement("q-text");
  questionText.style.whiteSpace = "normal";
  questionText.style.width = "340px";
  questionText.style.fontSize = "24px";

  // Fill all 4 option buttons
  for (let optionIndex = 0; optionIndex < 4; optionIndex += 1) {
    const button = getElement("opt-" + optionIndex);
    const optionValue = question.options[optionIndex];

    // Check if this is Question 3 (index 2) - render images instead of text
    if (currentQuestionIndex === 2) {
      button.innerHTML = '<img src="' + optionValue + '" alt="Option ' + (optionIndex + 1) + '">';
      button.className = "opt-btn opt-img-btn";
    } else {
      button.innerHTML = "";
      button.textContent = optionValue;
      button.className = "opt-btn";
    }

    if (selectedAnswer === optionIndex) {
      button.classList.add("selected");
    }

    // Slightly smaller text for longer answers
    button.style.fontSize = "20px";
  }

  // Update progress bar
  const progressPercent = (currentQuestionIndex / QUESTIONS.length) * 100;
  getElement("prog-fill").style.width = progressPercent + "%";
}

// Count which plant letter appears the most
function calculateResult() {
  const optionCounts = {
    A: 0,  // option index 0
    B: 0,  // option index 1
    C: 0,  // option index 2
    D: 0   // option index 3
  };

  // Count how many times each option was selected
  answers.forEach(function (selectedOptionIndex) {
    if (selectedOptionIndex !== null) {
      if (selectedOptionIndex === 0) optionCounts.A += 1;
      if (selectedOptionIndex === 1) optionCounts.B += 1;
      if (selectedOptionIndex === 2) optionCounts.C += 1;
      if (selectedOptionIndex === 3) optionCounts.D += 1;
    }
  });

  // Apply the result logic:
  // - If option A >= all others → Cactus
  // - If option B > A AND >= C & D → Sunflower
  // - If option C > A & B AND >= D → Fern
  // - If option D > A, B & C → Orchid

  const a = optionCounts.A;
  const b = optionCounts.B;
  const c = optionCounts.C;
  const d = optionCounts.D;

  // Option D > A, B & C → Orchid
  if (d > a && d > b && d > c) {
    return "O";
  }
  // Option C > A & B AND >= D → Fern
  if (c > a && c > b && c >= d) {
    return "F";
  }
  // Option B > A AND >= C & D → Sunflower
  if (b > a && b >= c && b >= d) {
    return "S";
  }
  // Option A >= any other option → Cactus
  if (a >= b && a >= c && a >= d) {
    return "C";  // Cactus
  }

  // Fallback: default to Sunflower
  return "S";
}

// Show the final result screen
function showResult() {
  const resultKey = calculateResult();
  const result = RESULTS[resultKey];

  getElement("res-img").src = RESULT_IMAGES[resultKey];
  getElement("res-name").textContent = result.name;
  getElement("res-desc").textContent = result.description;

  showScreen("result");
}

// Reset quiz values and go back to the start
function resetQuiz() {
  currentQuestionIndex = 0;
  answers = new Array(QUESTIONS.length).fill(null);
}

// When a user picks an answer, save it and refresh button styles
function selectOption(optionIndex) {
  answers[currentQuestionIndex] = optionIndex;
  renderQuestion();
}

// Start the quiz from the beginning
getElement("btn-start").addEventListener("click", function () {
  resetQuiz();
  renderQuestion();
  // Initially disable next until user selects an option
  getElement("btn-next").disabled = true;
  showScreen("question");
});

// Go back one question
getElement("btn-prev").addEventListener("click", function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex -= 1;
    renderQuestion();
  }
});

// Go to the next question or show the result
getElement("btn-next").addEventListener("click", function () {
  // Prevent going next if no option selected
  if (answers[currentQuestionIndex] === null) {
    return;
  }
  
  if (currentQuestionIndex < QUESTIONS.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});

// Add click events to all answer buttons
for (let optionIndex = 0; optionIndex < 4; optionIndex += 1) {
  getElement("opt-" + optionIndex).addEventListener("click", function () {
    selectOption(optionIndex);
  });
}

// Retake the quiz
getElement("btn-retake").addEventListener("click", function () {
  resetQuiz();
  showScreen("home");
});

// First setup when the page loads
setAllOrnaments();
showScreen("home");