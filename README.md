# Law Office Management System - Frontend

React.js frontend application with Tailwind CSS for the Law Office Management System.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🔐 Authentication & Authorization
- 📱 Responsive Design
- 🏢 Admin Dashboard
- 🌐 Public Website
- 🔄 API Integration

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── admin/       # Admin dashboard components
│   │   └── website/     # Website components
│   ├── contexts/        # React contexts
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   │   ├── admin/       # Admin dashboard pages
│   │   ├── auth/        # Authentication pages
│   │   └── website/     # Website pages
│   ├── config/          # Configuration files
│   └── App.jsx          # Main app component
├── public/              # Static assets
└── package.json
```

## Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/services` - Services page
- `/contact` - Contact page
- `/login` - Login page
- `/register` - Register page

### Admin Routes (Protected)
- `/admin/dashboard` - Dashboard
- `/admin/cases` - Cases management
- `/admin/consultations` - Consultations
- `/admin/appointments` - Appointments
- `/admin/tasks` - Tasks
- `/admin/documents` - Documents
- `/admin/users` - Users (Admin only)
- `/admin/accounting` - Accounting (Admin only)
- `/admin/hr` - HR Management
- `/admin/training` - Training
- `/admin/company-formation` - Company Formation
- `/admin/archiving` - Archiving

## Technologies

- React 19
- React Router DOM
- Tailwind CSS
- Axios
- Vite

## License

ISC
"# laywer-system-amr-kotop" 
