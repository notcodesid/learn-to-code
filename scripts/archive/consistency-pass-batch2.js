const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  { id: 86, starterCode: `enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    // TODO: Create a linked list using Box (Cons / Nil)
    let list = /* ... */;
    
    println!("Created a linked list with Box");
    todo!()
}` },
  { id: 87, starterCode: `use std::rc::Rc;

struct SharedData {
    value: i32,
}

fn main() {
    let data = Rc::new(SharedData { value: 42 });
    
    println!("Reference count: {}", Rc::strong_count(&data));
    
    // TODO: Clone the Rc a couple of times and print the counts
    
    println!("Value: {}", data.value);
    todo!()
}` },
  { id: 89, starterCode: `use std::rc::{Rc, Weak};
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
    
    // TODO: Create a parent node that owns the leaf and set up the parent reference using Weak
    println!("Reference cycles example - use Weak to avoid memory leaks.");
    todo!()
}` },
  { id: 90, starterCode: `use std::thread;
use std::time::Duration;

fn main() {
    // TODO: Spawn a thread that prints numbers
    let handle = thread::spawn(|| {
        // ...
    });
    
    // Main thread also prints numbers
    
    handle.join().unwrap();
    todo!()
}` },
  { id: 91, starterCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        // TODO: Send several messages through the channel
    });
    
    // TODO: Receive and print the messages
    todo!()
}` },
  { id: 95, starterCode: `fn describe_point(point: (i32, i32)) -> &'static str {
    match point {
        // TODO: Handle (0,0), x-axis, y-axis, diagonal with guard, and other
        _ => "other",
    }
}

fn main() {
    let points = [(0, 0), (5, 0), (0, 3), (4, 4), (2, 3)];
    
    for point in points {
        println!("{:?} is {}", point, describe_point(point));
    }
    todo!()
}` },
  { id: 96, starterCode: `struct Point {
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
        // TODO: Use literal patterns
    }
    
    let point = Point { x: 0, y: 7 };
    match point {
        // TODO: Use struct destructuring patterns
    }
    todo!()
}` },
  { id: 97, starterCode: `fn main() {
    let mut num = 5;
    
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;
    
    unsafe {
        // TODO: Dereference the raw pointers safely inside unsafe block
        println!("r1 is: {}", /* ... */);
        *r2 = 10;
    }
    
    println!("num is now: {}", num);
    todo!()
}` },
  { id: 103, starterCode: `fn main() {
    let s1 = String::from("hello");
    
    // TODO: Clone instead of moving so both s1 and s2 are usable
    let s2 = /* clone here */;
    
    println!("s1: {}", s1);
    println!("s2: {}", s2);
    todo!()
}` },
  { id: 104, starterCode: `fn main() {
    let x = 5;
    let y = x; // i32 is Copy
    
    println!("x: {}, y: {}", x, y);
    
    let s1 = String::from("hello");
    // TODO: Move s1 into s2. What happens if you try to use s1 after?
    let s2 = s1;
    
    println!("s2: {}", s2);
    todo!()
}` },
  { id: 105, starterCode: `struct Person {
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
    todo!()
}` },
  { id: 106, starterCode: `struct Data {
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
    todo!()
}` },
  { id: 107, starterCode: `fn main() {
    let numbers = vec![1, 2, 3];
    
    // TODO: Use into_iter() to take ownership and consume the vector
    for num in /* ... */ {
        println!("{}", num);
    }
    todo!()
}` },
  { id: 109, starterCode: `fn main() {
    let original = String::from("shared data");
    
    // TODO: Use .clone() to allow multiple owners
    let owner1 = /* clone */;
    let owner2 = /* clone */;
    let owner3 = original;
    
    println!("Owner 1: {}", owner1);
    println!("Owner 2: {}", owner2);
    println!("Owner 3: {}", owner3);
    todo!()
}` },
  { id: 110, starterCode: `enum Message {
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
    todo!()
}` },
];

async function main() {
  console.log("Running consistency pass batch 2...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Updated #" + fix.id);
  }
  console.log("\nBatch 2 complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
