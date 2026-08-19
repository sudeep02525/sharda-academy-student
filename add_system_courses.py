import os
import re

filepath = r"c:\sharda-academy\sharda-academy-admin\src\app\page.js"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

imports = [
    'import CoursesManagement from "../components/CoursesManagement";',
    'import SystemManagement from "../components/SystemManagement";'
]
for imp in imports:
    if imp not in content:
        content = content.replace(
            'import TeacherManagement from "../components/TeacherManagement";',
            f'import TeacherManagement from "../components/TeacherManagement";\n{imp}'
        )

# Add tabs to sidebar
if '{ id: "courses", label: "Courses & Classes" }' not in content:
    content = content.replace(
        '{ id: "teachers", label: "Teacher Management" },',
        '{ id: "courses", label: "Courses & Classes" },\n            { id: "teachers", label: "Teacher Management" },'
    )

if '{ id: "system", label: "System & Settings" }' not in content:
    content = content.replace(
        '{ id: "logs", label: "Audit Activity Logs" },',
        '{ id: "system", label: "System & Settings" },\n            { id: "logs", label: "Audit Activity Logs" },'
    )

# Add title logic
if 'activeTab === "courses" ? "COURSES & CLASSES"' not in content:
    content = content.replace(
        'activeTab === "teachers"\n                        ? "TEACHER MANAGEMENT"',
        'activeTab === "courses" ? "COURSES & CLASSES" : activeTab === "system" ? "SYSTEM SETTINGS" : activeTab === "teachers"\n                        ? "TEACHER MANAGEMENT"'
    )

# Add render logic
if 'activeTab === "courses" && <CoursesManagement token={token} />' not in content:
    content = content.replace(
        '{activeTab === "teachers" && <TeacherManagement token={token} />}',
        '{activeTab === "teachers" && <TeacherManagement token={token} />}\n          {activeTab === "courses" && <CoursesManagement token={token} />}\n          {activeTab === "system" && <SystemManagement token={token} />}'
    )

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated page.js with Courses and System")
