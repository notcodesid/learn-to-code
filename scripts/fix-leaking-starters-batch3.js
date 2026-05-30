const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  { id: 51, starterCode: `fn main() {
    let mut numbers = vec![1, 2, 3];
    
    // TODO: Use push to add 4 and 5
    
    // TODO: Print the vector after pushing
    
    // TODO: Use pop and print what was removed
    
    // TODO: Print the final vector
}` },
  { id: 52, starterCode: `fn main() {
    let mut s = String::from("hello");
    
    // TODO: Create a slice of the first 3 characters
    
    println!("Original: {}", s);
    println!("Slice: {}", /* your slice */);
    
    // TODO: Push a character and a string slice to s
}` },
  { id: 53, starterCode: `use std::collections::HashMap;

fn main() {
    // TODO: Create a HashMap with some word counts
    
    // TODO: Print all entries
    
    // TODO: Get the count for a specific word, handling the Option
}` },
  { id: 54, starterCode: `use std::collections::HashMap;

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let mut letters = HashMap::new();
    
    // TODO: Insert some key-value pairs into letters
    
    // TODO: Iterate and print the vector
    
    // TODO: Iterate and print the HashMap
}` },
  { id: 55, starterCode: `use std::collections::HashMap;

fn main() {
    let large_vec: Vec<i32> = (0..1000).collect();
    let mut large_map = HashMap::new();
    
    // TODO: Populate the map with squares or doubled values
    
    // TODO: Print the size of both collections
}` },
  { id: 59, starterCode: `fn parse_number(s: &str) -> Result<i32, String> {
    // TODO: Parse the string to i32, map the error nicely
    todo!()
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
}` },
  { id: 60, starterCode: `fn read_and_parse(s: &str) -> Result<i32, String> {
    // TODO: Return early error if empty, otherwise parse with ?
    todo!()
}

fn main() {
    println!("{:?}", read_and_parse("123"));
    println!("{:?}", read_and_parse(""));
}` },
  { id: 61, starterCode: `#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeRoot,
}

fn safe_divide(a: f64, b: f64) -> Result<f64, MathError> {
    // TODO: Return Err on division by zero
    todo!()
}

fn main() {
    println!("{:?}", safe_divide(10.0, 2.0));
    println!("{:?}", safe_divide(10.0, 0.0));
}` },
  { id: 62, starterCode: `fn panic_if_negative(n: i32) {
    // TODO: panic if n < 0
    todo!()
}

fn check_if_negative(n: i32) -> Result<(), String> {
    // TODO: return Err if negative, Ok(()) otherwise
    todo!()
}

fn main() {
    // Test both functions
}` },
  { id: 63, starterCode: `#[derive(Debug)]
enum AppError {
    ParseError(String),
}

impl From<String> for AppError {
    fn from(error: String) -> Self {
        // TODO
        todo!()
    }
}

fn parse_app_number(s: &str) -> Result<i32, AppError> {
    // TODO: use ? to convert the error
    todo!()
}

fn main() {
    println!("{:?}", parse_app_number("42"));
}` },
  { id: 64, starterCode: `#[derive(Debug)]
enum ValidationError {
    Empty,
    TooLong,
    NotPositive,
}

fn validate_input(s: &str) -> Result<i32, ValidationError> {
    // TODO: return appropriate errors for each case
    todo!()
}

fn main() {
    println!("{:?}", validate_input("42"));
    println!("{:?}", validate_input(""));
}` },
  { id: 65, starterCode: `fn largest<T: PartialOrd>(list: &[T]) -> &T {
    // TODO: implement the generic largest function
    todo!()
}

fn main() {
    let numbers = [1, 5, 2, 8, 3];
    let floats = [1.1, 5.5, 2.2, 8.8, 3.3];
    
    println!("Largest int: {}", largest(&numbers));
    println!("Largest float: {}", largest(&floats));
}` },
  { id: 70, starterCode: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    // TODO: return the longer one
    todo!()
}

fn main() {
    let string1 = String::from("long string");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
        println!("Longest: {}", result);
    }
}` },
];

async function main() {
  console.log("Fixing batch 51-70 (selected)...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Fixed #" + fix.id);
  }
  console.log("\nBatch 3 complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
