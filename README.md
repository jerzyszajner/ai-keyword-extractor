# AI Keyword Extractor

A simple React application that extracts keywords from text using AI.

## About

I built this project because I'm passionate about AI and learning how to create intelligent web applications. This keyword extractor showcases the integration of modern AI APIs with React to solve real-world text processing problems.

## Features

- Paste text and extract relevant keywords
- Powered by Cohere AI
- Clean, responsive interface
- Real-time keyword extraction

## Demo

[Live Demo](https://ai-keyword-extractor-react.netlify.app/)

## Technologies

- React 18
- Vite
- Chakra UI
- Cohere API

## AI Model

This project uses the `command-a-03-2025` model from Cohere for keyword extraction.

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

## Environment Variables

Create a `.env` file:

```
VITE_COHERE_API_KEY=your_cohere_api_key
```

```
VITE_COHERE_API_URL=https://api.cohere.ai/v2/chat
```

## Build

```bash
npm run build
```
