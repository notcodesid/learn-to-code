const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  { id: 137, starterCode: `fn main() {
    let result: Result<i32, &str> = Err("Failed");
    
    // TODO: Use unwrap_or to provide a default
    let value = result.unwrap_or(/* default */);
    println!("With unwrap_or: {}", value);
}` },
  { id: 138, starterCode: `fn main() {
    let result: Result<i32, &str> = Ok(5);
    
    // TODO: Use .map() to transform the value
    let doubled = result.map(/* ... */);
    println!("Map result: {:?}", doubled);
    
    // TODO: Use .and_then() for chaining fallible operations
}` },
  { id: 139, starterCode: `fn main() {
    let mut numbers = vec![1, 2, 3];
    
    // TODO: Use push and pop
    numbers.push(4);
    println!("After push: {:?}", numbers);
    
    numbers.pop();
    println!("After pop: {:?}", numbers);
}` },
  { id: 140, starterCode: `fn main() {
    let numbers = vec![10, 20, 30, 40, 50];
    
    // TODO: Iterate by index and by reference
    println!("By reference:");
    for num in /* &numbers */ {
        println!("  {}", num);
    }
}` },
  { id: 141, starterCode: `fn main() {
    let mut numbers = vec![5, 2, 8, 1, 9, 3];
    
    // TODO: Sort ascending and descending
    numbers.sort();
    println!("Ascending: {:?}", numbers);
}` },
  { id: 142, starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // TODO: Use filter + collect
    let evens: Vec<i32> = numbers.into_iter()
        .filter(/* ... */)
        .collect();
    
    println!("Even numbers: {:?}", evens);
}` },
  { id: 143, starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    // TODO: Use map to square each element
    let squared: Vec<i32> = numbers.iter()
        .map(/* ... */)
        .collect();
    
    println!("Squared: {:?}", squared);
}` },
  { id: 144, starterCode: `fn main() {
    let numbers = vec![10, 20, 30, 40, 50];
    
    // TODO: Use find, contains, and position
    let found = numbers.iter().find(/* ... */);
    println!("First > 25: {:?}", found);
}` },
  { id: 145, starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // TODO: Use chunks()
    let chunks: Vec<&[i32]> = numbers.chunks(3).collect();
    
    for (i, chunk) in chunks.iter().enumerate() {
        println!("Chunk {}: {:?}", i, chunk);
    }
}` },
  { id: 146, starterCode: `fn main() {
    let s1 = String::from("Hello");
    let s2 = String::from(" ");
    let s3 = String::from("World");
    
    // TODO: Demonstrate different ways to concatenate strings
    let result = /* ... */;
    println!("Result: {}", result);
}` },
  { id: 147, starterCode: `fn main() {
    let s = String::from("  hello   world  ");
    
    // TODO: Use trim and split_whitespace
    let trimmed = s.trim();
    let words: Vec<&str> = trimmed.split_whitespace().collect();
    
    println!("Words: {:?}", words);
}` },
  { id: 148, starterCode: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    
    // TODO: Insert, get, and remove from HashMap
    scores.insert(String::from("Alice"), 95);
    
    println!("Alice: {:?}", scores.get("Alice"));
}` },
  { id: 149, starterCode: `use std::collections::HashMap;

fn main() {
    let mut word_count = HashMap::new();
    
    // TODO: Use the entry API (.or_insert)
    *word_count.entry("hello").or_insert(0) += 1;
    
    println!("{:?}", word_count);
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
}` },
  { id: 152, starterCode: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u32 {
    // TODO: Implement the match
    todo!()
}

fn main() {
    println!("Penny: {} cents", value_in_cents(Coin::Penny));
    println!("Quarter: {} cents", value_in_cents(Coin::Quarter));
}` },
];

async function main() {
  console.log("Fixing final batch 137-152...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Fixed #" + fix.id);
  }
  console.log("\n=== ALL BATCHES COMPLETE ===");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
