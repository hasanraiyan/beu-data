
# Engineering Guru

This repository contains the data and potentially the code for the Engineering Guru application, a comprehensive course catalog for engineering students.  

## Data Source  

The course data is stored in `data.json`. It includes information about various engineering branches, semesters, subjects, and detailed syllabi.  

## Features  

*   Browse engineering branches and their descriptions.  
*   View semester details, including subjects and credit values.  
*   Access detailed syllabus information for each subject, including:  
    *   Course Objectives  
    *   Learning Outcomes  
    *   Detailed Course Content (formatted using Markdown)  
    *   Reference Books  
    *   Assessment Methods  

## Completed Semesters  

Here's a list of semester syllabi currently completed in the `data.json` file. You can use this as a checklist for further data entry/completion.  

**Information Technology (IT)**  

✅ Semester 3 (@hasanraiyan)  
✅ Semester 4 (@hasanraiyan)  

**Computer Science & Engineering (CSE)**  

⏳ Semester 3 (@raziquehasan)  

**Electrical Engineering (EE)**  

✅ Semester 3 (@Sachin-2157)  

**Note:** ⏳ indicates under progress, ✅ indicates complete  

## Data Structure  

The `data.json` file follows this structure:  

```json
{
  "branches": [
    {
      "name": "Branch Name",
      "id": "Branch ID",
      "icon": "Icon Reference",
      "color": "Color Code",
      "gradientColors": ["Color 1", "Color 2"],
      "description": "Branch Description",
      "semesters": [
        {
          "id": 3,
          "name": "Semester 3",
          "subjectsCount": 6,
          "credits": 29,
          "subjects": [
            {
              "name": "Subject Name",
              "course_code": 12345,
              "credits": 3,
              "type": "Theory/Core Subject",
              "syllabus": {
                "courseObjectives": ["Objective 1", "Objective 2"],
                "learningOutcomes": ["Outcome 1", "Outcome 2"],
                "courseContent": "Markdown formatted content",
                "referenceBooks": ["Book 1", "Book 2"],
                "assessmentMethods": ["Exam", "Assignment"]
              }
            }
          ]
        }
      ]
    }
  ],
  "metadata": {
    "academicYear": "YYYY-YYYY",
    "appName": "Application Name",
    "updatedAt": "YYYY-MM-DD"
  }
}
```  

## Contributing  

If you'd like to contribute to this project, you can:  

*   Add data for missing semesters and subjects.  
*   Improve the formatting of `courseContent` using Markdown.  
*   Suggest enhancements to the data structure.  
*   Contribute code to build the application.  

Please follow these steps:  

1.  Fork the repository.  
2.  Create a new branch for your changes.  
3.  Commit your changes with clear and descriptive commit messages.  
4.  Create a pull request.  

## Technologies Used  

*   JSON (for data storage)  
*   Markdown (for syllabus content formatting)  

