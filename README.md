# Pokes.io - College Poker Analytics

A modern poker tracking application designed for college students, helping them analyze their poker games and make better decisions.

## Features

- 📊 Session tracking and analytics
- 💰 Profit/loss visualization
- ⏱️ Time management insights
- 💡 Opportunity cost analysis
- 🎯 Goal setting and tracking

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Supabase (for email collection)
- Recharts (for data visualization)

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd poker-tracker-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
# For Node.js >= 17
export NODE_OPTIONS='--openssl-legacy-provider' && npm start

# For Node.js < 17
npm start
```

## Development Notes

- The app uses Node.js with OpenSSL legacy provider for compatibility
- Default port is 3000, but can be configured using the PORT environment variable
- Supports modern browsers and mobile devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.