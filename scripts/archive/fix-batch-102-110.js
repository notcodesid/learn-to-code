const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  {
    id: 102,
    starterCode: `fn take_and_modify(s: String) -> String {
    // TODO: Take ownership, modify the string, and return it
    todo!()
}

fn main() {
    let original = String::from("hello");
    let result = take_and_modify(original);
    
    // TODO: original should no longer be usable here after the move
    println!("Result: {}", result);
}`
  },
  {
    id: 103,
    starterCode: `fn main() {
    let s1 = String::from("hello");
    
    // TODO: Clone instead of moving so both s1 and s2 are usable
    let s2 = /* clone here */;
    
    println!("s1: {}", s1);
    println!("s2: {}", s2);
}`
  },
  {
    id: 104,
    starterCode: `fn main() {
    let x = 5;
    let y = x; // i32 is Copy
    
    println!("x: {}, y: {}", x, y);
    
    let s1 = String::from("hello");
    // TODO: Move s1 into s2. What happens if you try to use s1 after?
    let s2 = s1;
    
    println!("s2: {}", s2);
}`
  },
  {
    id: 105,
    starterCode: `struct Person {
    name: String,
    age: i32,
}

fn main() {
    let person1 = Person {
        name: String::from("Alice"),
        age: 30,
    };
    
    // TODO: Move person1 into person2
    let person2 = /* ... */;
    
    println!("Person: {}, age {}", person2.name, person2.age);
}`
  },
  {
    id: 106,
    starterCode: `struct Data {
    id: i32,
    value: String,
}

fn main() {
    let data = Data {
        id: 1,
        value: String::from("important"),
    };
    
    // TODO: Partially move only the value field
    let moved_value = /* ... */;
    
    println!("ID: {}", data.id);
    println!("Moved value: {}", moved_value);
}`
  },
  {
    id: 107,
    starterCode: `fn main() {
    let numbers = vec![1, 2, 3];
    
    // TODO: Use into_iter() to take ownership and consume the vector
    for num in /* ... */ {
        println!("{}", num);
    }
}`
  },
  {
    id: 108,
    starterCode: `fn create_string() -> String {
    // TODO: Return an owned String
    todo!()
}

fn append_world(mut s: String) -> String {
    // TODO: Append " world" and return the string
    todo!()
}

fn main() {
    let s1 = create_string();
    let s2 = append_world(s1);
    
    println!("Result: {}", s2);
}`
  },
  {
    id: 109,
    starterCode: `fn main() {
    let original = String::from("shared data");
    
    // TODO: Use .clone() to allow multiple owners
    let owner1 = /* clone */;
    let owner2 = /* clone */;
    let owner3 = original;
    
    println!("Owner 1: {}", owner1);
    println!("Owner 2: {}", owner2);
    println!("Owner 3: {}", owner3);
}`
  },
  {
    id: 110,
    starterCode: `enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn main() {
    let message = Message::Write(String::from("hello"));
    
    match message {
        Message::Write(text) => {
            // TODO: Handle the Write variant (text is moved out here)
            println!("Text: {}", text);
        }
        _ => println!("Other message"),
    }
}`
  }
];

async function main() {
  console.log("Fixing 102-110 (ownership duplicates)...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Fixed #" + fix.id);
  }
  console.log("\nBatch 102-110 complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
