/**
 * LeetCode-style hidden test cases appended to student code at run time.
 * Each block uses #[cfg(test)] and asserts on function return values —
 * any correct implementation passes regardless of approach.
 */
export const CHALLENGE_TEST_CASES: Record<number, string> = {
  // Basics — function return values
  4: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(3, 7), 10);
        assert_eq!(add(0, 0), 0);
        assert_eq!(add(-2, 5), 3);
    }
}`,

  // Previously ungraded — null expectedOutput
  12: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_multiply_basic() {
        assert_eq!(multiply_by_addition(5, 4), 20);
    }

    #[test]
    fn test_multiply_zero() {
        assert_eq!(multiply_by_addition(0, 5), 0);
        assert_eq!(multiply_by_addition(3, 0), 0);
    }

    #[test]
    fn test_multiply_one() {
        assert_eq!(multiply_by_addition(7, 1), 7);
    }
}`,

  13: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_power_basic() {
        assert_eq!(power(2, 5), 32);
    }

    #[test]
    fn test_power_zero_exp() {
        assert_eq!(power(5, 0), 1);
    }

    #[test]
    fn test_power_one() {
        assert_eq!(power(9, 1), 9);
    }
}`,

  14: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_prime() {
        assert!(is_prime(7));
        assert!(!is_prime(12));
        assert!(!is_prime(1));
        assert!(is_prime(2));
    }
}`,

  16: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_largest_proper_divisor() {
        assert_eq!(largest_proper_divisor(12), Some(6));
        assert_eq!(largest_proper_divisor(7), Some(1));
        assert_eq!(largest_proper_divisor(1), None);
    }
}`,

  17: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_fibonacci() {
        assert_eq!(fibonacci(0), 0);
        assert_eq!(fibonacci(1), 1);
        assert_eq!(fibonacci(10), 55);
    }
}`,

  18: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_factorial() {
        assert_eq!(factorial(0), 1);
        assert_eq!(factorial(5), 120);
    }
}`,

  // Ownership & borrowing — test logic, not println format
  23: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_calculate_length() {
        let s = String::from("Rustacean");
        assert_eq!(calculate_length(&s), 9);
        assert_eq!(s, "Rustacean");
    }
}`,

  24: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_first_word() {
        assert_eq!(first_word("Hello, world!"), "Hello,");
        assert_eq!(first_word("solo"), "solo");
    }
}`,

  26: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_value_in_cents() {
        assert_eq!(value_in_cents(&Coin::Penny), 1);
        assert_eq!(value_in_cents(&Coin::Nickel), 5);
        assert_eq!(value_in_cents(&Coin::Dime), 10);
        assert_eq!(value_in_cents(&Coin::Quarter), 25);
    }
}`,

  27: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_find_char() {
        assert_eq!(find_char("Rust", 's'), Some(2));
        assert_eq!(find_char("Rust", 'z'), None);
    }
}`,

  28: `#[cfg(test)]
mod challenge_tests {
    use super::*;

    #[test]
    fn test_parse_number() {
        assert_eq!(parse_number("42"), Ok(42));
        assert_eq!(parse_number("abc"), Err("not a number".to_string()));
    }
}`,
};