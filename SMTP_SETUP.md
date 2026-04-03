# SMTP2GO Setup

This project uses a Next.js route handler instead of Netlify Functions.

## Files involved

- `app/api/contact/route.ts`
  Handles validation and sends the message to SMTP2GO.
- `components/contact-form.tsx`
  Submits the form with `fetch`, shows loading, success, and error states.
- `components/contact-page-view.tsx`
  Renders the contact page form UI.
- `.env.example`
  Lists the required environment variables.

## Environment variables

Create a local `.env.local` file with:

```bash
SMTP2GO_API_KEY=your_smtp2go_api_key
SMTP2GO_TO_EMAIL=info@vavrostav.sk
SMTP2GO_FROM_EMAIL=no-reply@your-domain.sk
SMTP2GO_FROM_NAME=Vavrostav Web
```

## Notes

- `SMTP2GO_FROM_EMAIL` should be an address verified in your SMTP2GO account.
- `SMTP2GO_TO_EMAIL` is where contact messages will be delivered.
- After adding the env vars, restart the Next.js server.
