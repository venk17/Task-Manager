# TaskFlow - Modern Task Management Application

A beautiful, full-stack task management application built with Next.js and Express.js. Features a clean, modern UI with comprehensive task management capabilities.

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js (React), Tailwind CSS, Lucide React Icons |
| **Backend** | Node.js, Express.js, TypeORM |
| **Database** | SQLite |
| **Styling** | Tailwind CSS with custom design system |

## ✨ Features

- **Complete CRUD Operations**: Create, read, update, and delete tasks
- **Task Status Management**: Track tasks through todo, in-progress, and done states
- **Due Date Tracking**: Set and monitor task deadlines with visual indicators
- **Smart Filtering**: Filter tasks by status and search functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Real-time Updates**: Dynamic task updates without page refreshes

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (supports status filtering) |
| GET | `/api/tasks/:id` | Get single task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update existing task |
| DELETE | `/api/tasks/:id` | Delete task |

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```

3. **Start the backend server**:
   ```bash
   npm run dev
   ```

   The backend API will be available at `http://localhost:3001`

4. **Database**: SQLite database will be automatically created as `database.sqlite` in the backend directory

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Start the frontend development server**:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

### Full Application

To run both frontend and backend simultaneously:

```bash
npm run dev
```

## 📱 Pages & Features

### Dashboard (`/`)
- Overview of all tasks with statistics
- Search and filter functionality
- Task status indicators and due date warnings
- Quick actions for editing and deleting tasks

### Add Task (`/add`)
- Clean form interface for creating new tasks
- Input validation and error handling
- Support for title, description, status, and due date

### Edit Task (`/edit/[id]`)
- Pre-populated form for updating existing tasks
- Same validation as create form
- Seamless navigation back to dashboard

## 🎨 Design Features

- **Modern Color System**: Comprehensive palette with primary, success, warning, and error states
- **Typography**: Inter font family with proper hierarchy and spacing
- **Interactive Elements**: Hover effects, smooth transitions, and micro-interactions
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Status Indicators**: Color-coded badges and icons for quick status recognition
- **Date Handling**: Smart due date indicators with overdue and due-soon warnings

## 🚀 Deployment

### Frontend (Vercel)

1. **Build the frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**:
   - Connect your repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `.next`
   - Add environment variable: `NEXT_PUBLIC_API_URL=your-backend-url`

### Backend (Render)

1. **Prepare for deployment**:
   - Ensure all dependencies are in `package.json`
   - Set `NODE_ENV=production` in environment variables

2. **Deploy to Render**:
   - Connect your repository to Render
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables as needed

## 📝 Environment Variables

### Backend (`.env`)
```env
PORT=3001
DATABASE_PATH=./database.sqlite
NODE_ENV=development
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed with user experience in mind
- Follows best practices for full-stack development