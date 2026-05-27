export interface Challenge {
  id: number;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  description: string;
  instructions: string;
  starterCode: string;
  hint: string;
  expectedOutput?: string;
}

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Hello, Rust!",
    difficulty: "beginner",
    category: "Basics",
    description: "Learn the most fundamental Rust program — printing to the console.",
    instructions:
      "Write a program that prints `Hello, Rust!` to the console using the `println!` macro.",
    starterCode: `fn main() {
    // Print "Hello, Rust!" to the console
    
}`,
    hint: "Use the `println!` macro. Example: `println!(\"text\");`",
    expectedOutput: "Hello, Rust!",
  },
  {
    id: 2,
    title: "Variables & Mutability",
    difficulty: "beginner",
    category: "Basics",
    description: "Understand how variables work in Rust and the difference between immutable and mutable bindings.",
    instructions:
      "Declare an immutable variable `x` with value `5`, then declare a mutable variable `y` with value `10`. Reassign `y` to `y + x`. Print both values on separate lines.",
    starterCode: `fn main() {
    // Declare immutable variable x = 5
    
    // Declare mutable variable y = 10
    
    // Reassign y to y + x
    
    // Print x and y on separate lines
    
}`,
    hint: "Use `let` for immutable and `let mut` for mutable variables. Print with `println!(\"{}\", variable);`",
    expectedOutput: "5\n15",
  },
  {
    id: 3,
    title: "Data Types",
    difficulty: "beginner",
    category: "Basics",
    description: "Explore Rust's scalar and compound data types.",
    instructions:
      "Create variables of these types: an `i32` integer with value `42`, a `f64` float with value `3.14`, a `bool` with value `true`, and a `char` with value `'R'`. Print each on a separate line.",
    starterCode: `fn main() {
    // Create an i32 integer
    
    // Create an f64 float
    
    // Create a bool
    
    // Create a char
    
    // Print each on a separate line
    
}`,
    hint: "Rust can infer types, but you can annotate them: `let x: i32 = 42;`",
    expectedOutput: "42\n3.14\ntrue\nR",
  },
  {
    id: 4,
    title: "Functions",
    difficulty: "beginner",
    category: "Basics",
    description: "Learn how to define and call functions with parameters and return values.",
    instructions:
      "Write a function `add` that takes two `i32` parameters and returns their sum. Call it from `main` with arguments `3` and `7`, and print the result.",
    starterCode: `// Define the add function here


fn main() {
    // Call add(3, 7) and print the result
    
}`,
    hint: "Function syntax: `fn name(param: Type) -> ReturnType { expression }`. The last expression without a semicolon is the return value.",
    expectedOutput: "10",
  },
  {
    id: 5,
    title: "Control Flow — if/else",
    difficulty: "beginner",
    category: "Basics",
    description: "Use conditional expressions to control program flow.",
    instructions:
      'Write a function `classify_number` that takes an `i32` and prints "positive", "negative", or "zero". Call it with values `5`, `-3`, and `0`.',
    starterCode: `fn classify_number(n: i32) {
    // Use if/else to print "positive", "negative", or "zero"
    
}

fn main() {
    classify_number(5);
    classify_number(-3);
    classify_number(0);
}`,
    hint: 'Use `if n > 0 { ... } else if n < 0 { ... } else { ... }`',
    expectedOutput: "positive\nnegative\nzero",
  },
  {
    id: 6,
    title: "Loops",
    difficulty: "beginner",
    category: "Basics",
    description: "Practice using Rust's loop constructs: loop, while, and for.",
    instructions:
      "Use a `for` loop to print the numbers 1 through 5, each on a separate line. Then print the sum of numbers 1 to 10 using a `while` loop.",
    starterCode: `fn main() {
    // Use a for loop to print 1 through 5
    
    // Use a while loop to compute sum of 1 to 10
    
    // Print the sum
    
}`,
    hint: "Use `for i in 1..=5` for an inclusive range. For the while loop, use a mutable accumulator.",
    expectedOutput: "1\n2\n3\n4\n5\n55",
  },
  {
    id: 7,
    title: "Ownership",
    difficulty: "intermediate",
    category: "Ownership & Borrowing",
    description: "Understand Rust's ownership system — the foundation of memory safety.",
    instructions:
      'Create a `String` with value `"hello"`. Write a function `take_ownership` that takes a `String` parameter and prints it. Call the function, then create a new string `"world"` and print it to show the program continues.',
    starterCode: `fn take_ownership(s: String) {
    // Print the string
    
}

fn main() {
    // Create a String "hello"
    
    // Pass it to take_ownership
    
    // Create a new String "world" and print it
    
}`,
    hint: 'Use `String::from("hello")` to create a heap-allocated string. After passing it to a function, the original variable is no longer valid.',
    expectedOutput: "hello\nworld",
  },
  {
    id: 8,
    title: "References & Borrowing",
    difficulty: "intermediate",
    category: "Ownership & Borrowing",
    description: "Learn to borrow values without taking ownership using references.",
    instructions:
      'Write a function `calculate_length` that takes a reference to a `String` (`&String`) and returns its length as `usize`. Create a string `"Rustacean"`, call the function, and print both the string and its length.',
    starterCode: `fn calculate_length(s: &String) -> usize {
    // Return the length of the string
    
}

fn main() {
    // Create a String "Rustacean"
    
    // Call calculate_length with a reference
    
    // Print the string and its length
    
}`,
    hint: "Pass a reference with `&variable`. Inside the function, use `s.len()`. The original variable remains valid after the call.",
    expectedOutput: "Rustacean: 9",
  },
  {
    id: 9,
    title: "Slices",
    difficulty: "intermediate",
    category: "Ownership & Borrowing",
    description: "Work with string slices and array slices — views into contiguous data.",
    instructions:
      'Create a string `"Hello, world!"`. Write a function `first_word` that takes a `&str` and returns the first word as a `&str` (split on space). Print the first word.',
    starterCode: `fn first_word(s: &str) -> &str {
    // Find the first space and return the slice before it
    // If no space, return the whole string
    
}

fn main() {
    let sentence = "Hello, world!";
    let word = first_word(sentence);
    println!("{}", word);
}`,
    hint: "Use `s.find(' ')` to locate the space, then slice with `&s[..index]`. Use `match` or `if let` to handle the Option.",
    expectedOutput: "Hello,",
  },
  {
    id: 10,
    title: "Structs",
    difficulty: "intermediate",
    category: "Structs & Enums",
    description: "Define custom data types with structs and implement methods on them.",
    instructions:
      'Define a `Rectangle` struct with `width` and `height` fields (both `f64`). Implement a method `area` that returns the area, and a method `describe` that prints `"Rectangle: WxH, area: A"`. Create a 10.0 x 5.5 rectangle and call `describe`.',
    starterCode: `// Define the Rectangle struct


// Implement methods for Rectangle


fn main() {
    // Create a Rectangle and call describe
    
}`,
    hint: "Use `struct Rectangle { width: f64, height: f64 }` and `impl Rectangle { fn area(&self) -> f64 { ... } }`",
    expectedOutput: "Rectangle: 10x5.5, area: 55",
  },
  {
    id: 11,
    title: "Enums & Pattern Matching",
    difficulty: "intermediate",
    category: "Structs & Enums",
    description: "Use enums to represent variants and match to handle them.",
    instructions:
      'Define an enum `Coin` with variants `Penny`, `Nickel`, `Dime`, `Quarter`. Write a function `value_in_cents` that uses `match` to return the value of each coin as `u32`. Print the value of each coin.',
    starterCode: `// Define the Coin enum


fn value_in_cents(coin: &Coin) -> u32 {
    // Use match to return the value
    
}

fn main() {
    // Create each coin variant and print its value
    
}`,
    hint: "Define with `enum Coin { Penny, Nickel, Dime, Quarter }`. Match with `match coin { Coin::Penny => 1, ... }`",
    expectedOutput: "1\n5\n10\n25",
  },
  {
    id: 12,
    title: "Option<T>",
    difficulty: "intermediate",
    category: "Error Handling",
    description: "Handle the absence of a value safely with Option<T> instead of null.",
    instructions:
      'Write a function `find_char` that takes a `&str` and a `char`, and returns `Option<usize>` — the index of the first occurrence. Use `match` in `main` to print either `"Found at index X"` or `"Not found"`. Search for \'s\' in `"Rust"` and \'z\' in `"Rust"`.',
    starterCode: `fn find_char(s: &str, c: char) -> Option<usize> {
    // Find the character and return its index
    
}

fn main() {
    // Search for 's' in "Rust" and print the result
    
    // Search for 'z' in "Rust" and print the result
    
}`,
    hint: "Iterate with `s.chars().enumerate()` or use `s.find(c)`. Match with `match result { Some(i) => ..., None => ... }`",
    expectedOutput: "Found at index 2\nNot found",
  },
  {
    id: 13,
    title: "Result<T, E> & Error Handling",
    difficulty: "intermediate",
    category: "Error Handling",
    description: "Use Result<T, E> for operations that can fail, and handle errors gracefully.",
    instructions:
      'Write a function `parse_number` that takes a `&str` and returns `Result<i32, String>`. Try to parse the string as an `i32`. On success return `Ok(n)`, on failure return `Err("not a number")`. Call it with `"42"` and `"abc"`, printing the results.',
    starterCode: `fn parse_number(s: &str) -> Result<i32, String> {
    // Try to parse the string as i32
    
}

fn main() {
    // Parse "42" and print the result
    
    // Parse "abc" and print the result
    
}`,
    hint: 'Use `s.parse::<i32>()` which returns a Result. Map the error with `.map_err(|_| String::from("not a number"))`',
    expectedOutput: "Ok: 42\nErr: not a number",
  },
  {
    id: 14,
    title: "Vectors",
    difficulty: "intermediate",
    category: "Collections",
    description: "Use Vec<T>, Rust's growable array type.",
    instructions:
      "Create a vector of integers `[1, 2, 3, 4, 5]`. Use iterator methods to: (1) double each element and collect into a new vector, (2) filter for even numbers from the doubled vector, (3) sum the filtered values. Print the doubled vector, filtered vector, and the sum.",
    starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    // Double each element
    
    // Filter for even numbers from doubled
    
    // Sum the filtered values
    
    // Print results
    
}`,
    hint: "Use `.iter().map(|x| x * 2).collect::<Vec<_>>()` to double. Use `.iter().filter(|x| *x % 2 == 0)` to filter.",
    expectedOutput: "[2, 4, 6, 8, 10]\n[2, 4, 6, 8, 10]\n30",
  },
  {
    id: 15,
    title: "HashMaps",
    difficulty: "intermediate",
    category: "Collections",
    description: "Store key-value pairs with HashMap.",
    instructions:
      'Create a HashMap to count word frequencies in the sentence `"the cat sat on the mat the cat"`. Print each word and its count in alphabetical order.',
    starterCode: `use std::collections::HashMap;

