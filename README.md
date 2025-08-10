# URL Shortener

A Node.js + Express application that shortens long URLs and redirects users when the short code is visited.  
Stores URL mappings in MongoDB.

## Features
- Shorten long URLs to a short, unique code
- Redirect to original URL when visiting short link
- Track creation date and number of visits
- REST API for creating and fetching short URLs

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- NanoID or shortid for code generation
- dotenv for environment variables
- nodemon for development

## Project Structure
```
URLShortener-main/
├── server.js         # App entry point
├── models/
│   └── Url.js        # Mongoose schema for URLs
├── routes/
│   └── url.js        # API routes
├── config/
│   └── db.js         # MongoDB connection
├── package.json
└── .env.example
```

## Setup
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd URLShortener-main
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create `.env` file**
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/urlshortener
   BASE_URL=http://localhost:5000
   ```
4. **Run the app**
   ```bash
   npm run dev    # development with nodemon
   npm start      # production
   ```
   App runs at [http://localhost:5000](http://localhost:5000)

## API Usage

### Create Short URL
`POST /api/url/shorten`  
Request body:
```json
{
  "longUrl": "https://example.com/some/very/long/path"
}
```
Response:
```json
{
  "shortUrl": "http://localhost:5000/abc123",
  "longUrl": "https://example.com/some/very/long/path",
  "code": "abc123",
  "date": "2025-08-09T12:00:00.000Z"
}
```

### Redirect
`GET /:code`  
Redirects to the long URL associated with `code`.

## Notes
- Ensure MongoDB is running locally or update `MONGO_URI` to point to a cloud instance.
- Change `BASE_URL` in `.env` when deploying.

## License
MIT
