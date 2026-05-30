const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  {
    id: 111,
    starterCode: `fn calculate_length(s: &String) -> usize {
    // TODO: Return the length of the borrowed String
    todo!()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    
    println!("Length of '{}' is {}", s1, len);
}`
  },
  {
    id: 112,
    starterCode: `fn append_world(s: &mut String) {
    // TODO: Mutably borrow and append " world"
    todo!()
}

fn main() {
    let mut s1 = String::from("hello");
    append_world(&mut s1);
    
    println!("Modified: {}", s1);
}`
  },
  {
    id: 113,
    starterCode: `fn print_length(s: &String) {
    // TODO
    todo!()
}

fn print_first_char(s: &String) {
    // TODO
    todo!()
}

fn main() {
    let s = String::from("hello");
    
    print_length(&s);
    print_first_char(&s);
    
    println!("Original: {}", s);
}`
  },
  {
    id: 114,
    starterCode: `fn main() {
    let mut s = String::from("hello");
    
    let r1 = &s;
    let r2 = &s;
    
    println!("Both immutable refs: {}, {}", r1, r2);
    
    // TODO: Demonstrate that you cannot create a mutable reference while immutable ones exist
    // let r3 = &mut s;  // This would violate borrowing rules
}`
  },
  {
    id: 115,
    starterCode: `struct Point {
    x: i32,
    y: i32,
}

fn print_x(point: &Point) {
    // TODO: Print the x field
    todo!()
}

fn double_y(point: &mut Point) {
    // TODO: Mutably borrow and double y
    todo!()
}

fn main() {
    let mut point = Point { x: 5, y: 10 };
    
    print_x(&point);
    double_y(&mut point);
    
    println!("After: ({}, {})", point.x, point.y);
}`
  },
  {
    id: 116,
    starterCode: `fn main() {
    let s = String::from("hello world");
    
    // TODO: Create slices for "hello" and "world"
    let hello = /* &s[0..5] */;
    let world = /* &s[6..11] */;
    
    println!("First: {}", hello);
    println!("Second: {}", world);
    println!("Original: {}", s);
}`
  },
  {
    id: 117,
    starterCode: `fn first_word(s: &String) -> &str {
    // TODO: Return a slice of the first word (before the first space)
    todo!()
}

fn main() {
    let s = String::from("hello world");
    let word = first_word(&s);
    
    println!("First word: {}", word);
    println!("Original: {}", s);
}`
  },
  {
    id: 118,
    starterCode: `fn main() {
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
}`
  },
  {
    id: 119,
    starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    // TODO: Use .iter() to borrow while processing
    let doubled: Vec<i32> = numbers.iter()
        .map(|x| x * 2)
        .collect();
    
    println!("Original: {:?}", numbers);
    println!("Doubled: {:?}", doubled);
}`
  },
  {
    id: 120,
    starterCode: `struct Data {
    value: i32,
}

fn main() {
    let data = Data { value: 42 };
    
    let r1 = &data;
    let r2 = &data;
    
    println!("Multiple immutable refs: {}, {}", r1.value, r2.value);
    
    // TODO: Show why a mutable borrow would not be allowed here
}`
  }
];

async function main() {
  console.log("Fixing 111-120 (borrowing duplicates)...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Fixed #" + fix.id);
  }
  console.log("\nBatch 111-120 complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