fn main() {
    let sentence = "the cat sat on the mat the cat";
    
    // Count word frequencies
    
    // Print each word and count in alphabetical order
    
}`,
    hint: "Split with `.split_whitespace()`. Use `entry(word).or_insert(0)` and increment. Collect keys, sort, then print.",
    expectedOutput: "cat: 2\nmat: 1\non: 1\nsat: 1\nthe: 3",
  },
  {
    id: 16,
    title: "Traits",
    difficulty: "advanced",
    category: "Traits & Generics",
    description: "Define shared behavior with traits — Rust's version of interfaces.",
    instructions:
      'Define a trait `Describable` with a method `describe(&self) -> String`. Implement it for a `Dog` struct (with `name: String` and `breed: String`) and a `Car` struct (with `make: String` and `year: u32`). Create one of each and print their descriptions.',
    starterCode: `// Define the Describable trait


// Define Dog struct and implement Describable


// Define Car struct and implement Describable


fn main() {
    // Create a Dog and Car, print their descriptions
    
}`,
    hint: 'Use `trait Describable { fn describe(&self) -> String; }` and `impl Describable for Dog { ... }`.',
    expectedOutput: "Buddy is a Golden Retriever\n2024 Tesla",
  },
  {
    id: 17,
    title: "Generics",
    difficulty: "advanced",
    category: "Traits & Generics",
    description: "Write flexible, reusable code with generic type parameters.",
    instructions:
      "Write a generic function `largest<T>` that takes a slice `&[T]` where `T: PartialOrd` and returns a reference to the largest element. Test it with a slice of integers `[34, 50, 25, 100, 65]` and a slice of chars `['y', 'm', 'a', 'q']`.",
    starterCode: `fn largest<T: PartialOrd>(list: &[T]) -> &T {
    // Find and return the largest element
    
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    println!("Largest number: {}", largest(&numbers));

    let chars = vec!['y', 'm', 'a', 'q'];
    println!("Largest char: {}", largest(&chars));
}`,
    hint: "Start with `let mut largest = &list[0];` then iterate and compare.",
    expectedOutput: "Largest number: 100\nLargest char: y",
  },
  {
    id: 18,
    title: "Lifetimes",
    difficulty: "advanced",
    category: "Traits & Generics",
    description: "Understand lifetime annotations that help the compiler ensure references are valid.",
    instructions:
      "Write a function `longest<'a>` that takes two string slices with the same lifetime and returns the longer one. Test it with different string pairs.",
    starterCode: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    // Return the longer string
    
}

fn main() {
    let string1 = String::from("long string");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
        println!("Longest: {}", result);
    }
}`,
    hint: "Compare lengths with `x.len()` and `y.len()`, return the longer one.",
    expectedOutput: "Longest: long string",
  },
  {
    id: 19,
    title: "Closures & Iterators",
    difficulty: "advanced",
    category: "Functional Patterns",
    description: "Use closures (anonymous functions) and iterator adaptors for expressive code.",
    instructions:
      "Given a vector of names, use closures and iterators to: (1) filter names longer than 4 characters, (2) convert them to uppercase, (3) collect and print the results.",
    starterCode: `fn main() {
    let names = vec!["Alice", "Bob", "Charlie", "Dave", "Eve", "Franklin"];
    
    // Filter names longer than 4 chars, uppercase them, collect
    
    // Print the result
    
}`,
    hint: "Chain `.iter().filter(|n| n.len() > 4).map(|n| n.to_uppercase()).collect::<Vec<_>>()`",
    expectedOutput: "[\"ALICE\", \"CHARLIE\", \"FRANKLIN\"]",
  },
  {
    id: 20,
    title: "Final Challenge: Mini CLI Tool",
    difficulty: "advanced",
    category: "Capstone",
    description: "Combine everything you've learned to build a small but complete program.",
    instructions:
      'Build a simple statistics calculator. Given a vector of f64 values `[4.0, 8.0, 15.0, 16.0, 23.0, 42.0]`, write functions to compute: (1) `mean` — the average, (2) `median` — the middle value(s), (3) `mode_range` — the difference between max and min. Print all three statistics formatted nicely.',
    starterCode: `fn mean(data: &[f64]) -> f64 {
    // Calculate the average
    
}

fn median(data: &mut Vec<f64>) -> f64 {
    // Sort and find the middle value
    
}

fn range(data: &[f64]) -> f64 {
    // Find max - min
    
}

fn main() {
    let mut numbers = vec![4.0, 8.0, 15.0, 16.0, 23.0, 42.0];
    
    println!("Data: {:?}", numbers);
    println!("Mean: {:.1}", mean(&numbers));
    println!("Median: {:.1}", median(&mut numbers));
    println!("Range: {:.1}", range(&numbers));
}`,
    hint: "For mean: sum / count. For median: sort first, then average the two middle elements if even length. For range: use `.iter().cloned().reduce(f64::max)` and similar for min.",
    expectedOutput: "Data: [4.0, 8.0, 15.0, 16.0, 23.0, 42.0]\nMean: 18.0\nMedian: 15.5\nRange: 38.0",
  },
  // Chapter 1: Getting Started
  {
    id: 21,
    title: "Hello World",
    difficulty: "beginner",
    category: "Chapter 1 - Getting Started",
    description: "Write your first Rust program that prints hello world.",
    instructions: "Write a Rust program that prints \"Hello, world!\" to the console.",
    starterCode: `fn main() {
    println!("Hello, world!");
}`,
    hint: "Use println! macro to print to the console.",
    expectedOutput: "Hello, world!",
  },
  {
    id: 22,
    title: "Variables and Mutability",
    difficulty: "beginner",
    category: "Chapter 1 - Getting Started",
    description: "Learn about variable declarations and mutability in Rust.",
    instructions: "Create an immutable variable `x` with value 5 and a mutable variable `y` with value 10. Change `y` to 15 and print both variables.",
    starterCode: `fn main() {
    let x = 5;
    let mut y = 10;
    
    // Change y to 15
    
    println!("x: {}, y: {}", x, y);
}`,
    hint: "Use `mut` keyword to make a variable mutable. Immutable variables cannot be reassigned.",
    expectedOutput: "x: 5, y: 15",
  },
  {
    id: 23,
    title: "Constants",
    difficulty: "beginner",
    category: "Chapter 1 - Getting Started",
    description: "Learn about constants in Rust.",
    instructions: "Declare a constant `MAX_POINTS` with value 100,000. Print the constant.",
    starterCode: `fn main() {
    // Declare the constant here
    
    println!("Max points: {}", MAX_POINTS);
}`,
    hint: "Constants are declared with `const` and must have a type annotation. They are always immutable.",
    expectedOutput: "Max points: 100000",
  },
  {
    id: 24,
    title: "Shadowing",
    difficulty: "beginner",
    category: "Chapter 1 - Getting Started",
    description: "Learn about variable shadowing in Rust.",
    instructions: "Create a variable `x` with value 5. Shadow it with `x` multiplied by 2. Then shadow it again as a string \"hello\". Print all three versions.",
    starterCode: `fn main() {
    let x = 5;
    let x = x * 2;
    let x = "hello";
    
    println!("Final x: {}", x);
}`,
    hint: "Shadowing allows you to reuse a variable name with a different type. It's different from mutability.",
    expectedOutput: "Final x: hello",
  },
  // Chapter 2: Guessing Game
  {
    id: 25,
    title: "Reading Input",
    difficulty: "beginner",
    category: "Chapter 2 - Guessing Game",
    description: "Learn to read user input from the console.",
    instructions: "This challenge simulates reading input. Create a function that takes a string and returns it with a greeting. Print the result.",
    starterCode: `fn greet_user(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let user_name = "Alice";
    let greeting = greet_user(user_name);
    println!("{}", greeting);
}`,
    hint: "In real programs, you'd use `std::io::stdin()` to read user input.",
    expectedOutput: "Hello, Alice!",
  },
  {
    id: 26,
    title: "Random Numbers",
    difficulty: "beginner",
    category: "Chapter 2 - Guessing Game",
    description: "Learn about generating random numbers in Rust.",
    instructions: "This challenge simulates random number generation. Create a function that returns a pseudo-random number between 1 and 100 based on a seed.",
    starterCode: `fn pseudo_random(seed: u32) -> u32 {
    (seed % 100) + 1
}

