const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  // 76 Test Attributes
  {
    id: 76,
    starterCode: `fn divide(a: f64, b: f64) -> f64 {
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
        assert_eq!(divide(10.0, 2.0), 5.0);
    }
    
    #[test]
    #[should_panic(expected = "Division by zero")]
    fn test_divide_by_zero() {
        divide(10.0, 0.0);
    }
    
    #[test]
    #[ignore]
    fn test_slow_operation() {
        // TODO: This test is ignored
    }
}

fn main() {
    println!("10.0 / 2.0 = {}", divide(10.0, 2.0));
}`
  },
  // 77 File Reading
  {
    id: 77,
    starterCode: `fn read_content(content: &str) -> (usize, String) {
    // TODO: Return (length, first line)
    todo!()
}

fn main() {
    let file_content = "First line\nSecond line\nThird line";
    let (length, first_line) = read_content(file_content);
    
    println!("Content length: {}", length);
    println!("First line: {}", first_line);
}`
  },
  // 78 File Writing
  {
    id: 78,
    starterCode: `fn prepare_content(lines: Vec<&str>) -> String {
    // TODO: Join lines with newlines
    todo!()
}

fn main() {
    let lines = vec!["Line 1", "Line 2", "Line 3"];
    let content = prepare_content(lines);
    
    println!("Prepared content:");
    println!("{}", content);
}`
  },
  // 79 Command Line Arguments
  {
    id: 79,
    starterCode: `fn parse_args(args: Vec<String>) -> Result<(String, usize), String> {
    // TODO: Parse name and count from args vector
    todo!()
}

fn main() {
    let args = vec!["program".to_string(), "Alice".to_string(), "5".to_string()];
    
    match parse_args(args) {
        Ok((name, count)) => {
            println!("Name: {}, Count: {}", name, count);
        }
        Err(e) => {
            println!("Error: {}", e);
        }
    }
}`
  },
  // 80 Error Handling in I/O
  {
    id: 80,
    starterCode: `#[derive(Debug)]
enum ProcessError {
    InvalidInput,
    ProcessingFailed,
}

fn safe_process(input: &str) -> Result<String, ProcessError> {
    // TODO: Implement the logic with proper error returns
    todo!()
}

fn main() {
    let inputs = vec!["hello", "", "error", "world"];
    
    for input in inputs {
        match safe_process(input) {
            Ok(result) => println!("{}", result),
            Err(e) => println!("Error processing '{}': {:?}", input, e),
        }
    }
}`
  },
  // 81 Closures Basics
  {
    id: 81,
    starterCode: `fn main() {
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
}`
  },
  // 82 Iterator Basics
  {
    id: 82,
    starterCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    // TODO: Use filter + map + collect to get even numbers doubled
    let result: Vec<i32> = /* your iterator chain here */;
    
    println!("Result: {:?}", result);
}`
  },
  // 83 Performance: Iterators vs Loops
  {
    id: 83,
    starterCode: `fn main() {
    let numbers: Vec<i32> = (1..=100).collect();
    
    // TODO: Implement iterator version (map + sum)
    let sum_iter: i32 = /* ... */;
    
    // TODO: Implement loop version
    let mut sum_loop = 0;
    /* loop here */
    
    println!("Iterator sum: {}", sum_iter);
    println!("Loop sum: {}", sum_loop);
}`
  },
  // 84 Cargo Workspaces
  {
    id: 84,
    starterCode: `// TODO: Create a simulated workspace with two modules

fn main() {
    // TODO: Use the simulated modules
}`
  },
  // 85 Publishing to Crates.io
  {
    id: 85,
    starterCode: `/// TODO: Add proper documentation
pub fn add(a: i32, b: i32) -> i32 {
    // TODO
    todo!()
}

/// TODO: Add proper documentation
pub fn multiply(a: i32, b: i32) -> i32 {
    // TODO
    todo!()
}

fn main() {
    println!("2 + 3 = {}", add(2, 3));
    println!("2 * 3 = {}", multiply(2, 3));
}`
  }
];

async function main() {
  console.log("Fixing challenges 76-85...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Fixed #" + fix.id);
  }
  console.log("\nPart 2 (76-85) complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
