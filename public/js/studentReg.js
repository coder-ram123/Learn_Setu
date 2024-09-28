const form = document.querySelector('#registrationStudentForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data);
    try {
        const response = await fetch("/studentReg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            if (result.inserted) {
                Swal.fire({
                    icon: "success",
                    title: "Submitted!",
                    text: "Registered Successfully!!!"
                }).then(() => {
                    window.location.href = "/student";
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please try again"
                });
            }
            form.reset();
        } else {
            if (result.message === 'Student already registered') {
                Swal.fire({
                    icon: "warning",
                    title: "Already Registered",
                    text: "This email is already registered. Please login or use a different email."
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message || "An error occurred. Please try again later."
                });
            }
            form.reset();
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again later."
        });
    }
});
