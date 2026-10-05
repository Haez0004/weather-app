async function getGithub() {
  try {
    console.log("Fetching...");
    const response = await fetch('https://api.github.com/users/haez0004');
    const data = await response.json();
    console.log("--- RESULT ---");
    console.log("Name:", data.name);
    console.log("Public Repos:", data.public_repos);
  } catch (error) {
    console.log("Error:", error.message);
  }
}
getGithub();
