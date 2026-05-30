const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fixes = [
  // 67 Trait Definitions
  {
    id: 67,
    starterCode: `trait Drawable {
    fn draw(&self);
}

struct Circle {
    radius: f64,
}

struct Rectangle {
    width: f64,
    height: f64,
}

impl Drawable for Circle {
    fn draw(&self) {
        // TODO: Print "Drawing circle with radius X"
        todo!()
    }
}

impl Drawable for Rectangle {
    fn draw(&self) {
        // TODO: Print "Drawing rectangle W x H"
        todo!()
    }
}

fn main() {
    let circle = Circle { radius: 5.0 };
    let rectangle = Rectangle { width: 10.0, height: 20.0 };
    
    circle.draw();
    rectangle.draw();
}`
  },
  // 68 Trait Bounds
  {
    id: 68,
    starterCode: `use std::fmt::{Display, Debug};

fn print_info<T: Display + Debug>(item: T) {
    // TODO: Print using Display and Debug
    todo!()
}

fn main() {
    print_info(42);
    print_info("hello");
    print_info(3.14);
}`
  },
  // 69 Default Implementations
  {
    id: 69,
    starterCode: `trait Animal {
    fn name(&self) -> &str;
    
    fn make_sound(&self) -> &str {
        // TODO: Provide a default implementation
        todo!()
    }
}

struct Dog {
    name: String,
}

struct Cat {
    name: String,
}

impl Animal for Dog {
    fn name(&self) -> &str {
        // TODO
        todo!()
    }
    
    fn make_sound(&self) -> &str {
        // TODO
        todo!()
    }
}

impl Animal for Cat {
    fn name(&self) -> &str {
        // TODO
        todo!()
    }
}

fn main() {
    let dog = Dog { name: "Buddy".to_string() };
    let cat = Cat { name: "Whiskers".to_string() };
    
    println!("{} says: {}", dog.name(), dog.make_sound());
    println!("{} says: {}", cat.name(), cat.make_sound());
}`
  },
  // 71 Lifetime Annotations
  {
    id: 71,
    starterCode: `struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> &str {
        // TODO: Return "important" if len > 10, else "trivial"
        todo!()
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().expect("Could not find a '.'");
    
    let excerpt = ImportantExcerpt {
        part: first_sentence,
    };
    
    println!("Excerpt: {}", excerpt.part);
    println!("Level: {}", excerpt.level());
}`
  },
  // 72 Struct Lifetimes
  {
    id: 72,
    starterCode: `struct Book<'a> {
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
    let context = Context {
        excerpt,
        book: &book,
    };
    
    println!("Book: {}", context.book.title);
    println!("Excerpt: {}", context.excerpt);
}`
  },
  // 73 Unit Tests
  {
    id: 73,
    starterCode: `fn add(a: i32, b: i32) -> i32 {
    // TODO: implement addition
    todo!()
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_add_normal() {
        assert_eq!(add(2, 3), 5);
    }
    
    #[test]
    fn test_add_negative() {
        assert_eq!(add(-2, -3), -5);
    }
}

fn main() {
    println!("2 + 3 = {}", add(2, 3));
}`
  },
  // 74 Integration Tests
  {
    id: 74,
    starterCode: `pub fn greet(name: &str) -> String {
    // TODO: Return a greeting
    todo!()
}

fn main() {
    println!("{}", greet("World"));
}

#[cfg(test)]
mod integration_tests {
    use super::*;
    
    #[test]
    fn test_greet() {
        assert_eq!(greet("Alice"), "Hello, Alice!");
        assert_eq!(greet(""), "Hello, !");
    }
}`
  },
  // 75 Test Organization
  {
    id: 75,
    starterCode: `fn calculate(a: i32, b: i32, op: char) -> i32 {
    // TODO: implement calculate
    todo!()
}

#[cfg(test)]
mod tests {
    use super::*;
    
    mod addition_tests {
        use super::*;
        
        #[test]
        fn test_add_positive() {
            assert_eq!(calculate(2, 3, '+'), 5);
        }
        
        #[test]
        fn test_add_negative() {
            assert_eq!(calculate(-2, -3, '+'), -5);
        }
    }
}

fn main() {
    println!("2 + 3 = {}", calculate(2, 3, '+'));
}`
  }
];

async function main() {
  console.log("Fixing challenges 67-75...\n");
  for (const fix of fixes) {
    await prisma.challenge.update({
      where: { id: fix.id },
      data: { starterCode: fix.starterCode }
    });
    console.log("Fixed #" + fix.id);
  }
  console.log("\nPart 1 of 67-85 batch complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
