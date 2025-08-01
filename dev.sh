#!/bin/bash

# Dev helper script for comp_bike project

echo "🚀 Comp.bike Development Helper"
echo "================================"

case "$1" in
  "start")
    echo "📦 Starting development environment..."
    docker-compose -f docker-compose.dev.yml up -d
    echo "✅ Environment started!"
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8000"
    echo "📊 Database: localhost:5432"
    ;;
  
  "stop")
    echo "🛑 Stopping development environment..."
    docker-compose -f docker-compose.dev.yml down
    echo "✅ Environment stopped!"
    ;;
  
  "restart")
    echo "🔄 Restarting development environment..."
    docker-compose -f docker-compose.dev.yml restart
    echo "✅ Environment restarted!"
    ;;
  
  "logs")
    service=${2:-frontend}
    echo "📋 Showing logs for $service..."
    docker-compose -f docker-compose.dev.yml logs -f $service
    ;;
  
  "shell")
    service=${2:-frontend}
    echo "🐚 Opening shell in $service..."
    docker-compose -f docker-compose.dev.yml exec $service sh
    ;;
  
  "clean")
    echo "🧹 Cleaning up Docker resources..."
    docker-compose -f docker-compose.dev.yml down -v
    docker system prune -f
    echo "✅ Cleanup complete!"
    ;;
  
  "status")
    echo "📊 Current status:"
    docker-compose -f docker-compose.dev.yml ps
    ;;
  
  *)
    echo "Usage: $0 {start|stop|restart|logs|shell|clean|status}"
    echo ""
    echo "Commands:"
    echo "  start    - Start development environment"
    echo "  stop     - Stop development environment"  
    echo "  restart  - Restart development environment"
    echo "  logs     - Show logs (optional: specify service)"
    echo "  shell    - Open shell in container (optional: specify service)"
    echo "  clean    - Clean up Docker resources"
    echo "  status   - Show container status"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 logs frontend"
    echo "  $0 shell backend"
    exit 1
    ;;
esac
