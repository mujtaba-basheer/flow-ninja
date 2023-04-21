(async () => {
  try {
    const body = JSON.stringify({
      path: window.location.pathname,
      password: "testpass123",
    });
    const req = await fetch(
      "https://ui4tjdk9fh.execute-api.us-east-1.amazonaws.com/prod/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": body.length + "",
        },
        body,
        credentials: "include",
      }
    );
    const resp = await req.json();
    console.log(resp);
  } catch (error) {
    console.error(error);
  }
})();

(async () => {
  try {
    const req = await fetch(
      "https://ui4tjdk9fh.execute-api.us-east-1.amazonaws.com/prod/check",
      {
        method: "GET",
        credentials: "include",
      }
    );
    await req.json();
    if (!(req.status === 200)) {
      window.location.pathname = "/"; // path to login page
    }
  } catch (error) {
    console.error(error);
    window.location.pathname = "/"; // path to login page
  }
})();
