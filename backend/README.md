# Backend API - PHP

## Structure
```
backend/
├── config/
│   ├── config.php       # Main configuration
│   └── database.php     # Database connection
├── controllers/
│   ├── AuthController.php
│   └── IndustriesController.php
├── middleware/
│   └── Security.php     # Security middleware
├── models/              # Database models (add as needed)
├── utils/               # Helper functions
├── index.php            # Main router
├── .htaccess            # URL rewriting
└── schema.prisma        # Database schema
```

## Configuration

Edit `config/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'jas_consulting');
define('DB_USER', 'root');
define('DB_PASS', '');
define('ALLOWED_ORIGINS', ['http://localhost:3000']);
```

## API Endpoints

### Authentication
- POST `/auth/login` - Login
- POST `/auth/logout` - Logout

### Industries
- GET `/industries` - List all
- GET `/industries/{slug}` - Get by slug
- POST `/industries` - Create (auth required)
- PUT `/industries/{id}` - Update (auth required)
- DELETE `/industries/{id}` - Delete (auth required)

## Security Features
- PDO prepared statements
- Input sanitization
- CSRF protection
- Rate limiting
- Session management
- Secure cookies

## Testing
```bash
# Test API
curl http://localhost/webtest-backup/backend

# Test industries
curl http://localhost/webtest-backup/backend/industries
```
