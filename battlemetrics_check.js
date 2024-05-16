// battlemetrics_check.js

async function getPlayersOnServer(serverId, authToken) {
    const url = `https://api.battlemetrics.com/servers/9594602?include=player`;
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJlOTJlOWExNjJiM2JmZGUiLCJpYXQiOjE3MTUyMjcyMjMsIm5iZiI6MTcxNTIyNzIyMywiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo4NTgyNzUifQ.qeRsy8xT80Afv-m9ltZPaTRZHCWIe3Wc57w1Y3vGHik'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch players');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching players:', error.message);
        return null;
    }
}

module.exports = { getPlayersOnServer };
