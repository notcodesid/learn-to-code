const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.challenge.update({
    where: { id: 72 },
    data: {
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
    
    // TODO: Construct the Context struct with proper lifetimes
    let context = Context {
        excerpt,
        book: &book,
    };
    
    println!("Book: {}", context.book.title);
    println!("Excerpt: {}", context.excerpt);
    todo!()
}`
    }
  });

  await prisma.challenge.update({
    where: { id: 76 },
    data: {
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
    todo!()
}`
    }
  });

  console.log("Fixed the last two (#72 and #76) for full consistency.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
