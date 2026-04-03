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
CONTACT_FORM_RECIPIENT=info@vavrostav.sk
SMTP2GO_SENDER=no-reply@your-domain.sk
```

## Notes

- `SMTP2GO_SENDER` should be an address verified in your SMTP2GO account.
- `CONTACT_FORM_RECIPIENT` is where contact messages will be delivered.
- After adding the env vars, restart the Next.js server.
