
// Sample notifications data for teachers
const notifications = [
    { 
        studentName: "John Doe", 
        interactionTime: "10 minutes/day", 
        assessmentMarks: "45/100", 
        overallRating: "Below Average", 
        time: "1 hour ago" 
    },
    { 
        studentName: "Jane Smith", 
        interactionTime: "15 minutes/day", 
        assessmentMarks: "50/100", 
        overallRating: "Average", 
        time: "5 hours ago" 
    },
    { 
        studentName: "Alex Johnson", 
        interactionTime: "5 minutes/day", 
        assessmentMarks: "35/100", 
        overallRating: "Weak", 
        time: "1 day ago" 
    },
    { 
        studentName: "Emily Davis", 
        interactionTime: "8 minutes/day", 
        assessmentMarks: "60/100", 
        overallRating: "Below Average", 
        time: "2 days ago" 
    },
];

// Function to display notifications in the UI
function displayNotifications() {
    const notificationContainer = document.getElementById('notifications');
    
    notifications.forEach(notification => {
        // Create notification item
        const notificationItem = document.createElement('div');
        notificationItem.classList.add('notification-item');
        
        // Create notification content
        const notificationContent = document.createElement('div');
        notificationContent.classList.add('notification-content');

        // Notification icon
        const notificationIcon = document.createElement('span');
        notificationIcon.classList.add('notification-icon');
        notificationIcon.innerHTML = "⚠️";

        // Notification text
        const notificationText = document.createElement('div');
        notificationText.classList.add('notification-text');
        notificationText.innerHTML = `
            <strong>${notification.studentName}</strong> has weak performance.
            <br>Interaction Time: ${notification.interactionTime}
            <br>Assessment Marks: ${notification.assessmentMarks}
            <br>Overall Rating: ${notification.overallRating}
        `;

        // Append icon and text to content
        notificationContent.appendChild(notificationIcon);
        notificationContent.appendChild(notificationText);

        // Notification timestamp
        const notificationTimestamp = document.createElement('div');
        notificationTimestamp.classList.add('notification-timestamp');
        notificationTimestamp.textContent = notification.time;

        // Append content and timestamp to item
        notificationItem.appendChild(notificationContent);
        notificationItem.appendChild(notificationTimestamp);

        // Append item to notification container
        notificationContainer.appendChild(notificationItem);
    });
}

// Initialize notifications on page load
window.onload = displayNotifications;

