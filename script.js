// Global variables
let currentUser = { firstName: '', lastName: '' };
let currentTest = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let testStartTime = null;
let timerInterval = null;
let timeRemaining = 30 * 60; // 30 minutes in seconds

// Test data - osonlashtirilgan savollar
const testData = {
    python: [
        {
            question: "Python dasturlash tilida o'zgaruvchi e'lon qilish uchun qaysi kalit so'z ishlatiladi?",
            options: ["var", "let", "Hech qanday kalit so'z kerak emas", "define"],
            correct: 2
        },
        {
            question: "Python-da matn chiqarish uchun qaysi funksiya ishlatiladi?",
            options: ["echo", "print", "write", "display"],
            correct: 1
        },
        {
            question: "Python-da izoh yozish uchun qaysi belgi ishlatiladi?",
            options: ["//", "/*", "#", "<!--"],
            correct: 2
        },
        {
            question: "Python-da ro'yxat (list) yaratish uchun qaysi qavslar ishlatiladi?",
            options: ["()", "{}", "[]", "<>"],
            correct: 2
        },
        {
            question: "Python-da matnlarni birlashtirish uchun qaysi operator ishlatiladi?",
            options: ["+", "&", ".", "||"],
            correct: 0
        },
        {
            question: "Python-da shartli operator qaysi kalit so'z bilan boshlanadi?",
            options: ["when", "if", "check", "condition"],
            correct: 1
        },
        {
            question: "Python-da takrorlash uchun qaysi kalit so'z ishlatiladi?",
            options: ["repeat", "loop", "for", "cycle"],
            correct: 2
        },
        {
            question: "Python-da funksiya yaratish uchun qaysi kalit so'z ishlatiladi?",
            options: ["function", "def", "func", "create"],
            correct: 1
        },
        {
            question: "Python-da matn uzunligini aniqlash uchun qaysi funksiya ishlatiladi?",
            options: ["size()", "length()", "len()", "count()"],
            correct: 2
        },
        {
            question: "Python-da lug'at (dictionary) yaratish uchun qaysi qavslar ishlatiladi?",
            options: ["[]", "()", "{}", "<>"],
            correct: 2
        },
        {
            question: "Python-da matnni katta harflarga o'tkazish uchun qaysi metod ishlatiladi?",
            options: ["toUpper()", "upper()", "uppercase()", "big()"],
            correct: 1
        },
        {
            question: "Python-da sonni matunga aylantirish uchun qaysi funksiya ishlatiladi?",
            options: ["string()", "str()", "text()", "toString()"],
            correct: 1
        },
        {
            question: "Python-da matnni songa aylantirish uchun qaysi funksiya ishlatiladi?",
            options: ["number()", "int()", "num()", "toNumber()"],
            correct: 1
        },
        {
            question: "Python-da ro'yxatga element qo'shish uchun qaysi metod ishlatiladi?",
            options: ["add()", "insert()", "append()", "push()"],
            correct: 2
        },
        {
            question: "Python-da matnni bo'laklarga ajratish uchun qaysi metod ishlatiladi?",
            options: ["divide()", "split()", "separate()", "cut()"],
            correct: 1
        },
        {
            question: "Python-da True va False qanday ma'lumot turi hisoblanadi?",
            options: ["string", "number", "boolean", "char"],
            correct: 2
        },
        {
            question: "Python-da None qiymat nimani bildiradi?",
            options: ["Nol", "Bo'sh matn", "Hech narsa", "Xato"],
            correct: 2
        },
        {
            question: "Python-da matnda qidiruv uchun qaysi metod ishlatiladi?",
            options: ["search()", "find()", "look()", "seek()"],
            correct: 1
        },
        {
            question: "Python-da ro'yxat elementlarini tartiblash uchun qaysi metod ishlatiladi?",
            options: ["order()", "arrange()", "sort()", "organize()"],
            correct: 2
        },
        {
            question: "Python-da matnni almashtirish uchun qaysi metod ishlatiladi?",
            options: ["change()", "replace()", "substitute()", "swap()"],
            correct: 1
        },
        {
            question: "Python-da ro'yxat uzunligini aniqlash uchun qaysi funksiya ishlatiladi?",
            options: ["size()", "length()", "len()", "count()"],
            correct: 2
        },
        {
            question: "Python-da matnning boshida va oxiridagi bo'shliqlarni olib tashlash uchun qaysi metod ishlatiladi?",
            options: ["clean()", "trim()", "strip()", "remove()"],
            correct: 2
        },
        {
            question: "Python-da import kalit so'zi nima uchun ishlatiladi?",
            options: ["Fayl yaratish", "Kutubxona ulash", "O'zgaruvchi e'lon qilish", "Funksiya yaratish"],
            correct: 1
        },
        {
            question: "Python-da range() funksiyasi nima uchun ishlatiladi?",
            options: ["Matn yaratish", "Sonlar ketma-ketligi yaratish", "Ro'yxat yaratish", "Fayl o'qish"],
            correct: 1
        },
        {
            question: "Python-da pass kalit so'zi nima uchun ishlatiladi?",
            options: ["Dasturni to'xtatish", "Hech narsa qilmaslik", "Xatoni bartaraf etish", "Funksiyani chaqirish"],
            correct: 1
        }
    ],
    html: [
        {
            question: "HTML nima uchun ishlatiladi?",
            options: ["Veb sahifa yaratish", "Ma'lumotlar bazasi", "Dasturlash", "Grafika yaratish"],
            correct: 0
        },
        {
            question: "HTML hujjatining asosiy tuzilishi qaysi teg bilan boshlanadi?",
            options: ["<body>", "<head>", "<html>", "<title>"],
            correct: 2
        },
        {
            question: "Veb sahifaning sarlavhasini belgilash uchun qaysi teg ishlatiladi?",
            options: ["<header>", "<title>", "<h1>", "<head>"],
            correct: 1
        },
        {
            question: "Matnni qalin qilish uchun qaysi teg ishlatiladi?",
            options: ["<strong>", "<bold>", "<thick>", "<heavy>"],
            correct: 0
        },
        {
            question: "Rasm qo'yish uchun qaysi teg ishlatiladi?",
            options: ["<picture>", "<image>", "<img>", "<photo>"],
            correct: 2
        },
        {
            question: "Havola yaratish uchun qaysi teg ishlatiladi?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correct: 1
        },
        {
            question: "Ro'yxat yaratish uchun qaysi teg ishlatiladi?",
            options: ["<list>", "<ul>", "<ol>", "Ikkalasi ham to'g'ri"],
            correct: 3
        },
        {
            question: "Jadval yaratish uchun qaysi teg ishlatiladi?",
            options: ["<table>", "<grid>", "<chart>", "<data>"],
            correct: 0
        },
        {
            question: "Forma yaratish uchun qaysi teg ishlatiladi?",
            options: ["<input>", "<form>", "<field>", "<submit>"],
            correct: 1
        },
        {
            question: "Matnni kursiv qilish uchun qaysi teg ishlatiladi?",
            options: ["<italic>", "<i>", "<em>", "Ikkalasi ham to'g'ri"],
            correct: 3
        },
        {
            question: "HTML-da izoh yozish uchun qaysi belgilar ishlatiladi?",
            options: ["// izoh", "/* izoh */", "<!-- izoh -->", "# izoh"],
            correct: 2
        },
        {
            question: "Matnni ajratish uchun qaysi teg ishlatiladi?",
            options: ["<break>", "<br>", "<line>", "<newline>"],
            correct: 1
        },
        {
            question: "Blok element yaratish uchun qaysi teg ishlatiladi?",
            options: ["<block>", "<div>", "<section>", "<container>"],
            correct: 1
        },
        {
            question: "Matnning bir qismini belgilash uchun qaysi teg ishlatiladi?",
            options: ["<span>", "<text>", "<part>", "<segment>"],
            correct: 0
        },
        {
            question: "Sarlavha yaratish uchun qaysi teglar ishlatiladi?",
            options: ["<header>", "<title>", "<h1> dan <h6> gacha", "<heading>"],
            correct: 2
        },
        {
            question: "Matnni markazlashtirish uchun qaysi CSS xususiyati ishlatiladi?",
            options: ["align: center", "text-align: center", "center: true", "position: center"],
            correct: 1
        },
        {
            question: "HTML atributi nima?",
            options: ["Teg nomi", "Teg qiymati", "Teg xususiyati", "Teg turi"],
            correct: 2
        },
        {
            question: "Matnni kichik harflarda ko'rsatish uchun qaysi teg ishlatiladi?",
            options: ["<small>", "<tiny>", "<mini>", "<little>"],
            correct: 0
        },
        {
            question: "Video qo'yish uchun qaysi teg ishlatiladi?",
            options: ["<movie>", "<video>", "<media>", "<film>"],
            correct: 1
        },
        {
            question: "Audio fayl qo'yish uchun qaysi teg ishlatiladi?",
            options: ["<sound>", "<music>", "<audio>", "<voice>"],
            correct: 2
        },
        {
            question: "HTML hujjatining asosiy mazmuni qaysi teg ichida joylashadi?",
            options: ["<html>", "<head>", "<body>", "<main>"],
            correct: 2
        },
        {
            question: "Meta ma'lumotlar qaysi teg ichida joylashadi?",
            options: ["<body>", "<head>", "<meta>", "<info>"],
            correct: 1
        },
        {
            question: "Matnni chiziqcha bilan o'rash uchun qaysi teg ishlatiladi?",
            options: ["<line>", "<strike>", "<del>", "<cross>"],
            correct: 2
        },
        {
            question: "Matnni pastki indeks sifatida ko'rsatish uchun qaysi teg ishlatiladi?",
            options: ["<down>", "<sub>", "<lower>", "<bottom>"],
            correct: 1
        },
        {
            question: "Matnni yuqori indeks sifatida ko'rsatish uchun qaysi teg ishlatiladi?",
            options: ["<up>", "<sup>", "<upper>", "<top>"],
            correct: 1
        }
    ],
    javascript: [
        {
            question: "JavaScript-da o'zgaruvchi e'lon qilish uchun qaysi kalit so'z ishlatiladi?",
            options: ["variable", "var", "let", "Ikkalasi ham to'g'ri"],
            correct: 3
        },
        {
            question: "JavaScript-da matn chiqarish uchun qaysi funksiya ishlatiladi?",
            options: ["print()", "console.log()", "write()", "display()"],
            correct: 1
        },
        {
            question: "JavaScript-da izoh yozish uchun qaysi belgilar ishlatiladi?",
            options: ["# izoh", "// izoh", "<!-- izoh -->", "/* izoh */"],
            correct: 1
        },
        {
            question: "JavaScript-da massiv yaratish uchun qaysi qavslar ishlatiladi?",
            options: ["()", "{}", "[]", "<>"],
            correct: 2
        },
        {
            question: "JavaScript-da matnlarni birlashtirish uchun qaysi operator ishlatiladi?",
            options: ["+", "&", ".", "||"],
            correct: 0
        },
        {
            question: "JavaScript-da shartli operator qaysi kalit so'z bilan boshlanadi?",
            options: ["when", "if", "check", "condition"],
            correct: 1
        },
        {
            question: "JavaScript-da takrorlash uchun qaysi kalit so'z ishlatiladi?",
            options: ["repeat", "loop", "for", "cycle"],
            correct: 2
        },
        {
            question: "JavaScript-da funksiya yaratish uchun qaysi kalit so'z ishlatiladi?",
            options: ["function", "def", "func", "create"],
            correct: 0
        },
        {
            question: "JavaScript-da matn uzunligini aniqlash uchun qaysi xususiyat ishlatiladi?",
            options: ["size", "length", "len", "count"],
            correct: 1
        },
        {
            question: "JavaScript-da obyekt yaratish uchun qaysi qavslar ishlatiladi?",
            options: ["[]", "()", "{}", "<>"],
            correct: 2
        },
        {
            question: "JavaScript-da matnni katta harflarga o'tkazish uchun qaysi metod ishlatiladi?",
            options: ["toUpper()", "toUpperCase()", "uppercase()", "big()"],
            correct: 1
        },
        {
            question: "JavaScript-da sonni matunga aylantirish uchun qaysi metod ishlatiladi?",
            options: ["String()", "toString()", "text()", "Ikkalasi ham to'g'ri"],
            correct: 3
        },
        {
            question: "JavaScript-da matnni songa aylantirish uchun qaysi funksiya ishlatiladi?",
            options: ["Number()", "parseInt()", "num()", "Ikkalasi ham to'g'ri"],
            correct: 3
        },
        {
            question: "JavaScript-da massivga element qo'shish uchun qaysi metod ishlatiladi?",
            options: ["add()", "insert()", "push()", "append()"],
            correct: 2
        },
        {
            question: "JavaScript-da matnni bo'laklarga ajratish uchun qaysi metod ishlatiladi?",
            options: ["divide()", "split()", "separate()", "cut()"],
            correct: 1
        },
        {
            question: "JavaScript-da true va false qanday ma'lumot turi hisoblanadi?",
            options: ["string", "number", "boolean", "object"],
            correct: 2
        },
        {
            question: "JavaScript-da null qiymat nimani bildiradi?",
            options: ["Nol", "Bo'sh matn", "Hech narsa", "Aniqlanmagan"],
            correct: 2
        },
        {
            question: "JavaScript-da matnda qidiruv uchun qaysi metod ishlatiladi?",
            options: ["search()", "indexOf()", "find()", "Ikkalasi ham to'g'ri"],
            correct: 3
        },
        {
            question: "JavaScript-da massiv elementlarini tartiblash uchun qaysi metod ishlatiladi?",
            options: ["order()", "arrange()", "sort()", "organize()"],
            correct: 2
        },
        {
            question: "JavaScript-da matnni almashtirish uchun qaysi metod ishlatiladi?",
            options: ["change()", "replace()", "substitute()", "swap()"],
            correct: 1
        },
        {
            question: "JavaScript-da massiv uzunligini aniqlash uchun qaysi xususiyat ishlatiladi?",
            options: ["size", "length", "len", "count"],
            correct: 1
        },
        {
            question: "JavaScript-da vaqtni kechiktirish uchun qaysi funksiya ishlatiladi?",
            options: ["wait()", "delay()", "setTimeout()", "pause()"],
            correct: 2
        },
        {
            question: "JavaScript-da HTML elementini tanlash uchun qaysi metod ishlatiladi?",
            options: ["getElement()", "getElementById()", "selectElement()", "findElement()"],
            correct: 1
        },
        {
            question: "JavaScript-da hodisani tinglash uchun qaysi metod ishlatiladi?",
            options: ["listen()", "addEventListener()", "onEvent()", "watch()"],
            correct: 1
        },
        {
            question: "JavaScript-da Math obyekti nima uchun ishlatiladi?",
            options: ["Matn bilan ishlash", "Matematik amallar", "Vaqt bilan ishlash", "Massiv bilan ishlash"],
            correct: 1
        }
    ],
    english: [
        {
            question: "What does 'Hello' mean in Uzbek?",
            options: ["Salom", "Xayr", "Rahmat", "Kechirasiz"],
            correct: 0
        },
        {
            question: "Choose the correct translation of 'Kitob':",
            options: ["Book", "Pen", "Table", "Chair"],
            correct: 0
        },
        {
            question: "What is the plural form of 'child'?",
            options: ["childs", "children", "childes", "child"],
            correct: 1
        },
        {
            question: "Choose the correct sentence:",
            options: ["I am go to school", "I go to school", "I going to school", "I goes to school"],
            correct: 1
        },
        {
            question: "What does 'Thank you' mean?",
            options: ["Kechirasiz", "Rahmat", "Salom", "Xayr"],
            correct: 1
        },
        {
            question: "Choose the correct form: 'She ___ a teacher.'",
            options: ["am", "is", "are", "be"],
            correct: 1
        },
        {
            question: "What is the past tense of 'go'?",
            options: ["goed", "went", "gone", "going"],
            correct: 1
        },
        {
            question: "Choose the correct translation of 'Oila':",
            options: ["Friend", "Family", "House", "School"],
            correct: 1
        },
        {
            question: "What does 'Good morning' mean?",
            options: ["Xayrli tun", "Xayrli kun", "Xayrli ertalab", "Xayrli kech"],
            correct: 2
        },
        {
            question: "Choose the correct sentence:",
            options: ["He have a car", "He has a car", "He having a car", "He had have a car"],
            correct: 1
        },
        {
            question: "What is the opposite of 'big'?",
            options: ["large", "huge", "small", "tall"],
            correct: 2
        },
        {
            question: "Choose the correct form: 'They ___ students.'",
            options: ["am", "is", "are", "be"],
            correct: 2
        },
        {
            question: "What does 'Maktab' mean in English?",
            options: ["House", "School", "Hospital", "Shop"],
            correct: 1
        },
        {
            question: "Choose the correct sentence:",
            options: ["I can to swim", "I can swim", "I can swimming", "I can swims"],
            correct: 1
        },
        {
            question: "What is the plural form of 'man'?",
            options: ["mans", "men", "man", "mens"],
            correct: 1
        },
        {
            question: "Choose the correct translation of 'Suv':",
            options: ["Water", "Milk", "Tea", "Coffee"],
            correct: 0
        },
        {
            question: "What does 'How are you?' mean?",
            options: ["Nima gap?", "Qanday ahvolingiz?", "Qayerdasiz?", "Nima qilyapsiz?"],
            correct: 1
        },
        {
            question: "Choose the correct form: 'I ___ from Uzbekistan.'",
            options: ["am", "is", "are", "be"],
            correct: 0
        },
        {
            question: "What is the past tense of 'eat'?",
            options: ["eated", "ate", "eaten", "eating"],
            correct: 1
        },
        {
            question: "Choose the correct translation of 'Uy':",
            options: ["School", "House", "Car", "Tree"],
            correct: 1
        },
        {
            question: "What does 'Please' mean?",
            options: ["Rahmat", "Kechirasiz", "Iltimos", "Salom"],
            correct: 2
        },
        {
            question: "Choose the correct sentence:",
            options: ["She don't like apples", "She doesn't like apples", "She not like apples", "She no like apples"],
            correct: 1
        },
        {
            question: "What is the opposite of 'hot'?",
            options: ["warm", "cool", "cold", "freeze"],
            correct: 2
        },
        {
            question: "Choose the correct form: 'We ___ happy.'",
            options: ["am", "is", "are", "be"],
            correct: 2
        },
        {
            question: "What does 'Goodbye' mean?",
            options: ["Salom", "Xayr", "Rahmat", "Kechirasiz"],
            correct: 1
        }
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
}

function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // User form
    document.getElementById('userForm').addEventListener('submit', handleUserSubmit);
    
    // Test cards
    document.querySelectorAll('.test-card').forEach(card => {
        card.addEventListener('click', () => startTest(card.dataset.test));
    });
    
    // Test navigation
    document.getElementById('prevBtn').addEventListener('click', previousQuestion);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('finishBtn').addEventListener('click', finishTest);
    
    // Results actions
    document.getElementById('downloadCertificate').addEventListener('click', downloadCertificate);
    document.getElementById('backToTests').addEventListener('click', backToTests);
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('uz-UZ', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

function handleUserSubmit(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    
    if (firstName && lastName) {
        currentUser = { firstName, lastName };
        document.getElementById('userNameDisplay').textContent = `${firstName} ${lastName}`;
        showScreen('testListScreen');
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startTest(testType) {
    currentTest = {
        type: testType,
        questions: shuffleArray([...testData[testType]]),
        name: getTestName(testType)
    };
    
    currentQuestionIndex = 0;
    userAnswers = new Array(currentTest.questions.length).fill(null);
    testStartTime = new Date();
    timeRemaining = 30 * 60; // 30 minutes
    
    document.getElementById('testTitle').textContent = currentTest.name;
    showScreen('testScreen');
    displayQuestion();
    startTimer();
}

function getTestName(testType) {
    const names = {
        python: 'Python Dasturlash Tili',
        html: 'HTML Markup Tili',
        javascript: 'JavaScript Dasturlash Tili',
        english: 'Ingliz Tili'
    };
    return names[testType] || testType;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function displayQuestion() {
    const question = currentTest.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100;
    
    document.getElementById('questionText').textContent = `${currentQuestionIndex + 1}. ${question.question}`;
    document.getElementById('questionCounter').textContent = `${currentQuestionIndex + 1} / ${currentTest.questions.length}`;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').style.display = currentQuestionIndex === currentTest.questions.length - 1 ? 'none' : 'block';
    document.getElementById('finishBtn').style.display = currentQuestionIndex === currentTest.questions.length - 1 ? 'block' : 'none';
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    document.querySelectorAll('.option').forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
    });
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentTest.questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            finishTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function finishTest() {
    clearInterval(timerInterval);
    const testEndTime = new Date();
    const timeTaken = Math.floor((testEndTime - testStartTime) / 1000 / 60); // minutes
    
    calculateResults(timeTaken);
    showScreen('resultsScreen');
}

function calculateResults(timeTaken) {
    let correctCount = 0;
    
    currentTest.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctCount++;
        }
    });
    
    const incorrectCount = currentTest.questions.length - correctCount;
    const percentage = Math.round((correctCount / currentTest.questions.length) * 100);
    
    // Update results display
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('incorrectAnswers').textContent = incorrectCount;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    document.getElementById('timeTaken').textContent = `${timeTaken} daqiqa`;
    
    // Display detailed answers
    displayAnswersReview();
}

function displayAnswersReview() {
    const reviewContainer = document.getElementById('answersReview');
    reviewContainer.innerHTML = '<h3 style="margin-bottom: 20px;">Batafsil javoblar:</h3>';
    
    currentTest.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question';
        
        const isCorrect = userAnswers[index] === question.correct;
        const userAnswerText = userAnswers[index] !== null ? question.options[userAnswers[index]] : 'Javob berilmagan';
        const correctAnswerText = question.options[question.correct];
        
        questionDiv.innerHTML = `
            <h4>${index + 1}. ${question.question}</h4>
            <div class="review-answer user-answer ${isCorrect ? 'correct' : 'incorrect'}">
                Sizning javobingiz: ${userAnswerText}
            </div>
            ${!isCorrect ? `<div class="review-answer correct">To'g'ri javob: ${correctAnswerText}</div>` : ''}
        `;
        
        reviewContainer.appendChild(questionDiv);
    });
}