fn main() {
    let secret_number = pseudo_random(42);
    println!("Secret number: {}", secret_number);
}`,
    hint: "In real programs, you'd use the `rand` crate for true random number generation.",
    expectedOutput: "Secret number: 43",
  },
  {
    id: 27,
    title: "Comparison Operators",
    difficulty: "beginner",
    category: "Chapter 2 - Guessing Game",
    description: "Learn about comparison operators in Rust.",
    instructions: "Compare two numbers and print whether the first is less than, greater than, or equal to the second.",
    starterCode: `fn main() {
    let guess = 50;
    let secret = 43;
    
    if guess < secret {
        println!("Too small");
    } else if guess > secret {
        println!("Too big");
    } else {
        println!("Correct");
    }
}`,
    hint: "Use comparison operators: <, >, <=, >=, ==, !=",
    expectedOutput: "Too big",
  },
  {
    id: 28,
    title: "Loop Control",
    difficulty: "beginner",
    category: "Chapter 2 - Guessing Game",
    description: "Learn about loops and loop control in Rust.",
    instructions: "Use a loop to count from 1 to 5. Break out of the loop when the count reaches 5.",
    starterCode: `fn main() {
    let mut count = 1;
    
    loop {
        println!("Count: {}", count);
        
        if count == 5 {
            break;
        }
        
        count += 1;
    }
}`,
    hint: "Use `loop` for infinite loops and `break` to exit them.",
    expectedOutput: "Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5",
  },
  // Chapter 3: Common Programming Concepts
  {
    id: 29,
    title: "Data Types",
    difficulty: "beginner",
    category: "Chapter 3 - Common Programming Concepts",
    description: "Learn about Rust's data types.",
    instructions: "Create variables of different types: i32, f64, bool, char. Print each with its type.",
    starterCode: `fn main() {
    let integer: i32 = 42;
    let float: f64 = 3.14;
    let boolean: bool = true;
    let character: char = 'R';
    
    println!("i32: {}", integer);
    println!("f64: {}", float);
    println!("bool: {}", boolean);
    println!("char: {}", character);
}`,
    hint: "Rust has scalar types (integer, float, boolean, char) and compound types (tuple, array).",
    expectedOutput: "i32: 42\nf64: 3.14\nbool: true\nchar: R",
  },
  {
    id: 30,
    title: "Functions",
    difficulty: "beginner",
    category: "Chapter 3 - Common Programming Concepts",
    description: "Learn about functions in Rust.",
    instructions: "Write a function `add` that takes two i32 parameters and returns their sum. Call it with 5 and 3.",
    starterCode: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
}`,
    hint: "Functions are declared with `fn` and return types are specified with `->`.",
    expectedOutput: "5 + 3 = 8",
  },
  {
    id: 31,
    title: "Control Flow",
    difficulty: "beginner",
    category: "Chapter 3 - Common Programming Concepts",
    description: "Learn about if/else and loop control flow.",
    instructions: "Use if/else to check if a number is positive, negative, or zero. Use a while loop to count down from 5 to 1.",
    starterCode: `fn main() {
    let number = -3;
    
    if number > 0 {
        println!("Positive");
    } else if number < 0 {
        println!("Negative");
    } else {
        println!("Zero");
    }
    
    let mut countdown = 5;
    while countdown > 0 {
        println!("{}", countdown);
        countdown -= 1;
    }
}`,
    hint: "if/else expressions return values. while loops continue while a condition is true.",
    expectedOutput: "Negative\n5\n4\n3\n2\n1",
  },
  {
    id: 32,
    title: "Comments",
    difficulty: "beginner",
    category: "Chapter 3 - Common Programming Concepts",
    description: "Learn about Rust's comment syntax for documenting code.",
    instructions: "Write a program with different types of comments: a single-line comment, a multi-line comment, and documentation comments for a function.",
    starterCode: `// This is a single-line comment

/* This is a multi-line comment
   that can span multiple lines */

/// This is a documentation comment
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let result = add(5, 3);
    println!("Result: {}", result);
}`,
    hint: "Use `//` for single-line, `/* */` for multi-line, and `///` for documentation comments.",
    expectedOutput: "Result: 8",
  },
  // Chapter 4: Ownership
  {
    id: 33,
    title: "Ownership Basics",
    difficulty: "intermediate",
    category: "Chapter 4 - Ownership",
    description: "Understand Rust's ownership system.",
    instructions: "Create a String and assign it to a new variable. Try to use the original variable to see the ownership transfer.",
    starterCode: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s1
    
    // This would cause an error: println!("{}", s1);
    println!("{}", s2);
}`,
    hint: "When a value is moved, the original variable can no longer be used. This prevents double-free errors.",
    expectedOutput: "hello",
  },
  {
    id: 34,
    title: "Borrowing",
    difficulty: "intermediate",
    category: "Chapter 4 - Ownership",
    description: "Learn about borrowing references in Rust.",
    instructions: "Create a function that takes a string reference and prints its length. Call it with both a String and a string slice.",
    starterCode: `fn calculate_length(s: &String) -> usize {
    s.len()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("Length of '{}' is {}", s1, len);
    
    let s2 = "world";
    let len2 = calculate_length(&String::from(s2));
    println!("Length of '{}' is {}", s2, len2);
}`,
    hint: "References allow you to use values without taking ownership. The `&` operator creates a reference.",
    expectedOutput: "Length of 'hello' is 5\nLength of 'world' is 5",
  },
  {
    id: 35,
    title: "Slices",
    difficulty: "intermediate",
    category: "Chapter 4 - Ownership",
    description: "Learn about string slices and array slices.",
    instructions: "Create a string and get a slice of the first word. Also create an array and get a slice of the first three elements.",
    starterCode: `fn main() {
    let s = String::from("hello world");
    let hello = &s[0..5];
    let world = &s[6..11];
    
    println!("First word: {}", hello);
    println!("Second word: {}", world);
    
    let a = [1, 2, 3, 4, 5];
    let slice = &a[0..3];
    println!("Array slice: {:?}", slice);
}`,
    hint: "Slices let you reference a contiguous sequence of elements in a collection without taking ownership.",
    expectedOutput: "First word: hello\nSecond word: world\nArray slice: [1, 2, 3]",
  },
  // Chapter 5: Structs
  {
    id: 36,
    title: "Struct Methods",
    difficulty: "intermediate",
    category: "Chapter 5 - Structs",
    description: "Implement methods on structs to define behavior associated with data.",
    instructions: "Define a `Player` struct with `name: String` and `score: i32`. Implement methods `new()` to create a new player with score 0, `add_points()` to increase score, and `get_score()` to return the current score.",
    starterCode: `struct Player {
    name: String,
    score: i32,
}

impl Player {
    fn new(name: String) -> Self {
        Player { name, score: 0 }
    }
    
    fn add_points(&mut self, points: i32) {
        self.score += points;
    }
    
    fn get_score(&self) -> i32 {
        self.score
    }
}

fn main() {
    let mut player = Player::new(String::from("Alice"));
    player.add_points(100);
    println!("Player: {}, Score: {}", player.name, player.get_score());
}`,
    hint: "Use `impl Struct` block to define methods. Associated functions use `fn new()` and methods use `&self` or `&mut self`.",
    expectedOutput: "Player: Alice, Score: 100",
  },
  {
    id: 37,
    title: "Associated Functions",
    difficulty: "intermediate",
    category: "Chapter 5 - Structs",
    description: "Learn about associated functions that don't take self as a parameter.",
    instructions: "Define a `Rectangle` struct with `width` and `height` (both f64). Implement an associated function `square(size: f64) -> Rectangle` that creates a square rectangle.",
    starterCode: `struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    fn square(size: f64) -> Self {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let square = Rectangle::square(5.0);
    println!("Square: {} x {}", square.width, square.height);
}`,
    hint: "Associated functions don't take `&self` and are called with `StructName::function_name()`.",
    expectedOutput: "Square: 5.0 x 5.0",
  },
  {
    id: 38,
    title: "Multiple impl Blocks",
    difficulty: "intermediate",
    category: "Chapter 5 - Structs",
    description: "Learn that you can have multiple impl blocks for the same struct.",
    instructions: "Define a `Counter` struct with `count: i32`. In one impl block, add methods `increment()` and `decrement()`. In another impl block, add a method `reset()` that sets count to 0.",
    starterCode: `struct Counter {
    count: i32,
}

impl Counter {
    fn increment(&mut self) {
        self.count += 1;
    }
    
    fn decrement(&mut self) {
        self.count -= 1;
    }
}

impl Counter {
    fn reset(&mut self) {
        self.count = 0;
    }
}

fn main() {
    let mut counter = Counter { count: 0 };
    counter.increment();
    counter.increment();
    println!("Count: {}", counter.count);
    counter.reset();
    println!("After reset: {}", counter.count);
}`,
    hint: "You can have multiple `impl StructName` blocks. This is useful for organizing related methods.",
    expectedOutput: "Count: 2\nAfter reset: 0",
  },
  {
    id: 39,
    title: "Struct Update Syntax",
    difficulty: "intermediate",
    category: "Chapter 5 - Structs",
    description: "Learn the struct update syntax for creating new instances from existing ones.",
    instructions: "Define a `Point` struct with `x` and `y` (i32). Create a point at (1, 2). Use the struct update syntax to create a new point with the same y but x = 3.",
    starterCode: `struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let point1 = Point { x: 1, y: 2 };
    let point2 = Point { x: 3, ..point1 };
    
    println!("Point 1: ({}, {})", point1.x, point1.y);
    println!("Point 2: ({}, {})", point2.x, point2.y);
}`,
    hint: "Use `Point { x: 3, ..point1 }` to copy most fields and override specific ones.",
    expectedOutput: "Point 1: (1, 2)\nPoint 2: (3, 2)",
  },
  // Chapter 6: Enums and Pattern Matching
  {
    id: 40,
    title: "Option Deep Dive",
    difficulty: "intermediate",
    category: "Chapter 6 - Enums and Pattern Matching",
    description: "Master Option for handling the absence of values in a type-safe way.",
    instructions: "Write a function `find_first_even` that takes a slice of i32 and returns `Option<usize>` (index of first even number). Use `match` to handle the result.",
    starterCode: `fn find_first_even(numbers: &[i32]) -> Option<usize> {
    for (index, &number) in numbers.iter().enumerate() {
        if number % 2 == 0 {
            return Some(index);
        }
    }
    None
}

fn main() {
    let numbers1 = vec![1, 3, 5, 7, 8];
    let numbers2 = vec![1, 3, 5, 7];
    
    match find_first_even(&numbers1) {
        Some(i) => println!("First even at index: {}", i),
        None => println!("No even numbers found"),
    }
    
    match find_first_even(&numbers2) {
        Some(i) => println!("First even at index: {}", i),
        None => println!("No even numbers found"),
    }
}`,
    hint: "Use `match result { Some(i) => ..., None => ... }` to handle both success and error cases.",
    expectedOutput: "First even at index: 4\nNo even numbers found",
  },
  {
    id: 41,
    title: "Match Control Flow",
    difficulty: "intermediate",
    category: "Chapter 6 - Enums and Pattern Matching",
    description: "Use match as a powerful control flow construct.",
    instructions: "Write a function `describe_number` that takes an `i32` and returns a description. Use match with ranges: \"small\" for 0-10, \"medium\" for 11-100, \"large\" for >100.",
    starterCode: `fn describe_number(n: i32) -> &'static str {
    match n {
        0..=10 => "small",
        11..=100 => "medium",
        _ => "large",
    }
}

fn main() {
    println!("5 is {}", describe_number(5));
    println!("50 is {}", describe_number(50));
    println!("150 is {}", describe_number(150));
}`,
    hint: "Match arms can have range patterns like `0..=10` and the catch-all `_` pattern.",
    expectedOutput: "5 is small\n50 is medium\n150 is large",
  },
  {
    id: 42,
    title: "If Let",
    difficulty: "intermediate",
    category: "Chapter 6 - Enums and Pattern Matching",
    description: "Learn the if let syntax for concise pattern matching.",
    instructions: "Write a function `get_second` that takes an optional tuple and returns the second element if it exists. Use `if let` to handle the Option.",
    starterCode: `fn get_second(pair: Option<(i32, i32)>) -> Option<i32> {
    if let Some((_, second)) = pair {
        Some(second)
    } else {
        None
    }
}

