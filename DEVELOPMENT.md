# Development Guide

This guide provides detailed instructions for setting up and working with the learn-to-code development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Bun** (recommended) or npm/yarn
- **Git**
- **PostgreSQL** (we recommend using Supabase)
- **Code editor** (VS Code recommended)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/learn-to-code.git
cd learn-to-code
```

### 2. Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Using npm:
```bash
npm install
```

### 3. Environment Configuration

Copy the environment template:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure the following variables:

```env
# Database
DATABASE_URL="postgresql://postgres:your_password@db.your_project_id.supabase.co:5432/postgres"

# Supabase Configuration
SUPABASE_PROJECT_ID=your_supabase_project_id
NEXT_PUBLIC_SUPABASE_URL=https://your_project_id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Optional: OpenAI API for AI mentor
OPENAI_API_KEY=your_openai_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

#### Using Supabase (Recommended)

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your connection string from project settings
3. Add it to `DATABASE_URL` in `.env.local`
4. Run migrations:
```bash
bun run prisma migrate dev
```

#### Using Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
```sql
CREATE DATABASE learn_to_code;
```
3. Update `DATABASE_URL` in `.env.local`
4. Run migrations:
```bash
bun run prisma migrate dev
```

### 5. Seed Database (Optional)

If you want to populate the database with sample challenges:

```bash
bun run seed
```

## Running the Development Server

Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`

## Development Workflow

### Code Structure

The codebase follows a standard Next.js App Router structure:

```
src/
├── app/              # Next.js pages and API routes
├── components/       # Reusable React components
├── lib/             # Utility functions and configurations
└── types/           # TypeScript type definitions
```

### Adding New Challenges

1. **Add to Database**
   - Use Prisma Studio or create a migration
   - Add challenge with proper fields (title, difficulty, category, etc.)

2. **Add Starter Code**
   - Include initial code template
   - Ensure it's compilable

3. **Add Test Cases**
   - Define expected output
   - Add validation logic if needed

4. **Test Locally**
   - Run the dev server
   - Navigate to the challenge
   - Verify it works as expected

### Modifying Components

1. **Edit Component File**
   - Components are in `src/components/`
   - Follow existing naming conventions
   - Use TypeScript for type safety

2. **Test Changes**
   - Hot reload should update automatically
   - Test across different screen sizes
   - Verify accessibility

3. **Update Types**
   - If changing data structures, update TypeScript types
   - Types are in `src/types/`

### API Development

1. **Create API Route**
   - Add route in `src/app/api/`
   - Follow Next.js API route conventions
   - Implement proper error handling

2. **Add Authentication**
   - Use `getServerSession` for protected routes
   - Validate user permissions

3. **Test API**
   - Use tools like Postman or curl
   - Test error cases
   - Verify response formats

## Database Management

### Prisma Commands

```bash
# Generate Prisma client
bun run prisma generate

# Create a new migration
bun run prisma migrate dev --name migration_name

# Reset database (use with caution)
bun run prisma migrate reset

# Open Prisma Studio (GUI)
bun run prisma studio
```

### Schema Changes

1. Edit `prisma/schema.prisma`
2. Create migration: `bun run prisma migrate dev --name description`
3. Test changes locally
4. Commit both schema and migration files

## Testing

### Manual Testing

1. **User Flow Testing**
   - Test authentication flow
   - Complete sample challenges
   - Verify progress tracking

2. **Cross-browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers
   - Different screen sizes

3. **Error Testing**
   - Test with invalid inputs
   - Test with network failures
   - Verify error messages are helpful

### Debugging

1. **Browser DevTools**
   - Use Chrome DevTools for frontend debugging
   - Check console for errors
   - Use React DevTools for component inspection

2. **Server Logs**
   - Check terminal for server-side errors
   - Use console.log for debugging
   - Check API responses in Network tab

3. **Database Debugging**
   - Use Prisma Studio to inspect data
   - Check database queries
   - Verify relationships

## Code Style

### TypeScript

- Use strict mode
- Define interfaces for complex objects
- Avoid `any` types
- Use proper null checks

### React

- Use functional components with hooks
- Follow React best practices
- Use proper key props for lists
- Avoid unnecessary re-renders

### CSS

- Use Tailwind CSS classes
- Follow mobile-first approach
- Ensure responsive design
- Use semantic HTML

## Common Issues

### Database Connection Issues

**Problem**: Can't connect to database

**Solutions**:
- Verify `DATABASE_URL` is correct
- Check database server is running
- Ensure network access to database
- Verify credentials

### Build Errors

**Problem**: TypeScript compilation errors

**Solutions**:
- Check type definitions in `src/types/`
- Ensure all imports are correct
- Run `bun run build` to see full error list
- Check for missing dependencies

### Environment Variables

**Problem**: Environment variables not loading

**Solutions**:
- Restart development server after changing `.env.local`
- Verify variable names match exactly
- Check for typos in variable names
- Ensure `.env.local` is in project root

## Performance Optimization

### Frontend Optimization

- Use React.memo for expensive components
- Implement code splitting for large components
- Optimize images and assets
- Use lazy loading for heavy components

### Backend Optimization

- Optimize database queries with proper indexes
- Implement caching where appropriate
- Use efficient data structures
- Minimize API payload sizes

## Deployment Preparation

Before deploying:

1. **Test Build**
   ```bash
   bun run build
   bun run start
   ```

2. **Check Environment Variables**
   - Ensure all required vars are set
   - Use production-ready values
   - Remove any development-only configs

3. **Database Migration**
   - Ensure all migrations are applied
   - Backup production database
   - Test migration on staging

4. **Security Check**
   - Remove any debug code
   - Verify no hardcoded secrets
   - Check CORS settings
   - Review authentication flow

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)

## Getting Help

If you encounter issues:

1. Check existing GitHub issues
2. Review project documentation
3. Ask questions in GitHub Discussions
4. Create a new issue with detailed information

Happy coding! 🚀