# 🤖 AI Resume Analyzer & Parser

An intelligent, full-stack web application that allows users to upload their resumes and receive instant, AI-driven professional insights, structural feedback, and optimization tips using the Google Gemini API.

---

## 🚀 Key Features

*   **Secure Authentication Hub:** Full user registration and login system backed by custom Spring Boot response flows.
*   **Dynamic Identity Tracking:** Seamless integration between Spring Boot session serialization and React `localStorage` persistence.
*   **AI-Powered Resume Auditing:** Utilizes the Google Gemini API to parse resume data and analyze structural components against modern industry standards.
*   **Customization Engine (Settings Hub):** Features an interactive system settings menu to update user details, modify passwords, and tweak custom AI system prompts (e.g., Target Industry, Experience Level).

---

## 🛠️ Technology Stack

### Backend Archetype
*   **Language & Runtime:** Java 17 / Spring Boot 3.x
*   **Security & Validation:** Spring Web, Data JPA
*   **AI Integration:** Google Gemini API Client
*   **Build Automation:** Maven

### Frontend Layer
*   **Framework & Ecosystem:** React 18+ (Vite SPA template)
*   **State Management:** Native Hooks (`useState`, `useEffect`)
*   **HTTP Architecture:** Axios Client
*   **Styling Engine:** Custom Responsive CSS3 Modules

---

## 📁 System Architecture & Directory Blueprint

```text
├── backend/
│   ├── src/main/java/com/analyzer/
│   │   ├── controller/      # REST API mappings (UserController, ResumeController)
│   │   ├── entity/          # JPA Hibernate schemas (User, Resume)
│   │   ├── repository/      # Data access layer (UserRepository, ResumeRepository)
│   │   └── service/         # Business logic layers (UserService, ResumeService)
│   └── pom.xml              # Maven dependency configuration manifest
│
└── frontend/
    ├── public/              # Static public assets
    └── src/
        ├── assets/          # Global styles, typography, image collections
        ├── pages/           # Core view views & dashboard terminals
           ├── auth/         # Managed identity views
           │   ├── Login.jsx
           │   └── Register.jsx
           ├── AnalysisResult.jsx
           ├── Dashboard.jsx
           ├── LandingPage.jsx
           ├── ResumeHistory.jsx
           └── UploadResume.jsx
        
⚡ Quick Start & Installation Guide
Prerequisites
Java Development Kit (JDK 17 or higher)

Node.js (v18.x or higher) & npm

A valid Google Gemini API Key

1. Spinning Up the Backend
Clone the repository and navigate to the backend folder:

Bash
cd backend
Open src/main/resources/application.properties and add your database configuration along with your Gemini API credentials:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/resume_analyzer_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

# AI Config
gemini.api.key=YOUR_GEMINI_API_KEY_HERE
Run the Spring Boot application using Maven:

Bash
mvn spring-boot:run
The backend will boot up at http://localhost:8080

2. Launching the Frontend Client
Open a new terminal instance and navigate to the frontend folder:

Bash
cd frontend
Install the required Node packages:

Bash
npm install
Start the Vite local development server:

Bash
npm run dev
The client dashboard will open up at http://localhost:5173
