import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";

const markdown = `
# Overview

Lightweight API Monitor (LAM) is a developer-focused API observability platform for FastAPI/Starlette applications (shall be expanded to other applications soon).

LAM provides:
- Real-time dashboards
- Request latency tracking
- Error rate monitoring
- Historical performance analytics
- API key based multi-project monitoring

---

# How to use in your FastAPI/Starlette Application

## 1. Install the middleware

\`\`\`
pip install lam_middleware
\`\`\`

## 2. Get LAM API Key

- Go to the dashboard
- Sign up / Log in
- Create a new project
- Navigate to "API Keys" → Generate new key
- Add to your \`.env\` as \`LAM_API_KEY="your-api-key"\`

## 3. Integrate the middleware

LAMMiddleware captures:

- request method
- path
- latency
- status code

\`\`\`
from fastapi import FastAPI
from lam_middleware import LAMMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    LAMMiddleware,
    api_key=os.getenv("LAM_API_KEY")
)

@app.get("/users")
def get_users():
    return {"users":[]}
\`\`\`

### Advanced Options

\`\`\`
app.add_middleware(
    LAMMiddleware,
    api_key=os.getenv("LAM_API_KEY"),
    exclude_raw_paths={"/health", "/docs"},
    exclude_path_templates={"/health"}
)
\`\`\`

- \`raw_paths\` are complete endpoints.
- \`path_templates\` exclude all subpaths.

---

## 4. Monitor

Done. All API requests that your app receives are monitored and analysed in the dashboard.

---

# Architecture

\`\`\`
FastAPI App
    |
LAM Middleware
    |
LAM Backend (/ingest)
    |
PostgreSQL
    |
Dashboard
\`\`\`
`;

function GettingStarted() {
  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto",
        px: 4,
        py: 6,
        lineHeight: 1.8,

        "& h1": {
          fontSize: "2.2rem",
          fontWeight: 700,
          mt: 4,
          mb: 2,
        },

        "& h2": {
          fontSize: "1.6rem",
          fontWeight: 600,
          mt: 4,
          mb: 1.5,
        },

        "& h3": {
          fontSize: "1.25rem",
          fontWeight: 600,
          mt: 3,
          mb: 1,
        },

        "& p": {
          mb: 2,
          color: "text.primary",
        },

        "& ul": {
          pl: 3,
          mb: 2,
        },

        "& li": {
          mb: 1,
        },

        "& pre": {
          backgroundColor: "#0f172a",
          color: "#e2e8f0",
          padding: "16px",
          borderRadius: "12px",
          overflowX: "auto",
          fontSize: "0.9rem",
        },

        "& code": {
          padding: "2px 6px",
          borderRadius: "6px",
          fontSize: "0.85rem",
        },

        "& hr": {
          border: "none",
          borderTop: "1px solid #e2e8f0",
          my: 4,
        },
      }}
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Box>
  );
}

export default GettingStarted;