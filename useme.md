# Engineering Guru API Documentation

This document describes the API endpoints available for the Engineering Guru server, which provides access to course catalog data.

**Base URL:** `http://localhost:3000` (or the deployed server URL)
**Deployed URL:** `https://beu-data.onrender.com` 

## Endpoints

### 1. List All Branches

Retrieves a summary list of all available engineering branches.

*   **URL:** `/api/branches`
*   **Method:** `GET`
*   **Success Response:**
    *   **Code:** 200
    *   **Content Example:**
        ```json
        [
          {
            "id": "IT",
            "name": "Information Technology",
            "description": "Software development, networking, and data management",
            "icon": "project-diagram",
            "color": "#2196F3",
            "gradientColors": ["#2196F3", "#64B5F6"]
          },
          {
            "id": "CSE",
            "name": "Computer Science & Engineering",
            "description": "Software development, algorithms, and computer systems",
            "icon": "code",
            "color": "#FFC107",
            "gradientColors": ["#FFC107", "#FFD700"]
          },
          // ... other branches
        ]
        ```

### 2. Get Branch Details

Retrieves the full details for a specific branch, including all its semesters and subjects.

*   **URL:** `/api/branches/:branchId`
*   **Method:** `GET`
*   **URL Parameters:**
    *   `branchId` (string, required): The ID of the branch (e.g., `IT`, `CSE`, `EE`). Case-insensitive.
*   **Success Response:**
    *   **Code:** 200
    *   **Content Example (for `/api/branches/IT`):**
        ```json
        {
          "name": "Information Technology",
          "id": "IT",
          "icon": "project-diagram",
          // ... other branch details
          "semesters": [
            {
              "id": 3,
              "name": "Semester 3",
              // ... semester details
              "subjects": [
                {
                  "name": "Discrete Mathematics",
                  "course_code": 106301,
                  // ... subject details
                },
                // ... other subjects
              ]
            },
            // ... other semesters
          ]
        }
        ```
*   **Error Response:**
    *   **Code:** 404 Not Found
    *   **Content:** `{ "error": "Branch not found" }`

### 3. List Semesters for a Branch

Retrieves a summary list of semesters for a specific branch.

*   **URL:** `/api/branches/:branchId/semesters`
*   **Method:** `GET`
*   **URL Parameters:**
    *   `branchId` (string, required): The ID of the branch. Case-insensitive.
*   **Success Response:**
    *   **Code:** 200
    *   **Content Example (for `/api/branches/IT/semesters`):**
        ```json
        [
          {
            "id": 3,
            "name": "Semester 3",
            "subjectsCount": 6,
            "credits": 29
          },
          {
            "id": 4,
            "name": "Semester 4",
            "subjectsCount": 4,
            "credits": 24
          },
          // ... other semesters
        ]
        ```
*   **Error Response:**
    *   **Code:** 404 Not Found
    *   **Content:** `{ "error": "Branch not found" }`

### 4. Get Semester Details

Retrieves the full details for a specific semester within a branch, including all its subjects.

*   **URL:** `/api/branches/:branchId/semesters/:semesterId`
*   **Method:** `GET`
*   **URL Parameters:**
    *   `branchId` (string, required): The ID of the branch. Case-insensitive.
    *   `semesterId` (integer, required): The ID of the semester (e.g., `3`, `4`).
*   **Success Response:**
    *   **Code:** 200
    *   **Content Example (for `/api/branches/IT/semesters/3`):**
        ```json
        {
          "id": 3,
          "name": "Semester 3",
          "subjectsCount": 6,
          "credits": 29,
          "subjects": [
            {
              "name": "Discrete Mathematics",
              "course_code": 106301,
              "credits": 4,
              "type": "Theory",
              "syllabus": { ... }
            },
            // ... other subjects
          ]
        }
        ```
*   **Error Response:**
    *   **Code:** 404 Not Found
    *   **Content:** `{ "error": "Branch or Semester not found" }`

### 5. List Subjects for a Semester

Retrieves a summary list of subjects for a specific semester within a branch.

*   **URL:** `/api/branches/:branchId/semesters/:semesterId/subjects`
*   **Method:** `GET`
*   **URL Parameters:**
    *   `branchId` (string, required): The ID of the branch. Case-insensitive.
    *   `semesterId` (integer, required): The ID of the semester.
*   **Success Response:**
    *   **Code:** 200
    *   **Content Example (for `/api/branches/IT/semesters/3/subjects`):**
        ```json
        [
          {
            "name": "Discrete Mathematics",
            "course_code": 106301,
            "credits": 4,
            "type": "Theory"
          },
          {
            "name": "Data Structure and Algorithms",
            "course_code": 100304,
            "credits": 3,
            "type": "Theory"
          },
          // ... other subjects
        ]
        ```
*   **Error Response:**
    *   **Code:** 404 Not Found
    *   **Content:** `{ "error": "Branch or Semester not found" }`

### 6. Get Subject Details

Retrieves the full details for a specific subject within a specific semester and branch.

*   **URL:** `/api/branches/:branchId/semesters/:semesterId/subjects/:subjectCode`
*   **Method:** `GET`
*   **URL Parameters:**
    *   `branchId` (string, required): The ID of the branch. Case-insensitive.
    *   `semesterId` (integer, required): The ID of the semester.
    *   `subjectCode` (integer, required): The course code of the subject (e.g., `106301`).
*   **Success Response:**
    *   **Code:** 200
    *   **Content Example (for `/api/branches/IT/semesters/3/subjects/106301`):**
        ```json
        {
          "name": "Discrete Mathematics",
          "course_code": 106301,
          "credits": 4,
          "type": "Theory",
          "syllabus": {
            "courseObjectives": [ ... ],
            "learningOutcomes": [ ... ],
            "courseContent": "...",
            "referenceBooks": [ ... ],
            "assessmentMethods": [ ... ]
          }
        }
        ```
*   **Error Response:**
    *   **Code:** 404 Not Found
    *   **Content:** `{ "error": "Branch, Semester, or Subject not found" }`

## Caching

The server implements a simple in-memory cache with a 5-minute duration to improve performance for repeated requests. Cache entries are cleared periodically. For production environments, consider more robust caching solutions.
