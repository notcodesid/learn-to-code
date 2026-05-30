const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  // 121-130 Structs section
  { id: 121, starterCode: `struct Person {
    name: String,
    age: u32,
}

fn main() {
    // TODO: Create a Person instance and print its fields
    let person = /* ... */;
    
    println!("Name: {}, Age: {}", person.name, person.age);
}` },
  { id: 122, starterCode: `struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    fn area(&self) -> f64 {
        // TODO
        todo!()
    }
    
    fn perimeter(&self) -> f64 {
        // TODO
        todo!()
    }
}

fn main() {
    let rect = Rectangle { width: 10.0, height: 5.0 };
    println!("Area: {}", rect.area());
    println!("Perimeter: {}", rect.perimeter());
}` },
  { id: 123, starterCode: `struct Point {
    x: f64,
    y: f64,
}

impl Point {
    fn new(x: f64, y: f64) -> Self {
        // TODO
        todo!()
    }
    
    fn origin() -> Self {
        // TODO
        todo!()
    }
}

fn main() {
    let p1 = Point::new(3.0, 4.0);
    let p2 = Point::origin();
    println!("Point 1: ({}, {})", p1.x, p1.y);
    println!("Point 2: ({}, {})", p2.x, p2.y);
}` },
  { id: 124, starterCode: `struct Counter {
    count: i32,
}

impl Counter {
    fn new() -> Self {
        // TODO
        todo!()
    }
    
    fn increment(&mut self) {
        // TODO
        todo!()
    }
    
    fn reset(&mut self) {
        // TODO
        todo!()
    }
}

fn main() {
    let mut counter = Counter::new();
    counter.increment();
    counter.increment();
    println!("Count: {}", counter.count);
    counter.reset();
    println!("After reset: {}", counter.count);
}` },
  { id: 125, starterCode: `struct Color(u8, u8, u8);

fn main() {
    let red = Color(255, 0, 0);
    
    // TODO: Destructure the tuple struct
    let Color(r, g, b) = /* ... */;
    println!("Red: R={}, G={}, B={}", r, g, b);
}` },
  { id: 126, starterCode: `struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p1 = Point { x: 1, y: 2 };
    
    // TODO: Use struct update syntax
    let p2 = Point { x: 3, .. /* p1 */ };
    
    println!("Point 2: ({}, {})", p2.x, p2.y);
}` },
  { id: 127, starterCode: `struct Text<'a> {
    content: &'a str,
}

fn main() {
    let text = String::from("Hello, world!");
    
    // TODO: Create a struct that holds a reference into the string
    let excerpt = Text { content: /* &text[0..5] */ };
    
    println!("Excerpt: {}", excerpt.content);
}` },
  { id: 128, starterCode: `struct Calculator {
    value: f64,
}

impl Calculator {
    fn new(value: f64) -> Self { /* TODO */ todo!() }
    fn add(&mut self, amount: f64) { /* TODO */ todo!() }
    fn multiply(&mut self, factor: f64) { /* TODO */ todo!() }
    fn get_value(&self) -> f64 { /* TODO */ todo!() }
}

fn main() {
    let mut calc = Calculator::new(10.0);
    calc.add(5.0);
    calc.multiply(2.0);
    println!("Result: {}", calc.get_value());
}` },
  { id: 129, starterCode: `struct User {
    name: String,
    email: Option<String>,
}

fn main() {
    let user = User {
        name: String::from("Alice"),
        email: Some(String::from("alice@example.com")),
    };
    
    // TODO: Handle the Option field properly
    println!("User: {}", user.name);
}` },
  { id: 130, starterCode: `struct Team {
    members: Vec<String>,
}

impl Team {
    fn new() -> Self { /* TODO */ todo!() }
    fn add_member(&mut self, name: String) { /* TODO */ todo!() }
    fn count(&self) -> usize { /* TODO */ todo!() }
}

fn main() {
    let mut team = Team::new();
    team.add_member(String::from("Alice"));
    println!("Team size: {}", team.count());
}` },

  // 131-136 Error handling section
  { id: 131, starterCode: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    // TODO: Return Ok or Err appropriately
    todo!()
}

fn main() {
    let result1 = divide(10.0, 2.0);
    let result2 = divide(10.0, 0.0);
    
    match result1 { Ok(v) => println!("Success: {}", v), Err(e) => println!("Error: {}", e) }
    match result2 { Ok(v) => println!("Success: {}", v), Err(e) => println!("Error: {}", e) }
}` },
  { id: 132, starterCode: `fn parse_number(s: &str) -> Result<i32, String> {
    // TODO
    todo!()
}

fn double_if_positive(s: &str) -> Result<i32, String> {
    // TODO: Use the ? operator
    todo!()
}

fn main() {
    println!("Result: {:?}", double_if_positive("5"));
}` },
  { id: 133, starterCode: `#[derive(Debug)]
enum MathError {
    DivisionByZero,
}

fn safe_divide(a: f64, b: f64) -> Result<f64, MathError> {
    // TODO: Return custom error type
    todo!()
}

fn main() {
    println!("{:?}", safe_divide(10.0, 0.0));
}` },
  { id: 134, starterCode: `fn validate_positive(num: i32) {
    // TODO: Use panic for invalid input
    todo!()
}

fn safe_divide(a: f64, b: f64) -> Result<f64, String> {
    // TODO: Prefer Result over panic
    todo!()
}

fn main() {
    validate_positive(5);
    println!("{:?}", safe_divide(10.0, 0.0));
}` },
  { id: 135, starterCode: `#[derive(Debug)]
enum AppError {
    ParseError(String),
}

impl From<std::num::ParseIntError> for AppError {
    fn from(error: std::num::ParseIntError) -> Self {
        // TODO
        todo!()
    }
}

fn parse_number(s: &str) -> Result<i32, AppError> {
    // TODO: Use ? with From trait
    todo!()
}

fn main() {
    println!("{:?}", parse_number("42"));
}` },
  { id: 136, starterCode: `fn read_number(s: &str) -> Result<i32, String> {
    // TODO
    todo!()
}

fn validate_positive(num: i32) -> Result<i32, String> {
    // TODO
    todo!()
}

fn process_number(s: &str) -> Result<i32, String> {
    // TODO: Chain errors using ?
    todo!()
}

fn main() {
    println!("{:?}", process_number("42"));
}` },
];

async function main() {
  console.log("Fixing 121-136 (structs + error handling duplicates)...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Fixed #" + fix.id);
  }
  console.log("\nBatch 121-136 complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
