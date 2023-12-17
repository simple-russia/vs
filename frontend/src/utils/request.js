export const request = async (url, body = "", method = "GET") => {
  const reqBody = typeof body === "string" ? body : JSON.stringify(body);

  const response = await fetch(url, {
    body: ["GET", "HEAD", "DELETE"].includes(method) ? null : reqBody,
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    return await response.json();
  } catch {
    return response;
  }
};