fn main() {
    let pair1 = Some((1, 2));
    let pair2: Option<(i32, i32)> = None;
    
    if let Some(second) = get_second(pair1) {
        println!("Second: {}", second);
    } else {
        println!("No pair provided");
    }
    
    if let Some(second) = get_second(pair2) {
        println!("Second: {}", second);
    } else {
        println!("No pair provided");
    }
}`,
    hint: "Use `if let Some(pattern) = value` to destructure and use the values in one expression.",
    expectedOutput: "Second: 2\nNo pair provided",
  },
  {
    id: 43,
    title: "Match with Options",
    difficulty: "intermediate",
    category: "Chapter 6 - Enums and Pattern Matching",
    description: "Combine match and Option for elegant error handling.",
    instructions: "Write a function `divide` that takes two f64 values and returns `Option<f64>`. Return `Some(result)` if divisor is not zero, `None` otherwise. Use match to print the result.",
    starterCode: `fn divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

fn main() {
    let result1 = divide(10.0, 2.0);
    let result2 = divide(10.0, 0.0);
    
    match result1 {
        Some(value) => println!("10.0 / 2.0 = {}", value),
        None => println!("Cannot divide by zero"),
    }
    
    match result2 {
        Some(value) => println!("10.0 / 0.0 = {}", value),
        None => println!("Cannot divide by zero"),
    }
}`,
    hint: "Use `match result { Some(value) => ..., None => ... }` for clean error handling.",
    expectedOutput: "10.0 / 2.0 = 5.0\nCannot divide by zero",
  },
  // Chapter 7: Packages, Crates, Modules
  {
    id: 44,
    title: "Basic Modules",
    difficulty: "intermediate",
    category: "Chapter 7 - Packages, Crates, Modules",
    description: "Learn how to organize code using modules in Rust.",
    instructions: "Create a module structure with a function `greet` that returns a greeting string. In this challenge, simulate a module by defining the function and calling it.",
    starterCode: `mod utils {
    pub fn greet(name: &str) -> String {
        format!("Hello, {}!", name)
    }
}

fn main() {
    println!("{}", utils::greet("Rust"));
}`,
    hint: "Modules are defined with `mod module_name;` and can be organized in separate files.",
    expectedOutput: "Hello, Rust!",
  },
  {
    id: 45,
    title: "File Organization",
    difficulty: "intermediate",
    category: "Chapter 7 - Packages, Crates, Modules",
    description: "Understand how to organize code across multiple files.",
    instructions: "This challenge simulates file organization. Define two functions: `calculate_area` (width * height) and `calculate_perimeter` (2 * (width + height)). Call both with width=10 and height=5.",
    starterCode: `fn calculate_area(width: f64, height: f64) -> f64 {
    width * height
}

fn calculate_perimeter(width: f64, height: f64) -> f64 {
    2.0 * (width + height)
}

fn main() {
    let width = 10.0;
    let height = 5.0;
    
    println!("Area: {}", calculate_area(width, height));
    println!("Perimeter: {}", calculate_perimeter(width, height));
}`,
    hint: "In real projects, you'd use `mod geometry;` to bring functions from `geometry.rs` into scope.",
    expectedOutput: "Area: 50\nPerimeter: 30",
  },
  {
    id: 46,
    title: "Use Declarations",
    difficulty: "intermediate",
    category: "Chapter 7 - Packages, Crates, Modules",
    description: "Learn to bring paths into scope with use declarations.",
    instructions: "Simulate the use declaration concept by creating two functions in different 'modules': `math::add` and `math::multiply`. Call both functions with different arguments.",
    starterCode: `mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }
    
    pub fn multiply(a: i32, b: i32) -> i32 {
        a * b
    }
}

fn main() {
    println!("3 + 4 = {}", math::add(3, 4));
    println!("5 * 6 = {}", math::multiply(5, 6));
}`,
    hint: "In real projects, you'd use `use math::{add, multiply};` to bring functions into scope without the module prefix.",
    expectedOutput: "3 + 4 = 7\n5 * 6 = 30",
  },
  {
    id: 47,
    title: "Packages and Crates",
    difficulty: "intermediate",
    category: "Chapter 7 - Packages, Crates, Modules",
    description: "Understand Cargo's package management and the crates.io ecosystem.",
    instructions: "Simulate using external crates by defining a function that mimics what an external library might provide. Create a `string_utils` module with a function `reverse_string`.",
    starterCode: `mod string_utils {
    pub fn reverse_string(s: &str) -> String {
        s.chars().rev().collect()
    }
}

fn main() {
    let original = "hello";
    let reversed = string_utils::reverse_string(original);
    
    println!("Original: {}", original);
    println!("Reversed: {}", reversed);
}`,
    hint: "In real projects, you'd add dependencies in Cargo.toml and use `extern crate crate_name;` to bring external libraries into scope.",
    expectedOutput: "Original: hello\nReversed: olleh",
  },
  // Chapter 8: Common Collections
  {
    id: 48,
    title: "Vector Methods",
    difficulty: "intermediate",
    category: "Chapter 8 - Common Collections",
    description: "Learn common vector methods for dynamic arrays.",
    instructions: "Create a vector of integers `[1, 2, 3]`. Use vector methods to: (1) push 4 and 5, (2) remove the last element, (3) get the length, (4) check if it contains 3.",
    starterCode: `fn main() {
    let mut numbers = vec![1, 2, 3];
    
    numbers.push(4);
    numbers.push(5);
    println!("After push: {:?}", numbers);
    
    numbers.pop();
    println!("After pop: {:?}", numbers);
    
    println!("Length: {}", numbers.len());
    println!("Contains 3: {}", numbers.contains(&3));
}`,
    hint: "Use `.push()`, `.pop()`, `.len()`, and `.contains()` methods on vectors.",
    expectedOutput: "After push: [1, 2, 3, 4, 5]\nAfter pop: [1, 2, 3, 4]\nLength: 4\nContains 3: true",
  },
  {
    id: 49,
    title: "String Deep Dive",
    difficulty: "intermediate",
    category: "Chapter 8 - Common Collections",
    description: "Understand String types: String (heap-allocated) vs &str (string slice).",
    instructions: "Create a `String` from a string literal using `String::from()`. Create a string slice from it. Append text to the String. Print the original string, the slice, and the modified string.",
    starterCode: `fn main() {
    let mut s = String::from("hello");
    let slice = &s[0..3];
    
    println!("Original: {}", s);
    println!("Slice: {}", slice);
    
    s.push_str(" world");
    println!("Modified: {}", s);
}`,
    hint: "Strings are growable and heap-allocated. String slices (`&str`) are immutable views into strings.",
    expectedOutput: "Original: hello\nSlice: hel\nModified: hello world",
  },
  {
    id: 50,
    title: "Hash Maps Advanced",
    difficulty: "intermediate",
    category: "Chapter 8 - Common Collections",
    description: "Learn advanced HashMap operations using the entry API.",
    instructions: "Create a HashMap with word counts. Use the entry API to increment the count for \"rust\" by 1. Then remove the entry for \"awesome\". Print the final HashMap contents.",
    starterCode: `use std::collections::HashMap;

