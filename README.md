# TalentHunt

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Authentication Setup

This project uses [Clerk](https://clerk.com/) for authentication. To set up authentication:

1. Create a Clerk account at [https://clerk.com/](https://clerk.com/)
2. Create a new application in your Clerk dashboard
3. Copy your API keys from the Clerk dashboard
4. Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Other required environment variables
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
OPENROUTER_API_KEY="your_openrouter_api_key_here"
```

## LinkedIn Integration Limitations

⚠️ **Important**: LinkedIn's OAuth integration through Clerk has significant limitations:

### What LinkedIn Data IS Available:

- Basic profile: `id`, `firstName`, `lastName`
- Profile picture
- Email address (with additional scope)

### What LinkedIn Data is NOT Available:

- **Work experience/employment history** ❌
- Education history ❌
- Skills and endorsements ❌
- Connections ❌
- Job titles and company details ❌
- Professional recommendations ❌

### Why These Limitations Exist:

1. LinkedIn restricted API access in 2018-2023 for privacy reasons
2. Rich profile data now requires LinkedIn Partnership (expensive, $10k+/month)
3. Current OAuth scopes (`profile`, `email`, `openid`) are very limited

### Alternative Solutions:

- **Manual data collection**: Prompt users to enter work experience after sign-in
- **Resume parsing**: Allow users to upload resumes for automatic data extraction
- **Third-party APIs**: Services like Proxycurl (with legal considerations)
- **Alternative platforms**: Consider other professional data sources

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.com) - Authentication
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
