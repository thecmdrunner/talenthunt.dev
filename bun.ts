import { db } from "@/server/db";
import { jobs } from "@/server/db/schema";

// Mock data - replace with actual data fetching
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    status: "active" as const,
    postedAt: "2 weeks ago",
    location: "San Francisco, CA",
    workType: "Full-time",
    applicationCount: 24,
    expiresIn: "4 weeks",
    requiredSkills: ["React", "TypeScript", "CSS", "HTML", "Redux"],
  },
  {
    id: "2",
    title: "Machine Learning Engineer",
    status: "active" as const,
    postedAt: "1 week ago",
    location: "Remote",
    workType: "Full-time",
    applicationCount: 18,
    expiresIn: "5 weeks",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
  },
];

db.insert(jobs).values(mockJobs);