function downloadCertificate() {
    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(0.5, '#764ba2');
    gradient.addColorStop(1, '#f093fb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add decorative border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Add inner border
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    
    // Certificate title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SERTIFIKAT', canvas.width / 2, 120);
    
    // Subtitle
    ctx.font = '24px Inter, Arial, sans-serif';
    ctx.fillText('Muvaffaqiyatli yakunlangan test uchun', canvas.width / 2, 160);
    
    // User name
    ctx.font = 'bold 36px Inter, Arial, sans-serif';
    ctx.fillStyle = '#fff200';
    ctx.fillText(`${currentUser.firstName} ${currentUser.lastName}`, canvas.width / 2, 240);
    
    // Test info
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px Inter, Arial, sans-serif';
    ctx.fillText(`${currentTest.name} testi`, canvas.width / 2, 300);
    
    // Score
    const correctCount = parseInt(document.getElementById('correctAnswers').textContent);
    const percentage = Math.round((correctCount / currentTest.questions.length) * 100);
    
    ctx.font = 'bold 32px Inter, Arial, sans-serif';
    ctx.fillStyle = '#00ff88';
    ctx.fillText(`Natija: ${percentage}%`, canvas.width / 2, 360);
    
    // Additional info
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Inter, Arial, sans-serif';
    ctx.fillText(`To'g'ri javoblar: ${correctCount}/${currentTest.questions.length}`, canvas.width / 2, 400);
    
    // Date
    const currentDate = new Date().toLocaleDateString('uz-UZ');
    ctx.fillText(`Sana: ${currentDate}`, canvas.width / 2, 440);
    
    // Signature line
    ctx.font = '18px Inter, Arial, sans-serif';
    ctx.fillText('Zamonaviy Test Platformasi', canvas.width / 2, 520);
    
    // Add decorative elements
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(100, 150, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(700, 150, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(100, 450, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(700, 450, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    // Download the certificate
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentUser.firstName}_${currentUser.lastName}_sertifikat.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

function backToTests() {
    showScreen('testListScreen');
    
    // Reset test data
    currentTest = null;
    currentQuestionIndex = 0;
    userAnswers = [];
    testStartTime = null;
    clearInterval(timerInterval);
    timeRemaining = 30 * 60;
}