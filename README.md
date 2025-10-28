# Travel Advisor App

A modern travel recommendation application that helps users discover nearby places and attractions based on their current location or search queries. Built with React, TypeScript, and integrated with Foursquare Places API for comprehensive location data.

## 🚀 Features

- **Location-Based Discovery**: Automatically detects user's location to show nearby places
- **Search Functionality**: Search for places by name, category, or location
- **Interactive Map**: Visualize places with Leaflet map integration
- **Category Filtering**: Browse places by different categories (restaurants, stadium, libraries)
- **Responsive Design**: Works seamlessly across all device types
- **Real-time Updates**: Dynamic content updates based on user interactions
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🛠️ Technologies Used

### Frontend
- **React 19 (RC)**: Component-based UI library
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible UI components
- **Leaflet & React-Leaflet**: Interactive map functionality



### Backend
- **Node.js & Express**: Server-side runtime and framework
- **Axios**: HTTP client for API requests
- **Cors**: Cross-origin resource sharing middleware

### Other Tools
- **Foursquare Places API**: Venue discovery and location data
- **OpenStreetMap Nominatim**: Location search and geocoding
- **Dotenv**: Environment variable management
- **ESLint**: Code linting and quality
- **React Compiler**: Optimized rendering

## 📦 Dependencies

### Key Dependencies
- `react` - React library for building user interfaces
- `react-dom` - React package for DOM-specific methods
- `leaflet` - Interactive map library
- `react-leaflet` - React components for Leaflet
- `@radix-ui/react-select` - Accessible select component
- `@fontsource/josefin-sans` - Modern font family
- `axios` - Promise-based HTTP client
- `express` - Web application framework
- `cors` - Cross-origin resource sharing

### Development Dependencies
- `@types/react` - TypeScript definitions for React
- `@types/react-dom` - TypeScript definitions for React DOM
- `@vitejs/plugin-react` - Official Vite plugin for React
- `typescript` - Strongly typed programming language
- `eslint` - Pluggable linting utility

## ▶️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Foursquare Places API key

### Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-advisor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Foursquare API key:
   ```env
   FSQ_API_KEY=your_foursquare_places_api_key_here
   ```

4. **Start the backend server**
   ```bash
   # In a new terminal window, navigate to the backend directory
   cd backend
   npm install  # if dependencies were not installed globally
   node server.js
   ```
   Or if using npm scripts:
   ```bash
   npm run dev:backend  # if you have this script configured
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Visit `http://localhost:5173` to see the application

### Backend Server Setup
The application includes a backend server that handles API requests to Foursquare Places API.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with your Foursquare API key:
   ```env
   FSQ_API_KEY=your_foursquare_places_api_key_here
   ```

4. Start the server:
   ```bash
   node server.js
   ```

## 🔧 Configuration

### Environment Variables
The application requires the following environment variables:

- `FSQ_API_KEY`: Your Foursquare Places API key (required for backend)

### API Endpoints

#### Backend Endpoints
- `GET /api/places`: Fetch places within specified bounds and category
  - Query parameters:
    - `latne`: North-east latitude
    - `lngne`: North-east longitude
    - `latsw`: South-west latitude
    - `lngsw`: South-west longitude
    - `fsq_category_ids`: Foursquare category IDs

#### External APIs
- **Foursquare Places API**: Used for venue discovery
- **OpenStreetMap Nominatim**: Used for location search (`https://nominatim.openstreetmap.org/search`)

## 🏗️ Project Structure

```
travel-advisor/
├── backend/
│   └── server.js              # Express server implementation
├── public/                    # Static assets
├── src/
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   ├── assets/               # Static assets (images, icons)
│   ├── components/
│   │   ├── elements/         # UI components (Header, List, Map)
│   │   └── ui/               # Reusable UI components (shadcn components)
│   ├── lib/
│   │   └── types.ts          # TypeScript type definitions
│   └── hooks/                # Custom React hooks (if any)
├── package.json
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── README.md
```

## 🧩 Components

### Main Components
- **App**: Main application component managing state and data flow
- **Header**: Search bar and navigation component
- **List**: Sidebar displaying place information and category selector
- **Map**: Interactive map with place markers
- **Custom UI Components**: Reusable components following shadcn/ui standards

### Component Data Flow
1. App component manages global state (search term, bounds, places, errors)
2. Header handles user input and updates search term
3. List displays results and category filtering
4. Map shows location-based data with markers
5. All components communicate through prop drilling

## 🔍 API Integration

### Foursquare Places API
The application connects to Foursquare Places API through the backend server:

- Backend fetches venues within specified geographical bounds
- Multiple category options for different place types
- Request parameters include bounding box coordinates and category IDs

### Location Services
- Uses browser's Geolocation API to detect current user location
- Falls back to default location if permission is denied
- Updates map bounds based on user location

## 🎨 Styling

The application uses:
- **Tailwind CSS** for utility-first styling
- **Custom color palette** using oklch color space
- **Responsive design** with grid and flexbox
- **Dark/light theme support** with automatic system preference detection
- **Google Fonts** (Josefin Sans) for typography
- **Custom scrollbar styling** for better UI consistency

## 🧪 Testing

### Running Tests
If tests are implemented:
```bash
npm run test
```

### Linting
```bash
npm run lint
```

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized static files in the `dist` folder that can be deployed to any static hosting service.

To preview the production build locally:

```bash
npm run preview
```

## 🚀 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
```
Then deploy the `dist` folder to Netlify.

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your GitHub Pages branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write TypeScript for type safety
- Use Tailwind CSS for styling
- Follow accessibility best practices
- Write meaningful commit messages

## 🐛 Troubleshooting

### Common Issues

**API Key Issues**
- Ensure your Foursquare API key is correctly set in the `.env` file
- Verify the API key has the necessary permissions for Places API

**CORS Issues**
- Make sure the backend server is running on `http://localhost:5000`
- CORS is configured in the backend server

**Geolocation Issues**
- Ensure the browser allows location access
- Application must be served over HTTPS for production

**Map Not Loading**
- Check if Leaflet CSS and JS are properly loaded
- Verify map container has explicit height

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Open an issue in the repository
3. Contact the project maintainers

## 🙏 Acknowledgments

- Foursquare for Places API
- OpenStreetMap and Nominatim for geocoding services
- React team for the amazing library
- shadcn/ui for the beautiful component system
- Leaflet team for the interactive maps
- All the open-source libraries that made this project possible
