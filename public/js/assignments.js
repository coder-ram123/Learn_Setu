document.addEventListener('DOMContentLoaded', () => {
    const addAssignmentBtn = document.getElementById('addAssignmentBtn');
    const unitNameInput = document.getElementById('unitName');
    const unitNumberInput = document.getElementById('unitNo');
    const resourceTypeSelect = document.getElementById('resourceType');
    const assignmentTypeSelect = document.getElementById('type');
    const sessionCountInput = document.getElementById('numSessions');
    const sessionFieldsContainer = document.getElementById('sessionFields');
    const assignmentList = document.getElementById('assignmentList');

    const assignments = [];

    // Dynamically create resource type options
    const resourceData = {
        "Text Tutorial": ["Ebooks", "PDF Notes", "Study Guides", "PPT's"],
        "Audio Tutorial": ["Podcasts", "Audio Lectures", "Audio Books", "Audio Story"],
        "Video Tutorial": ["Recorded Lectures", "Educational Video"],
        "Interactive Resources":["Quiz","3D Visualization"],
    };

    Object.keys(resourceData).forEach(type => {
        const option = new Option(type, type);
        resourceTypeSelect.add(option);
    });

    resourceTypeSelect.addEventListener("change", () => {
        assignmentTypeSelect.innerHTML = '<option value="" disabled selected>Select type</option>';
        assignmentTypeSelect.disabled = false;

        const selectedResource = resourceTypeSelect.value;
        resourceData[selectedResource].forEach(type => {
            const option = new Option(type, type);
            assignmentTypeSelect.add(option);
        });
    });

    // Dynamically create session fields based on number of sessions
    sessionCountInput.addEventListener('change', () => {
        sessionFieldsContainer.innerHTML = '';
        const sessionCount = parseInt(sessionCountInput.value, 10);

        for (let i = 1; i <= sessionCount; i++) {
            const sessionFieldDiv = document.createElement('div');
            sessionFieldDiv.classList.add('session-field');
            sessionFieldDiv.innerHTML = `
                <label for="sessionName${i}">Session ${i} Name:</label>
                <input type="text" id="sessionName${i}" placeholder="Enter session ${i} name">
                
                <label for="sessionFile${i}">Session ${i} File:</label>
                <input type="file" id="sessionFile${i}">
            `;
            sessionFieldsContainer.appendChild(sessionFieldDiv);
        }
    });

    // Function to render assignments
    const renderAssignments = () => {
        assignmentList.innerHTML = ''; // Clear existing assignments
        assignments.forEach((assignment, index) => {
            const assignmentDiv = document.createElement('div');
            assignmentDiv.classList.add('assignment');
            assignmentDiv.innerHTML = `
                <span>${assignment.unitNumber}: ${assignment.unitName} - ${assignment.resourceType} (${assignment.assignmentType})</span>
                <div>
                    ${assignment.sessions.map((session, sessionIndex) => `
                        <div>
                            <strong>Session Name:</strong> ${session.sessionName} <br>
                            <strong>Uploaded File:</strong> ${session.sessionFileName} <br>
                            <button class="update-btn" onclick="updateSession(${index}, ${sessionIndex})">Update Session</button>
                            <button onclick="deleteSession(${index}, ${sessionIndex})">Delete Session</button>
                        </div>
                    `).join('')}
                </div>
                <div>
                    <button onclick="deleteAssignment(${index})">Delete Assignment</button>
                </div>
            `;
            assignmentList.appendChild(assignmentDiv);
        });
    };

    // Function to handle adding a new assignment
    addAssignmentBtn.addEventListener('click', () => {
        const unitName = unitNameInput.value;
        const unitNumber = unitNumberInput.value;
        const resourceType = resourceTypeSelect.value;
        const assignmentType = assignmentTypeSelect.value;
        const sessionCount = parseInt(sessionCountInput.value, 10);
        const sessions = [];

        if (unitName && unitNumber && resourceType && assignmentType && sessionCount) {
            for (let i = 1; i <= sessionCount; i++) {
                const sessionName = document.getElementById(`sessionName${i}`).value;
                const sessionFile = document.getElementById(`sessionFile${i}`).files[0];

                if (sessionName && sessionFile) {
                    sessions.push({
                        sessionName: sessionName,
                        sessionFileName: sessionFile.name // Store the file name
                    });
                } else {
                    alert(`Please fill out all session ${i} fields.`);
                    return;
                }
            }

            assignments.push({
                unitNumber,
                unitName,
                resourceType,
                assignmentType,
                sessions // Store the sessions
            });

            renderAssignments();

            // Clear inputs after adding
            unitNameInput.value = '';
            unitNumberInput.value = '';
            resourceTypeSelect.value = '';
            assignmentTypeSelect.value = '';
            sessionCountInput.value = '';
            sessionFieldsContainer.innerHTML = ''; // Clear session fields
        } else {
            alert('Please fill out all required fields.');
        }
    });

    // Function to delete an entire assignment
    window.deleteAssignment = (index) => {
        assignments.splice(index, 1);
        renderAssignments();
    };

    // Function to delete a specific session
    window.deleteSession = (assignmentIndex, sessionIndex) => {
        assignments[assignmentIndex].sessions.splice(sessionIndex, 1);
        renderAssignments();
    };

    // Function to update a specific session
    window.updateSession = (assignmentIndex, sessionIndex) => {
        const newSessionName = prompt('Enter new session name:', assignments[assignmentIndex].sessions[sessionIndex].sessionName);
        
        if (newSessionName) {
            assignments[assignmentIndex].sessions[sessionIndex].sessionName = newSessionName;
            renderAssignments();
        }
    };
});