fn main() {
    let mut word_counts = HashMap::from([
        ("rust", 3),
        ("is", 2),
        ("awesome", 1),
    ]);
    
    *word_counts.entry("rust").or_insert(0) += 1;
    word_counts.remove("awesome");
    
    println!("Final counts: {:?}", word_counts);
}`,
    hint: "Use `word_counts.entry(\"key\").or_insert(0)` to safely access and modify values.",
    expectedOutput: "Final counts: {\"is\": 2, \"rust\": 4}",
  },
  {
    id: 51,
    title: "Iterating Collections",
    difficulty: "intermediate",
    category: "Chapter 8 - Common Collections",
    description: "Master iteration patterns for different collection types.",
    instructions: "Create a vector `[1, 2, 3, 4, 5]` and a HashMap with `{\"a\": 1, \"b\": 2, \"c\": 3}`. Iterate through both and print their contents.",
    starterCode: `use std::collections::HashMap;

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let mut letters = HashMap::new();
    letters.insert("a", 1);
    letters.insert("b", 2);
    letters.insert("c", 3);
    
    print!("Vector: ");
    for n in &numbers {
        print!("{}, ", n);
    }
    println!();
    
    print!("HashMap: ");
    for (key, value) in &letters {
        print!("{}={}, ", key, value);
    }
    println!();
}`,
    hint: "Use `for n in &numbers` for vectors and `for (key, value) in &letters` for HashMaps.",
    expectedOutput: "Vector: 1, 2, 3, 4, 5, \nHashMap: a=1, b=2, c=3, ",
  },
  {
    id: 52,
    title: "Collection Performance",
    difficulty: "advanced",
    category: "Chapter 8 - Common Collections",
    description: "Understand when to use different collection types for performance.",
    instructions: "Demonstrate the performance characteristics of Vec vs HashMap. Create a Vec with 1000 elements and a HashMap with 1000 key-value pairs.",
    starterCode: `use std::collections::HashMap;

fn main() {
    let large_vec: Vec<i32> = (0..1000).collect();
    let mut large_map = HashMap::new();
    
    for i in 0..1000 {
        large_map.insert(i, i * 2);
    }
    
    println!("Vector length: {}", large_vec.len());
    println!("HashMap length: {}", large_map.len());
}`,
    hint: "Vec is faster for sequential access and ordered data. HashMap is slower but faster for lookups by key.",
    expectedOutput: "Vector length: 1000\nHashMap length: 1000",
  },
  {
    id: 53,
    title: "Vectors Advanced",
    difficulty: "intermediate",
    category: "Chapter 8 - Common Collections",
    description: "Learn advanced vector operations like sorting, capacity, and resizing.",
    instructions: "Create a vector `[3, 1, 4, 1, 5]`. Sort it in ascending order. Then reserve capacity for 10 elements and print the new capacity.",
    starterCode: `fn main() {
    let mut numbers = vec![3, 1, 4, 1, 5];
    
    numbers.sort();
    println!("Sorted: {:?}", numbers);
    
    numbers.reserve(10);
    println!("Capacity: {}", numbers.capacity());
}`,
    hint: "Use `.sort()` for in-place sorting and `.reserve(10)` to pre-allocate memory for better performance.",
    expectedOutput: "Sorted: [1, 1, 3, 4, 5]\nCapacity: 10",
  },
  {
    id: 54,
    title: "Strings Advanced",
    difficulty: "intermediate",
    category: "Chapter 8 - Common Collections",
    description: "Master string operations like concatenation, splitting, and iteration.",
    instructions: "Create a String `\"hello-world\"`. Split it on \"-\" to get a vector of parts. Join the parts back with \" \" (space). Print the original string, the parts vector, and the rejoined string.",
    starterCode: `fn main() {
    let s = String::from("hello-world");
    let parts: Vec<&str> = s.split('-').collect();
    let rejoined = parts.join(" ");
    
    println!("Original: {}", s);
    println!("Parts: {:?}", parts);
    println!("Rejoined: {}", rejoined);
}`,
    hint: "Use `.split()` to divide strings and `.join()` to combine them back together.",
    expectedOutput: "Original: hello-world\nParts: [\"hello\", \"world\"]\nRejoined: hello world",
  },
  {
    id: 55,
    title: "Deque Operations",
    difficulty: "advanced",
    category: "Chapter 8 - Common Collections",
    description: "Learn about double-ended queue operations using Vec as a simulation.",
    instructions: "Simulate deque operations using a Vec. Add elements to the front and back, then remove from both ends. Start with `[2, 3, 4]`. Add 1 to front, 5 to back, then remove from both ends.",
    starterCode: `fn main() {
    let mut deque = vec![2, 3, 4];
    
    // Add to front (simulate with insert at index 0)
    deque.insert(0, 1);
    
    // Add to back
    deque.push(5);
    
    println!("After adds: {:?}", deque);
    
    // Remove from front
    deque.remove(0);
    
    // Remove from back
    deque.pop();
    
    println!("Final deque: {:?}", deque);
}`,
    hint: "In real code, use `VecDeque` from std::collections for efficient front/back operations.",
    expectedOutput: "After adds: [1, 2, 3, 4, 5]\nFinal deque: [2, 3, 4]",
  },
  // Chapter 9: Error Handling - Adding 6 challenges
  {
    id: 56,
    title: "Result Deep Dive",
    difficulty: "intermediate",
    category: "Chapter 9 - Error Handling",
    description: "Master Result for recoverable errors in Rust.",
    instructions: "Write a function `parse_number` that takes a `&str` and returns `Result<i32, String>`. Use it to parse \"42\" (success) and \"abc\" (error).",
    starterCode: `fn parse_number(s: &str) -> Result<i32, String> {
    s.parse::<i32>().map_err(|e| e.to_string())
}

fn main() {
    let result1 = parse_number("42");
    let result2 = parse_number("abc");
    
    match result1 {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Failed to parse: {}", e),
    }
    
    match result2 {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Failed to parse: {}", e),
    }
}`,
    hint: "Use `match result { Ok(n) => ..., Err(e) => ... }` to handle both success and error cases.",
    expectedOutput: "Parsed: 42\nFailed to parse: invalid digit found in string",
  },
  {
    id: 57,
    title: "Error Propagation",
    difficulty: "intermediate",
    category: "Chapter 9 - Error Handling",
    description: "Learn the ? operator for concise error propagation.",
    instructions: "Write a function `read_and_parse` that takes a string slice, checks if it's not empty, then parses it to i32. Use ? to propagate errors.",
    starterCode: `fn read_and_parse(s: &str) -> Result<i32, String> {
    if s.is_empty() {
        return Err("String is empty".to_string());
    }
    let num: i32 = s.parse().map_err(|e| e.to_string())?;
    Ok(num)
}

fn main() {
    let result1 = read_and_parse("123");
    let result2 = read_and_parse("");
    
    println!("Result 1: {:?}", result1);
    println!("Result 2: {:?}", result2);
}`,
    hint: "Use `?` to propagate errors early from functions that return Result.",
    expectedOutput: "Result 1: Ok(123)\nResult 2: Err(\"String is empty\")",
  },
  {
    id: 58,
    title: "Custom Error Types",
    difficulty: "advanced",
    category: "Chapter 9 - Error Handling",
    description: "Create custom error types for better error handling.",
    instructions: "Define an enum `MathError` with variants `DivisionByZero` and `NegativeRoot`. Write a function `safe_divide` that returns `Result<f64, MathError>`.",
    starterCode: `#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeRoot,
}

fn safe_divide(a: f64, b: f64) -> Result<f64, MathError> {
    if b == 0.0 {
        return Err(MathError::DivisionByZero);
    }
    Ok(a / b)
}

fn main() {
    let result1 = safe_divide(10.0, 2.0);
    let result2 = safe_divide(10.0, 0.0);
    
    println!("Result 1: {:?}", result1);
    println!("Result 2: {:?}", result2);
}`,
    hint: "Custom error types allow you to represent domain-specific errors with meaningful variants.",
    expectedOutput: "Result 1: Ok(5.0)\nResult 2: Err(DivisionByZero)",
  },
  {
    id: 59,
    title: "Panic vs Error Handling",
    difficulty: "intermediate",
    category: "Chapter 9 - Error Handling",
    description: "Understand when to panic vs when to use Result for errors.",
    instructions: "Demonstrate the difference between panic and Result. Create a function that panics on invalid input, and another that returns Result.",
    starterCode: `fn panic_if_negative(n: i32) {
    if n < 0 {
        panic!("Negative number: {}", n);
    }
}

fn check_if_negative(n: i32) -> Result<(), String> {
    if n < 0 {
        Err("Negative number".to_string())
    } else {
        Ok(())
    }
}

fn main() {
    panic_if_negative(5);
    println!("Panic check passed");
    
    match check_if_negative(-5) {
        Ok(_) => println!("Valid"),
        Err(e) => println!("Error: {}", e),
    }
}`,
    hint: "Use panic for unrecoverable errors (bugs, invalid state). Use Result for recoverable errors (user input, network failures).",
    expectedOutput: "Panic check passed\nError: Negative number",
  },
  {
    id: 60,
    title: "From Trait for Errors",
    difficulty: "advanced",
    category: "Chapter 9 - Error Handling",
    description: "Implement From trait to convert between error types automatically.",
    instructions: "Define a custom error `AppError` and implement From<String> for it. Write a function that parses a string and returns Result<i32, AppError>.",
    starterCode: `#[derive(Debug)]
enum AppError {
    ParseError(String),
}

impl From<String> for AppError {
    fn from(error: String) -> Self {
        AppError::ParseError(error)
    }
}

fn parse_app_number(s: &str) -> Result<i32, AppError> {
    let num: i32 = s.parse()?;
    Ok(num)
}

fn main() {
    let result1 = parse_app_number("42");
    let result2 = parse_app_number("abc");
    
    println!("Result 1: {:?}", result1);
    println!("Result 2: {:?}", result2);
}`,
    hint: "The From trait enables automatic error conversion with ?, making error handling more ergonomic.",
    expectedOutput: "Result 1: Ok(42)\nResult 2: Err(ParseError(\"invalid digit found in string\"))",
  },
  {
    id: 61,
    title: "Error Handling Best Practices",
    difficulty: "intermediate",
    category: "Chapter 9 - Error Handling",
    description: "Learn best practices for error handling in real applications.",
    instructions: "Write a function that validates user input: checks if a string is not empty, is not too long (>100 chars), and parses to a positive number.",
    starterCode: `#[derive(Debug)]
enum ValidationError {
    Empty,
    TooLong,
    NotPositive,
}

fn validate_input(s: &str) -> Result<i32, ValidationError> {
    if s.is_empty() {
        return Err(ValidationError::Empty);
    }
    if s.len() > 100 {
        return Err(ValidationError::TooLong);
    }
    let num: i32 = s.parse().map_err(|_| ValidationError::NotPositive)?;
    if num <= 0 {
        return Err(ValidationError::NotPositive);
    }
    Ok(num)
}

fn main() {
    let result1 = validate_input("42");
    let result2 = validate_input("");
    let result3 = validate_input("-5");
    
    println!("Result 1: {:?}", result1);
    println!("Result 2: {:?}", result2);
    println!("Result 3: {:?}", result3);
}`,
    hint: "Granular error types help callers handle different error cases appropriately.",
    expectedOutput: "Result 1: Ok(42)\nResult 2: Err(Empty)\nResult 3: Err(NotPositive)",
  },
  // Chapter 10: Generic Types, Traits, and Lifetimes - Adding 8 challenges
  {
    id: 62,
    title: "Generic Functions",
    difficulty: "intermediate",
    category: "Chapter 10 - Generic Types, Traits, and Lifetimes",
    description: "Learn to write functions that work with multiple types.",
    instructions: "Write a generic function `largest` that takes a slice of any type that can be compared (PartialOrd) and returns the largest value.",
    starterCode: `fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let numbers = [1, 5, 2, 8, 3];
    let floats = [1.1, 5.5, 2.2, 8.8, 3.3];
    
    println!("Largest int: {}", largest(&numbers));
    println!("Largest float: {}", largest(&floats));
}`,
    hint: "Use `T: PartialOrd` to constrain the generic type to values that can be compared.",
    expectedOutput: "Largest int: 8\nLargest float: 8.8",
  },
  {
    id: 63,
    title: "Generic Structs",
    difficulty: "intermediate",
    category: "Chapter 10 - Generic Types, Traits, and Lifetimes",
    description: "Define structs that use generic types.",
    instructions: "Define a generic struct `Pair<T>` that holds two values of the same type. Implement a method `new` to create a pair and a method `swap` that returns a new pair with swapped values.",
    starterCode: `struct Pair<T> {
    first: T,
    second: T,
}

impl<T> Pair<T> {
    fn new(first: T, second: T) -> Self {
        Pair { first, second }
    }
    
    fn swap(self) -> Pair<T> {
        Pair { first: self.second, second: self.first }
    }
}

fn main() {
    let pair = Pair::new(1, 2);
    let swapped = pair.swap();
    
    println!("Original: ({}, {})", swapped.second, swapped.first);
    println!("Swapped: ({}, {})", swapped.first, swapped.second);
}`,
    hint: "The struct definition and impl block both need to declare the generic type parameter.",
    expectedOutput: "Original: (1, 2)\nSwapped: (2, 1)",
  },
  {
    id: 64,
    title: "Trait Definitions",
    difficulty: "intermediate",
    category: "Chapter 10 - Generic Types, Traits, and Lifetimes",
    description: "Define traits to specify shared behavior.",
    instructions: "Define a trait `Drawable` with a method `draw`. Implement it for a `Circle` struct and a `Rectangle` struct. Call draw on instances of both.",
    starterCode: `trait Drawable {
    fn draw(&self);
}

struct Circle {
    radius: f64,
}

struct Rectangle {
    width: f64,
    height: f64,
}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing circle with radius {}", self.radius);
    }
}

impl Drawable for Rectangle {
    fn draw(&self) {
        println!("Drawing rectangle {} x {}", self.width, self.height);
    }
}

fn main() {
    let circle = Circle { radius: 5.0 };
    let rectangle = Rectangle { width: 10.0, height: 20.0 };
    
    circle.draw();
    rectangle.draw();
}`,
    hint: "Traits define shared behavior. Implement them with `impl Trait for Struct`.",
    expectedOutput: "Drawing circle with radius 5\nDrawing rectangle 10 x 20",
  },
  {
    id: 65,
    title: "Trait Bounds",
    difficulty: "intermediate",
    category: "Chapter 10 - Generic Types, Traits, and Lifetimes",
    description: "Use trait bounds to constrain generic types.",
    instructions: "Write a generic function `print_info` that takes a value and prints it. Constrain the type to implement both Display and Debug.",
    starterCode: `use std::fmt::{Display, Debug};

fn print_info<T: Display + Debug>(item: T) {
    println!("Display: {}", item);
    println!("Debug: {:?}", item);
}

fn main() {
    print_info(42);
    print_info("hello");
    print_info(3.14);
}`,
    hint: "Use `+` to specify multiple trait bounds: `T: Display + Debug`.",
    expectedOutput: "Display: 42\nDebug: 42\nDisplay: hello\nDebug: \"hello\"\nDisplay: 3.14\nDebug: 3.14",
  },
  {
    id: 66,
    title: "Default Implementations",
    difficulty: "intermediate",
    category: "Chapter 10 - Generic Types, Traits, and Lifetimes",
    description: "Provide default implementations in trait definitions.",
    instructions: "Define a trait `Animal` with methods `make_sound` (default: \"generic sound\") and `name` (must be implemented). Implement for `Dog` and `Cat`.",
    starterCode: `trait Animal {
    fn name(&self) -> &str;
    
    fn make_sound(&self) -> &str {
        "generic sound"
    }
}

struct Dog {
    name: String,
}

struct Cat {
    name: String,
}

impl Animal for Dog {
    fn name(&self) -> &str {
        &self.name
    }
    
    fn make_sound(&self) -> &str {
        "woof"
    }
}

impl Animal for Cat {
    fn name(&self) -> &str {
        &self.name
    }
}

fn main() {
    let dog = Dog { name: "Buddy".to_string() };
    let cat = Cat { name: "Whiskers".to_string() };
    
    println!("{} says: {}", dog.name(), dog.make_sound());
    println!("{} says: {}", cat.name(), cat.make_sound());
}`,
    hint: "Traits can provide default implementations that can be overridden by implementors.",
    expectedOutput: "Buddy says: woof\nWhiskers says: generic sound",
  },
  {
    id: 67,
    title: "Lifetimes Basics",
    difficulty: "advanced",
    category: "Chapter 10 - Generic Types, Traits, and Lifetimes",
    description: "Understand lifetime annotations for references.",
    instructions: "Write a function `longest` that takes two string slices and returns the longer one. Use lifetime annotations to ensure the returned reference is valid.",
    starterCode: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string");
    let string2 = "short";
    
    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}`,
    hint: "Lifetime annotations (`'a`) tell the compiler how long references are valid relative to each other.",
    expectedOutput: "The longest string is long string",
  },
  {
    id: 68,
    title: "Lifetime Annotations",
    difficulty: "advanced",
    category: "Chapter 10 - Generic Types, Traits, and Lifetimes",
    description: "Apply lifetime annotations to structs with references.",
    instructions: "Define a struct `ImportantExcerpt<'a>` that holds a string slice with a lifetime. Implement a method `level` that returns a static string slice based on content length.",
    starterCode: `struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> &str {
        if self.part.len() > 10 {
            "important"
        } else {
            "trivial"
        }
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().expect("Could not find a '.'");
    
    let excerpt = ImportantExcerpt {
        part: first_sentence,
    };
    
    println!("Excerpt: {}", excerpt.part);
    println!("Level: {}", excerpt.level());
}`,
    hint: "Structs that hold references need lifetime annotations to ensure the reference outlives the struct.",
    expectedOutput: "Excerpt: Call me Ishmael\nLevel: trivial",
  },
  {
    id: 69,
    title: "Struct Lifetimes",
    difficulty: "advanced",
    category: "Chapter 10 - Generic Types, Traits, and Lifetimes",
    description: "Handle multiple lifetimes in struct definitions.",
    instructions: "Define a struct `Context<'a>` that holds a string slice and a reference to a `Book` struct. The Book struct also has a lifetime.",
    starterCode: `struct Book<'a> {
    title: &'a str,
}

struct Context<'a, 'b> {
    excerpt: &'a str,
    book: &'b Book<'b>,
}

fn main() {
    let title = String::from("The Rust Book");
    let book = Book { title: &title };
    
    let excerpt = "Some excerpt from the book";
    let context = Context {
        excerpt,
        book: &book,
    };
    
    println!("Book: {}", context.book.title);
    println!("Excerpt: {}", context.excerpt);
}`,
    hint: "Multiple lifetime parameters allow fine-grained control over reference validity.",
    expectedOutput: "Book: The Rust Book\nExcerpt: Some excerpt from the book",
  },
  // Chapter 11-12: Testing and I/O - Adding 8 challenges
  {
    id: 70,
    title: "Unit Tests",
    difficulty: "intermediate",
    category: "Chapter 11 - Testing",
    description: "Write unit tests to verify function correctness.",
    instructions: "Write a function `add` that adds two numbers. Write unit tests for normal cases and edge cases.",
    starterCode: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_add_normal() {
        assert_eq!(add(2, 3), 5);
    }
    
    #[test]
    fn test_add_negative() {
        assert_eq!(add(-2, -3), -5);
    }
}

