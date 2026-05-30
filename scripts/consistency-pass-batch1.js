const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  // Function return style
  { id: 12, starterCode: `fn multiply_by_addition(a: i32, b: i32) -> i32 {
    // TODO: implement multiplication using repeated addition
    // Use a for loop to add 'a' to product 'b' times
    todo!()
}` },
  { id: 13, starterCode: `fn power(base: i32, exp: u32) -> i32 {
    // TODO: implement exponentiation using for loops
    // Multiply base by itself exp times
    todo!()
}` },
  { id: 14, starterCode: `fn is_prime(n: u32) -> bool {
    // TODO: implement prime number check
    // Return true if n is prime, false otherwise
    todo!()
}` },
  { id: 16, starterCode: `fn largest_proper_divisor(n: u32) -> Option<u32> {
    // TODO: implement largest proper divisor finder
    // Return the largest divisor of n that is less than n
    todo!()
}` },
  { id: 17, starterCode: `fn fibonacci(n: u32) -> u64 {
    // TODO: implement fibonacci function
    // Return the nth fibonacci number
    todo!()
}` },
  { id: 18, starterCode: `fn factorial(n: u32) -> u64 {
    // TODO: implement factorial function
    // Return n! (n factorial)
    todo!()
}` },

  // main() style with multiple TODOs
  { id: 51, starterCode: `fn main() {
    let mut numbers = vec![1, 2, 3];
    
    // TODO: Use push to add 4 and 5
    
    // TODO: Print the vector after pushing
    
    // TODO: Use pop and print what was removed
    
    // TODO: Print the final vector
    todo!()
}` },
  { id: 52, starterCode: `fn main() {
    let mut s = String::from("hello");
    
    // TODO: Create a slice of the first 3 characters
    
    println!("Original: {}", s);
    println!("Slice: {}", /* your slice */);
    
    // TODO: Push a character and a string slice to s
    todo!()
}` },
  { id: 53, starterCode: `use std::collections::HashMap;

fn main() {
    // TODO: Create a HashMap with some word counts
    
    // TODO: Print all entries
    
    // TODO: Get the count for a specific word, handling the Option
    todo!()
}` },
  { id: 54, starterCode: `use std::collections::HashMap;

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let mut letters = HashMap::new();
    
    // TODO: Insert some key-value pairs into letters
    
    // TODO: Iterate and print the vector
    
    // TODO: Iterate and print the HashMap
    todo!()
}` },
  { id: 55, starterCode: `use std::collections::HashMap;

fn main() {
    let large_vec: Vec<i32> = (0..1000).collect();
    let mut large_map = HashMap::new();
    
    // TODO: Populate the map with squares or doubled values
    
    // TODO: Print the size of both collections
    todo!()
}` },

  // More complex ones
  { id: 72, starterCode: `struct Book<'a> {
    title: &'a str,
}

struct Context<'a, 'b> {
    excerpt: &'a str,
    book: &'b Book<'b>,
}

fn main() {
    let title = String::from("The Rust Book");
    let book = Book { title: &title };
    
    let excerpt = "Some excerpt from the book";
    
    // TODO: Construct the Context struct with proper lifetimes
    let context = Context {
        excerpt,
        book: &book,
    };
    
    println!("Book: {}", context.book.title);
    println!("Excerpt: {}", context.excerpt);
}` },

  { id: 76, starterCode: `fn divide(a: f64, b: f64) -> f64 {
    if b == 0.0 {
        panic!("Division by zero");
    }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_divide_normal() {
        // TODO: Write the assertion for normal division
        assert_eq!(divide(10.0, 2.0), /* expected */ 5.0);
    }
    
    #[test]
    #[should_panic(expected = "Division by zero")]
    fn test_divide_by_zero() {
        divide(10.0, 0.0);
    }
    
    #[test]
    #[ignore]
    fn test_slow_operation() {
        // This test is ignored by default
    }
}

fn main() {
    println!("10.0 / 2.0 = {}", divide(10.0, 2.0));
}` },

  { id: 81, starterCode: `fn main() {
    let x = 4;
    
    // TODO: Create a closure equal_to_x that captures x
    
    println!("Is 4 equal to x? {}", /* call closure */);
    println!("Is 5 equal to x? {}", /* call closure */);
    
    let y = 5;
    let mut sum = 0;
    {
        // TODO: Create a closure that adds to sum (will need to be mut or use RefCell)
    }
    println!("Sum: {}", sum);
    todo!()
}` },

  { id: 82, starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    // TODO: Use filter + map + collect to get even numbers doubled
    let result: Vec<i32> = /* your iterator chain here */;
    
    println!("Result: {:?}", result);
    todo!()
}` },

  { id: 83, starterCode: `fn main() {
    let numbers: Vec<i32> = (1..=100).collect();
    
    // TODO: Implement iterator version (map + sum)
    let sum_iter: i32 = /* ... */;
    
    // TODO: Implement loop version
    let mut sum_loop = 0;
    /* loop here */
    
    println!("Iterator sum: {}", sum_iter);
    println!("Loop sum: {}", sum_loop);
    todo!()
}` },

  { id: 84, starterCode: `// TODO: Create a simulated workspace with two modules

fn main() {
    // TODO: Use the simulated modules
    todo!()
}` },
];

async function main() {
  console.log("Running light consistency pass (adding todo!() where missing)...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Updated #" + fix.id);
  }
  console.log("\nBatch 1 of consistency pass complete (17 challenges).");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
