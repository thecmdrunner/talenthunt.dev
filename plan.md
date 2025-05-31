TalentHunt.dev is a platform that allows recruiters to find the best candidates for their jobs using natural-language queries.

Problem Statement:

Tech startups, companies and enterprises struggle to quickly fill specialized roles due to scarcity of qualified candidates, manual sourcing, inefficient screening, and bias. The average time-to-hire stretches beyond 60 days, increasing costs and reducing productivity.

We have to build an end-to-end hiring copilot powered by an LLM that allows recruiters to type plain-English queries (e.g., "Find senior GenAl engineers with LangChain + RAG experience in Europe, open to contract work") and instantly returns ranked, de-duplicated candidates, auto-screens them, and launches personalized outreach, dramatically reducing time, cost, and bias in hiring.

We have to solve the problem of helping recruiters to find the best candidates for their jobs by creating a platform where recruiters can find the best candidates for their jobs using natural-language queries. This is our MOAT.

We have 2 types of users: recruiters and candidates, and hence 2 modes of the UI, similar to Upwork.

After user signs up, they are redirected to the onboarding page to fill in their purpose of joining the platform - whether they are looking for a job, or they are looking to hire.

Candidate Flow: User connects their LinkedIn profile to get a "Linkedin verified" badge. Similarly, they can connect their "github" profile to get a "Github verified" badge, as it's required to list their best work in a verified way (LinkedIn - Mandatory, Github - Optional)

1. User is asked to upload their resume, and from the backend we extract all information and fill all the fields in the onboarding page, and ask them to fill the rest of the fields.
2. User gets listed on the platform as a candidate and can be found by recruiters.
3. Users can showcase their projects which appear as cards on their profile, so its easier for recruiters to understand their work experience.

Recruiter Flow: User connects their LinkedIn profile to get a "Linkedin verified" badge. This helps keep a check on the authenticity of the recruiter.

1. Recruiter is asked about what they are looking for in a candidate in terms of location, skills, etc. in a simple text <input />, and they are redirected to /discover and are can search for candidates. A search query based on whatever they entered will be pre-filled when they are redirected to /discover.

2. upon clicking on a candidate, a modal opens up with the candidate's profile, and the recruiter can see the candidate's projects, skills, experience, etc.

---

Pages:

/disover: ideally with a search bar and a showcase of top candidates/projects. Then once the user searches, they are redirected to /discover/search?q=...

Once a user uploads their resume, we ask 3-4 questions to assess resume credibility.
These questions will be based on the resume shared - in depth ones and user is supposed to respond to these in a video format.

Once this is cleared, only then a candidate is approved and onboarded.
Highlight your top projects for recruiters to look at the very first glance.

Featured Section will have top candidates in any particular flied.
We determine this in 2 ways-
Scoring the candidates based on the absolute score that we determine when they are onboarded (skill \* number of years relevant )
Number of people outreached to them

Based on the shortlisted candidates, you can select candidates and reach out to them personally.
Fill in the email with subject, mail id, personalized content and it opes the recruiter’s email to send out email directly.