fn main() {
    println!("2 + 3 = {}", add(2, 3));
}`,
    hint: "Use `#[cfg(test)]` to mark test modules and `#[test]` for test functions.",
    expectedOutput: "2 + 3 = 5",
  },
  {
    id: 71,
    title: "Integration Tests",
    difficulty: "intermediate",
    category: "Chapter 11 - Testing",
    description: "Write integration tests to test library functionality.",
    instructions: "Create a library function `greet` that returns a greeting string. Write an integration test that tests the library as a whole.",
    starterCode: `pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("{}", greet("World"));
}

#[cfg(test)]
mod integration_tests {
    use super::*;
    
    #[test]
    fn test_greet() {
        assert_eq!(greet("Alice"), "Hello, Alice!");
        assert_eq!(greet(""), "Hello, !");
    }
}`,
    hint: "Integration tests test the library as a whole, simulating real usage.",
    expectedOutput: "Hello, World!",
  },
  {
    id: 72,
    title: "Test Organization",
    difficulty: "intermediate",
    category: "Chapter 11 - Testing",
    description: "Organize tests into modules for better structure.",
    instructions: "Create a function `calculate` with multiple test cases organized into modules: `addition_tests` and `subtraction_tests`.",
    starterCode: `fn calculate(a: i32, b: i32, op: char) -> i32 {
    match op {
        '+' => a + b,
        '-' => a - b,
        _ => panic!("Invalid operation"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    mod addition_tests {
        use super::*;
        
        #[test]
        fn test_add_positive() {
            assert_eq!(calculate(2, 3, '+'), 5);
        }
        
        #[test]
        fn test_add_negative() {
            assert_eq!(calculate(-2, -3, '+'), -5);
        }
    }
}

fn main() {
    println!("2 + 3 = {}", calculate(2, 3, '+'));
}`,
    hint: "Organize related tests into nested modules for better test structure and readability.",
    expectedOutput: "2 + 3 = 5",
  },
  {
    id: 73,
    title: "Test Attributes",
    difficulty: "intermediate",
    category: "Chapter 11 - Testing",
    description: "Use test attributes to control test execution.",
    instructions: "Write tests using different attributes: `#[test]`, `#[should_panic]`, and `#[ignore]`.",
    starterCode: `fn divide(a: f64, b: f64) -> f64 {
    if b == 0.0 {
        panic!("Division by zero");
    }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_divide_normal() {
        assert_eq!(divide(10.0, 2.0), 5.0);
    }
    
    #[test]
    #[should_panic(expected = "Division by zero")]
    fn test_divide_by_zero() {
        divide(10.0, 0.0);
    }
    
    #[test]
    #[ignore]
    fn test_slow_operation() {
        // This test is ignored by default
    }
}

fn main() {
    println!("10.0 / 2.0 = {}", divide(10.0, 2.0));
}`,
    hint: "Use `#[should_panic]` for tests that should panic and `#[ignore]` for expensive or flaky tests.",
    expectedOutput: "10.0 / 2.0 = 5",
  },
  {
    id: 74,
    title: "File Reading",
    difficulty: "intermediate",
    category: "Chapter 12 - I/O Project",
    description: "Learn to read files using Rust's std::fs module.",
    instructions: "This challenge simulates file reading. Create a function `read_content` that takes a string (simulating file content) and returns its length and first line.",
    starterCode: `fn read_content(content: &str) -> (usize, String) {
    let lines: Vec<&str> = content.lines().collect();
    let first_line = lines.first().unwrap_or(&"").to_string();
    (content.len(), first_line)
}

fn main() {
    let file_content = "First line\nSecond line\nThird line";
    let (length, first_line) = read_content(file_content);
    
    println!("Content length: {}", length);
    println!("First line: {}", first_line);
}`,
    hint: "In real projects, use `std::fs::read_to_string(\"file.txt\")` to read files.",
    expectedOutput: "Content length: 33\nFirst line: First line",
  },
  {
    id: 75,
    title: "File Writing",
    difficulty: "intermediate",
    category: "Chapter 12 - I/O Project",
    description: "Learn to write files using Rust's std::fs module.",
    instructions: "This challenge simulates file writing. Create a function `prepare_content` that takes multiple strings and combines them into a single string with newlines.",
    starterCode: `fn prepare_content(lines: Vec<&str>) -> String {
    lines.join("\n")
}

fn main() {
    let lines = vec!["Line 1", "Line 2", "Line 3"];
    let content = prepare_content(lines);
    
    println!("Prepared content:");
    println!("{}", content);
}`,
    hint: "In real projects, use `std::fs::write(\"file.txt\", content)` to write files.",
    expectedOutput: "Prepared content:\nLine 1\nLine 2\nLine 3",
  },
  {
    id: 76,
    title: "Command Line Arguments",
    difficulty: "intermediate",
    category: "Chapter 12 - I/O Project",
    description: "Handle command line arguments in Rust programs.",
    instructions: "Simulate command line argument parsing. Create a function `parse_args` that takes a vector of strings and extracts a name and count.",
    starterCode: `fn parse_args(args: Vec<String>) -> Result<(String, usize), String> {
    if args.len() < 3 {
        return Err("Not enough arguments".to_string());
    }
    
    let name = args[1].clone();
    let count = args[2].parse::<usize>()
        .map_err(|_| "Invalid count".to_string())?;
    
    Ok((name, count))
}

fn main() {
    let args = vec!["program".to_string(), "Alice".to_string(), "5".to_string()];
    
    match parse_args(args) {
        Ok((name, count)) => {
            println!("Name: {}, Count: {}", name, count);
        }
        Err(e) => {
            println!("Error: {}", e);
        }
    }
}`,
    hint: "In real projects, use `std::env::args()` to get command line arguments.",
    expectedOutput: "Name: Alice, Count: 5",
  },
  {
    id: 77,
    title: "Error Handling in I/O",
    difficulty: "intermediate",
    category: "Chapter 12 - I/O Project",
    description: "Handle I/O errors properly in file operations.",
    instructions: "Create a function `safe_process` that simulates processing data with potential errors. Return Result with custom error types.",
    starterCode: `#[derive(Debug)]
enum ProcessError {
    InvalidInput,
    ProcessingFailed,
}

fn safe_process(input: &str) -> Result<String, ProcessError> {
    if input.is_empty() {
        return Err(ProcessError::InvalidInput);
    }
    
    if input.contains("error") {
        return Err(ProcessError::ProcessingFailed);
    }
    
    Ok(format!("Processed: {}", input.to_uppercase()))
}

fn main() {
    let inputs = vec!["hello", "", "error", "world"];
    
    for input in inputs {
        match safe_process(input) {
            Ok(result) => println!("{}", result),
            Err(e) => println!("Error processing '{}': {:?}", input, e),
        }
    }
}`,
    hint: "Use custom error types for I/O operations to provide meaningful error information.",
    expectedOutput: "Processed: HELLO\nError processing '': InvalidInput\nError processing 'error': ProcessingFailed\nProcessed: WORLD",
  },
  // Advanced Chapters 13-20 - Adding 20 challenges
  {
    id: 78,
    title: "Closures Basics",
    difficulty: "intermediate",
    category: "Chapter 13 - Iterators and Closures",
    description: "Learn about closures and their capture behavior.",
    instructions: "Create a closure that captures a variable from its environment. Use it with different inputs to demonstrate closure behavior.",
    starterCode: `fn main() {
    let x = 4;
    
    let equal_to_x = |z| z == x;
    
    println!("Is 4 equal to x? {}", equal_to_x(4));
    println!("Is 5 equal to x? {}", equal_to_x(5));
    
    let y = 5;
    let mut sum = 0;
    {
        let add_to_sum = |num: i32| sum += num;
        add_to_sum(y);
    }
    println!("Sum: {}", sum);
}`,
    hint: "Closures can capture variables from their environment. The way they capture depends on how the captured variable is used.",
    expectedOutput: "Is 4 equal to x? true\nIs 5 equal to x? false\nSum: 5",
  },
  {
    id: 79,
    title: "Iterator Basics",
    difficulty: "intermediate",
    category: "Chapter 13 - Iterators and Closures",
    description: "Learn about iterators and iterator adaptors.",
    instructions: "Create a vector and use iterator methods to transform and filter it. Use `map`, `filter`, and `collect` to process the data.",
    starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    let result: Vec<i32> = numbers
        .into_iter()
        .filter(|&x| x % 2 == 0)
        .map(|x| x * 2)
        .collect();
    
    println!("Result: {:?}", result);
}`,
    hint: "Iterator adaptors like `map` and `filter` are lazy. They don't do anything until a consuming adaptor like `collect` is called.",
    expectedOutput: "Result: [4, 8]",
  },
  {
    id: 80,
    title: "Performance: Iterators vs Loops",
    difficulty: "advanced",
    category: "Chapter 13 - Iterators and Closures",
    description: "Understand performance characteristics of iterators vs loops.",
    instructions: "Compare the performance of iterator-based code vs loop-based code. Both implementations should calculate the sum of squares of numbers 1 to 100.",
    starterCode: `fn main() {
    let numbers: Vec<i32> = (1..=100).collect();
    
    // Iterator approach
    let sum_iter: i32 = numbers.iter()
        .map(|&x| x * x)
        .sum();
    
    // Loop approach
    let mut sum_loop = 0;
    for &x in &numbers {
        sum_loop += x * x;
    }
    
    println!("Iterator sum: {}", sum_iter);
    println!("Loop sum: {}", sum_loop);
}`,
    hint: "Iterators often have the same performance as loops after compiler optimization, but can be more readable and composable.",
    expectedOutput: "Iterator sum: 338350\nLoop sum: 338350",
  },
  {
    id: 81,
    title: "Cargo Workspaces",
    difficulty: "intermediate",
    category: "Chapter 14 - Cargo and Crates.io",
    description: "Learn about Cargo workspaces for managing multiple related packages.",
    instructions: "Simulate a workspace by defining two 'modules' that depend on each other. Module A provides a function, Module B uses it.",
    starterCode: `// Simulating Module A
