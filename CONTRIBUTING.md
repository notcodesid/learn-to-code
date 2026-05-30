# Contributing to learn-to-code

Thank you for your interest in contributing to learn-to-code! This document provides guidelines and instructions for contributing to this project.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**: Be specific about what the problem is
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Environment**: OS, browser/runtime version, any relevant configuration
- **Screenshots**: If applicable, add screenshots to help explain the problem

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:

- Use a clear and descriptive title
- Provide a detailed description of the proposed enhancement
- Explain why this enhancement would be useful
- Provide examples of how the enhancement would be used

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the coding standards below
3. **Test thoroughly** to ensure your changes work as expected
4. **Update documentation** if your changes affect user-facing features
5. **Commit your changes** with clear, descriptive commit messages
6. **Push to your fork** and submit a pull request

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- Bun or npm/yarn
- PostgreSQL database (we recommend Supabase)
- Git

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/learn-to-code.git
cd learn-to-code
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Set up the database:
```bash
bun run prisma migrate dev
```

5. Run the development server:
```bash
bun run dev
```

Visit `http://localhost:3000` to see the application.

## 📝 Coding Standards

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting and naming conventions
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

Follow the conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(challenges): add new ownership borrowing challenge

- Add challenge 22: Ownership Basics
- Include starter code and test cases
- Update challenge sidebar
```

### Testing

- Test your changes thoroughly before submitting
- Ensure existing tests still pass
- Add new tests for new features when applicable
- Test on multiple browsers when making UI changes

## 📚 Project Structure

```
learn-to-code/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── scripts/             # Utility scripts
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── api/        # API routes
│   │   ├── auth/       # Authentication pages
│   │   └── learn/      # Main learning interface
│   ├── components/     # React components
│   ├── lib/           # Utility libraries
│   └── types/         # TypeScript type definitions
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

## 🎯 Areas for Contribution

We welcome contributions in many areas:

- **New Challenges**: Add more Rust programming challenges
- **Bug Fixes**: Help fix reported issues
- **Documentation**: Improve docs and add examples
- **UI/UX**: Enhance the user interface
- **Performance**: Optimize code and improve load times
- **Tests**: Add or improve test coverage
- **Translations**: Add support for new languages

## 🐛 Debugging Tips

- Check the browser console for JavaScript errors
- Review server logs for backend issues
- Use the Next.js debug mode when needed
- Test with different browsers and screen sizes

## 💬 Getting Help

- Check existing [issues](https://github.com/your-username/learn-to-code/issues) for similar problems
- Read the [documentation](README.md)
- Ask questions in discussions or create a new issue

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ⭐ Recognition

Contributors will be recognized in the AUTHORS.md file and in the project's contributor list.

Thank you for contributing to learn-to-code! 🚀