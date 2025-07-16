import React, { useState, useEffect } from 'react';
import { Moon, Sun, Clock, FileText, User, Award, CheckCircle, XCircle, Download, Sparkles, Zap, Star } from 'lucide-react';

// Turlar
interface User {
  name: string;
  surname: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface Test {
  id: string;
  name: string;
  questions: Question[];
  timeLimit: number; // daqiqalarda
  color: string;
  icon: string;
}

interface TestResult {
  correct: number;
  incorrect: number;
  percentage: number;
  timeTaken: number; // daqiqalarda
  answers: { questionId: number; selectedAnswer: number; isCorrect: boolean }[];
}

// Test ma'lumotlari
const testData: Test[] = [
  {
    id: 'python',
    name: 'Python',
    timeLimit: 30,
    color: 'from-blue-500 to-cyan-500',
    icon: '🐍',
    questions: [
      {
        id: 1,
        question: 'print(2 ** 3) ning natijasi nima?',
        options: ['6', '8', '9', '16'],
        correct: 1
      },
      {
        id: 2,
        question: 'Python da funksiya yaratish uchun qaysi kalit so\'z ishlatiladi?',
        options: ['function', 'def', 'func', 'define'],
        correct: 1
      },
      {
        id: 3,
        question: 'len() funksiyasi nima qiladi?',
        options: ['Obyekt uzunligini qaytaradi', 'Obyekt turini qaytaradi', 'Obyekt qiymatini qaytaradi', 'Obyekt manzilini qaytaradi'],
        correct: 0
      },
      {
        id: 4,
        question: 'Python da butun bo\'lish operatori qaysi?',
        options: ['//', '/', '%', '**'],
        correct: 0
      },
      {
        id: 5,
        question: 'Python da ro\'yxat yaratishning to\'g\'ri usuli qaysi?',
        options: ['[]', '{}', '()', '<>'],
        correct: 0
      },
      {
        id: 6,
        question: 'Python da string birlashtirish uchun qaysi operator ishlatiladi?',
        options: ['+', '&', '*', '||'],
        correct: 0
      },
      {
        id: 7,
        question: 'range(5) ning natijasi nima?',
        options: ['[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[0, 1, 2, 3, 4, 5]', '[1, 2, 3, 4]'],
        correct: 1
      },
      {
        id: 8,
        question: 'Python da lug\'at yaratish uchun qaysi belgi ishlatiladi?',
        options: ['[]', '{}', '()', '<>'],
        correct: 1
      },
      {
        id: 9,
        question: 'if __name__ == "__main__": ning ma\'nosi nima?',
        options: ['Funksiya chaqirilganda', 'Modul import qilinganda', 'Fayl to\'g\'ridan-to\'g\'ri ishga tushirilganda', 'Xatolik yuz berganda'],
        correct: 2
      },
      {
        id: 10,
        question: 'Python da izoh qo\'shish uchun qaysi belgi ishlatiladi?',
        options: ['//', '#', '/*', '--'],
        correct: 1
      },
      {
        id: 11,
        question: 'list.append() metodi nima qiladi?',
        options: ['Ro\'yxatni tozalaydi', 'Ro\'yxat oxiriga element qo\'shadi', 'Ro\'yxatni tartiblaydi', 'Ro\'yxat uzunligini qaytaradi'],
        correct: 1
      },
      {
        id: 12,
        question: 'Python da for tsikli sintaksisi qanday?',
        options: ['for i in range(10):', 'for (i=0; i<10; i++):', 'for i = 1 to 10:', 'for i from 1 to 10:'],
        correct: 0
      },
      {
        id: 13,
        question: 'try-except bloki nima uchun ishlatiladi?',
        options: ['Tsiklni to\'xtatish', 'Xatoliklarni ushlash', 'Funksiya yaratish', 'O\'zgaruvchi e\'lon qilish'],
        correct: 1
      },
      {
        id: 14,
        question: 'Python da import statement nima uchun ishlatiladi?',
        options: ['Fayl yaratish', 'Modulni yuklash', 'O\'zgaruvchi yaratish', 'Funksiya chaqirish'],
        correct: 1
      },
      {
        id: 15,
        question: 'lambda funksiyasi nima?',
        options: ['Oddiy funksiya', 'Anonim funksiya', 'Klass metodi', 'O\'zgaruvchi turi'],
        correct: 1
      },
      {
        id: 16,
        question: 'Python da string formatlashtirish uchun qaysi usul ishlatiladi?',
        options: ['format()', 'f-string', '.format()', 'Barchasi to\'g\'ri'],
        correct: 3
      },
      {
        id: 17,
        question: 'list comprehension nima?',
        options: ['Ro\'yxat yaratishning qisqa usuli', 'Ro\'yxatni o\'qish usuli', 'Ro\'yxatni o\'chirish usuli', 'Ro\'yxatni nusxalash usuli'],
        correct: 0
      },
      {
        id: 18,
        question: 'Python da global o\'zgaruvchi yaratish uchun qaysi kalit so\'z ishlatiladi?',
        options: ['global', 'public', 'static', 'extern'],
        correct: 0
      },
      {
        id: 19,
        question: 'with statement nima uchun ishlatiladi?',
        options: ['Tsikl yaratish', 'Kontekst boshqaruvi', 'Funksiya yaratish', 'Klass yaratish'],
        correct: 1
      },
      {
        id: 20,
        question: 'Python da tuple va list orasidagi farq nima?',
        options: ['Farq yo\'q', 'Tuple o\'zgarmas, list o\'zgaruvchan', 'List o\'zgarmas, tuple o\'zgaruvchan', 'Ikkalasi ham o\'zgarmas'],
        correct: 1
      },
      {
        id: 21,
        question: 'enumerate() funksiyasi nima qiladi?',
        options: ['Elementlarni sanaydi', 'Index va qiymatni qaytaradi', 'Ro\'yxatni tartiblaydi', 'Elementlarni filtrlashtiradi'],
        correct: 1
      },
      {
        id: 22,
        question: 'Python da klass yaratish uchun qaysi kalit so\'z ishlatiladi?',
        options: ['class', 'def', 'object', 'struct'],
        correct: 0
      },
      {
        id: 23,
        question: '__init__ metodi nima?',
        options: ['Klass metodi', 'Konstruktor', 'Destruktor', 'Static metod'],
        correct: 1
      },
      {
        id: 24,
        question: 'Python da meros olish (inheritance) qanday amalga oshiriladi?',
        options: ['class Child(Parent):', 'class Child extends Parent:', 'class Child inherits Parent:', 'class Child -> Parent:'],
        correct: 0
      },
      {
        id: 25,
        question: 'pip nima?',
        options: ['Python interpretatori', 'Paket menejeri', 'IDE', 'Kompilyator'],
        correct: 1
      }
    ]
  },
  {
    id: 'html',
    name: 'HTML',
    timeLimit: 30,
    color: 'from-orange-500 to-red-500',
    icon: '🌐',
    questions: [
      {
        id: 1,
        question: 'HTML nimani anglatadi?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
        correct: 0
      },
      {
        id: 2,
        question: 'Ichki stil jadvali aniqlash uchun qaysi HTML tegi ishlatiladi?',
        options: ['<css>', '<script>', '<style>', '<link>'],
        correct: 2
      },
      {
        id: 3,
        question: 'Eng katta sarlavha uchun to\'g\'ri HTML elementi qaysi?',
        options: ['<h6>', '<h1>', '<head>', '<heading>'],
        correct: 1
      },
      {
        id: 4,
        question: 'HTML elementiga noyob identifikator berish uchun qaysi atribut ishlatiladi?',
        options: ['class', 'id', 'name', 'identifier'],
        correct: 1
      },
      {
        id: 5,
        question: 'Giperhavola yaratish uchun to\'g\'ri HTML elementi qaysi?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correct: 1
      },
      {
        id: 6,
        question: 'HTML hujjatining asosiy tuzilishi qanday?',
        options: ['<html><head></head><body></body></html>', '<html><body><head></head></body></html>', '<head><html><body></body></html></head>', '<body><html><head></head></html></body>'],
        correct: 0
      },
      {
        id: 7,
        question: 'Rasm qo\'yish uchun qaysi teg ishlatiladi?',
        options: ['<image>', '<img>', '<picture>', '<photo>'],
        correct: 1
      },
      {
        id: 8,
        question: 'Jadval yaratish uchun qaysi teg ishlatiladi?',
        options: ['<table>', '<tab>', '<grid>', '<data>'],
        correct: 0
      },
      {
        id: 9,
        question: 'Forma yaratish uchun qaysi teg ishlatiladi?',
        options: ['<input>', '<form>', '<field>', '<data>'],
        correct: 1
      },
      {
        id: 10,
        question: 'Matn qalin qilish uchun qaysi teg ishlatiladi?',
        options: ['<bold>', '<b>', '<strong>', '<b> va <strong>'],
        correct: 3
      },
      {
        id: 11,
        question: 'Ro\'yxat yaratish uchun qaysi teglar ishlatiladi?',
        options: ['<ul>, <ol>, <li>', '<list>, <item>', '<menu>, <option>', '<select>, <choice>'],
        correct: 0
      },
      {
        id: 12,
        question: 'HTML5 da yangi semantik teglar qaysilar?',
        options: ['<header>, <footer>, <nav>', '<div>, <span>, <p>', '<table>, <tr>, <td>', '<form>, <input>, <button>'],
        correct: 0
      },
      {
        id: 13,
        question: 'Video qo\'yish uchun HTML5 da qaysi teg ishlatiladi?',
        options: ['<movie>', '<video>', '<media>', '<film>'],
        correct: 1
      },
      {
        id: 14,
        question: 'Audio fayl qo\'yish uchun qaysi teg ishlatiladi?',
        options: ['<sound>', '<audio>', '<music>', '<voice>'],
        correct: 1
      },
      {
        id: 15,
        question: 'HTML da izoh qoldirish uchun qanday sintaksis ishlatiladi?',
        options: ['// izoh', '/* izoh */', '<!-- izoh -->', '# izoh'],
        correct: 2
      },
      {
        id: 16,
        question: 'DOCTYPE nima uchun ishlatiladi?',
        options: ['Hujjat turini belgilash', 'Stil berish', 'JavaScript qo\'shish', 'Rasm qo\'yish'],
        correct: 0
      },
      {
        id: 17,
        question: 'Meta teglar qayerda joylashadi?',
        options: ['<body> ichida', '<head> ichida', '<html> ichida', '<footer> ichida'],
        correct: 1
      },
      {
        id: 18,
        question: 'Tashqi CSS faylini ulash uchun qaysi teg ishlatiladi?',
        options: ['<style>', '<css>', '<link>', '<import>'],
        correct: 2
      },
      {
        id: 19,
        question: 'JavaScript faylini ulash uchun qaysi teg ishlatiladi?',
        options: ['<js>', '<javascript>', '<script>', '<code>'],
        correct: 2
      },
      {
        id: 20,
        question: 'Input maydonining turini belgilash uchun qaysi atribut ishlatiladi?',
        options: ['kind', 'type', 'format', 'style'],
        correct: 1
      },
      {
        id: 21,
        question: 'Placeholder atributi nima uchun ishlatiladi?',
        options: ['Qiymat berish', 'Maslahat matnini ko\'rsatish', 'Validatsiya', 'Stil berish'],
        correct: 1
      },
      {
        id: 22,
        question: 'Required atributi nima qiladi?',
        options: ['Maydonni majburiy qiladi', 'Maydonni yashiradi', 'Maydonni o\'chiradi', 'Maydonni bloklaydi'],
        correct: 0
      },
      {
        id: 23,
        question: 'Canvas elementi nima uchun ishlatiladi?',
        options: ['Matn yozish', 'Grafika chizish', 'Video ko\'rsatish', 'Audio o\'ynash'],
        correct: 1
      },
      {
        id: 24,
        question: 'SVG nimani anglatadi?',
        options: ['Scalable Vector Graphics', 'Simple Vector Graphics', 'Standard Vector Graphics', 'Static Vector Graphics'],
        correct: 0
      },
      {
        id: 25,
        question: 'HTML5 da local storage nima uchun ishlatiladi?',
        options: ['Serverda ma\'lumot saqlash', 'Brauzerda ma\'lumot saqlash', 'Faylda ma\'lumot saqlash', 'Xotirada ma\'lumot saqlash'],
        correct: 1
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    timeLimit: 30,
    color: 'from-yellow-500 to-orange-500',
    icon: '⚡',
    questions: [
      {
        id: 1,
        question: 'JavaScript ni qaysi kompaniya yaratgan?',
        options: ['Microsoft', 'Netscape', 'Google', 'Apple'],
        correct: 1
      },
      {
        id: 2,
        question: 'JavaScript massivini to\'g\'ri yozish usuli qaysi?',
        options: ['var colors = "red", "green", "blue"', 'var colors = ["red", "green", "blue"]', 'var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'],
        correct: 1
      },
      {
        id: 3,
        question: 'Ogohlantirish oynasida "Salom Dunyo" ni qanday yozish mumkin?',
        options: ['alertBox("Salom Dunyo");', 'msg("Salom Dunyo");', 'alert("Salom Dunyo");', 'msgBox("Salom Dunyo");'],
        correct: 2
      },
      {
        id: 4,
        question: 'Foydalanuvchi HTML elementiga bosganda qaysi hodisa yuz beradi?',
        options: ['onchange', 'onclick', 'onmouseclick', 'onmouseover'],
        correct: 1
      },
      {
        id: 5,
        question: 'JavaScript obyektini to\'g\'ri yozish usuli qaysi?',
        options: ['var person = {firstName:"John", lastName:"Doe"};', 'var person = (firstName:"John", lastName:"Doe");', 'var person = firstName:"John", lastName:"Doe";', 'var person = {firstName="John", lastName="Doe"};'],
        correct: 0
      },
      {
        id: 6,
        question: 'O\'zgaruvchi e\'lon qilish uchun qaysi kalit so\'zlar ishlatiladi?',
        options: ['var, let, const', 'variable, let, constant', 'v, l, c', 'declare, define, set'],
        correct: 0
      },
      {
        id: 7,
        question: 'Funksiya yaratish uchun qaysi kalit so\'z ishlatiladi?',
        options: ['func', 'function', 'def', 'method'],
        correct: 1
      },
      {
        id: 8,
        question: 'JavaScript da izoh qoldirish usullari qaysilar?',
        options: ['// va /* */', '# va <!-- -->', '// va # ', '/* */ va <!-- -->'],
        correct: 0
      },
      {
        id: 9,
        question: 'typeof operatori nima qiladi?',
        options: ['O\'zgaruvchi qiymatini qaytaradi', 'O\'zgaruvchi turini qaytaradi', 'O\'zgaruvchi nomini qaytaradi', 'O\'zgaruvchi uzunligini qaytaradi'],
        correct: 1
      },
      {
        id: 10,
        question: 'JavaScript da qat\'iy tenglik operatori qaysi?',
        options: ['==', '===', '=', '!='],
        correct: 1
      },
      {
        id: 11,
        question: 'Array.push() metodi nima qiladi?',
        options: ['Massiv oxiriga element qo\'shadi', 'Massiv boshiga element qo\'shadi', 'Massivni tozalaydi', 'Massiv uzunligini qaytaradi'],
        correct: 0
      },
      {
        id: 12,
        question: 'JSON nimani anglatadi?',
        options: ['JavaScript Object Notation', 'Java Standard Object Notation', 'JavaScript Online Notation', 'Java Script Object Network'],
        correct: 0
      },
      {
        id: 13,
        question: 'setTimeout() funksiyasi nima qiladi?',
        options: ['Vaqtni o\'rnatadi', 'Kechiktirib bajaradi', 'Vaqtni to\'xtatadi', 'Vaqtni o\'lchaydi'],
        correct: 1
      },
      {
        id: 14,
        question: 'DOM nimani anglatadi?',
        options: ['Document Object Model', 'Data Object Model', 'Dynamic Object Model', 'Display Object Model'],
        correct: 0
      },
      {
        id: 15,
        question: 'getElementById() metodi nima qiladi?',
        options: ['ID bo\'yicha element topadi', 'ID yaratadi', 'ID o\'zgartiradi', 'ID o\'chiradi'],
        correct: 0
      },
      {
        id: 16,
        question: 'addEventListener() metodi nima uchun ishlatiladi?',
        options: ['Element yaratish', 'Hodisa qo\'shish', 'Element o\'chirish', 'Stil berish'],
        correct: 1
      },
      {
        id: 17,
        question: 'JavaScript da callback funksiya nima?',
        options: ['Oddiy funksiya', 'Boshqa funksiyaga argument sifatida uzatiladigan funksiya', 'Xato funksiyasi', 'Takrorlanuvchi funksiya'],
        correct: 1
      },
      {
        id: 18,
        question: 'Promise nima uchun ishlatiladi?',
        options: ['Asinxron operatsiyalarni boshqarish', 'Sinxron operatsiyalarni boshqarish', 'Xotira boshqaruvi', 'Xatoliklarni boshqarish'],
        correct: 0
      },
      {
        id: 19,
        question: 'async/await nima?',
        options: ['Yangi o\'zgaruvchi turi', 'Promise bilan ishlash usuli', 'Tsikl turi', 'Shart operatori'],
        correct: 1
      },
      {
        id: 20,
        question: 'localStorage nima uchun ishlatiladi?',
        options: ['Serverda ma\'lumot saqlash', 'Brauzerda ma\'lumot saqlash', 'Xotirada ma\'lumot saqlash', 'Faylda ma\'lumot saqlash'],
        correct: 1
      },
      {
        id: 21,
        question: 'fetch() API nima uchun ishlatiladi?',
        options: ['Ma\'lumot olish', 'HTTP so\'rovlar yuborish', 'Fayllarni yuklash', 'Barchasi to\'g\'ri'],
        correct: 3
      },
      {
        id: 22,
        question: 'Arrow function sintaksisi qanday?',
        options: ['() => {}', 'function() {}', 'def() {}', '() -> {}'],
        correct: 0
      },
      {
        id: 23,
        question: 'Destructuring nima?',
        options: ['Obyekt yoki massivdan qiymatlarni ajratib olish', 'Obyekt yaratish', 'Massiv yaratish', 'Funksiya yaratish'],
        correct: 0
      },
      {
        id: 24,
        question: 'Template literal qanday belgilanadi?',
        options: ['"matn"', "'matn'", '`matn`', '/matn/'],
        correct: 2
      },
      {
        id: 25,
        question: 'ES6 da class yaratish sintaksisi qanday?',
        options: ['class MyClass {}', 'function MyClass() {}', 'var MyClass = {}', 'def MyClass:'],
        correct: 0
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    timeLimit: 30,
    color: 'from-green-500 to-teal-500',
    icon: '🇬🇧',
    questions: [
      {
        id: 1,
        question: 'Choose the correct form: "I _____ to school every day."',
        options: ['go', 'goes', 'going', 'gone'],
        correct: 0
      },
      {
        id: 2,
        question: 'What is the past tense of "eat"?',
        options: ['eated', 'ate', 'eaten', 'eating'],
        correct: 1
      },
      {
        id: 3,
        question: 'Choose the correct article: "I saw _____ elephant at the zoo."',
        options: ['a', 'an', 'the', 'no article'],
        correct: 1
      },
      {
        id: 4,
        question: 'Which sentence is correct?',
        options: ['She don\'t like coffee', 'She doesn\'t like coffee', 'She not like coffee', 'She no like coffee'],
        correct: 1
      },
      {
        id: 5,
        question: 'What is the plural of "child"?',
        options: ['childs', 'childes', 'children', 'child'],
        correct: 2
      },
      {
        id: 6,
        question: 'Choose the correct preposition: "The book is _____ the table."',
        options: ['in', 'on', 'at', 'by'],
        correct: 1
      },
      {
        id: 7,
        question: 'What does "beautiful" mean?',
        options: ['ugly', 'pretty', 'big', 'small'],
        correct: 1
      },
      {
        id: 8,
        question: 'Choose the correct form: "She _____ working now."',
        options: ['is', 'are', 'am', 'be'],
        correct: 0
      },
      {
        id: 9,
        question: 'What is the opposite of "hot"?',
        options: ['warm', 'cool', 'cold', 'freezing'],
        correct: 2
      },
      {
        id: 10,
        question: 'Choose the correct question: "_____ do you live?"',
        options: ['What', 'Where', 'When', 'Why'],
        correct: 1
      },
      {
        id: 11,
        question: 'What is the comparative form of "good"?',
        options: ['gooder', 'more good', 'better', 'best'],
        correct: 2
      },
      {
        id: 12,
        question: 'Choose the correct form: "I have _____ apple."',
        options: ['a', 'an', 'the', 'some'],
        correct: 1
      },
      {
        id: 13,
        question: 'What is the past participle of "go"?',
        options: ['went', 'gone', 'going', 'goes'],
        correct: 1
      },
      {
        id: 14,
        question: 'Choose the correct form: "There _____ many students in the class."',
        options: ['is', 'are', 'was', 'be'],
        correct: 1
      },
      {
        id: 15,
        question: 'What does "quickly" describe?',
        options: ['noun', 'verb', 'adjective', 'adverb'],
        correct: 1
      },
      {
        id: 16,
        question: 'Choose the correct form: "I _____ English for 5 years."',
        options: ['study', 'studied', 'have studied', 'am studying'],
        correct: 2
      },
      {
        id: 17,
        question: 'What is the superlative form of "big"?',
        options: ['bigger', 'more big', 'biggest', 'most big'],
        correct: 2
      },
      {
        id: 18,
        question: 'Choose the correct form: "If I _____ rich, I would travel the world."',
        options: ['am', 'was', 'were', 'be'],
        correct: 2
      },
      {
        id: 19,
        question: 'What is a synonym for "happy"?',
        options: ['sad', 'angry', 'joyful', 'tired'],
        correct: 2
      },
      {
        id: 20,
        question: 'Choose the correct form: "She made me _____ my homework."',
        options: ['do', 'to do', 'doing', 'done'],
        correct: 0
      },
      {
        id: 21,
        question: 'What is the correct order? "I _____ never _____ to Paris."',
        options: ['have, been', 'has, been', 'had, go', 'will, go'],
        correct: 0
      },
      {
        id: 22,
        question: 'Choose the correct form: "The movie was _____ interesting."',
        options: ['very', 'much', 'too much', 'so much'],
        correct: 0
      },
      {
        id: 23,
        question: 'What does "although" mean?',
        options: ['because', 'but', 'so', 'and'],
        correct: 1
      },
      {
        id: 24,
        question: 'Choose the correct form: "I wish I _____ speak Chinese."',
        options: ['can', 'could', 'will', 'would'],
        correct: 1
      },
      {
        id: 25,
        question: 'What is the correct passive form of "They built the house"?',
        options: ['The house built by them', 'The house was built by them', 'The house is built by them', 'The house has built by them'],
        correct: 1
      }
    ]
  }
];

// Savollarni aralashtirish funksiyasi
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Komponentlar
const LandingPage: React.FC<{
  onSubmit: (user: User) => void;
  darkMode: boolean;
}> = ({ onSubmit, darkMode }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && surname.trim()) {
      onSubmit({ name: name.trim(), surname: surname.trim() });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500'} relative overflow-hidden`}>
      {/* 3D Animatsiya fonlari */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -left-40 w-80 h-80 ${darkMode ? 'bg-blue-500' : 'bg-yellow-300'} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`}></div>
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${darkMode ? 'bg-purple-500' : 'bg-pink-300'} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-40 left-20 w-80 h-80 ${darkMode ? 'bg-green-500' : 'bg-blue-300'} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000`}></div>
      </div>

      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-lg ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} transition-all duration-500 transform hover:scale-105 border ${darkMode ? 'border-gray-700' : 'border-white/20'}`}>
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'} mb-6 animate-pulse shadow-lg`}>
            <Sparkles className="w-10 h-10 text-white animate-spin" />
          </div>
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 animate-fade-in`}>
            Test Platformasi
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg animate-fade-in-delay`}>
            Testni boshlash uchun ma'lumotlaringizni kiriting
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="transform transition-all duration-300 hover:scale-105">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Ism
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-4 rounded-2xl border-2 ${darkMode ? 'border-gray-600 bg-gray-700/50 text-white' : 'border-gray-200 bg-white/50 text-gray-900'} focus:border-blue-500 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner`}
              placeholder="Ismingizni kiriting"
              required
            />
          </div>
          
          <div className="transform transition-all duration-300 hover:scale-105">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Familiya
            </label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className={`w-full px-4 py-4 rounded-2xl border-2 ${darkMode ? 'border-gray-600 bg-gray-700/50 text-white' : 'border-gray-200 bg-white/50 text-gray-900'} focus:border-blue-500 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-inner`}
              placeholder="Familiyangizni kiriting"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl animate-gradient-x"
          >
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 animate-pulse" />
              Testni Boshlash
              <Star className="w-5 h-5 animate-spin" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

const TestList: React.FC<{
  onSelectTest: (test: Test) => void;
  darkMode: boolean;
  user: User;
}> = ({ onSelectTest, darkMode, user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400'} py-8 relative overflow-hidden`}>
      {/* 3D Animatsiya fonlari */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-72 h-72 ${darkMode ? 'bg-blue-500' : 'bg-yellow-300'} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float`}></div>
        <div className={`absolute top-40 right-10 w-72 h-72 ${darkMode ? 'bg-purple-500' : 'bg-pink-300'} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-2000`}></div>
        <div className={`absolute bottom-20 left-1/2 w-72 h-72 ${darkMode ? 'bg-green-500' : 'bg-blue-300'} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-4000`}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className={`${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} rounded-3xl shadow-2xl p-8 mb-8 backdrop-blur-lg border ${darkMode ? 'border-gray-700' : 'border-white/20'}`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 animate-fade-in`}>
                Xush kelibsiz, {user.name} {user.surname}! 🎉
              </h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg animate-fade-in-delay`}>
                Test tanlang va bilimingizni sinab ko'ring
              </p>
            </div>
            <div className={`text-right ${darkMode ? 'text-gray-300' : 'text-gray-600'} transform hover:scale-110 transition-all duration-300`}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-6 h-6 animate-pulse" />
                <span className="text-sm font-medium">Joriy vaqt</span>
              </div>
              <div className="font-mono text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-yellow-900/30 border-yellow-600' : 'bg-yellow-50 border-yellow-300'} border-2 rounded-2xl p-6 mb-8 transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center gap-4">
              <Clock className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} animate-pulse`} />
              <div>
                <h3 className={`font-bold text-lg ${darkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>
                  ⏰ Vaqt Chegarasi Haqida Ma'lumot
                </h3>
                <p className={`${darkMode ? 'text-yellow-300' : 'text-yellow-700'} mt-1`}>
                  Har bir test uchun 30 daqiqa vaqt beriladi. Testni yakunlash uchun yetarli vaqtingiz borligiga ishonch hosil qiling.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testData.map((test, index) => (
              <div
                key={test.id}
                className={`${darkMode ? 'bg-gray-700/80 hover:bg-gray-600/80' : 'bg-white/80 hover:bg-white/90'} rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-xl hover:shadow-2xl backdrop-blur-sm border ${darkMode ? 'border-gray-600' : 'border-white/30'} animate-fade-in-up`}
                onClick={() => onSelectTest(test)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${test.color} mb-4 shadow-lg transform hover:rotate-12 transition-all duration-300`}>
                  <span className="text-2xl">{test.icon}</span>
                </div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {test.name}
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 text-lg`}>
                  {test.questions.length} ta savol
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="w-4 h-4 animate-pulse" />
                  <span className={`bg-gradient-to-r ${test.color} bg-clip-text text-transparent`}>
                    {test.timeLimit} daqiqa
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestInterface: React.FC<{
  test: Test;
  onFinish: (result: TestResult, timeTaken: number) => void;
  darkMode: boolean;
}> = ({ test, onFinish, darkMode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(test.timeLimit * 60);
  const [startTime] = useState(Date.now());
  const [shuffledQuestions] = useState(() => shuffleArray(test.questions));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleFinish = () => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000 / 60);
    const resultAnswers = shuffledQuestions.map(q => ({
      questionId: q.id,
      selectedAnswer: answers[q.id] ?? -1,
      isCorrect: answers[q.id] === q.correct
    }));

    const correct = resultAnswers.filter(a => a.isCorrect).length;
    const incorrect = shuffledQuestions.length - correct;
    const percentage = Math.round((correct / shuffledQuestions.length) * 100);

    onFinish({
      correct,
      incorrect,
      percentage,
      timeTaken,
      answers: resultAnswers
    }, timeTaken);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'} py-8 relative overflow-hidden`}>
      {/* 3D Animatsiya fonlari */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-10 left-10 w-64 h-64 ${darkMode ? 'bg-blue-500' : 'bg-yellow-300'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}></div>
        <div className={`absolute bottom-10 right-10 w-64 h-64 ${darkMode ? 'bg-purple-500' : 'bg-pink-300'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000`}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className={`${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} rounded-3xl shadow-2xl p-8 backdrop-blur-lg border ${darkMode ? 'border-gray-700' : 'border-white/30'}`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-3`}>
                <span className="text-4xl">{test.icon}</span>
                {test.name} Testi
              </h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg mt-2`}>
                Savol {currentQuestion + 1} / {shuffledQuestions.length}
              </p>
            </div>
            <div className={`text-right ${timeLeft < 300 ? 'text-red-500 animate-pulse' : darkMode ? 'text-gray-300' : 'text-gray-600'} transform hover:scale-110 transition-all duration-300`}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-6 h-6" />
                <span className="text-sm font-medium">Qolgan vaqt</span>
              </div>
              <div className="font-mono text-3xl font-bold">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3 mb-8 overflow-hidden`}>
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 animate-gradient-x"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mb-8">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8 leading-relaxed`}>
              {shuffledQuestions[currentQuestion].question}
            </h2>
            
            <div className="space-y-4">
              {shuffledQuestions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    answers[shuffledQuestions[currentQuestion].id] === index
                      ? darkMode
                        ? 'border-blue-500 bg-blue-900/30 shadow-lg'
                        : 'border-blue-500 bg-blue-50 shadow-lg'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700/50 hover:bg-gray-600/50'
                      : 'border-gray-200 bg-white/50 hover:bg-white/80'
                  } backdrop-blur-sm`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${shuffledQuestions[currentQuestion].id}`}
                      value={index}
                      checked={answers[shuffledQuestions[currentQuestion].id] === index}
                      onChange={() => handleAnswer(shuffledQuestions[currentQuestion].id, index)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 mr-4"
                    />
                    <span className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-medium`}>
                      {option}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                currentQuestion === 0
                  ? darkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600 shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-lg'
              }`}
            >
              ← Oldingi
            </button>

            <div className="flex gap-4">
              {currentQuestion < shuffledQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Keyingi →
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
                >
                  ✅ Testni Yakunlash
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsPage: React.FC<{
  test: Test;
  result: TestResult;
  user: User;
  onRestart: () => void;
  darkMode: boolean;
}> = ({ test, result, user, onRestart, darkMode }) => {
  const generateCertificate = () => {
    const certificateWindow = window.open('', '_blank');
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sertifikat - ${user.name} ${user.surname}</title>
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
          .certificate {
            background: white;
            max-width: 800px;
            margin: 0 auto;
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            border: 8px solid #f0f0f0;
          }
          .header { color: #333; font-size: 48px; font-weight: bold; margin-bottom: 10px; }
          .subtitle { color: #666; font-size: 20px; margin-bottom: 40px; }
          .content { font-size: 18px; line-height: 1.6; color: #555; }
          .name { font-size: 36px; font-weight: bold; color: #4a90e2; margin: 20px 0; }
          .score { font-size: 24px; font-weight: bold; color: #27ae60; margin: 20px 0; }
          .details { margin: 30px 0; }
          .footer { margin-top: 40px; font-size: 14px; color: #888; }
          .decoration { font-size: 40px; color: #f39c12; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="decoration">🏆</div>
          <div class="header">Muvaffaqiyat Sertifikati</div>
          <div class="subtitle">Test Platformasi Sertifikati</div>
          <div class="content">
            Ushbu sertifikat quyidagi shaxsga beriladi:
            <div class="name">${user.name} ${user.surname}</div>
            ${test.name} testini muvaffaqiyatli yakunlagani uchun
            <div class="score">${test.name} Testi</div>
            <div class="details">
              <strong>Ball:</strong> ${result.percentage}% (${result.correct}/${test.questions.length} to'g'ri)<br>
              <strong>Sarflangan vaqt:</strong> ${result.timeTaken} daqiqa<br>
              <strong>Sana:</strong> ${new Date().toLocaleDateString('uz-UZ')}
            </div>
          </div>
          <div class="footer">
            Test Platformasi tomonidan yaratilgan • ${new Date().toLocaleDateString('uz-UZ')}
          </div>
        </div>
      </body>
      </html>
    `;
    certificateWindow?.document.write(certificateHTML);
    certificateWindow?.document.close();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600'} py-8 relative overflow-hidden`}>
      {/* 3D Animatsiya fonlari */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-20 w-80 h-80 ${darkMode ? 'bg-green-500' : 'bg-yellow-300'} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce`}></div>
        <div className={`absolute top-40 right-20 w-80 h-80 ${darkMode ? 'bg-blue-500' : 'bg-pink-300'} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce animation-delay-2000`}></div>
        <div className={`absolute bottom-20 left-1/2 w-80 h-80 ${darkMode ? 'bg-purple-500' : 'bg-blue-300'} rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce animation-delay-4000`}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className={`${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} rounded-3xl shadow-2xl p-8 mb-8 backdrop-blur-lg border ${darkMode ? 'border-gray-700' : 'border-white/30'}`}>
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${result.percentage >= 70 ? 'bg-gradient-to-r from-green-400 to-green-600' : result.percentage >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-red-400 to-red-600'} mb-6 animate-bounce shadow-2xl`}>
              <Award className="w-12 h-12 text-white" />
            </div>
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 animate-fade-in`}>
              🎉 Test Natijalari
            </h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xl animate-fade-in-delay`}>
              {test.name} Testi • {user.name} {user.surname}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-50'} rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
              <div className="text-4xl font-bold text-green-600 mb-2">{result.correct}</div>
              <div className={`text-lg font-medium ${darkMode ? 'text-green-400' : 'text-green-700'}`}>To'g'ri Javoblar</div>
            </div>

            <div className={`${darkMode ? 'bg-red-900/30' : 'bg-red-50'} rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}>
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
              <div className="text-4xl font-bold text-red-600 mb-2">{result.incorrect}</div>
              <div className={`text-lg font-medium ${darkMode ? 'text-red-400' : 'text-red-700'}`}>Noto'g'ri Javoblar</div>
            </div>

            <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}>
              <div className="text-5xl font-bold text-blue-600 mb-2 animate-pulse">{result.percentage}%</div>
              <div className={`text-lg font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Yakuniy Ball</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                Vaqt: {result.timeTaken} daqiqa
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-2xl p-8 mb-8 backdrop-blur-sm`}>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-3`}>
              <FileText className="w-6 h-6" />
              Javoblarni Ko'rib Chiqish
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {test.questions.map((question, index) => {
                const userAnswer = result.answers.find(a => a.questionId === question.id);
                const isCorrect = userAnswer?.isCorrect ?? false;
                
                return (
                  <div key={question.id} className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isCorrect 
                      ? darkMode ? 'border-green-600 bg-green-900/20' : 'border-green-200 bg-green-50'
                      : darkMode ? 'border-red-600 bg-red-900/20' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-start gap-4">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                          {index + 1}. {question.question}
                        </p>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                          <span className="font-semibold">Sizning javobingiz:</span> {
                            userAnswer?.selectedAnswer !== undefined && userAnswer.selectedAnswer >= 0
                              ? question.options[userAnswer.selectedAnswer]
                              : 'Javob berilmagan'
                          }
                        </p>
                        {!isCorrect && (
                          <p className={`${darkMode ? 'text-green-400' : 'text-green-700'} font-semibold`}>
                            <span className="font-semibold">To'g'ri javob:</span> {question.options[question.correct]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={generateCertificate}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Download className="w-6 h-6" />
              📜 Sertifikatni Yuklab Olish
            </button>
            <button
              onClick={onRestart}
              className={`px-8 py-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-700'} rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}
            >
              🔄 Boshqa Test Topshirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DarkModeToggle: React.FC<{
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}> = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed top-6 right-6 z-50 p-4 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
    >
      {darkMode ? (
        <Sun className="w-7 h-7 text-yellow-500 animate-spin" />
      ) : (
        <Moon className="w-7 h-7 text-gray-600 animate-pulse" />
      )}
    </button>
  );
};

// Asosiy App Komponenti
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'testList' | 'test' | 'results'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleUserSubmit = (userData: User) => {
    setUser(userData);
    setCurrentScreen('testList');
  };

  const handleTestSelect = (test: Test) => {
    setSelectedTest(test);
    setCurrentScreen('test');
  };

  const handleTestFinish = (result: TestResult) => {
    setTestResult(result);
    setCurrentScreen('results');
  };

  const handleRestart = () => {
    setSelectedTest(null);
    setTestResult(null);
    setCurrentScreen('testList');
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {currentScreen === 'landing' && (
        <LandingPage onSubmit={handleUserSubmit} darkMode={darkMode} />
      )}
      
      {currentScreen === 'testList' && user && (
        <TestList onSelectTest={handleTestSelect} darkMode={darkMode} user={user} />
      )}
      
      {currentScreen === 'test' && selectedTest && (
        <TestInterface
          test={selectedTest}
          onFinish={handleTestFinish}
          darkMode={darkMode}
        />
      )}
      
      {currentScreen === 'results' && testResult && selectedTest && user && (
        <ResultsPage
          test={selectedTest}
          result={testResult}
          user={user}
          onRestart={handleRestart}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;