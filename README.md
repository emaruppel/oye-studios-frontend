# Oye Studios Frontend

Frontend web application for Oye Studios - A platform for music and podcasts streaming with artist monetization.

## 🚀 Features

### For Users
- ✅ Landing page with platform presentation
- ✅ User registration and login with JWT authentication
- ✅ Dashboard for listeners with personalized content
- ✅ Responsive design for mobile and desktop
- ✅ HLS adaptive video player
- ✅ Search and navigation

### For Artists
- ✅ Complete artist panel with:
  - Dashboard with statistics (plays, followers, revenue)
  - Video upload interface with progress tracking
  - Monetization status and requirements
  - Payment history
  - Policy change notifications
- ✅ Public artist profiles
- ✅ Analytics and charts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Video Player**: Video.js with HLS support
- **State Management**: React Context API
- **Data Fetching**: SWR, Axios
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Testing**: Jest, React Testing Library
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/emaruppel/oye-studios-frontend.git
cd oye-studios-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_VIDEO_CDN_URL=http://localhost:3001
```

## 🚀 Usage

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:
```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Run Tests

```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
oye-studios-frontend/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── dashboard/           # User dashboard
│   └── artist/              # Artist panel
│       ├── page.tsx         # Artist dashboard
│       ├── upload/          # Video upload
│       ├── monetization/    # Monetization management
│       └── notifications/   # Notifications
├── components/              # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Loader.tsx
│   ├── Navigation.tsx
│   └── VideoPlayer.tsx
├── contexts/                # React contexts
│   └── AuthContext.tsx     # Authentication context
├── services/                # API services
│   └── authService.ts      # Authentication service
├── lib/                     # Utilities and helpers
│   └── api.ts              # Axios configuration
├── hooks/                   # Custom React hooks
├── utils/                   # Utility functions
├── public/                  # Static assets
└── __tests__/              # Test files
```

## 🔐 Authentication

The app uses JWT-based authentication. Mock authentication is implemented for demo purposes:

- **Login**: Any email/password combination works in demo mode
- **Artist account**: Include "artist" in email (e.g., `artist@example.com`)
- **Regular user**: Any other email

## 🎨 Key Components

### Video Player
Adaptive HLS video player with Video.js:
```tsx
import VideoPlayer from '@/components/VideoPlayer'

<VideoPlayer 
  src="https://example.com/video.m3u8"
  poster="https://example.com/poster.jpg"
  autoplay={false}
  controls={true}
/>
```

### Authentication Context
Access authentication state anywhere:
```tsx
import { useAuth } from '@/contexts/AuthContext'

const { user, login, logout, isAuthenticated, isArtist } = useAuth()
```

### Protected Routes
Routes under `/dashboard` and `/artist` are automatically protected by middleware.

## 📊 Features in Detail

### User Dashboard
- Quick stats (videos watched, favorites, followed artists)
- Personalized recommendations
- CTA for becoming an artist

### Artist Panel
- **Dashboard**: Statistics with interactive charts (plays, followers, revenue)
- **Upload**: Drag & drop video upload with progress tracking
- **Monetization**: Status, requirements, payment history
- **Notifications**: Policy updates, milestones, alerts

### Video Upload
Supports:
- MP4, MOV, AVI formats
- Up to 500MB file size
- Progress tracking
- Validation and error handling

## 🧪 Testing

Basic tests are included for core components:
```bash
npm test
```

Tests cover:
- Component rendering
- User interactions
- Props validation
- State management

## 🌐 API Integration

The app is configured to work with a backend API. Update `NEXT_PUBLIC_API_URL` in `.env` to point to your backend.

Mock data is used when the API is unavailable for seamless development.

### API Endpoints Expected:
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/videos/upload` - Video upload
- `GET /api/videos` - List videos
- `GET /api/artist/stats` - Artist statistics

## 🎯 Acceptance Criteria Status

- ✅ `npm run dev` runs without errors
- ✅ Login/registration pages work
- ✅ HLS video player plays videos (with mock data)
- ✅ Artist panel displays dashboard with statistics
- ✅ Video upload form works with progress tracking
- ✅ API integration layer ready (with mock fallback)
- ✅ Protected routes with authentication middleware
- ✅ Responsive design for mobile and desktop
- ✅ Basic tests pass
- ✅ README with setup and usage instructions

## 🚧 Development Notes

- Mock data is used throughout for demonstration
- Replace mock data with real API calls as backend becomes available
- Video player requires HLS-compatible video sources
- JWT tokens are stored in localStorage (consider httpOnly cookies for production)

## 📝 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support, email support@oyestudios.com or open an issue in the repository.
