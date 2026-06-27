# bangT History - Korean History Education Platform

## Overview

bangT History is a comprehensive Korean history education platform designed for teachers and students to collaborate on history learning through interactive problem sets, materials, and assignments.

## Features

### Teacher Features
- **Problem Management**: Create and manage multiple-choice, short answer, and essay problems
- **Material Management**: Upload and share learning materials with students
- **Assignment Distribution**: Create assignments from selected problems with due dates
- **Grading System**: Grade student submissions with scores and feedback

### Student Features
- **Assignment View**: Browse all assigned problems organized by deadline
- **Problem Solving**: Complete and submit answers to problems
- **Grade Tracking**: View feedback and scores from teachers

## Tech Stack

- **Frontend**: Next.js 13+, React 18+, TypeScript
- **Backend**: Node.js, Next.js API Routes
- **Database**: Prisma ORM, PostgreSQL
- **Styling**: Tailwind CSS
- **Authentication**: bcrypt

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/pliuy2013/bangT-history.git
cd bangT-history
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/bangt_history"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 4. Database Migration

```bash
npx prisma migrate dev
```

### 5. Run Development Server

```bash
npm run dev
```

The development server will run at `http://localhost:3000`.

## Usage

### Login & Registration

1. Navigate to home page
2. Click Login or Sign Up
3. Choose role: Teacher or Student
4. Redirect to dashboard based on role

### Teacher Usage

1. **Problem Management**: 
   - Create multiple problem types (MC, Short Answer, Essay)
   - Edit and delete problems
   - Organize by topic and difficulty

2. **Material Management**:
   - Upload learning materials
   - Share with all students
   - Manage resources

3. **Assignment Distribution**:
   - Select problems to create assignments
   - Set due dates
   - Track submissions

4. **Grading**:
   - Review student submissions
   - Provide scores and feedback
   - Track grading progress

### Student Usage

1. **View Assignments**:
   - Check assigned problems
   - See due dates
   - Track submission status

2. **Submit Solutions**:
   - Answer all problems
   - Submit assignment
   - Get confirmation

3. **Track Progress**:
   - View grades and feedback
   - Review submitted answers
   - Check score

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Problems
- `GET /api/problems` - List all problems
- `POST /api/problems` - Create new problem
- `GET /api/problems/:id` - Get problem details
- `DELETE /api/problems/:id` - Delete problem

### Materials
- `GET /api/materials` - List all materials
- `POST /api/materials` - Upload material
- `DELETE /api/materials/:id` - Delete material

### Assignments
- `GET /api/assignments` - List all assignments
- `POST /api/assignments/create` - Create assignment
- `GET /api/assignments/:id` - Get assignment details

### Submissions
- `POST /api/submissions` - Submit assignment
- `GET /api/submissions/:id` - Get submission details
- `PUT /api/submissions/:id` - Grade submission

## Project Structure

```
bangT-history/
├── app/
│   ├── api/                 # API routes
│   ├── login/              # Login page
│   ├── signup/             # Registration page
│   ├── teacher/            # Teacher pages
│   └── student/            # Student pages
├── components/             # Reusable UI components
├── lib/                    # Utility functions
├── prisma/                 # Database schema
└── public/                 # Static files
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

MIT License - Free to use, modify, and distribute

## Support

For issues and questions, please open an issue on GitHub.

---

**Have questions?** Open an issue or contact the maintainers!
