const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // For self-ping

const app = express();
const port = process.env.PORT || 3000;

// --- Data Loading ---
let jsonData = {};
try {
  const dataPath = path.join(__dirname, 'data.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  jsonData = JSON.parse(rawData);
  console.log('Successfully loaded data.json');
} catch (err) {
  console.error('Error reading or parsing data.json:', err);
  // Exit or provide default data if the file is critical
  process.exit(1); // Exit if data loading fails
}

// --- Simple In-Memory Cache ---
// For a production scenario, consider more robust caching solutions like Redis or Memcached.
const cache = {};
const CACHE_DURATION_MS = 5 * 60 * 1000; // Cache for 5 minutes

// A better approach might involve invalidating cache on data change or using TTL caches.
setInterval(() => {
    console.log('Clearing in-memory cache...');
    for (const key in cache) {
        delete cache[key];
    }
}, CACHE_DURATION_MS * 2); // Clear roughly every 10 minutes

// --- Basic Route ---
app.get('/', (req, res) => {
  res.send('Engineering Guru API Server is running!');
});

// --- Health Check Route ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

// --- API Endpoints ---

// Helper function for caching
const getCachedData = (key, dataFetcher) => {
    const now = Date.now();
    if (cache[key] && (now - cache[key].timestamp < CACHE_DURATION_MS)) {
        console.log(`Serving from cache: ${key}`);
        return cache[key].data;
    } else {
        console.log(`Fetching fresh data: ${key}`);
        const data = dataFetcher();
        if (data !== null && data !== undefined) { // Only cache valid data
             cache[key] = { data, timestamp: now };
        }
        return data;
    }
};

// GET /api/branches - List all branches (name, id, description)
app.get('/api/branches', (req, res) => {
    const cacheKey = 'all_branches_summary';
    const data = getCachedData(cacheKey, () => {
        return jsonData.branches.map(branch => ({
            id: branch.id,
            name: branch.name,
            description: branch.description,
            icon: branch.icon,
            color: branch.color,
            gradientColors: branch.gradientColors
        }));
    });
    res.json(data);
});

// GET /api/branches/:branchId - Get full details for a specific branch
app.get('/api/branches/:branchId', (req, res) => {
    const branchId = req.params.branchId.toUpperCase();
    const cacheKey = `branch_${branchId}`;
    const data = getCachedData(cacheKey, () => {
        return jsonData.branches.find(branch => branch.id.toUpperCase() === branchId) || null;
    });

    if (!data) {
        return res.status(404).json({ error: 'Branch not found' });
    }
    res.json(data);
});

// GET /api/branches/:branchId/semesters - List semesters for a branch (id, name, subjectsCount, credits)
app.get('/api/branches/:branchId/semesters', (req, res) => {
    const branchId = req.params.branchId.toUpperCase();
    const cacheKey = `branch_${branchId}_semesters_summary`;
    const data = getCachedData(cacheKey, () => {
        const branch = jsonData.branches.find(b => b.id.toUpperCase() === branchId);
        if (!branch) return null;
        return branch.semesters.map(sem => ({
            id: sem.id,
            name: sem.name,
            subjectsCount: sem.subjectsCount,
            credits: sem.credits
        }));
    });

    if (data === null) { // Check specifically for null, as an empty array is valid
        return res.status(404).json({ error: 'Branch not found' });
    }
    res.json(data);
});

// GET /api/branches/:branchId/semesters/:semesterId - Get full details for a specific semester
app.get('/api/branches/:branchId/semesters/:semesterId', (req, res) => {
    const branchId = req.params.branchId.toUpperCase();
    const semesterId = parseInt(req.params.semesterId, 10);
    const cacheKey = `branch_${branchId}_semester_${semesterId}`;

    const data = getCachedData(cacheKey, () => {
        const branch = jsonData.branches.find(b => b.id.toUpperCase() === branchId);
        if (!branch) return null;
        return branch.semesters.find(sem => sem.id === semesterId) || null;
    });

    if (data === null) { // Check specifically for null
        return res.status(404).json({ error: 'Branch or Semester not found' });
    }
    res.json(data);
});

// GET /api/branches/:branchId/semesters/:semesterId/subjects - List subjects for a semester (name, course_code, credits, type)
app.get('/api/branches/:branchId/semesters/:semesterId/subjects', (req, res) => {
    const branchId = req.params.branchId.toUpperCase();
    const semesterId = parseInt(req.params.semesterId, 10);
    const cacheKey = `branch_${branchId}_semester_${semesterId}_subjects_summary`;

    const data = getCachedData(cacheKey, () => {
        const branch = jsonData.branches.find(b => b.id.toUpperCase() === branchId);
        if (!branch) return null;
        const semester = branch.semesters.find(sem => sem.id === semesterId);
        if (!semester) return null;
        return semester.subjects.map(sub => ({
            name: sub.name,
            course_code: sub.course_code,
            credits: sub.credits,
            type: sub.type
        }));
    });

     if (data === null) { // Check specifically for null
        return res.status(404).json({ error: 'Branch or Semester not found' });
    }
    res.json(data);
});

// GET /api/branches/:branchId/semesters/:semesterId/subjects/:subjectCode - Get details for a specific subject
app.get('/api/branches/:branchId/semesters/:semesterId/subjects/:subjectCode', (req, res) => {
    const branchId = req.params.branchId.toUpperCase();
    const semesterId = parseInt(req.params.semesterId, 10);
    const subjectCode = parseInt(req.params.subjectCode, 10);
    const cacheKey = `branch_${branchId}_semester_${semesterId}_subject_${subjectCode}`;

    const data = getCachedData(cacheKey, () => {
        const branch = jsonData.branches.find(b => b.id.toUpperCase() === branchId);
        if (!branch) return null;
        const semester = branch.semesters.find(sem => sem.id === semesterId);
        if (!semester) return null;
        return semester.subjects.find(sub => sub.course_code === subjectCode) || null;
    });

    if (data === null) { // Check specifically for null
        return res.status(404).json({ error: 'Branch, Semester, or Subject not found' });
    }
    res.json(data);
});


// --- Start Server ---
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app; // Export for potential testing

// --- Self-Ping Mechanism ---
const SELF_URL = 'https://beu-data.onrender.com/health';
function scheduleSelfPing() {
  // Random interval between 10 and 15 minutes (in ms)
  const min = 10 * 60 * 1000;
  const max = 15 * 60 * 1000;
  const interval = Math.floor(Math.random() * (max - min + 1)) + min;

  setTimeout(async () => {
    try {
      const res = await fetch(SELF_URL);
      if (res.ok) {
        console.log(`[Self-Ping] Success at ${new Date().toISOString()}`);
      } else {
        console.warn(`[Self-Ping] Non-200 response: ${res.status}`);
      }
    } catch (err) {
      console.error(`[Self-Ping] Error:`, err);
    }
    scheduleSelfPing(); // Schedule next ping
  }, interval);
}
scheduleSelfPing();
