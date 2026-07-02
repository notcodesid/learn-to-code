/**
 * Legacy hidden test cases for challenges not yet migrated to testCaseSpec.
 * Migrated challenges live in challenge-test-specs.ts — do not duplicate here.
 */
export const CHALLENGE_TEST_CASES: Record<number, string> = {
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