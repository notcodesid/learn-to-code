# Deployment Guide

This guide covers deploying learn-to-code to production environments.

## Prerequisites

- Source code repository
- Production database (PostgreSQL/Supabase)
- Domain name (optional)
- SSL certificate (optional but recommended)

## Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

#### Setup

1. **Prepare Your Repository**
   - Push your code to GitHub/GitLab/Bitbucket
   - Ensure `.env.example` is up to date
   - Verify build works locally: `bun run build`

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Configure project settings

3. **Environment Variables**
   Add these environment variables in Vercel dashboard:
   ```
   DATABASE_URL=your_production_database_url
   NEXTAUTH_SECRET=your_secure_secret
   NEXTAUTH_URL=https://your-domain.com
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SUPABASE_PROJECT_ID=your_supabase_project_id
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key (optional)
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll receive a `.vercel.app` domain

5. **Custom Domain** (Optional)
   - Go to project settings → Domains
   - Add your custom domain
   - Configure DNS records
   - SSL certificate is automatically provisioned

#### Database Migration

```bash
# Run migrations on production database
bun run prisma migrate deploy
```

### Docker Deployment

For self-hosted deployment using Docker:

#### Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb* ./
RUN corepack enable && corepack prepare bun@latest --activate
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare bun@latest --activate
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
      - SUPABASE_PROJECT_ID=${SUPABASE_PROJECT_ID}
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    restart: unless-stopped
```

#### Deploy with Docker

```bash
# Build and start containers
docker-compose up -d --build

# Run database migrations
docker-compose exec app bun run prisma migrate deploy

# View logs
docker-compose logs -f app
```

### Traditional VPS Deployment

For deployment on traditional VPS (DigitalOcean, AWS EC2, etc.):

#### Server Setup

1. **Install Dependencies**
   ```bash
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install Bun
   curl -fsSL https://bun.sh/install | bash

   # Install PostgreSQL
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/learn-to-code.git
   cd learn-to-code
   ```

3. **Install Dependencies**
   ```bash
   bun install
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env.production
   # Edit .env.production with production values
   ```

5. **Build Application**
   ```bash
   bun run build
   ```

6. **Run Database Migrations**
   ```bash
   bun run prisma migrate deploy
   ```

7. **Start Application**
   ```bash
   bun run start
   ```

#### Process Manager (PM2)

Install and configure PM2 for process management:

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start bun --name "learn-to-code" -- start

# Configure PM2 to start on boot
pm2 startup
pm2 save
```

#### Nginx Configuration

Configure Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Configuration

### Production Environment Variables

Required variables for production:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Authentication
NEXTAUTH_SECRET=your_secure_random_string
NEXTAUTH_URL=https://your-domain.com

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase
SUPABASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: AI Mentor
OPENAI_API_KEY=your_openai_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Security Considerations

- Use strong, random secrets for `NEXTAUTH_SECRET`
- Never commit `.env` files to version control
- Use read-only database credentials when possible
- Enable HTTPS in production
- Keep dependencies updated
- Regular security audits

## Database Management

### Production Database Setup

1. **Create Production Database**
   - Use Supabase for managed PostgreSQL
   - Or set up your own PostgreSQL server

2. **Configure Connection**
   - Update `DATABASE_URL` with production credentials
   - Test connection locally first

3. **Run Migrations**
   ```bash
   bun run prisma migrate deploy
   ```

4. **Seed Data** (Optional)
   ```bash
   bun run seed
   ```

### Database Backups

**Supabase Automatic Backups:**
- Enabled by default
- Configure retention period in dashboard
- Test restore process regularly

**Manual Backups:**
```bash
# Backup database
pg_dump DATABASE_URL > backup.sql

# Restore database
psql DATABASE_URL < backup.sql
```

## Monitoring & Logging

### Application Monitoring

- **Vercel Analytics**: Built-in monitoring for Vercel deployments
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and error tracking

### Log Management

- **Papertrail**: Log aggregation and analysis
- **Loggly**: Cloud-based log management
- **Self-hosted**: ELK Stack (Elasticsearch, Logstash, Kibana)

### Health Checks

Add health check endpoint monitoring:

```bash
# Monitor health endpoint
curl https://your-domain.com/api/health/db
```

## Performance Optimization

### Build Optimization

- Enable production mode
- Optimize images
- Minimize JavaScript bundle size
- Enable compression

### Database Optimization

- Add database indexes
- Optimize queries
- Use connection pooling
- Enable query caching

### CDN Configuration

- Use CDN for static assets
- Configure caching headers
- Enable Gzip compression

## SSL/HTTPS Setup

### Vercel
- Automatic SSL certificates
- No additional configuration needed

### Self-Managed
- Use Let's Encrypt for free SSL certificates
- Configure Certbot for automatic renewal
- Update Nginx/Apache configuration

## Scaling Considerations

### Horizontal Scaling

- Load balancer configuration
- Multiple application instances
- Session storage (Redis)
- Database read replicas

### Vertical Scaling

- Increase server resources
- Optimize application performance
- Database query optimization

## Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

**Database Connection Issues:**
- Verify `DATABASE_URL` is correct
- Check database server is accessible
- Ensure firewall rules allow connections

**Environment Variable Issues:**
- Verify all required variables are set
- Check for typos in variable names
- Restart application after variable changes

### Rollback Procedures

**Vercel:**
- Go to project deployments
- Select previous deployment
- Click "Rollback"

**Docker:**
```bash
# Rollback to previous image
docker-compose down
docker-compose up -d --build
```

**VPS:**
```bash
# Revert to previous git commit
git revert HEAD
bun run build
pm2 restart learn-to-code
```

## Post-Deployment Checklist

- [ ] Application builds successfully
- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] SSL certificate configured
- [ ] Health checks passing
- [ ] Monitoring configured
- [ ] Backup procedures tested
- [ ] Error tracking enabled
- [ ] Performance baseline established
- [ ] Documentation updated

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review and apply security patches
- Monitor disk space and resources
- Test backup restoration
- Review logs for errors

### Update Procedures

1. **Test updates in staging**
2. **Create database backup**
3. **Apply updates**
4. **Run migrations**
5. **Monitor for issues**
6. **Roll back if necessary**

## Support

For deployment issues:

- Check platform documentation (Vercel, Docker, etc.)
- Review GitHub issues for similar problems
- Create new issue with detailed information
- Include logs and error messages

Good luck with your deployment! 🚀