mod utils {
    pub fn greet(name: &str) -> String {
        format!("Hello, {}!", name)
    }
}

// Simulating Module B
mod app {
    use super::utils;
    
    pub fn run(name: &str) {
        println!("{}", utils::greet(name));
    }
}

fn main() {
    app::run("Workspace User");
}`,
    hint: "In real workspaces, you'd have a Cargo.toml with [workspace] members pointing to different crates.",
    expectedOutput: "Hello, Workspace User!",
  },
  {
    id: 82,
    title: "Publishing to Crates.io",
    difficulty: "intermediate",
    category: "Chapter 14 - Cargo and Crates.io",
    description: "Learn the process of publishing a crate to crates.io.",
    instructions: "Create a simple library crate structure with proper documentation. Add a function with documentation comments.",
    starterCode: `/// A simple math utility library
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

/// Multiplies two numbers
pub fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

fn main() {
    println!("2 + 3 = {}", add(2, 3));
    println!("2 * 3 = {}", multiply(2, 3));
}`,
    hint: "To publish, you need a Cargo.toml with proper metadata (name, version, authors, description, license) and documentation comments.",
    expectedOutput: "2 + 3 = 5\n2 * 3 = 6",
  },
  {
    id: 83,
    title: "Box for Heap Allocation",
    difficulty: "intermediate",
    category: "Chapter 15 - Smart Pointers",
    description: "Learn about Box for heap allocation.",
    instructions: "Use Box to store data on the heap. Create a recursive data structure (a simple linked list node) using Box to enable recursive types.",
    starterCode: `enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    
    // This is a simplified example - in real usage you'd implement methods to traverse the list
    println!("Created a linked list with Box");
}`,
    hint: "Box provides heap allocation and enables recursive types by having a known size at compile time.",
    expectedOutput: "Created a linked list with Box",
  },
  {
    id: 84,
    title: "Rc for Reference Counting",
    difficulty: "advanced",
    category: "Chapter 15 - Smart Pointers",
    description: "Learn about Rc for multiple ownership.",
    instructions: "Use Rc to enable multiple ownership of data. Create a structure where two owners share the same data. Demonstrate the reference counting behavior.",
    starterCode: `use std::rc::Rc;

struct SharedData {
    value: i32,
}

fn main() {
    let data = Rc::new(SharedData { value: 42 });
    
    println!("Reference count: {}", Rc::strong_count(&data));
    
    let data_clone1 = Rc::clone(&data);
    println!("After first clone: {}", Rc::strong_count(&data));
    
    let data_clone2 = Rc::clone(&data);
    println!("After second clone: {}", Rc::strong_count(&data));
    
    println!("Value: {}", data.value);
}`,
    hint: "Rc enables multiple ownership through reference counting. Use `Rc::clone()` to create new references.",
    expectedOutput: "Reference count: 1\nAfter first clone: 2\nAfter second clone: 3\nValue: 42",
  },
  {
    id: 85,
    title: "RefCell for Interior Mutability",
    difficulty: "advanced",
    category: "Chapter 15 - Smart Pointers",
    description: "Learn about RefCell for interior mutability pattern.",
    instructions: "Use RefCell to achieve interior mutability. Create a struct with a RefCell field that can be modified even when the struct itself is immutable.",
    starterCode: `use std::cell::RefCell;

struct Messenger {
    message: RefCell<String>,
}

impl Messenger {
    fn new(message: &str) -> Self {
        Messenger {
            message: RefCell::new(message.to_string()),
        }
    }
    
    fn send(&self, new_message: &str) {
        let mut msg = self.message.borrow_mut();
        *msg = new_message.to_string();
    }
    
    fn read(&self) -> String {
        self.message.borrow().clone()
    }
}

fn main() {
    let messenger = Messenger::new("Initial message");
    
    println!("Before: {}", messenger.read());
    messenger.send("Updated message");
    println!("After: {}", messenger.read());
}`,
    hint: "RefCell enforces borrowing rules at runtime instead of compile time, allowing interior mutability.",
    expectedOutput: "Before: Initial message\nAfter: Updated message",
  },
  {
    id: 86,
    title: "Reference Cycles",
    difficulty: "advanced",
    category: "Chapter 15 - Smart Pointers",
    description: "Understand and prevent reference cycles with Rc<RefCell>.",
    instructions: "Create a potential reference cycle scenario using Rc<RefCell>. Show how to break the cycle by using Weak.",
    starterCode: `use std::rc::{Rc, Weak};
use std::cell::RefCell;

struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });
    
    println!("Leaf strong count: {}", Rc::strong_count(&leaf));
    println!("Leaf weak count: {}", Rc::weak_count(&leaf));
    
    // In a real scenario, you'd create a parent that references the leaf
    println!("Reference cycles can cause memory leaks. Use Weak to break cycles.");
}`,
    hint: "Reference cycles cause memory leaks. Use Weak to create non-owning references.",
    expectedOutput: "Leaf strong count: 1\nLeaf weak count: 0\nReference cycles can cause memory leaks. Use Weak to break cycles.",
  },
  {
    id: 87,
    title: "Threads Basics",
    difficulty: "intermediate",
    category: "Chapter 16 - Fearless Concurrency",
    description: "Learn to create and manage threads in Rust.",
    instructions: "Create multiple threads that perform work concurrently. Use `thread::spawn` to create threads and `join` to wait for them to complete.",
    starterCode: `use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..=3 {
            println!("Thread 1: {}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    
    for i in 1..=3 {
        println!("Main thread: {}", i);
        thread::sleep(Duration::from_millis(1));
    }
    
    handle.join().unwrap();
}`,
    hint: "Use `thread::spawn` to create new threads. The closure takes ownership of captured variables by default.",
    expectedOutput: "Main thread: 1\nThread 1: 1\nMain thread: 2\nThread 1: 2\nMain thread: 3\nThread 1: 3",
  },
  {
    id: 88,
    title: "Message Passing with Channels",
    difficulty: "intermediate",
    category: "Chapter 16 - Fearless Concurrency",
    description: "Use channels for message passing between threads.",
    instructions: "Create a channel using `mpsc`. Spawn a thread that sends values through the channel. The main thread receives and processes them.",
    starterCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];
        
        for val in vals {
            tx.send(val).unwrap();
        }
    });
    
    for received in rx {
        println!("Got: {}", received);
    }
}`,
    hint: "Channels provide a way to send messages between threads. `mpsc` stands for multiple producer, single consumer.",
    expectedOutput: "Got: hi\nGot: from\nGot: the\nGot: the thread",
  },
  {
    id: 89,
    title: "Shared State with Mutex",
    difficulty: "advanced",
    category: "Chapter 16 - Fearless Concurrency",
    description: "Use Mutex for shared mutable state across threads.",
    instructions: "Create a Mutex to share a counter between multiple threads. Each thread increments the counter. Use Arc to enable multiple ownership of the Mutex.",
    starterCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    
    for _ in 0..5 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("Result: {}", *counter.lock().unwrap());
}`,
    hint: "Mutex allows only one thread at a time to access the data. Arc enables multiple ownership across threads.",
    expectedOutput: "Result: 5",
  },
  {
    id: 90,
    title: "Trait Objects for Polymorphism",
    difficulty: "intermediate",
    category: "Chapter 17 - OOP",
    description: "Use trait objects to achieve runtime polymorphism.",
    instructions: "Define a trait `Draw` with a method `draw`. Implement it for `Button` and `TextField`. Create a vector of trait objects and call draw on each element.",
    starterCode: `trait Draw {
    fn draw(&self);
}

struct Button {
    width: u32,
    height: u32,
    label: String,
}

impl Draw for Button {
    fn draw(&self) {
        println!("Drawing button: {} ({}x{})", self.label, self.width, self.height);
    }
}

struct TextField {
    placeholder: String,
}

impl Draw for TextField {
    fn draw(&self) {
        println!("Drawing text field with placeholder: {}", self.placeholder);
    }
}

fn main() {
    let components: Vec<Box<dyn Draw>> = vec![
        Box::new(Button { width: 50, height: 10, label: "Submit".to_string() }),
        Box::new(TextField { placeholder: "Enter name".to_string() }),
    ];
    
    for component in components {
        component.draw();
    }
}`,
    hint: "Trait objects (`dyn Trait`) enable runtime polymorphism. Use `Box<dyn Trait>` to store different types implementing the same trait.",
    expectedOutput: "Drawing button: Submit (50x10)\nDrawing text field with placeholder: Enter name",
  },
  {
    id: 91,
    title: "Object-Oriented Design Patterns",
    difficulty: "advanced",
    category: "Chapter 17 - OOP",
    description: "Implement classic OOP patterns using Rust's type system.",
    instructions: "Implement the State pattern using Rust. Create a blog post struct that can be in different states (Draft, Review, Published). Use enums to represent states.",
    starterCode: `struct Post {
    content: String,
    state: PostState,
}

enum PostState {
    Draft,
    Review,
    Published,
}

impl Post {
    fn new(content: String) -> Self {
        Post { content, state: PostState::Draft }
    }
    
    fn request_review(&mut self) {
        if let PostState::Draft = self.state {
            self.state = PostState::Review;
        }
    }
    
    fn approve(&mut self) {
        if let PostState::Review = self.state {
            self.state = PostState::Published;
        }
    }
}

fn main() {
    let mut post = Post::new("My first post".to_string());
    println!("State: {:?}", post.state);
    
    post.request_review();
    println!("State: {:?}", post.state);
    
    post.approve();
    println!("State: {:?}", post.state);
}`,
    hint: "The State pattern in Rust can be implemented using enums, each with trade-offs.",
    expectedOutput: "State: Draft\nState: Review\nState: Published",
  },
  {
    id: 92,
    title: "Pattern Matching Advanced",
    difficulty: "intermediate",
    category: "Chapter 18 - Patterns and Matching",
    description: "Master advanced pattern matching techniques.",
    instructions: "Use advanced patterns: ranges, guards, @ bindings, and destructuring. Create a function that matches on complex patterns.",
    starterCode: `fn describe_point(point: (i32, i32)) -> &'static str {
    match point {
        (0, 0) => "origin",
        (x, 0) => "on x-axis",
        (0, y) => "on y-axis",
        (x, y) if x == y => "diagonal",
        (x, y) => "other",
    }
}

fn main() {
    let points = [(0, 0), (5, 0), (0, 3), (4, 4), (2, 3)];
    
    for point in points {
        println!("{:?} is {}", point, describe_point(point));
    }
}`,
    hint: "Patterns can include ranges (`..=`), guards (`if`), @ bindings (`x @ 5..=10`), and complex destructuring.",
    expectedOutput: "(0, 0) is origin\n(5, 0) is on x-axis\n(0, 3) is on y-axis\n(4, 4) is diagonal\n(2, 3) is other",
  },
  {
    id: 93,
    title: "Pattern Syntax",
    difficulty: "intermediate",
    category: "Chapter 18 - Patterns and Matching",
    description: "Learn all pattern syntax in Rust.",
    instructions: "Demonstrate different pattern syntaxes: literals, variables, wildcards, ranges, structs, enums, and references.",
    starterCode: `struct Point {
    x: i32,
    y: i32,
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn main() {
    let x = 1;
    
    match x {
        1 => println!("one"),
        2 => println!("two"),
        _ => println!("anything"),
    }
    
    let point = Point { x: 0, y: 7 };
    match point {
        Point { x, y: 0 } => println!("On x axis at {}", x),
        Point { x: 0, y } => println!("On y axis at {}", y),
        Point { x, y } => println!("At ({}, {})", x, y),
    }
}`,
    hint: "Patterns can match on literals, variables, wildcards, ranges, struct fields, enum variants, and more.",
    expectedOutput: "one\nOn y axis at 7",
  },
  {
    id: 94,
    title: "Unsafe Rust",
    difficulty: "advanced",
    category: "Chapter 19 - Advanced Features",
    description: "Learn when and how to use unsafe Rust.",
    instructions: "Demonstrate unsafe Rust features: dereferencing raw pointers, calling unsafe functions, and implementing unsafe traits.",
    starterCode: `fn main() {
    let mut num = 5;
    
    // Create a raw pointer
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;
    
    unsafe {
        println!("r1 is: {}", *r1);
        println!("r2 is: {}", *r2);
        *r2 = 10;
    }
    
    println!("num is now: {}", num);
}`,
    hint: "Unsafe Rust gives you more power but requires manual memory safety. Use it sparingly and encapsulate it in safe abstractions.",
    expectedOutput: "r1 is: 5\nr2 is: 5\nnum is now: 10",
  },
  {
    id: 95,
    title: "Advanced Traits",
    difficulty: "advanced",
    category: "Chapter 19 - Advanced Features",
    description: "Learn advanced trait features: associated types, default type parameters, and trait objects.",
    instructions: "Define a trait with an associated type. Implement it for multiple types. Demonstrate how associated types differ from generic type parameters.",
    starterCode: `trait Iterator {
    type Item;
    
    fn next(&mut self) -> Option<Self::Item>;
}

struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;
    
    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    let mut counter = Counter::new();
    
    while let Some(value) = counter.next() {
        println!("Got: {}", value);
    }
}`,
    hint: "Associated types specify a concrete type for each implementation, while generic type parameters can be different for each use.",
    expectedOutput: "Got: 1\nGot: 2\nGot: 3\nGot: 4\nGot: 5",
  },
  {
    id: 96,
    title: "TCP Listener",
    difficulty: "advanced",
    category: "Chapter 20 - Web Server",
    description: "Learn to create a TCP listener for network programming.",
    instructions: "This challenge simulates network programming. Create a function that simulates handling incoming connections.",
    starterCode: `fn handle_connection(stream_number: u32) {
    println!("Handling connection {}", stream_number);
    println!("Processing request...");
    println!("Sending response...");
    println!("Connection {} closed", stream_number);
}

fn main() {
    let connections = vec![1, 2, 3];
    
    for conn in connections {
        handle_connection(conn);
    }
}`,
    hint: "In real network programming, you'd use `std::net::TcpListener` to accept connections and `TcpStream` to handle them.",
    expectedOutput: "Handling connection 1\nProcessing request...\nSending response...\nConnection 1 closed\nHandling connection 2\nProcessing request...\nSending response...\nConnection 2 closed\nHandling connection 3\nProcessing request...\nSending response...\nConnection 3 closed",
  },
  {
    id: 97,
    title: "HTTP Request Parsing",
    difficulty: "advanced",
    category: "Chapter 20 - Web Server",
    description: "Parse HTTP requests in a web server context.",
    instructions: "This challenge simulates HTTP request parsing. Create a function that takes a raw HTTP request string and extracts the method, path, and headers.",
    starterCode: `fn parse_request(request: &str) -> (String, String, Vec<String>) {
    let lines: Vec<&str> = request.lines().collect();
    let first_line: Vec<&str> = lines[0].split_whitespace().collect();
    
    let method = first_line[0].to_string();
    let path = first_line[1].to_string();
    
    let headers: Vec<String> = lines[1..].iter().map(|s| s.to_string()).collect();
    
    (method, path, headers)
}

fn main() {
    let request = "GET /index.html HTTP/1.1\nHost: localhost\nUser-Agent: Test";
    
    let (method, path, headers) = parse_request(request);
    
    println!("Method: {}", method);
    println!("Path: {}", path);
    println!("Headers: {:?}", headers);
}`,
    hint: "Real HTTP servers parse requests according to the HTTP specification, handling various edge cases and error conditions.",
    expectedOutput: "Method: GET\nPath: /index.html\nHeaders: [\"Host: localhost\", \"User-Agent: Test\"]",
  },
];
