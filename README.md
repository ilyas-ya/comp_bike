# comp.bike - Component Compatibility System

**Category**: Interoperability / Infrastructure Tools  
**License**: MIT License (OSI-approved)  
**Hackathon**: [Kiro DevPost Hackathon](https://kiro.devpost.com/)

---

## What is comp.bike?

**comp.bike** is an open-source web application that addresses a major challenge in the cycling industry: ensuring interoperability and compatibility between components across different bicycle brands and standards. 

Targeted at mechanics, workshops, and second-hand buyers, the platform provides intuitive compatibility checking between bicycle components with real-time visual feedback through a color-coded system: green for compatible, orange for uncertain/conditional compatibility, and red for incompatible.

---

## Key Features

### Interactive Visual Interface
- **Interactive bike diagram** with clickable component areas
- **Hover effects** and visual highlighting for intuitive component selection
- **Color-coded compatibility feedback** (green/orange/red) for instant visual understanding
- **Responsive design** that works on desktop, tablet, and mobile devices

### Comprehensive Component Support
The system supports compatibility checking for 5 main component categories:

1. **Bottom Bracket & Crankset** - BSA, BB30, DUB standards with spindle type and shell width
2. **Cassette & Derailleur** - Gear range, spacing, pull ratio, and brand compatibility
3. **Brake System** - Mechanical/hydraulic types, mounting standards, rotor sizes
4. **Wheel & Frame Interface** - Axle types (QR/thru-axle), spacing, rotor mounting
5. **Seatpost** - Diameter, insertion length, saddle clamp compatibility

### Advanced Compatibility Logic
- **Frame-centric workflow** - Select a frame and check component compatibility
- **Component-to-component checking** - Direct compatibility verification between any two parts
- **Adapter suggestions** - Recommendations for making incompatible components work together
- **Confidence scoring** - Each compatibility result includes a confidence level
- **Alternative suggestions** - System suggests compatible alternatives when conflicts arise

### Data Management & Automation
- **Admin interface** for manual data entry and management
- **AI-powered web scraping** service for automated component data collection
- **Bulk import/export** functionality with validation
- **Conflict resolution** system for handling data discrepancies
- **REST API** with comprehensive documentation

---

## How Kiro Was Used

This project was developed as part of the [Kiro Hackathon](https://kiro.devpost.com/) using **Kiro**, the AI-powered IDE, throughout the entire development process.

### Specification & Architecture Phase
Kiro helped us:
- Define the comprehensive requirements document with user stories and acceptance criteria
- Design the technical architecture with proper separation of concerns
- Create detailed data models for components, frames, standards, and compatibility rules
- Plan the API structure and endpoint specifications
- Establish the testing strategy and performance considerations

### Development Phase
Kiro accelerated development by:
- **Backend Development**: Generated complete Django models, serializers, views, and URL configurations
- **Database Design**: Created optimized database schemas with proper indexing and relationships
- **API Implementation**: Built RESTful endpoints with filtering, pagination, and search capabilities
- **Frontend Scaffolding**: Set up Next.js project structure with TypeScript and Tailwind CSS
- **Docker Configuration**: Created production-ready Docker Compose setup with all services
- **Code Quality**: Ensured consistent code style and best practices across the entire codebase

Kiro made it possible to go from concept to a fully functional, scalable application architecture in record time, allowing us to focus on the unique compatibility logic rather than boilerplate code.

---

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Django 4.2, Django REST Framework
- **Database**: PostgreSQL 15 with Redis caching
- **AI Scraping**: Python with BeautifulSoup/Scrapy
- **Deployment**: Docker & Docker Compose
- **IDE**: Kiro AI-powered development environment

---

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Git

### Quick Start

1. **Clone the repository:**
```bash
git clone <repository-url>
cd component-compatibility-system
```

2. **Start all services:**
```bash
docker-compose up --build
```

3. **Access the application:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **API Documentation**: http://localhost:8000/api/docs
- **Admin Interface**: http://localhost:8000/admin

4. **Create admin user:**
```bash
docker-compose exec backend python manage.py createsuperuser
```

### Project Structure

```
├── backend/                    # Django backend
│   ├── apps/                  # Django applications
│   │   ├── components/        # Component management & API
│   │   ├── compatibility/     # Compatibility checking logic
│   │   ├── frames/           # Bike frame management
│   │   └── standards/        # Mechanical standards
│   └── compatibility_system/  # Django project settings
├── frontend/                  # Next.js frontend
│   └── src/
│       ├── app/              # Next.js app directory
│       ├── components/       # React components
│       ├── lib/             # API client & utilities
│       └── types/           # TypeScript definitions
├── scraper/                   # AI scraping service
├── database/                  # Database initialization
└── docker-compose.yml        # Services configuration
```

## API Documentation

The system provides a comprehensive REST API:

### Core Endpoints
- `GET /api/components/` - List components with filtering and search
- `POST /api/compatibility/check/` - Check compatibility between components
- `GET /api/frames/` - List bike frames with specifications
- `GET /api/standards/` - List mechanical standards and categories

### Advanced Features
- **Pagination** - All list endpoints support pagination
- **Filtering** - Filter by category, brand, specifications, etc.
- **Search** - Full-text search across component names and descriptions
- **Caching** - Redis caching for improved performance
- **Rate Limiting** - API rate limiting for production use

Visit http://localhost:8000/api/docs/ for interactive API documentation.

## Compatibility Logic

The system uses a sophisticated multi-layered approach:

1. **Explicit Rules** - Manually defined compatibility rules with high confidence
2. **Specification Matching** - Automatic checking based on component specifications  
3. **Standard Cross-referencing** - Compatibility based on mechanical standards
4. **Adapter Integration** - Suggestions for adapters to resolve incompatibilities

### Color-Coded Results
- 🟢 **Green (Compatible)** - Components work together directly
- 🟠 **Orange (Conditional)** - May work with adapters or under specific conditions
- 🔴 **Red (Incompatible)** - Components cannot work together

---

## Development & Testing

### Running Tests
```bash
# Backend tests
docker-compose exec backend python manage.py test

# Check test coverage
docker-compose exec backend coverage run --source='.' manage.py test
docker-compose exec backend coverage report
```

### Database Management
```bash
# Run migrations
docker-compose exec backend python manage.py migrate

# Create new migrations
docker-compose exec backend python manage.py makemigrations
```

### AI Scraper
```bash
# Run scraper manually
docker-compose exec scraper python main.py --run-once

# View scraper logs
docker-compose logs -f scraper
```

---

## Contributing

We welcome contributions of compatibility data, feedback on functionality, and feature ideas. 

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and add tests
4. Ensure all tests pass
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Areas for Contribution
- **Component Data**: Add more component specifications and compatibility rules
- **Scraper Extensions**: Add scrapers for additional manufacturer websites
- **UI/UX Improvements**: Enhance the interactive bike diagram and user interface
- **Mobile Optimization**: Improve mobile responsiveness and touch interactions
- **Performance**: Optimize database queries and caching strategies

---

## License

This project is licensed under the **MIT License**, an OSI-approved open source license. You are free to use, modify, and distribute the code, provided proper attribution is given.

---

## Acknowledgments

- **Kiro AI IDE** - For accelerating development and enabling rapid prototyping
- **Open Source Community** - For the excellent tools and libraries that made this possible
- **Cycling Community** - For inspiring the need for better component compatibility tools

---

*Built with ❤️ using Kiro AI IDE for the Kiro DevPost Hackathon*