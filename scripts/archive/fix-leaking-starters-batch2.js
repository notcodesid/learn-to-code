const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  {
    id: 41,
    starterCode: `struct Counter {
    count: i32,
}

impl Counter {
    fn increment(&mut self) {
        // TODO: increase count by 1
        todo!()
    }

    fn decrement(&mut self) {
        // TODO: decrease count by 1
        todo!()
    }

    fn get_count(&self) -> i32 {
        // TODO: return current count
        todo!()
    }
}

fn main() {
    let mut counter = Counter { count: 0 };
    counter.increment();
    counter.increment();
    counter.decrement();
    println!("Count: {}", counter.get_count());
}`
  },
  {
    id: 42,
    starterCode: `struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let point1 = Point { x: 1, y: 2 };
    
    // Use struct update syntax to create point2 that has x: 3 and keeps y from point1
    let point2 = /* TODO: use ..point1 syntax here */;
    
    println!("point2: x={}, y={}", point2.x, point2.y);
}`
  },
  {
    id: 43,
    starterCode: `fn find_first_even(numbers: &[i32]) -> Option<usize> {
    // TODO: Return the index of the first even number, or None
    todo!()
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
}`
  },
  {
    id: 44,
    starterCode: `fn describe_number(n: i32) -> &'static str {
    // TODO: Use match with ranges to return "small", "medium", or "large"
    todo!()
}

fn main() {
    println!("5 is {}", describe_number(5));
    println!("50 is {}", describe_number(50));
    println!("150 is {}", describe_number(150));
}`
  },
  {
    id: 45,
    starterCode: `fn get_second(pair: Option<(i32, i32)>) -> Option<i32> {
    // TODO: Use if let to extract and return the second element
    todo!()
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
}`
  },
  {
    id: 46,
    starterCode: `fn divide(a: f64, b: f64) -> Option<f64> {
    // TODO: Return Some(a/b) if b != 0, otherwise None
    todo!()
}

fn main() {
    let result1 = divide(10.0, 2.0);
    let result2 = divide(10.0, 0.0);
    
    match result1 {
        Some(v) => println!("Result: {}", v),
        None => println!("Division failed"),
    }
    
    match result2 {
        Some(v) => println!("Result: {}", v),
        None => println!("Division failed"),
    }
}`
  },
  {
    id: 47,
    starterCode: `mod utils {
    pub fn greet(name: &str) -> String {
        // TODO: Return a greeting string
        todo!()
    }
}

fn main() {
    println!("{}", utils::greet("Rust"));
}`
  },
  {
    id: 48,
    starterCode: `fn calculate_area(width: f64, height: f64) -> f64 {
    // TODO: Return width * height
    todo!()
}

fn calculate_perimeter(width: f64, height: f64) -> f64 {
    // TODO: Return 2 * (width + height)
    todo!()
}

fn main() {
    println!("Area: {}", calculate_area(4.0, 5.0));
    println!("Perimeter: {}", calculate_perimeter(4.0, 5.0));
}`
  },
  {
    id: 49,
    starterCode: `mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        // TODO
        todo!()
    }

    pub fn multiply(a: i32, b: i32) -> i32 {
        // TODO
        todo!()
    }
}

fn main() {
    println!("3 + 4 = {}", math::add(3, 4));
    println!("3 * 4 = {}", math::multiply(3, 4));
}`
  },
  {
    id: 50,
    starterCode: `mod string_utils {
    pub fn reverse_string(s: &str) -> String {
        // TODO: Return the reversed string
        todo!()
    }
}

fn main() {
    let original = "hello";
    println!("Reversed: {}", string_utils::reverse_string(original));
}`
  }
];

async function main() {
  console.log("Fixing batch 41-50...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Fixed #" + fix.id);
  }
  console.log("\nBatch complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
