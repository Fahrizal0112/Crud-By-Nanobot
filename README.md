# Full-Stack CRUD Application

A complete full-stack CRUD (Create, Read, Update, Delete) application built with React and Express.js.

## 🚀 Technology Stack

### Backend
- **Express.js** - Web framework for Node.js
- **SQLite3** - Lightweight database
- **CORS** - Cross-Origin Resource Sharing
- **Body-Parser** - Request body parsing middleware

### Frontend
- **React 18** - UI library with modern hooks
- **Fetch API** - HTTP client for API communication
- **CSS3** - Modern styling with gradients and animations

## 📁 Project Structure

```
fullstack_crud/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   └── database.sqlite    # SQLite database (auto-created)
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Application styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd /root/.nanobot/workspace/fullstack_crud/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend server will run on **http://localhost:5000**

For development with auto-restart:
```bash
npm run dev
```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd /root/.nanobot/workspace/fullstack_crud/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend application will run on **http://localhost:3000** and automatically open in your browser.

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items` | Get all items |
| GET | `/items/:id` | Get a single item by ID |
| POST | `/items` | Create a new item |
| PUT | `/items/:id` | Update an item by ID |
| DELETE | `/items/:id` | Delete an item by ID |
| GET | `/health` | Health check endpoint |

### Request/Response Examples

#### Create Item (POST /api/items)
```json
Request Body:
{
  "name": "Sample Item",
  "description": "This is a sample description"
}

Response:
{
  "message": "Item created successfully",
  "data": {
    "id": 1,
    "name": "Sample Item",
    "description": "This is a sample description"
  }
}
```

#### Get All Items (GET /api/items)
```json
Response:
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Sample Item",
      "description": "This is a sample description",
      "created_at": "2024-01-01 12:00:00",
      "updated_at": "2024-01-01 12:00:00"
    }
  ]
}
```

## 🎯 Features

- ✅ Create new items with name and description
- ✅ View all items in a responsive grid layout
- ✅ Update existing items
- ✅ Delete items with confirmation
- ✅ Real-time updates after each operation
- ✅ Form validation
- ✅ Error handling and user feedback
- ✅ Modern, responsive UI design
- ✅ RESTful API architecture
- ✅ SQLite database with automatic table creation

## 🎨 User Interface

The application features a modern, gradient-based design with:
- Purple gradient background
- Card-based item display
- Smooth animations and transitions
- Responsive layout for mobile and desktop
- Intuitive form controls
- Visual feedback for user actions

## 🛠️ Development

### Backend Development
The backend uses Express.js with SQLite for data persistence. The database file (`database.sqlite`) is automatically created when the server starts for the first time.

### Frontend Development
The frontend is built with React using functional components and hooks:
- `useState` - Managing component state
- `useEffect` - Fetching data on component mount
- Fetch API - Making HTTP requests to the backend

## 🔒 CORS Configuration

The backend is configured to accept requests from any origin. In production, you should restrict this to your frontend domain:

```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

## 📝 Notes

- The backend runs on port **5000**
- The frontend runs on port **3000**
- Both servers must be running simultaneously for the application to work
- The SQLite database file is created in the backend directory
- No git initialization or GitHub push is included as per requirements

## 🐛 Troubleshooting

### Backend won't start
- Ensure port 5000 is not in use
- Check that all dependencies are installed (`npm install`)

### Frontend can't connect to backend
- Verify the backend server is running on port 5000
- Check the browser console for CORS errors
- Ensure the API_URL in App.js points to `http://localhost:5000/api/items`

### Database errors
- Delete the `database.sqlite` file and restart the backend server
- The database and table will be recreated automatically

## 📄 License

ISC

## 👨‍💻 Author

Created as a full-stack CRUD application demonstration.
