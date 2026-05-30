const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  {
    id: 86,
    starterCode: `enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    // TODO: Create a linked list using Box (Cons / Nil)
    let list = /* ... */;
    
    println!("Created a linked list with Box");
}`
  },
  {
    id: 87,
    starterCode: `use std::rc::Rc;

struct SharedData {
    value: i32,
}

fn main() {
    let data = Rc::new(SharedData { value: 42 });
    
    println!("Reference count: {}", Rc::strong_count(&data));
    
    // TODO: Clone the Rc a couple of times and print the counts
    
    println!("Value: {}", data.value);
}`
  },
  {
    id: 88,
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
        // TODO: Use borrow_mut to update the message
        todo!()
    }
    
    fn read(&self) -> String {
        // TODO: Use borrow to read the message
        todo!()
    }
}

fn main() {
    let messenger = Messenger::new("Initial message");
    
    println!("Before: {}", messenger.read());
    messenger.send("Updated message");
    println!("After: {}", messenger.read());
}`
  },
  {
    id: 89,
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
    
    // TODO: Create a parent node that owns the leaf and set up the parent reference using Weak
    println!("Reference cycles example - use Weak to avoid memory leaks.");
}`
  },
  {
    id: 90,
    starterCode: `use std::thread;
use std::time::Duration;

fn main() {
    // TODO: Spawn a thread that prints numbers
    let handle = thread::spawn(|| {
        // ...
    });
    
    // Main thread also prints numbers
    
    handle.join().unwrap();
}`
  },
  {
    id: 91,
    starterCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        // TODO: Send several messages through the channel
    });
    
    // TODO: Receive and print the messages
}`
  },
  {
    id: 92,
    starterCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    
    for _ in 0..5 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            // TODO: Lock the mutex and increment the counter
            todo!()
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("Result: {}", *counter.lock().unwrap());
}`
  }
];

async function main() {
  console.log("Fixing 86-92 (concurrency & smart pointers)...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Fixed #" + fix.id);
  }
  console.log("\nBatch 86-92 complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
