# Find the Character

<p align="center">
  <img alt="Version" src="https://img.shields.io/github/package-json/v/insomniac2305/find-waldo?color=blue&cacheSeconds=2592000" />
  <a href="https://github.com/insomniac2305/find-waldo/graphs/commit-activity" target="_blank"><img alt="Commit activity" src="https://img.shields.io/github/commit-activity/t/insomniac2305/find-waldo"></a>
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/insomniac2305/find-waldo">
  <a href="https://github.com/insomniac2305/find-waldo/blob/master/LICENSE" target="_blank"><img alt="License: GPL-3.0" src="https://img.shields.io/github/license/insomniac2305/find-waldo?" /></a>
</p>

## Overview

Find the Character is an interactive web-based game inspired by "Where's Waldo." Players must locate specific characters hidden within an image before time runs out. The game tracks player scores and maintains a leaderboard.
This game was developed as part of [The Odin Project's curriculum](https://www.theodinproject.com) and meant to practice React as well as using a backend as a service provider like Firebase.

<p align="center">
  <img alt="Screenshot" src="screenshot.jpeg" width="1000" />
</p>

## Features

- 🔍 Interactive image-based character search
- 📊 Real-time score tracking
- 🏆 Leaderboard for top scores
- 🔥 Firebase Firestore integration for persistent data storage
- 🎨 Responsive UI with Tailwind CSS

## Technologies Used

- **React** (UI framework)
- **Firebase Firestore** (Database for storing character positions and scores)
- **Tailwind CSS** (Styling framework)
- **Vite** (Build tool for fast development)

## Setup Instructions

### Prerequisites

- Node.js
- Firebase account

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/insomniac2305/find-waldo.git
   cd find-waldo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase Firestore:
   - Create a Firebase project
   - Add a Firestore database
   - Replace the Firebase configuration in `src/firebase.js` with your project settings
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:5173`

## Build & Deployment

To build the project for production:

```sh
npm run build
```

The application is configured for GitHub Pages deployment:

```sh
npm run deploy
```

## License

This project is [GPL-3.0](https://github.com/insomniac2305/find-waldo/blob/master/LICENSE) licensed.
