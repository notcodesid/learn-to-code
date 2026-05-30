const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  {
    id: 32,
    starterCode: `fn largest<T: PartialOrd>(list: &[T]) -> &T {
    // TODO: Find and return a reference to the largest element in the list
    todo!()
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    println!("Largest number: {}", largest(&numbers));

    let chars = vec!['y', 'm', 'a', 'q'];
    println!("Largest char: {}", largest(&chars));
}`
  },
  {
    id: 33,
    starterCode: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    // TODO: Return the longer of the two string slices
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
}`
  },
  {
    id: 35,
    starterCode: `fn mean(data: &[f64]) -> f64 {
    // TODO: Calculate and return the average
    todo!()
}

fn median(data: &mut Vec<f64>) -> f64 {
    // TODO: Sort the data and return the middle value(s)
    todo!()
}

fn range(data: &[f64]) -> f64 {
    // TODO: Return max - min
    todo!()
}

fn main() {
    let mut numbers = vec![4.0, 8.0, 15.0, 16.0, 23.0, 42.0];
    
    println!("Data: {:?}", numbers);
    println!("Mean: {:.1}", mean(&numbers));
    println!("Median: {:.1}", median(&mut numbers));
    println!("Range: {:.1}", range(&numbers));
}`
  },
  {
    id: 37,
    starterCode: `fn calculate_length(s: &String) -> usize {
    // TODO: Return the length of the string
    todo!()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("Length of '{}' is {}", s1, len);
    
    let s2 = "world";
    let len2 = calculate_length(&String::from(s2));
    println!("Length of '{}' is {}", s2, len2);
}`
  },
  {
    id: 38,
    starterCode: `fn main() {
    let s = String::from("hello world");
    
    // Get a slice for the first word ("hello")
    let hello = /* TODO: your slice here */;
    
    // Get a slice for the second word ("world")
    let world = /* TODO: your slice here */;
    
    println!("First word: {}", hello);
    println!("Second word: {}", world);
    
    let a = [1, 2, 3, 4, 5];
    // Get a slice of the first three elements
    let slice = /* TODO: your slice here */;
    
    println!("Array slice: {:?}", slice);
}`
  },
  {
    id: 39,
    starterCode: `struct Player {
    name: String,
    score: i32,
}

impl Player {
    fn new(name: String) -> Self {
        // TODO: Create a new Player with the given name and score 0
        todo!()
    }
    
    fn add_points(&mut self, points: i32) {
        // TODO: Increase the player's score
        todo!()
    }
    
    fn get_score(&self) -> i32 {
        // TODO: Return the current score
        todo!()
    }
}

fn main() {
    let mut player = Player::new(String::from("Alice"));
    player.add_points(100);
    println!("Player: {}, Score: {}", player.name, player.get_score());
}`
  },
  {
    id: 40,
    starterCode: `struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    fn square(size: f64) -> Self {
        // TODO: Create and return a square Rectangle
        todo!()
    }
}

fn main() {
    let square = Rectangle::square(5.0);
    println!("Square: {} x {}", square.width, square.height);
}`
  }
];

async function main() {
  console.log("Applying starterCode fixes...\n");
  
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log(`✓ Fixed challenge ${fix.id}`);
  }
  
  console.log("\nDone! All updates applied.");
}

main()
  .catch(e => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
