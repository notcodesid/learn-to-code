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
];
