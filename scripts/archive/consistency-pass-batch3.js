const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  { id: 114, starterCode: `fn main() {
    let mut s = String::from("hello");
    
    let r1 = &s;
    let r2 = &s;
    
    println!("Both immutable refs: {}, {}", r1, r2);
    
    // TODO: Demonstrate that you cannot create a mutable reference while immutable ones exist
    // let r3 = &mut s;  // This would violate borrowing rules
    todo!()
}` },
  { id: 116, starterCode: `fn main() {
    let s = String::from("hello world");
    
    // TODO: Create slices for "hello" and "world"
    let hello = /* &s[0..5] */;
    let world = /* &s[6..11] */;
    
    println!("First: {}", hello);
    println!("Second: {}", world);
    println!("Original: {}", s);
    todo!()
}` },
  { id: 118, starterCode: `fn main() {
    let numbers = vec![10, 20, 30, 40, 50];
    
    // TODO: Borrow elements from the vector
    let first = /* &numbers[0] */;
    println!("First: {}", first);
    
    for num in /* &numbers */ {
        if *num > 25 {
            println!("Greater than 25: {}", num);
        }
    }
    
    println!("Original: {:?}", numbers);
    todo!()
}` },
  { id: 119, starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    // TODO: Use .iter() to borrow while processing
    let doubled: Vec<i32> = numbers.iter()
        .map(|x| x * 2)
        .collect();
    
    println!("Original: {:?}", numbers);
    println!("Doubled: {:?}", doubled);
    todo!()
}` },
  { id: 120, starterCode: `struct Data {
    value: i32,
}

fn main() {
    let data = Data { value: 42 };
    
    let r1 = &data;
    let r2 = &data;
    
    println!("Multiple immutable refs: {}, {}", r1.value, r2.value);
    
    // TODO: Show why a mutable borrow would not be allowed here
    todo!()
}` },
  { id: 121, starterCode: `struct Person {
    name: String,
    age: u32,
}

fn main() {
    // TODO: Create a Person instance and print its fields
    let person = /* ... */;
    
    println!("Name: {}, Age: {}", person.name, person.age);
    todo!()
}` },
  { id: 125, starterCode: `struct Color(u8, u8, u8);

fn main() {
    let red = Color(255, 0, 0);
    
    // TODO: Destructure the tuple struct
    let Color(r, g, b) = /* ... */;
    println!("Red: R={}, G={}, B={}", r, g, b);
    todo!()
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
    todo!()
}` },
  { id: 127, starterCode: `struct Text<'a> {
    content: &'a str,
}

fn main() {
    let text = String::from("Hello, world!");
    
    // TODO: Create a struct that holds a reference into the string
    let excerpt = Text { content: /* &text[0..5] */ };
    
    println!("Excerpt: {}", excerpt.content);
    todo!()
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
    todo!()
}` },
  { id: 137, starterCode: `fn main() {
    let result: Result<i32, &str> = Err("Failed");
    
    // TODO: Use unwrap_or to provide a default
    let value = result.unwrap_or(/* default */);
    println!("With unwrap_or: {}", value);
    todo!()
}` },
  { id: 138, starterCode: `fn main() {
    let result: Result<i32, &str> = Ok(5);
    
    // TODO: Use .map() to transform the value
    let doubled = result.map(/* ... */);
    println!("Map result: {:?}", doubled);
    
    // TODO: Use .and_then() for chaining fallible operations
    todo!()
}` },
  { id: 139, starterCode: `fn main() {
    let mut numbers = vec![1, 2, 3];
    
    // TODO: Use push and pop
    numbers.push(4);
    println!("After push: {:?}", numbers);
    
    numbers.pop();
    println!("After pop: {:?}", numbers);
    todo!()
}` },
  { id: 140, starterCode: `fn main() {
    let numbers = vec![10, 20, 30, 40, 50];
    
    // TODO: Iterate by index and by reference
    println!("By reference:");
    for num in /* &numbers */ {
        println!("  {}", num);
    }
    todo!()
}` },
  { id: 141, starterCode: `fn main() {
    let mut numbers = vec![5, 2, 8, 1, 9, 3];
    
    // TODO: Sort ascending and descending
    numbers.sort();
    println!("Ascending: {:?}", numbers);
    todo!()
}` },
  { id: 142, starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // TODO: Use filter + collect
    let evens: Vec<i32> = numbers.into_iter()
        .filter(/* ... */)
        .collect();
    
    println!("Even numbers: {:?}", evens);
    todo!()
}` },
  { id: 143, starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    // TODO: Use map to square each element
    let squared: Vec<i32> = numbers.iter()
        .map(/* ... */)
        .collect();
    
    println!("Squared: {:?}", squared);
    todo!()
}` },
  { id: 144, starterCode: `fn main() {
    let numbers = vec![10, 20, 30, 40, 50];
    
    // TODO: Use find, contains, and position
    let found = numbers.iter().find(/* ... */);
    println!("First > 25: {:?}", found);
    todo!()
}` },
  { id: 145, starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // TODO: Use chunks()
    let chunks: Vec<&[i32]> = numbers.chunks(3).collect();
    
    for (i, chunk) in chunks.iter().enumerate() {
        println!("Chunk {}: {:?}", i, chunk);
    }
    todo!()
}` },
  { id: 146, starterCode: `fn main() {
    let s1 = String::from("Hello");
    let s2 = String::from(" ");
    let s3 = String::from("World");
    
    // TODO: Demonstrate different ways to concatenate strings
    let result = /* ... */;
    println!("Result: {}", result);
    todo!()
}` },
  { id: 147, starterCode: `fn main() {
    let s = String::from("  hello   world  ");
    
    // TODO: Use trim and split_whitespace
    let trimmed = s.trim();
    let words: Vec<&str> = trimmed.split_whitespace().collect();
    
    println!("Words: {:?}", words);
    todo!()
}` },
  { id: 148, starterCode: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    
    // TODO: Insert, get, and remove from HashMap
    scores.insert(String::from("Alice"), 95);
    
    println!("Alice: {:?}", scores.get("Alice"));
    todo!()
}` },
  { id: 149, starterCode: `use std::collections::HashMap;

fn main() {
    let mut word_count = HashMap::new();
    
    // TODO: Use the entry API (.or_insert)
    *word_count.entry("hello").or_insert(0) += 1;
    
    println!("{:?}", word_count);
    todo!()
}` },
  { id: 150, starterCode: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    scores.insert(String::from("Alice"), 95);
    scores.insert(String::from("Bob"), 87);
    
    // TODO: Iterate over the HashMap
    for (name, score) in &scores {
        println!("{}: {}", name, score);
    }
    todo!()
}` },
  { id: 151, starterCode: `enum Direction {
    North,
    South,
    East,
    West,
}

fn main() {
    let direction = Direction::North;
    
    // TODO: Match on the enum
    match direction {
        // ...
    }
    todo!()
}` },
];

async function main() {
  console.log("Running final consistency pass batch...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Updated #" + fix.id);
  }
  console.log("\n=== Consistency pass complete! ===");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
