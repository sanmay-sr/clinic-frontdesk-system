# Clinic Front Desk System - Frontend

This is the frontend application for the Clinic Front Desk System, built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI.

## Features

- **Queue Management**: Manage patient queues with status tracking
- **Appointment Management**: Book, reschedule, and cancel appointments
- **Doctor Profile Management**: Add, edit, and delete doctor profiles
- **Admin Dashboard**: Comprehensive view of all appointments
- **Responsive Design**: Works on mobile, tablet, and desktop
- **JWT Authentication**: Secure login system

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **State Management**: React Context
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel Deployment

1. **Connect to Vercel**:
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Import the project

2. **Configure Environment Variables**:
   In your Vercel project settings, add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
   ```

3. **Deploy**:
   - Vercel will automatically detect Next.js
   - Build and deploy will happen automatically

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

### Build Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   └── ui/              # ShadCN UI components
├── contexts/            # React contexts
├── lib/                 # Utilities and API
└── styles/              # Global styles
```

## API Integration

The frontend communicates with the backend through the `ApiService` class in `src/lib/api.ts`. All API calls are configured to use the `NEXT_PUBLIC_API_URL` environment variable.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
