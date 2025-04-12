// js/script.js V5.1.1 (Includes Chapter in Ask AI)

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    // (Keep all elements from V5.1)
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const sidebarToggleButton = document.getElementById('sidebar-toggle-button');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const yearFiltersContainer = document.getElementById('year-filters');
    const topicFiltersContainer = document.getElementById('topic-filters');
    const questionsList = document.getElementById('questions-list');
    const resultsTitle = document.getElementById('results-title');
    const resultsDescription = document.getElementById('results-description');
    const verificationFooter = document.getElementById('verification');
    const initialPlaceholder = document.getElementById('initial-placeholder');
    const loadingIndicator = document.getElementById('loading-indicator');
    const paginationControlsContainer = document.getElementById('pagination-controls');
    const searchInput = document.getElementById('search-input');
    const resetFiltersButton = document.getElementById('reset-filters');


    // --- State Variables ---
    // (Keep all state variables from V5.1)
    let allQuestionsFlat = [];
    let filteredQuestions = [];
    let totalQuestionsCount = 0;
    let uniqueYears = new Set();
    let uniqueTopics = new Set();
    let currentPage = 1;
    let itemsPerPage = 15;
    let currentSearchTerm = '';


    const yearlyData = [
        {
            "year": 2019,
            "questions": [
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1a: Which feature allows open recursion among the following?\n(i) Use of this pointer\n(ii) Use of pointers\n(iii) Use of pass by value\n(iv) Use of parameterized constructor"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1b: If same message is passed to objects of several different classes and all of those can respond in a different way, what is this feature called?\n(i) Inheritance (ii) Overloading\n(iii) Polymorphism (iv) Overriding"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1c: Which among the following is wrong?\n(i) class student{}; student s;\n(ii) abstract class student{}; student s;\n(iii) abstract class student{} s[50000000];\n(iv) abstract class student{}; class toppers: public student{ }; topper t;"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1d: If two classes combine some private data members and provides public member functions to access and manipulate those data members, where is abstraction used?\n(i) Using private access specifier for data members\n(ii) Using class concept with both data members and member functions\n(iii) Using public member functions to access and manipulate the data members\n(iv) Data is not sufficient to decide what is being used"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1e: Which class/set of classes can illustrate polymorphism in the following code\n```cpp\nabstract class student\n{\n  public: int marks;\n  virtual calc_grade() = 0; \n}\nclass topper: public student\n{\n  public: calc_grade() \n  { return 10; }\n};\nclass average: public student\n{\n  public: calc_grade() \n  { return 20; }\n};\nclass failed{int marks;};\n```\n(i) Only class student can show polymorphism\n(ii) Only class student and topper together can show polymorphism\n(iii) All class students, topper and average together can show polymorphism\n(iv) Class failed should also inherit class student for this code to work for polymorphism"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1f: Consider the following code and select the correct option:\n```cpp\nclass student\n{\n  int marks;\n  public: int* fun() \n  {\n    return & marks;\n  }\n};\nmain()\n{\n  student s;\n  int *ptr = s.fun(); \n  return 0;\n}\n```\n(i) This code is good to go\n(ii) This code may result in undesirable conditions\n(iii) This code will generate error\n(iv) This code violates encapsulation"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1g: Which among the following is correct for the class defined below?\n```cpp\nclass student\n{\n  int marks;\n  public: student() {}\n  student(int x)\n  {\n    marks = x;\n  }\n};\nmain()\n{\n  student s1(100);\n  student s2(); \n  student s3 = 100; \n  return 0;\n}\n```\n(i) Object s3, syntax error\n(ii) Only object sl and s2 will be created\n(iii) Program runs and all objects are created \n(iv) Program will give compile-time error "
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1h: Does constructor overloading include different return types for constructors to be overloaded?\n(i) Yes, if return types are different, signature becomes different\n(ii) Yes, because return types can differentiate two functions\n(iii) No, return type can't differentiate two functions\n(iv) No, constructors doesn't have any return type"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1i: Which constructor will be called from the object created in the code below?\n```cpp\n#include <iostream>\nusing namespace std;\nclass A\n{\n  int i;\npublic: \n  A()\n  {\n    i=0; cout<< i;\n  }\n  A(int x = 0)\n  {\n    i = x; cout<< i;\n  }\n};\nA obj1;\n```\n(i) Default constructor\n(ii) Parameterized constructor\n(iii) Compile-time error \n(iv) Run-time error"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1j: When an object is passed to a function, its copy is made in the function and then\n(i) the destructor of the copy is called when function is returned\n(ii) the destructor is never called in this case\n(iii) the destructor is called but it is always implicit\n(iv) the destructor must be user defined"
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q2a: What is Object-oriented Programming (OOP)? Write the basic concepts of OOP."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q2b: What do you mean by class and object?"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q3a: With an example, explain the terms 'constructor' and 'destructor'."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q3b: With an example, explain what virtual function is."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q4a: What do you mean by polymorphism?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q4b: With an example, differentiate between run-time and compile-time polymorphism."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q5a: What is friend function?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q5b: What is pure virtual function?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q6a: What is abstract class? Write a program to illustrate. Also outline the advantages of abstract class."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q6b: Differentiate between abstract class and interface."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q7: What are various types of inheritance, shown in the following figure? [Figures showing Single (i), Multiple (ii), Hierarchical (iii) inheritance]"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q8a: What is an exception? What do you mean by exception handling?"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q8b: Explain the keywords: try, catch and throw."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q9a: With the help of an example program, differentiate between the following: Overloading vs. Overriding"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q9b: With the help of an example program, differentiate between the following: Early binding vs. Late binding"
                }
            ]
        },
        {
            "year": 2020,
            "questions": [
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1a: How void pointers differ from general pointers?"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1b: Is it possible to access data without any member function in the class? Justify your reason."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q1c: How precedence of operators effects evaluation of an expression?"
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q1d: Write the advantage of object-oriented programming over procedural programming."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q1e: Why we generally avoid goto in the programming?"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1f: What is the role of try block in the exception handling?"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1g: Write the difference between class and structure."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1h: What is the use of scope resolution operator?"
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q1i: Why we require derive data types in the programming when we already have different data types?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1j: Write a small code which illustrates the concept of multilevel inheritance."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q2a: On a certain day the British pound was equivalent to $1-487 US, the French franc was $0-172, the German deutschemark was $0-584, and the Japanese yen was $0-00955. Write a program in C++ that allows the user to enter an amount in dollars, and then displays this value converted to these four other monetary units."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q2b: What are command line arguments? Write a program in C++ to finding factorial for a given number using command line argument."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q3a: What is a principal reason for passing arguments by reference? Write a function called zeroSmaller() that is passed two int arguments by reference and then sets the smaller of the two numbers to 0. Write a main() program to exercise this function."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q3b: Write a C++ program to which replace all the words \"dog\" with \"cat\"."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q4a: Compare and contrast dynamic memory allocation using the C++ operators new and delete, with dynamic memory allocation using the C standard library functions malloc and free."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q4b: Write programs to evaluate the following function to 0.0001% accuracy:\nSUM = 1 + (1/2)^2 + (1/3)^3 + (1/4)^4 + ..."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q5a: Create a classRectangle. The class has attributes length and width, each of which defaults to 1. It has member functions that calculate the perimeter and the area of the rectangle. It has set and get functions for both length and width. The set functions should verify that length and width are each floating-point numbers larger than 0-0 and less than 20-0."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q5b: Assume that there is a class Derv that is derived from a base class Base. Write the decelerator [likely meant initializer list] for a derived-class constructor that takes one argument and passes this argument along to the constructor in the base class."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q6a: What is operator overloading? Write a program in C++ to overload unary minus operator."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q6b: A friend function cannot be used to overload the assignment operator =. Explain why."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q7a: Discuss why converting a base-class pointer to a derived-class pointer is considered dangerous by the compiler."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q7b: What is a virtual function? Why we need virtual functions?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q8a: What are the different forms of inheritance? Give an example for each."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q8b: Write a program that uses a function template called min to determine the smaller of two arguments. Test the program using integer, character and floating-point number pairs."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q9a: What is the relationship between function templates and overloading? Explain with the help of an example."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q9b: What are the advantages of using exception handling mechanism in a program? Explain with an example."
                }
            ]
        },
        {
            "year": "2020-s",
            "numericYear": 2020,
            "questions": [
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1a: How void pointers differ from general pointers?"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1b: Is it possible to access data without any member function in the class? Justify your reason."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q1c: How precedence of operators effects evaluation of an expression?"
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q1d: Write the advantage of object-oriented programming over procedural programming."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q1e: Why we generally avoid goto in the programming?"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1f: What is the role of try block in the exception handling?"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1g: Write the difference between class and structure."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1h: What is the use of scope resolution operator?"
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q1i: Why we require derive data types in the programming when we already have different data types?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1j: Write a small code which illustrates the concept of multilevel inheritance."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q2a: On a certain day the British pound was equivalent to $1-487 US, the French franc was $0-172, the German deutschemark was $0-584, and the Japanese yen was $0-00955. Write a program in C++ that allows the user to enter an amount in dollars, and then displays this value converted to these four other monetary units."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q2b: What are command line arguments? Write a program in C++ to finding factorial for a given number using command line argument."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q3a: What is a principal reason for passing arguments by reference? Write a function called zeroSmaller() that is passed two int arguments by reference and then sets the smaller of the two numbers to 0. Write a main() program to exercise this function."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q3b: Write a C++ program to which replace all the words \"dog\" with \"cat\"."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q4a: Compare and contrast dynamic memory allocation using the C++ operators new and delete, with dynamic memory allocation using the C standard library functions malloc and free."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q4b: Write programs to evaluate the following function to 0.0001% accuracy:\n```\nSUM = 1 + (1/2)^2 + (1/3)^3 + (1/4)^4 + ...\n```"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q5a: Create a classRectangle. The class has attributes length and width, each of which defaults to 1. It has member functions that calculate the perimeter and the area of the rectangle. It has set and get functions for both length and width. The set functions should verify that length and width are each floating-point numbers larger than 0-0 and less than 20-0."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q5b: Assume that there is a class Derv that is derived from a base class Base. Write the decelerator [initializer list] for a derived-class constructor that takes one argument and passes this argument along to the constructor in the base class."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q6a: What is operator overloading? Write a program in C++ to overload unary minus operator."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q6b: A friend function cannot be used to overload the assignment operator =. Explain why."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q7a: Discuss why converting a base-class pointer to a derived-class pointer is considered dangerous by the compiler."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q7b: What is a virtual function? Why we need virtual functions?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q8a: What are the different forms of inheritance? Give an example for each."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q8b: Write a program that uses a function template called min to determine the smaller of two arguments. Test the program using integer, character and floating-point number pairs."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q9a: What is the relationship between function templates and overloading? Explain with the help of an example."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q9b: What are the advantages of using exception handling mechanism in a program? Explain with an example."
                }
            ]
        }
        ,
        {
            "year": 2021,
            "questions": [
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q1a: How will you take input in C++?"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1b: How will you define a constructor in a C++ class?"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1c: What are accessor and mutator functions?"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1d: What is void pointer in C++? Elaborate with an example."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q1e: What is derived data type in C++?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1f: How will you implement runtime polymorphism in C++?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1g: When are virtual base classes necessary in C++?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1h: What are the differences between function overloading and function overriding?"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1i: How will you throw an exception in C++? Elaborate with an example."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1j: Name two standard exceptions built in C++. When are they thrown?"
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q2a: What are the advantages of object-oriented programming paradigm over procedural programming? Demonstrate the features of an object-oriented programming paradigm with their suitable implementations in C++."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q2b: How will you define constants in C++? How will you access them? Elaborate with suitable examples."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q2c: What is type modifier? Elaborate different types of modifiers in C++ with proper examples."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q2d: Is it possible to have virtual constructor in C++? If yes, how will you implement it, and if no, why?"
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q3a: What do you mean by call by reference? What are the differences between call by value and call by reference? Show call by reference by implementing a function to swap the values of two numbers."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q3b: What do you mean by default arguments? Can you use functions with default arguments as an alternative to function overloading? Elaborate with suitable examples,"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q3c: What is a copy constructor? When will you need a copy constructor? How will you implement a copy constructor? Elaborate with suitable examples."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q4a: What is 'this' pointer? How will you use 'this' pointer in C++? Elaborate with example."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q4b: What are various access specifiers used in C++? Demonstrate each of them with suitable examples."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q4c: How will you allocate dynamic memory in C++ other than malloc or calloc? How will you free the memory created using the method demonstrated? Demonstrate with suitable examples. What are the differences between malloc and the method you demonstrated?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q5a: How do you overload operators in C++? Demonstrate with a suitable example, in which one unary operator and one binary operator will be overloaded."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q5b: How will you overload the input operator >> and the output operator <<? Demonstrate with suitable examples."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q5c: Demonstrate friend function and friend class with suitable examples."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q5d: What is namespace? How will you define a namespace in C++?"
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q6a: What is virtual function? Why are they necessary? Demonstrate compile-time binding and late-time binding using suitable examples."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q6b: What is inline function? How do you declare and invoke an inline function in C++?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q6c: What is pure virtual function? Elaborate pure virtual function and abstract class with suitable examples."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q6d: What is diamond problem faced in multiple inheritance? How to deal with this problem in C++? Demonstrate with an example."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q7a: How will you declare a dynamic array in C++? Demonstrate. What is 'nothrow' keyword used for?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q7b: Can you overload new and delete operators? If yes, demonstrate with a suitable example. If not, why?"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q7c: What is a reference? What are the differences between a pointer and a reference? Demonstrate with a suitable example of object pointer and object reference."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q8a: What is template? In which scenario, using templates are advantageous? Demonstrate with suitable examples."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q8b: How will you declare a function template? Demonstrate with suitable examples."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q8c: How will you declare a class template? Demonstrate with suitable examples."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q8d: How can you handle any type of exception in catch block in C++? Demonstrate with an example."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q9a: How will you create your own exception class in C++? Demonstrate. What is the functionality of what() function in creating own exception class?"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q9b: How does stack unwinding work in C++? Demonstrate with a suitable example."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q9c: Demonstrate nested try blocks in C++ with suitable example. Can an exception thrown by internal try block be caught by external catch clause? Can an exception thrown by external try block be caught by internal catch clause? In both cases, demonstrate with suitable examples."
                }
            ]
        }
        ,
        {
            "year": 2022,
            "questions": [
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1a: Which among the following best describes the inheritance?\n(i) copying the code already written\n(ii) using the code already written once.\n(iii) using already defined functions in programming language\n(iv) using the data and functions into derived segment."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1b: Which of the following is not a type of class?\n(i) Abstract class\n(ii) Final class\n(iii) Start class\n(iv) String class"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1c: What is the default access specifier for data members or member functions declared within a class without any specifier in C++?\n(i) Private\n(ii) Protected\n(iii) Public\n(iv) Depends on compiler"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1d: Which of the following is not the member of class ?\n(i) Static function\n(ii) Friend function\n(iii) Constant function\n(iv) Virtual function"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1e: Which constructor will be called from the object created in the code below?\n```cpp\nClass A\n{\n  int i;\n  A()\n  {\n    i= 0;\n  }\n  A (int x = 0)\n  {\n    i=x;\n  }\n};\nA obj1;\n```\n(i) Default constructor\n(ii) Parameterized constructor\n(iii) Compile time error\n(iv) Run-time error"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1f: To prevent any method from overriding, we declare the method as\n(i) Static\n(ii) const\n(iii) final\n(iv) None of the above"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1g: In C++ dynamic memory allocation is accomplished with the operator:\n(i) new\n(ii) this\n(iii) malloc\n(iv) delete"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1h: When a class serves as base class for many derived classes, the situation is called\n(i) polymorphism\n(ii) hierarchical inheritance\n(iii) hybrid inheritance\n(iv) multipath inheritance"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1i: For a method to be an interface between the outside world and a class, it must be declared\n(i) private\n(ii) protected\n(iii) public\n(iv) external"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1j: Which of the following statement is correct?\n(i) Base class pointer cannot point to derived class\n(ii) Derived class pointer cannot point to base class.\n(iii) Pointer to derived class cannot be created\n(iv) Pointer to base class cannot be created."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q2a: What are the advantages of using exception handling mechanism in a program? Explain the uses of try, throw and catch keywords using example."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q2b: Write a C++ program to find the sum of the series 1+3+5+...+n."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q3a: What is inheritance? Discuss different types of inheritance with examples."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q3b: What is operator overloading? Write a program in C++ to overload unary minus operator."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q4a: What is pure virtual function? Write a C++ program that prints 'BEU Patna' from inside a member function of a subclass overriding a pure virtual function."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q4b: Discuss why converting a base-class pointer to a derived-class pointer is considered dangerous by compiler."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q5a: Differentiate between abstract class and interface with suitable examples."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q5b: What is access modifier in C++? Differentiate between each type."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q6a: Differentiate between a class and an object. Write an example (syntax) to define a class in C++."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q6b: With an example, explain the terms constructor and destructor."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q7a: What is a friend function and what are its advantages? What are the guidelines that should be followed while using friend function?"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q7b: Explain dangling pointer with the help of an example."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q8a: Explain how base class member functions can be involved in a derived class if the derived class also has a member function with the same name."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q8b: Crate a class complex and implement the following:\n(i) Define suitable constructors and destructors\n(ii) Overload the operators + and -\n(iii) Write a friend function sum which adds the real and imaginary parts of a complex object."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q9a: Write short notes on any two of the following:\nPolymorphism"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q9b: Write short notes on any two of the following:\nFunction Templates"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q9c: Write short notes on any two of the following:\nContainer class"
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q9d: Write short notes on any two of the following:\nInline function"
                }
            ]
        }
        , {
            "year": 2023,
            "questions": [
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1a: To prevent any method from overriding we declare the method as\n(i) static\n(ii) final\n(iii) const\n(iv) None of the above"
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1b: Does constructor overloading include different return types for constructors to be overloaded?\n(i) yes, if return types are different, signature becomes different.\n(ii) yes, because return types can differentiate two functions.\n(iii) no, because return types cannot differentiate two functions\n(iv) no, constructors don't have any return type."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1c: Which of the following type of class allows only one object of it to be created\n(i) Virtual Class\n(ii) Abstract class\n(iii) Singleton class\n(iv) Friend class"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1d: What will happen if the exception is not caught in the program?\n(i) Error\n(ii) Program will execute\n(iii) Block of the code will not execute\n(iv) None of the above"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1e: In C++ dynamic memory allocation is accomplished with the operator\n(i) new\n(ii) melloc\n(iii) this\n(iv) allocate"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q1f: Which of the following statement is correct?\n(i) base class pointer cannot point to derived class.\n(ii) derived class pointer cannot point to base class.\n(iii) pointer to derived class cannot be created.\n(iv) pointer to base class cannot be created."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q1g: You should make a function virtual if\n(i) every class that is derived from this class uses all the member functions from this class.\n(ii) every class that is derived from this class needs to redefine this function.\n(iii) that function is an operator.\n(iv) defined only in the derived classes."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q1h: The fields in a structure in C and a class in C++ are by default\n(i) public, protected\n(ii) protected, public\n(iii) private, private\n(iv) public, private"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1i: Class Dog: public X, public Y is an example of\n(i) multiple inheritance\n(ii) multilevel inheritance\n(iii) linear inheritance\n(iv) none of the above"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q1j: The compiler identifies a virtual function to be pure\n(i) by the presence of the keyword pure.\n(ii) by its location in the program.\n(iii) if it is equated to 0.\n(iv) none of the above"
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q2a: Explain in brief the benefits of object-oriented programming over procedure oriented programming."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q2b: With an example explain the terms constructor and destructor."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q3a: Explain different access specifiers and their scope used in C++."
                },
                {
                    "chapter": "Module 2: Control Structures and Functions",
                    "q": "Q3b: What are the advantages of passing arguments by reference? Write a function called zeroSmaller() function that receives two integer arguments by reference and then sets smaller of the two numbers to zero. Add the code for main() function also from where zeroSmaller() is called."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q4a: Discuss why converting a base class pointer to a derived class pointer is considered dangerous by the compiler."
                },
                {
                    "chapter": "Module 1: Introduction to C++",
                    "q": "Q4b: Write a C++ program to find a substring inside a string."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q5a: Differentiate between abstract class and interface."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q5b: What is function template? Differentiate between template class and class template."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q6a: What are the different forms of inheritance? Give an example for each."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q6b: What is a friend function? A friend function cannot be used to overload the assignment operator (=). Explain why?"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q7a: With the help of example programs, differentiate between Overloading and Overriding."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q7b: Write an object oriented program in C++ to show the overloading of template function."
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q8a: Write an object oriented program in C++ using function overloading to check whether the input data (either strings or integers) are palindrome or not, and display the results accordingly."
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q8b: What is the difference between error and exception? When do we use multiple catch handlers? Explain with suitable example."
                },
                {
                    "chapter": "Module 3: Classes and Data Abstraction",
                    "q": "Q9a: Write short notes on any two of the following:\nCopy constructor"
                },
                {
                    "chapter": "Module 4: Overloading, Templates and Inheritance",
                    "q": "Q9b: Write short notes on any two of the following:\nPure virtual function"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q9c: Write short notes on any two of the following:\nObject pointer"
                },
                {
                    "chapter": "Module 5: Pointers, Arrays and Exception Handling",
                    "q": "Q9d: Write short notes on any two of the following:\nStack unwinding"
                }
            ]
        }
    ];


    // --- 1. Data Processing ---
    // (Keep processData function from V5.1)
    function processData(data) {
        allQuestionsFlat = [];
        uniqueYears = new Set();
        uniqueTopics = new Set();
        totalQuestionsCount = 0;

        data.forEach(yearData => {
            const currentYear = yearData.year;
            const numericYear = yearData.numericYear || parseInt(String(currentYear).match(/\d{4}/)?.[0]) || String(currentYear);
            uniqueYears.add(currentYear);

            yearData.questions.forEach(q => {
                const chapterClean = q.chapter?.trim() || 'Uncategorized';
                if (q.q?.trim()) {
                    uniqueTopics.add(chapterClean);
                    allQuestionsFlat.push({
                        year: currentYear,
                        numericYear: numericYear,
                        chapter: chapterClean, // Keep chapter associated
                        q: q.q.trim()
                    });
                    totalQuestionsCount++;
                }
            });
        });

        // Sort Topics
        const sortedTopics = Array.from(uniqueTopics).sort((a, b) => {
            const matchA = a.match(/^Module\s*(\d+)/i);
            const matchB = b.match(/^Module\s*(\d+)/i);
            const numA = matchA ? parseInt(matchA[1], 10) : Infinity;
            const numB = matchB ? parseInt(matchB[1], 10) : Infinity;
            if (numA !== numB) return numA - numB;
            return a.localeCompare(b);
        });
        uniqueTopics = new Set(sortedTopics);

        // Sort Years
        const sortedYears = Array.from(uniqueYears).sort((a, b) => {
            const numA = parseInt(String(a).match(/\d{4}/)?.[0]) || (typeof a === 'number' ? a : -Infinity);
            const numB = parseInt(String(b).match(/\d{4}/)?.[0]) || (typeof b === 'number' ? b : -Infinity);
            if (numB !== numA) return numB - numA;
            return String(b).localeCompare(String(a));
        });
        uniqueYears = new Set(sortedYears);
    }


    // --- 2. Populate Filter Controls ---
    // (Keep populateFilters function from V5.1)
    function populateFilters() {
        yearFiltersContainer.querySelectorAll('label:not(:first-child)').forEach(el => el.remove());
        topicFiltersContainer.querySelectorAll('label:not(:first-child)').forEach(el => el.remove());

        uniqueYears.forEach(year => {
            const label = document.createElement('label');
            label.className = 'filter-label';
            label.innerHTML = `<input type="checkbox" class="filter-checkbox year-filter" value="${year}"><span>${year}</span>`;
            yearFiltersContainer.appendChild(label);
        });

        uniqueTopics.forEach(topic => {
            const displayTopicName = topic.replace(/^Module\s*\d+:\s*/i, '');
            const label = document.createElement('label');
            label.className = 'filter-label';
            label.innerHTML = `<input type="checkbox" class="filter-checkbox topic-filter" value="${topic}"><span title="${topic}">${displayTopicName}</span>`;
            topicFiltersContainer.appendChild(label);
        });

        addFilterListeners();
    }


    // --- 3. Filter & Search Logic ---
    // (Keep applyFiltersAndSearch and getSelectedFilters from V5.1)
    function applyFiltersAndSearch() {
        const selectedYears = getSelectedFilters('year-filter', 'all-years');
        const selectedTopics = getSelectedFilters('topic-filter', 'all-topics');
        currentSearchTerm = searchInput.value.trim().toLowerCase();

        filteredQuestions = allQuestionsFlat.filter(q => {
            const yearMatch = selectedYears.includes('all') || selectedYears.includes(String(q.year));
            const topicMatch = selectedTopics.includes('all') || selectedTopics.includes(q.chapter);
            const searchMatch = currentSearchTerm === '' ||
                q.q.toLowerCase().includes(currentSearchTerm) ||
                q.chapter.toLowerCase().includes(currentSearchTerm);

            return yearMatch && topicMatch && searchMatch;
        });

        filteredQuestions.sort((a, b) => {
            const numB = typeof b.numericYear === 'number' ? b.numericYear : (parseInt(String(b.year).match(/\d{4}/)?.[0]) || -Infinity);
            const numA = typeof a.numericYear === 'number' ? a.numericYear : (parseInt(String(a.year).match(/\d{4}/)?.[0]) || -Infinity);
            if (numB !== numA) return numB - numA;
            return a.q.localeCompare(b.q);
        });

        currentPage = 1;
        displayFilteredQuestions();
        mainContent.scrollTop = 0;
    }

    function getSelectedFilters(checkboxClass, allCheckboxId) {
        const allCheckbox = document.getElementById(allCheckboxId);
        if (allCheckbox.checked) {
            return ['all'];
        }
        const selected = [];
        document.querySelectorAll(`.${checkboxClass}:checked`).forEach(cb => {
            selected.push(cb.value);
        });
        return selected.length > 0 ? selected : ['all'];
    }


    // --- 4. Display Logic ---

    // In js/script.js

    // --- 4. Display Logic ---

    // V5.2: Modified displayFilteredQuestions for improved card styling
    function displayFilteredQuestions() {
        questionsList.innerHTML = '';
        initialPlaceholder.innerHTML = '';
        loadingIndicator.classList.add('hidden');

        const totalItems = filteredQuestions.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (totalPages > 0 && currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const questionsToDisplay = filteredQuestions.slice(startIndex, endIndex);

        updateResultsHeader(totalItems, totalPages);

        if (totalItems === 0) {
            displayNoResultsMessage();
            paginationControlsContainer.classList.add('hidden');
            return;
        }

        let currentYear = null;
        questionsToDisplay.forEach((q) => {
            if (q.year !== currentYear) {
                currentYear = q.year;
                const yearHeadingDiv = document.createElement('div');
                yearHeadingDiv.className = 'year-heading'; // Uses new CSS styling
                yearHeadingDiv.innerHTML = `<h3>${currentYear}</h3>`;
                questionsList.appendChild(yearHeadingDiv);
            }

            const questionElement = document.createElement('article');
            // Use new CSS classes for the article container
            questionElement.className = 'question-article space-y-3'; // Combined classes

            const headerDiv = document.createElement('div');
            // Use new CSS class for the header area
            headerDiv.className = 'question-header';
            const topicClean = q.chapter.replace(/^Module\s*\d+:\s*/i, '');
            // Use new CSS class for the topic badge
            headerDiv.innerHTML = `<span class="topic-badge" title="${q.chapter}">Module: ${topicClean}</span>`;
            // Optional: Add year/q-number here if desired, e.g.
            // headerDiv.innerHTML += `<span class="text-xs text-slate-400 font-medium">${q.q.match(/^(Q\d+[a-z]?)/i)?.[0] || ''}</span>`;
            questionElement.appendChild(headerDiv);

            const contentContainer = document.createElement('div');
            // Use new CSS class for the content area
            contentContainer.className = 'question-content space-y-3'; // Add space-y if needed inside
            parseAndDisplayQuestionContent(q.q, contentContainer, currentSearchTerm);
            questionElement.appendChild(contentContainer);

            // --- Ask AI Button (using new CSS styles) ---
            const askAIContainer = document.createElement('div');
            askAIContainer.className = 'ask-ai-container'; // Uses new CSS

            const askAIButton = document.createElement('button');
            askAIButton.className = 'ask-ai-button'; // Uses new CSS
            askAIButton.title = 'Ask this question (with topic context) on ChatGPT Search';
            askAIButton.setAttribute('data-question', q.q);
            askAIButton.setAttribute('data-chapter', q.chapter);

            // Adjusted SVG icon for better fit (if needed, or adjust CSS)
            // The CSS .ask-ai-button svg { width: 1em; height: 1em; } should handle size now.
            askAIButton.innerHTML = `
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.06-1.061 3.5 3.5 0 014.862.013l.001.001.045.054.031.036.047.05.028.03.055.056.023.024c.18.174.342.36.483.554l.004.006a4.002 4.002 0 01.06 6.193l-.004.005a.75.75 0 01-1.06-1.06l.004-.005a2.5 2.5 0 00-.037-3.874l-.004-.004A2.5 2.5 0 008.94 6.941zM10 15.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"></path></svg>
            <span>Ask AI</span>`; // Using a simpler Heroicon style icon

            askAIButton.addEventListener('click', handleAskAI);
            askAIContainer.appendChild(askAIButton);
            questionElement.appendChild(askAIContainer);
            // --- End Ask AI Button ---

            questionsList.appendChild(questionElement);
        });

        if (window.Prism) {
            // Re-highlight AFTER all elements are added
            // Use setTimeout to ensure DOM update before highlighting
            setTimeout(() => {
                Prism.highlightAllUnder(questionsList);
            }, 0);
        }

        updatePaginationControls(totalItems, totalPages);
    }



    // (Keep parseAndDisplayQuestionContent function from V5.1)
    function parseAndDisplayQuestionContent(questionText, container, searchTerm) {
        const codeBlockRegex = /```(cpp|c\+\+)?\s*\n([\s\S]*?)\n```/g;
        let lastIndex = 0;
        let match;

        const highlightText = (text, term) => {
            if (!term || term.trim() === '' || !text) return text;
            try {
                const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(?<!<[^>]*)${escapedTerm}(?![^<]*>)`, 'gi');
                return text.replace(regex, '<span class="search-highlight">$&</span>');
            } catch (e) { console.error("Highlighting error:", e); return text; }
        };

        const appendTextSegment = (text) => {
            const trimmedText = text.trim();
            if (trimmedText === '') return;

            const p = document.createElement('p');
            p.className = 'text-slate-700 text-[15px] leading-relaxed whitespace-pre-line';
            let qidSpanHTML = '';
            let textToHighlight = trimmedText;
            const qidMatch = trimmedText.match(/^((?:Q\d+[a-z]?\s*:)\s*)/i);

            if (qidMatch) {
                qidSpanHTML = `<span class="q-identifier">${qidMatch[1].trim()}</span> `;
                textToHighlight = trimmedText.substring(qidMatch[0].length);
            }
            const highlightedText = highlightText(textToHighlight, searchTerm);
            p.innerHTML = qidSpanHTML + highlightedText;
            container.appendChild(p);
        };

        while ((match = codeBlockRegex.exec(questionText)) !== null) {
            appendTextSegment(questionText.substring(lastIndex, match.index));
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            const lang = match[1] ? 'cpp' : 'clike';
            pre.className = `language-${lang} line-numbers`; // Added line-numbers class
            code.className = `language-${lang}`;
            code.textContent = match[2].trim();
            pre.appendChild(code);
            container.appendChild(pre);
            lastIndex = codeBlockRegex.lastIndex;
        }
        appendTextSegment(questionText.substring(lastIndex));
    }

    // (Keep updateResultsHeader function from V5.1)
    function updateResultsHeader(count, totalPages) {
        const selectedYears = getSelectedFilters('year-filter', 'all-years');
        const selectedTopics = getSelectedFilters('topic-filter', 'all-topics');
        const searchTerm = searchInput.value.trim();
        let title = '';
        let description = '';

        if (count === 0) {
            title = "No Questions Found";
            description = `No questions match your filters`;
            if (searchTerm) description += ` and search term "${searchTerm}"`;
            description += ". Try adjusting criteria.";
        } else {
            const startItem = (currentPage - 1) * itemsPerPage + 1;
            const endItem = Math.min(startItem + itemsPerPage - 1, count);
            title = `Found ${count} Question Part${count !== 1 ? 's' : ''}`;
            description = `Showing ${startItem}-${endItem} of ${count}`;
            if (searchTerm) description += ` matching "${searchTerm}"`;
            if (!selectedYears.includes('all') || !selectedTopics.includes('all')) description += ` (filtered)`;
            if (totalPages > 1) description += `. Page ${currentPage} of ${totalPages}`;
        }
        resultsTitle.textContent = title;
        resultsDescription.textContent = description;
    }

    // (Keep displayNoResultsMessage function from V5.1)
    function displayNoResultsMessage() {
        questionsList.innerHTML = '';
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = "flex flex-col justify-center items-center h-auto text-center p-8 py-16 bg-white rounded-lg border border-dashed border-indigo-200 shadow-sm mt-4";
        const searchTerm = searchInput.value.trim();
        let message = "No questions match your current filters.";
        if (searchTerm) message = `No questions found matching "${searchTerm}" with the selected filters.`

        noResultsDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-indigo-300 mb-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <p class="text-slate-700 text-lg font-semibold mb-1">No Matching Questions</p>
            <p class="text-slate-500 text-sm max-w-xs mb-5">${message}</p>
            <button id="clear-search-filters" class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150">
                Clear Search & Filters
            </button>
        `;
        questionsList.appendChild(noResultsDiv);
        const clearButton = document.getElementById('clear-search-filters');
        if (clearButton) clearButton.addEventListener('click', resetAllFilters);
    }


    // --- 5. Pagination Logic ---
    // (Keep updatePaginationControls and goToPage from V5.1)
    function updatePaginationControls(totalItems, totalPages) {
        paginationControlsContainer.innerHTML = '';
        if (totalPages <= 1) {
            paginationControlsContainer.classList.add('hidden');
            return;
        }
        paginationControlsContainer.classList.remove('hidden');

        const prevButton = document.createElement('button');
        prevButton.innerHTML = '← Prev';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => goToPage(currentPage - 1));
        paginationControlsContainer.appendChild(prevButton);

        const pageInfo = document.createElement('span');
        pageInfo.id = 'pagination-info';
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        paginationControlsContainer.appendChild(pageInfo);

        const nextButton = document.createElement('button');
        nextButton.innerHTML = 'Next →';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => goToPage(currentPage + 1));
        paginationControlsContainer.appendChild(nextButton);
    }

    function goToPage(page) {
        const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            displayFilteredQuestions();
            mainContent.scrollTop = 0;
        }
    }


    // --- 6. Event Listeners ---

    // V5.1.1: Modified handler to include chapter
    function handleAskAI(event) {
        const button = event.currentTarget;
        const questionText = button.dataset.question;
        const chapterText = button.dataset.chapter || "General Topic"; // Get chapter, provide default

        if (!questionText) {
            console.error("Could not retrieve question text for Ask AI button.");
            return;
        }

        // Clean up chapter text slightly (remove module prefix if desired)
        const cleanChapter = chapterText.replace(/^Module\s*\d+:\s*/i, '');

        // Construct the combined query for the AI
        // Added context for clarity
        const combinedQuery = `Regarding the C++ OOP topic "${cleanChapter}", please explain or answer the following question:\n\n${questionText}`;

        // Construct the URL for chatgpt.com search
        const encodedQuery = encodeURIComponent(combinedQuery);
        const targetUrl = `https://chatgpt.com/search?q=${encodedQuery}`;

        // Open the URL in a new tab
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }


    // (Keep addFilterListeners, resetAllFilters, search listener, sidebar logic, resize listener from V5.1)
    function addFilterListeners() {
        const allYearCheckbox = document.getElementById('all-years');
        const allTopicCheckbox = document.getElementById('all-topics');
        const yearCheckboxes = document.querySelectorAll('.year-filter');
        const topicCheckboxes = document.querySelectorAll('.topic-filter');

        const handleFilterChange = (allCheckbox, specificCheckboxes) => {
            if (allCheckbox.checked) {
                specificCheckboxes.forEach(cb => { cb.checked = false; });
            } else if (!Array.from(specificCheckboxes).some(c => c.checked)) {
                allCheckbox.checked = true;
            }
            applyFiltersAndSearch();
        };
        const handleSpecificFilterChange = (specificCheckbox, allCheckbox, specificCheckboxes) => {
            if (specificCheckbox.checked) {
                allCheckbox.checked = false;
            } else if (!Array.from(specificCheckboxes).some(c => c.checked)) {
                allCheckbox.checked = true;
            }
            applyFiltersAndSearch();
        };

        allYearCheckbox.addEventListener('change', () => handleFilterChange(allYearCheckbox, yearCheckboxes));
        yearCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => handleSpecificFilterChange(cb, allYearCheckbox, yearCheckboxes));
        });
        allTopicCheckbox.addEventListener('change', () => handleFilterChange(allTopicCheckbox, topicCheckboxes));
        topicCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => handleSpecificFilterChange(cb, allTopicCheckbox, topicCheckboxes));
        });
    }

    function resetAllFilters() {
        document.getElementById('all-years').checked = true;
        document.getElementById('all-topics').checked = true;
        document.querySelectorAll('.year-filter, .topic-filter').forEach(cb => cb.checked = false);
        searchInput.value = '';
        currentSearchTerm = '';
        applyFiltersAndSearch();
        if (window.innerWidth < 768 && sidebar.classList.contains('open-sidebar')) {
            toggleSidebar();
        }
    }
    resetFiltersButton.addEventListener('click', resetAllFilters);

    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            applyFiltersAndSearch();
        }, 300);
    });

    function toggleSidebar() {
        const isOpen = sidebar.classList.contains('open-sidebar');
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = sidebar.querySelector(focusableElements);

        if (isOpen) {
            sidebar.classList.remove('open-sidebar');
            sidebarOverlay.classList.remove('active');
            sidebarToggleButton.setAttribute('aria-expanded', 'false');
            if (window.innerWidth >= 768) mainContent.classList.remove('main-content-shifted');
            sidebarToggleButton.focus();
        } else {
            sidebar.classList.add('open-sidebar');
            sidebarOverlay.classList.add('active');
            sidebarToggleButton.setAttribute('aria-expanded', 'true');
            if (window.innerWidth >= 768) mainContent.classList.add('main-content-shifted');
            setTimeout(() => {
                if (resetFiltersButton) resetFiltersButton.focus();
                else if (firstFocusableElement) firstFocusableElement.focus();
            }, 300);
        }
    }
    sidebarToggleButton.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebar.classList.contains('open-sidebar')) {
            toggleSidebar();
        }
    });

    window.addEventListener('resize', () => {
        const isOpen = sidebar.classList.contains('open-sidebar');
        if (window.innerWidth >= 768) {
            sidebarOverlay.classList.remove('active');
            if (isOpen) mainContent.classList.add('main-content-shifted');
            else mainContent.classList.remove('main-content-shifted');
            if (isOpen && !sidebar.style.transform) sidebar.classList.add('open-sidebar');
        } else {
            mainContent.classList.remove('main-content-shifted');
            if (isOpen) sidebarOverlay.classList.add('active');
            else sidebarOverlay.classList.remove('active');
        }
    });


    // --- 7. Initialization ---
    // (Keep initialize and setInitialSidebarState from V5.1, update version text)
    function initialize() {
        console.log("Initializing PYQ Explorer V5.1.1..."); // Update log
        loadingIndicator.classList.remove('hidden');
        questionsList.innerHTML = '';
        initialPlaceholder.innerHTML = '';
        paginationControlsContainer.classList.add('hidden');

        setTimeout(() => {
            try {
                processData(yearlyData);

                if (totalQuestionsCount === 0) {
                    console.warn("No question data found or processed.");
                    resultsTitle.textContent = 'No Data Available';
                    resultsDescription.textContent = 'Could not find any question data.';
                    verificationFooter.textContent = 'Verification: No question data found.';
                    displayNoResultsMessage();
                    loadingIndicator.classList.add('hidden');
                } else {
                    console.log(`Processed ${totalQuestionsCount} questions across ${uniqueYears.size} years.`);
                    populateFilters();
                    setInitialSidebarState();
                    applyFiltersAndSearch();
                    // Update version in footer
                    verificationFooter.textContent = `Verified: ${totalQuestionsCount} question parts loaded across ${uniqueYears.size} year(s). V5.1.1`; // Update version text
                }
            } catch (error) {
                console.error("Initialization Error:", error);
                resultsTitle.textContent = 'Initialization Error';
                resultsDescription.textContent = 'Failed to load or process data. See console.';
                verificationFooter.textContent = 'Verification: Error during initialization.';
                questionsList.innerHTML = `<p class="text-red-600 p-4 font-medium">Error: ${error.message}. Check console.</p>`;
                loadingIndicator.classList.add('hidden');
            }
        }, 50);
    }

    function setInitialSidebarState() {
        if (window.innerWidth >= 768) {
            sidebar.classList.add('open-sidebar');
            mainContent.classList.add('main-content-shifted');
            sidebarToggleButton.setAttribute('aria-expanded', 'true');
            sidebarOverlay.classList.remove('active');
        } else {
            sidebar.classList.remove('open-sidebar');
            mainContent.classList.remove('main-content-shifted');
            sidebarToggleButton.setAttribute('aria-expanded', 'false');
            sidebarOverlay.classList.remove('active');
        }
    }

    initialize();

});