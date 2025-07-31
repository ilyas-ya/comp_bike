FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    cron \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create logs directory
RUN mkdir -p logs

<<<<<<< HEAD
# Setup cron job
COPY crontab /etc/cron.d/scraper-cron
RUN chmod 0644 /etc/cron.d/scraper-cron
=======
# Copy project
COPY . .

# Setup cron job - alternative approach to avoid crontab errors
RUN echo "0 2 * * * cd /app && python /app/main.py >> /app/logs/cron.log 2>&1" > /etc/cron.d/scraper-cron \
    && echo "" >> /etc/cron.d/scraper-cron \
    && chmod 0644 /etc/cron.d/scraper-cron \
    && crontab /etc/cron.d/scraper-cron
>>>>>>> 1476c9d15336575ae3e3b1d628e5fb14f05c5ff7

# Start cron and keep container running
CMD ["cron", "-f"]