FROM node:18-alpine

# Install dumb-init for better signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy package files for better Docker layer caching
COPY package*.json ./

# Install dependencies with optimizations
RUN npm ci --only=production=false --silent

# Copy source code
COPY . .

# Create user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Development command with hot reload
CMD ["npm", "run", "dev"]