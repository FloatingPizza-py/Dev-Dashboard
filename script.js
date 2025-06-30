

async function fetchAllRepos(username) {
    let repos = [];
    let page = 1;
    let perPage = 100;
    let hasMore = true;

    while (hasMore) {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`
            // No headers
        );
        if (!response.ok) {
            const statsDiv = document.getElementById('stats-summary');
            if (statsDiv) {
                statsDiv.innerHTML = `<p style="color:red;">GitHub API error: ${response.status} (${response.statusText}). You may have hit the rate limit.</p>`;
            }
            return [];
        }
        const data = await response.json();
        repos = repos.concat(data);
        hasMore = data.length === perPage;
        page++;
    }
    return repos;
}

async function fetchRecentCommits(username) {
    const repos = await fetchAllRepos(username);
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const sinceISO = since.toISOString();

    let allCommits = [];
    for (const repo of repos) {
        if (repo.fork) continue;
        const url = `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&since=${sinceISO}&per_page=100`;
        try {
            const response = await fetch(url); // No headers
            if (!response.ok) continue;
            const commits = await response.json();
            allCommits = allCommits.concat(commits);
        } catch (e) {
            // Ignore errors for private or archived repos
        }
    }
    return allCommits;
}