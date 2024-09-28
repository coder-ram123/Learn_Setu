document.addEventListener('DOMContentLoaded', () => {
    const addAssignmentBtn = document.getElementById('addAssignmentBtn');
    const unitNameInput = document.getElementById('unitName');
    const resNameInput = document.getElementById('resName');
    const assignmentFileInput = document.getElementById('assignmentFile');
    const assignmentList = document.getElementById('assignmentList');

    let assignments = [];

    // Function to render assignments
    const renderAssignments = () => {
        assignmentList.innerHTML = '';
        assignments.forEach((assignment, index) => {
            const assignmentDiv = document.createElement('div');
            assignmentDiv.classList.add('assignment');
            assignmentDiv.innerHTML = `
                <span>${assignment.unitName} - ${assignment.fileName}</span>
                <div>
                    <button class="update-btn" onclick="updateAssignment(${index})">Update</button>
                    <button onclick="deleteAssignment(${index})">Delete</button>
                </div>
            `;
            assignmentList.appendChild(assignmentDiv);
        });
    };

    // Function to handle adding a new assignment
    addAssignmentBtn.addEventListener('click', () => {
        const unitName = unitNameInput.value;
        const resName = resNameInput.value;
        const file = assignmentFileInput.files[0];

        if (unitName && file) {
            assignments.push({
                unitName: unitName,
                resName:resName,
                fileName: file.name
            });
            renderAssignments();
            unitNameInput.value = '';
            resNameInput.value = '';
            assignmentFileInput.value = '';
        } else {
            alert('Please enter both unit name and upload a file.');
        }
    });

    // Function to delete an assignment
    window.deleteAssignment = (index) => {
        assignments.splice(index, 1);
        renderAssignments();
    };

    // Function to update an assignment (it allows you to choose new unit name and file)
    window.updateAssignment = (index) => {
        const newUnitName = prompt('Enter new unit name:', assignments[index].unitName);
        const newResName = prompt('Enter new resource name:', assignments[index].resName);
        const newFile = prompt('Enter new file name:', assignments[index].fileName);
        
        if (newUnitName && newFile) {
            assignments[index].unitName = newUnitName;
            assignments[index].resName = newResName;
            assignments[index].fileName = newFile;
            renderAssignments();
        }
    };
});