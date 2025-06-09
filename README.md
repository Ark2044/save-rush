# SaveRush

## Routing

This project uses Next.js App Router for all routing. See [ROUTING.md](./ROUTING.md) for more details about the routing system and recent changes.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your configuration:

```bash
cp .env.example .env.local
```

Then update the following variables in `.env.local`:

### Firebase Configuration

- `NEXT_PUBLIC_FIREBASE_API_KEY`: Your Firebase API Key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Your Firebase Auth Domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Your Firebase Project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Your Firebase Storage Bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase Messaging Sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Your Firebase App ID

You can find these values in your Firebase project settings.

### Google Maps API

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API Key

To get a Google Maps API key:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create an API key and add restrictions as needed for security
5. Add the key to your `.env.local` file
