# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- MIT License for open-source distribution
- Comprehensive contributing guidelines (CONTRIBUTING.md)
- Security policy and vulnerability reporting (SECURITY.md)
- Code of conduct for community guidelines (CODE_OF_CONDUCT.md)
- GitHub issue templates (bug report, feature request, general issue)
- GitHub pull request template
- Architecture documentation (ARCHITECTURE.md)
- Development setup guide (DEVELOPMENT.md)
- Deployment instructions (DEPLOYMENT.md)
- Changelog for tracking changes (CHANGELOG.md)

### Changed
- Removed payment infrastructure to prepare for open-sourcing
- Removed all payment-related dependencies (dodopayments, solana-pay, etc.)
- Updated database schema to remove payment models and fields
- Simplified challenges API to remove payment gating
- Updated environment configuration to remove payment variables
- Updated README to remove payment references

### Removed
- Payment processing libraries and integrations
- Paywall UI components
- Payment API routes
- Database payment models
- Payment-related documentation

## [1.0.0] - 2025-01-XX

### Added
- Initial release of learn-to-code platform
- 155 curated Rust programming challenges
- Monaco code editor with Rust syntax highlighting
- Live code execution via Rust Playground API
- AI mentor chat with OpenAI integration (optional)
- Progress tracking and completion status
- User authentication via Google OAuth
- Dark theme UI optimized for coding sessions
- Challenge categories: Basics, Ownership, Structs, Error Handling, Collections, Traits, Functional Patterns
- Responsive design for mobile and desktop
- Real-time code compilation and output display

### Security
- Secure authentication using NextAuth.js
- Environment variable configuration for sensitive data
- Input validation and sanitization
- SQL injection prevention via Prisma ORM

### Performance
- Optimized code splitting and lazy loading
- Efficient database query patterns
- Static page generation where applicable
- CDN-ready asset optimization

---

## Version Format

The version format for this project is `MAJOR.MINOR.PATCH`:

- **MAJOR**: Incompatible API changes
- **MINOR**: Backwards-compatible functionality additions
- **PATCH**: Backwards-compatible bug fixes

## Categories

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes