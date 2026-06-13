# Environment variables

Copy these into a local `.env.local` (which is gitignored).

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# HOPE companion (Anthropic)
ANTHROPIC_API_KEY=

# HOPE Cleaner (Google Drive OAuth Client ID)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

## HOPE Cleaner setup (`NEXT_PUBLIC_GOOGLE_CLIENT_ID`)

1. Create a project (or use an existing one) at the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Enable the **Google Drive API**.
3. Create an **OAuth 2.0 Client ID** of type "Web application".
4. Add your app's URL (e.g. `http://localhost:3000`) as an **authorized JavaScript origin**.
5. On the OAuth consent screen, add the `https://www.googleapis.com/auth/drive` scope and add yourself as a test user (this scope requires verification for public apps, but works for personal/testing use immediately).
6. Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to the generated client ID.
