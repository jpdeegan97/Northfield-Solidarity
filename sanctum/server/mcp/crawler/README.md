# CWP Asset Crawler (MCP)

This is a Model Context Protocol (MCP) server designed to be part of the CWP (Cognitive Worker Plane) engine.

## Purpose

The Crawler MCP service is responsible for:

1. Receiving target queries from the Sanctum UI (via CWPView).
2. Autonomous web scraping to find high-resolution visual assets.
3. Structuring and returning the data to the frontend or database.

## Usage

To run this server locally:

```bash
node index.js
```

## Integration

The Sanctum frontend (CWPView) communicates with this server via the MCP Client SDK (or a bridge/proxy in the main server app).

## Future Implementation

- Add `puppeteer` for headless browsing.
- Add `cheerio` for HTML parsing.
- Integrate with vector DB for image similarity search.
