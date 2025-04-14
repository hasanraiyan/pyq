// data/beu-data.js
const beuData = {
    "branches": [
      {
        "id": "it",
        "name": "Information Technology",
        "semesters": [
          {
            "id": "it_sem3",
            "number": 3,
            "subjects": [
              {
                "id": "it301",
                "name": "Object-Oriented Programming Using C++",
                "code": "IT301",
                "questions": [
                  // --- START: Original 2019 IT301 Questions ---
                  {
                    "questionId": "it301_2019_1a", "year": 2019, "qNumber": "Q1a",
                    "chapter": "Module 3: Classes and Data Abstraction", // Changed from Module 2 based on content
                    "text": "Which feature allows open recursion among the following?\n\n*   (i) Use of `this` pointer\n*   (ii) Use of pointers\n*   (iii) Use of pass by value\n*   (iv) Use of parameterized constructor",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it301_2019_1b", "year": 2019, "qNumber": "Q1b",
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "If same message is passed to objects of several different classes and all of those can respond in a different way, what is this feature called?\n\n*   (i) Inheritance\n*   (ii) Overloading\n*   (iii) Polymorphism\n*   (iv) Overriding",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it301_2019_1c", "year": 2019, "qNumber": "Q1c",
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "Which among the following is wrong?\n\n*   (i) `class student{}; student s;`\n*   (ii) `abstract class student{}; student s;`\n*   (iii) `abstract class student{} s[50000000];`\n*   (iv) `abstract class student{}; class toppers: public student{ }; topper t;`",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it301_2019_1d", "year": 2019, "qNumber": "Q1d",
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "text": "If two classes combine some private data members and provides public member functions to access and manipulate those data members, where is abstraction used?\n\n*   (i) Using private access specifier for data members\n*   (ii) Using class concept with both data members and member functions\n*   (iii) Using public member functions to access and manipulate the data members\n*   (iv) Data is not sufficient to decide what is being used",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it301_2019_1e", "year": 2019, "qNumber": "Q1e",
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "Which class/set of classes can illustrate polymorphism in the following code?\n\n```cpp\nabstract class student\n{\n  public: int marks;\n  virtual void calc_grade() = 0; // Assuming virtual function\n}\nclass topper: public student\n{\n  public: void calc_grade() override \n  { /* return 10; */ }\n};\nclass average: public student\n{\n  public: void calc_grade() override \n  { /* return 20; */ }\n};\nclass failed{ int marks; };\n```\n\n*   (i) Only class `student` can show polymorphism\n*   (ii) Only class `student` and `topper` together can show polymorphism\n*   (iii) All class `student`, `topper` and `average` together can show polymorphism\n*   (iv) Class `failed` should also inherit class `student` for this code to work for polymorphism",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it301_2019_1f", "year": 2019, "qNumber": "Q1f",
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "text": "Consider the following code and select the correct option:\n\n```cpp\nclass student\n{\n  int marks;\n  public: int* fun()\n  { return &marks; }\n};\nint main()\n{\n  student s;\n  int *ptr = s.fun(); \n  // *ptr = 50; // Potential issue accessing private data indirectly\n  return 0;\n}\n```\n\n*   (i) This code is good to go\n*   (ii) This code may result in undesirable conditions\n*   (iii) This code will generate error\n*   (iv) This code violates encapsulation",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it301_2019_1g", "year": 2019, "qNumber": "Q1g",
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "text": "Which among the following is correct for the class defined below?\n\n```cpp\nclass student\n{\n  int marks;\n  public: student() {}\n  student(int x)\n  { marks = x; }\n};\nint main()\n{\n  student s1(100);\n  student s2(); // This declares a function s2 returning student\n  student s3 = 100; // Implicit conversion constructor call\n  return 0;\n}\n```\n\n*   (i) Object `s3`, syntax error\n*   (ii) Only object `s1` and `s2` will be created (Note: `s2()` is a function declaration)\n*   (iii) Program runs and `s1`, `s3` are created (assuming constructor isn't explicit)\n*   (iv) Program will give compile-time error (s2 is a function declaration)",
                    "type": "MCQ", "marks": 2
                  },
                   {
                    "questionId": "it301_2019_1h", "year": 2019, "qNumber": "Q1h",
                    "chapter": "Module 3: Classes and Data Abstraction", // Constructors
                    "text": "Does constructor overloading include different return types for constructors to be overloaded?\n\n*   (i) Yes, if return types are different, signature becomes different\n*   (ii) Yes, because return types can differentiate two functions\n*   (iii) No, return type can't differentiate two functions\n*   (iv) No, constructors doesn't have any return type",
                    "type": "MCQ", "marks": 2
                   },
                   {
                    "questionId": "it301_2019_1i", "year": 2019, "qNumber": "Q1i",
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "text": "Which constructor will be called from the object created in the code below?\n\n```cpp\n#include <iostream>\nusing namespace std;\nclass A\n{\n  int i;\npublic: \n  A()\n  {\n    i=0; cout<< \"Default\\n\";\n  }\n  // A(int x = 0) // This creates ambiguity with A()\n  // {\n  //   i = x; cout<< \"Param with default\\n\";\n  // }\n};\nint main() {\nA obj1;\nreturn 0;\n}\n```\n_(Assuming the parameterized constructor `A(int x=0)` is commented out or removed to avoid ambiguity)_ \n\n*   (i) Default constructor `A()`\n*   (ii) Parameterized constructor `A(int x=0)`\n*   (iii) Compile-time error (If both constructors are present due to ambiguity)\n*   (iv) Run-time error",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it301_2019_1j", "year": 2019, "qNumber": "Q1j",
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "text": "When an object is passed *by value* to a function, its copy is made in the function and then\n\n*   (i) the destructor of the copy is called when function is returned\n*   (ii) the destructor is never called in this case\n*   (iii) the destructor is called but it is always implicit\n*   (iv) the destructor must be user defined",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it301_2019_2a", "year": 2019, "qNumber": "Q2a",
                    "chapter": "Module 1: Introduction to C++ and OOP",
                    "text": "What is Object-oriented Programming (OOP)? Write the basic concepts of OOP (e.g., Encapsulation, Abstraction, Inheritance, Polymorphism).",
                    "type": "Explanation", "marks": 7
                  },
                  {
                    "questionId": "it301_2019_2b", "year": 2019, "qNumber": "Q2b",
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "text": "What do you mean by class and object? Give a simple example.",
                    "type": "Explanation with Example", "marks": 7
                  },
                   {
                    "questionId": "it301_2019_3a", "year": 2019, "qNumber": "Q3a",
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "text": "With an example, explain the terms 'constructor' and 'destructor'. Show how they are invoked.",
                    "type": "Explanation with Example", "marks": 7
                  },
                   {
                    "questionId": "it301_2019_3b", "year": 2019, "qNumber": "Q3b",
                    "chapter": "Module 4: Overloading, Templates and Inheritance", // Polymorphism aspect
                    "text": "With an example, explain what virtual function is and why it is used for runtime polymorphism.",
                    "type": "Explanation with Example", "marks": 7
                  },
                   {
                    "questionId": "it301_2019_4a", "year": 2019, "qNumber": "Q4a",
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "What do you mean by polymorphism? Explain its types.",
                    "type": "Explanation", "marks": 7
                  },
                   {
                    "questionId": "it301_2019_4b", "year": 2019, "qNumber": "Q4b",
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "With an example, differentiate between run-time (dynamic) and compile-time (static) polymorphism.",
                    "type": "Differentiate with Example", "marks": 7
                  },
                  {
                    "questionId": "it301_2019_5a", "year": 2019, "qNumber": "Q5a",
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "text": "What is friend function? Explain its purpose and provide syntax.",
                    "type": "Explanation", "marks": 7
                  },
                  {
                    "questionId": "it301_2019_5b", "year": 2019, "qNumber": "Q5b",
                     "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "What is pure virtual function? How does it relate to abstract classes?",
                    "type": "Explanation", "marks": 7
                  },
                   {
                    "questionId": "it301_2019_6a", "year": 2019, "qNumber": "Q6a",
                     "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "What is abstract class? Write a program to illustrate an abstract class with a pure virtual function. Also outline the advantages of abstract class.",
                    "type": "Explanation with Code", "marks": 7
                  },
                   {
                    "questionId": "it301_2019_6b", "year": 2019, "qNumber": "Q6b",
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "Differentiate between abstract class and interface (conceptual difference, as C++ uses abstract classes).",
                    "type": "Differentiate", "marks": 7
                  },
                   {
                    "questionId": "it301_2019_7", "year": 2019, "qNumber": "Q7",
                     "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "Identify and explain the various types of inheritance shown in the following conceptual figures:\n\n*   Figure (i): Single Inheritance (`A` -> `B`)\n*   Figure (ii): Multiple Inheritance (`A`, `B` -> `C`)\n*   Figure (iii): Hierarchical Inheritance (`A` -> `B`, `A` -> `C`)\n_(Assume figures were provided)_",
                    "type": "Explanation from Diagram", "marks": 14
                  },
                  {
                    "questionId": "it301_2019_8a", "year": 2019, "qNumber": "Q8a",
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "text": "What is an exception? What do you mean by exception handling? Why is it needed?",
                    "type": "Explanation", "marks": 7
                  },
                  {
                    "questionId": "it301_2019_8b", "year": 2019, "qNumber": "Q8b",
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "text": "Explain the keywords: `try`, `catch` and `throw` with a simple code example demonstrating their usage.",
                    "type": "Explanation with Example", "marks": 7
                  },
                  {
                    "questionId": "it301_2019_9a", "year": 2019, "qNumber": "Q9a",
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "With the help of an example program, differentiate between Function Overloading and Function Overriding.",
                    "type": "Differentiate with Example", "marks": 7
                  },
                  {
                    "questionId": "it301_2019_9b", "year": 2019, "qNumber": "Q9b",
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "Differentiate between the following: Early binding (static binding) vs. Late binding (dynamic binding).",
                    "type": "Differentiate", "marks": 7
                  },
                  // --- END: Original 2019 IT301 Questions ---
  
                  // --- START: Synthetic IT301 Questions ---
                  {
                    "questionId": "it301_2021_5a", "year": 2021, "qNumber": "Q5a",
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "text": "Differentiate between Data Encapsulation and Data Abstraction with suitable examples in C++.",
                    "type": "Differentiate with Example", "marks": 7
                  },
                   {
                    "questionId": "it301_2022_6b", "year": 2022, "qNumber": "Q6b",
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "text": "Explain the 'Diamond Problem' in multiple inheritance and how it can be resolved in C++ using virtual base classes. Provide a code snippet.",
                    "type": "Explanation with Code", "marks": 7
                  },
                  {
                     "questionId": "it301_2023_3a", "year": 2023, "qNumber": "Q3a",
                     "chapter": "Module 3: Classes and Data Abstraction",
                     "text": "What is a copy constructor? When is it necessary to explicitly define one? Give an example.",
                     "type": "Explanation with Example", "marks": 7
                  }
                  // --- END: Synthetic IT301 Questions ---
                ]
              },
              {
                "id": "it302",
                "name": "Data Structures & Algorithms",
                "code": "IT302",
                "questions": [
                   // --- START: Synthetic IT302 Questions ---
                   {
                    "questionId": "it302_2021_1a", "year": 2021, "qNumber": "Q1a",
                    "chapter": "Module 1: Analysis of Algorithms",
                    "text": "What is the time complexity (Big-O notation) of Linear Search in the worst case?\n\n* (i) O(1)\n* (ii) O(log n)\n* (iii) O(n)\n* (iv) O(n^2)",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it302_2021_3b", "year": 2021, "qNumber": "Q3b",
                    "chapter": "Module 3: Stacks and Queues",
                    "text": "Explain the basic operations of a Stack (Push, Pop, Peek) using an array implementation.",
                    "type": "Explanation", "marks": 7
                  },
                   {
                    "questionId": "it302_2022_4a", "year": 2022, "qNumber": "Q4a",
                    "chapter": "Module 2: Searching and Sorting",
                    "text": "Differentiate between Bubble Sort and Selection Sort based on their working principle and number of swaps.",
                    "type": "Differentiate", "marks": 7
                  },
                   {
                    "questionId": "it302_2022_6a", "year": 2022, "qNumber": "Q6a",
                    "chapter": "Module 4: Trees",
                    "text": "Define a Binary Search Tree (BST). Construct a BST for the following sequence of numbers: `50, 30, 70, 20, 40, 60, 80`.",
                    "type": "Definition & Problem", "marks": 7
                  },
                   {
                     "questionId": "it302_2023_2b", "year": 2023, "qNumber": "Q2b",
                     "chapter": "Module 5: Graphs",
                     "text": "What is Breadth-First Search (BFS) in graphs? Briefly explain the algorithm using an example graph.",
                     "type": "Explanation with Example", "marks": 7
                   }
                  // --- END: Synthetic IT302 Questions ---
                ]
              }
              // ... other subjects for IT Sem 3 can be added here
            ]
          },
          {
            "id": "it_sem4",
            "number": 4,
            "subjects": [
               {
                "id": "it401",
                "name": "Web Technologies",
                "code": "IT401",
                "questions": [
                   // --- START: Synthetic IT401 Questions ---
                  {
                    "questionId": "it401_2022_1a", "year": 2022, "qNumber": "Q1a",
                    "chapter": "HTML Basics",
                    "text": "Which HTML tag is used to define an unordered list?\n\n* (i) `<ol>`\n* (ii) `<ul>`\n* (iii) `<li>`\n* (iv) `<dl>`",
                    "type": "MCQ", "marks": 2
                  },
                  {
                    "questionId": "it401_2022_2b", "year": 2022, "qNumber": "Q2b",
                    "chapter": "CSS Fundamentals",
                    "text": "Explain the difference between CSS ID selectors (`#id`) and Class selectors (`.class`).",
                    "type": "Explanation", "marks": 5
                  },
                  {
                    "questionId": "it401_2023_3a", "year": 2023, "qNumber": "Q3a",
                    "chapter": "JavaScript Basics",
                    "text": "Write JavaScript code to declare a variable named `userName` and assign it the value \"Alice\".",
                    "type": "Code Snippet", "marks": 5
                  },
                  {
                    "questionId": "it401_2023_4b", "year": 2023, "qNumber": "Q4b",
                    "chapter": "HTML Forms",
                    "text": "List and briefly describe 3 different input types used in HTML forms (e.g., text, password, checkbox).",
                    "type": "List & Describe", "marks": 7
                  },
                   {
                    "questionId": "it401_2023_5a", "year": 2023, "qNumber": "Q5a",
                    "chapter": "CSS Box Model",
                    "text": "Briefly explain the components of the CSS Box Model (Content, Padding, Border, Margin).",
                    "type": "Explanation", "marks": 7
                   }
                   // --- END: Synthetic IT401 Questions ---
                ]
              }
               // ... other subjects for IT Sem 4
            ]
          }
          // ... other semesters for IT
        ]
      },
      {
        "id": "cse",
        "name": "Computer Science & Engineering",
        "semesters": [
           {
            "id": "cse_sem3",
            "number": 3,
            "subjects": [
               {
                "id": "cs302", // Changed ID for uniqueness
                "name": "Discrete Mathematics",
                "code": "CS302",
                "questions": [
                  // --- START: Synthetic CS302 Questions ---
                  {
                    "questionId": "cs302_2021_1b", "year": 2021, "qNumber": "Q1b",
                    "chapter": "Set Theory",
                    "text": "If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∪ B (Union)?\n\n* (i) {3}\n* (ii) {1, 2, 3, 4, 5}\n* (iii) {1, 2, 4, 5}\n* (iv) {}",
                    "type": "MCQ", "marks": 2
                  },
                  {
                     "questionId": "cs302_2021_2a", "year": 2021, "qNumber": "Q2a",
                     "chapter": "Relations",
                     "text": "Define a Relation. What does it mean for a relation R on a set A to be reflexive?",
                     "type": "Definition", "marks": 5
                  },
                  {
                     "questionId": "cs302_2022_3b", "year": 2022, "qNumber": "Q3b",
                     "chapter": "Graph Theory",
                     "text": "Define the degree of a vertex in an undirected graph. What is the sum of degrees of all vertices in a graph with 'e' edges?",
                     "type": "Definition & Theorem", "marks": 7
                  },
                  {
                     "questionId": "cs302_2023_4a", "year": 2023, "qNumber": "Q4a",
                     "chapter": "Logic",
                     "text": "Construct the truth table for the logical expression P ∧ (P → Q).",
                     "type": "Problem", "marks": 7
                  },
                   {
                     "questionId": "cs302_2023_5b", "year": 2023, "qNumber": "Q5b",
                     "chapter": "Functions",
                     "text": "Explain the difference between an injective (one-to-one) function and a surjective (onto) function.",
                     "type": "Explanation", "marks": 7
                   }
                  // --- END: Synthetic CS302 Questions ---
                ]
              }
              // ... other subjects for CSE Sem 3
            ]
          }
          // ... other semesters for CSE
        ]
      },
      {
         "id": "ece",
         "name": "Electronics & Comm. Engg.",
         "semesters": [
           {
              "id": "ece_sem3",
              "number": 3,
              "subjects": [
                  {
                    "id": "ec301",
                    "name": "Basic Electronics",
                    "code": "EC301",
                    "questions": [
                       // --- START: Synthetic EC301 Questions ---
                       {
                         "questionId": "ec301_2022_1a", "year": 2022, "qNumber": "Q1a",
                         "chapter": "Semiconductor Physics",
                         "text": "What is the typical forward voltage drop across a silicon diode?\n\n* (i) 0.3V\n* (ii) 0.7V\n* (iii) 1.1V\n* (iv) 5.0V",
                         "type": "MCQ", "marks": 2
                       },
                       {
                         "questionId": "ec301_2022_2b", "year": 2022, "qNumber": "Q2b",
                         "chapter": "Diodes and Applications",
                         "text": "Explain the working principle of a P-N junction diode under forward bias condition.",
                         "type": "Explanation", "marks": 7
                       },
                       {
                         "questionId": "ec301_2023_3a", "year": 2023, "qNumber": "Q3a",
                         "chapter": "Transistors",
                         "text": "Briefly differentiate between Bipolar Junction Transistors (BJT) and Field-Effect Transistors (FET).",
                         "type": "Differentiate", "marks": 7
                       },
                       {
                         "questionId": "ec301_2023_4b", "year": 2023, "qNumber": "Q4b",
                         "chapter": "Basic Circuits",
                         "text": "State Ohm's Law. If a resistor of 100 Ohms is connected across a 12V battery, calculate the current flowing through it.",
                         "type": "Statement & Problem", "marks": 5
                       },
                       {
                         "questionId": "ec301_2023_5a", "year": 2023, "qNumber": "Q5a",
                         "chapter": "Diodes and Applications",
                         "text": "Draw the circuit diagram of a half-wave rectifier and explain its operation.",
                         "type": "Diagram & Explanation", "marks": 7
                       }
                      // --- END: Synthetic EC301 Questions ---
                    ]
                  }
                  // ... other ECE Sem 3 subjects
              ]
           }
           // ... other ECE Semesters
         ]
      },
      {
         "id": "ee",
         "name": "Electrical Engineering",
         "semesters": [ /* Add EE Semesters/Subjects/Questions later */]
      },
       {
         "id": "me",
         "name": "Mechanical Engineering",
         "semesters": [ /* Add ME Semesters/Subjects/Questions later */]
      },
       {
         "id": "ce",
         "name": "Civil Engineering",
         "semesters": [ /* Add CE Semesters/Subjects/Questions later */]
      }
      // ... Add ALL other branches supported by BEU
    ]
  }; // Close the beuData object