/** Shared concept copy for ownership challenges (curriculum ids 22–41). */
export const descriptionUpdates: Record<number, string> = {
  22:
    'In Rust, each value has one owner. Assigning a heap value like `String` to another variable moves ownership — the first variable can no longer be used. Example: `let s1 = String::from("hi"); let s2 = s1;` — only `s2` is valid afterward.',
  23:
    'Passing a `String` into a function moves it unless you use a reference. The function owns the value while it runs and can return it to give ownership back. Example: `fn process(s: String) -> String { s }` called with `process(my_string)`.',
  24:
    'Move transfers ownership cheaply (no deep copy). `clone()` duplicates heap data so both variables stay independent — use it only when you need two owners. Example: `let b = a.clone();` keeps both `a` and `b` valid.',
  25:
    'Types that implement `Copy` (like `i32`, `bool`) are duplicated on assignment. Heap types like `String` and `Vec` are moved instead — the source becomes invalid. Example: `let y = x;` works for both bindings when `x` is `i32`, not when `x` is `String`.',
  26:
    'When you move a struct, every field moves with it. If a field is a `String`, that heap data moves too and the old struct binding is mostly unusable. Example: `let b = a;` after `struct User { name: String, age: i32 }`.',
  27:
    'You can move individual fields out of a struct. `Copy` fields (like `i32`) may still be read from the struct; moved fields (like `String`) cannot. Example: `let title = book.title;` moves only `title`, not the whole struct at once.',
  28:
    '`.into_iter()` consumes a collection — you lose the original `Vec`. `.iter()` borrows each element; the vector stays valid. Example: `for n in nums.iter() { ... }` vs `for n in nums.into_iter() { ... }`.',
  29:
    'Functions can return owned values, transferring heap data to the caller. Chain them by passing the return value into the next call. Example: `fn build() -> String { String::from("a") }` then `let s = append(build());`.',
  30:
    'Rust allows only one owner at a time. If two parts of your program need their own `String`, `clone()` creates a separate copy. Example: `let second = first.clone();` — changes to one do not affect the other.',
  31:
    '`match` can move data out of enums and structs — the matched value is consumed. After a branch moves a field, the original binding is gone. Example: `match msg { Message::Text(s) => println!("{s}"), ... }` takes ownership of inner `s`.',
  32:
    'An immutable reference `&T` lets you read data without taking ownership. The owner stays valid; you can have many `&` borrows at once (if nothing mutably borrows). Example: `fn len(s: &String) -> usize { s.len() }` and `len(&text)`.',
  33:
    'A mutable reference `&mut T` lets you modify data in place — only one `&mut` at a time to the same data. Example: `fn push_hi(s: &mut String) { s.push_str(" hi"); }` called with `push_hi(&mut message)`.',
  34:
    'Multiple immutable references to the same data are allowed because readers cannot mutate. Use them before any `&mut` borrow starts. Example: `let a = &s; let b = &s;` then use `a` and `b` while `s` is still borrowed immutably.',
  35:
    'The borrow rule: at any moment you may have many `&` OR one `&mut`, not both while `&` are still active. This prevents data races at compile time. Example: finish using `r1` and `r2` before creating `&mut s`.',
  36:
    'Structs are borrowed with `&self` (read) and `&mut self` (modify) in methods — same rules as variables. Example: `impl Counter { fn add(&mut self, n: i32) { self.value += n; } }`.',
  37:
    'A slice (`&str`, `&[T]`) is a borrowed view into contiguous data — it does not own the backing storage. Several slices can borrow different parts of one `String`. Example: `let mid = &s[2..5];` while `s` stays valid.',
  38:
    'Functions can take `&str` or `&String` and return `&str` that borrows from the input — the caller must keep the original alive. Example: `fn first_word(s: &str) -> &str` returning a substring slice.',
  39:
    'Borrow from a `Vec` with indexing (`&v[i]`) or iteration (`for x in &v`). The vector is not consumed. Example: `let peek = &items[0];` and `for item in &items { ... }`.',
  40:
    'Iterator adapters often borrow: `.iter()` gives `&T`, `.iter_mut()` gives `&mut T`, `.into_iter()` takes ownership. Example: `let doubled: Vec<_> = nums.iter().map(|x| x * 2).collect();` leaves `nums` intact.',
  41:
    'The borrow checker enforces memory safety at compile time — no dangling pointers, no double-free, no data races. If code breaks the rules, the compiler rejects it with a clear error. Example: you cannot use `s` while `&mut s` is still active.',
};