window.addEventListener("load", async () => {
    try {
        const req = await fetch("https://0a50cfhnal.execute-api.us-east-1.amazonaws.com/sandbox/jobs/categories");
        const resp = await req.json();
        if (req.status === 200 && resp.status) {
            const { data } = resp;
            for (const cat of data) {
                const { team, jobs } = cat;
                const spanEl = document.getElementById(`${team.toLowerCase()}-jobs`);
                if (spanEl) {
                    spanEl.textContent = jobs + " ";
                }
            }
        }
    }
    catch (error) {
        console.error(error);
    }
});
