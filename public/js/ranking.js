      // Sample data: students with their scores
      const students = [
        { name: "Neha Kanaki", score: 95 },
        { name: "Ram Deshpande", score: 88 },
        { name: "Pavan Vaidya", score: 92 },
        { name: "Sushanth Bangera", score: 76 },
        { name: "Gitesh Kolambe", score: 85 },
        { name: "Rutuja Ahire", score: 95 },
        { name: "Ganesh", score: 88 },
        { name: "Rahul", score: 92 },
        { name: "Rajesh", score: 76 },
        { name: "Pratik", score: 85 }
    ];

    // Sort students by score in descending order
    students.sort((a, b) => b.score - a.score);

    // Get the current logged-in student's name (in a real application, this would come from session or authentication data)
    const currentStudent = "Charlie"; // Example student logged in

    // Populate the leaderboard table
    const tbody = document.getElementById("leaderboard").querySelector("tbody");

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        // Highlight the row for the current logged-in student
        if (student.name === currentStudent) {
            row.classList.add("highlight");
        }

        // Create columns for rank, name, and score
        const rankCell = document.createElement("td");
        rankCell.textContent = index + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const scoreCell = document.createElement("td");
        scoreCell.textContent = student.score;

        // Append the cells to the row
        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);

        // Add the row to the table body
        tbody.appendChild(row);
    });

