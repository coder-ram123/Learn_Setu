const form1 = document.querySelector('#loginForm');

form1.addEventListener('submit', async (e) => {
    e.preventDefault();


    const formData = new FormData(form1);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data)

    try {
        const response = await fetch("/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            if (result.generated) {
                Swal.fire({
                    icon: "success",
                    title: "Status",
                    text: "Login Successful"
                });
                if(result.flag==1){
                    setTimeout(() => {
                        window.location.href = "/teacherDashboard";
                    }, 1500);
                }else if(result.flag==2){
                    setTimeout(() => {
                        window.location.href = "/admin";
                    }, 1500);
                }else{
                    setTimeout(() => {
                        window.location.href = "/studentDashboard";
                    }, 1500);
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: result.message
                });
            }
            form1.reset();
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "'Internal server error'"
        });
    }
});

