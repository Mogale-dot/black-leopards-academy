// Global variables
        let adminData = {};
        let statsData = {};
        let recentRegistrations = [];
        let recentMessages = [];
        let userStatsData = {};

        // DOM Elements
        const adminNameElement = document.getElementById('admin-name');
        const statsCardsContainer = document.getElementById('stats-cards');
        const recentRegistrationsTable = document.getElementById('recent-registrations').querySelector('tbody');
        const recentMessagesTable = document.getElementById('recent-messages').querySelector('tbody');
        const logoutBtn = document.getElementById('logout-btn');

        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', async () => {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = 'index.html';
                return;
            }

            try {
                // Load all data
                await Promise.all([
                    loadUserStatistics() ,
                    loadStatistics(),
                    loadRecentRegistrations(),
                    loadRecentMessages()
                ]);

                // Render all data
                renderUserStatistics();
                renderStatistics();
                renderRecentRegistrations();
                renderRecentMessages();

            } catch (error) {
                console.error('Dashboard initialization error:', error);
                alert('Failed to load dashboard data');
            }
        });

        // Load admin profile data
        async function loadUserStatistics() {
    const token = localStorage.getItem('token');
    const response = await fetch('https://leopards-backend.onrender.com/api/stats/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user statistics');
    }

    userStatsData = await response.json();
}

// Replace renderUserStatistics with this simpler version:
function renderUserStatistics() {
    document.getElementById('total-users').textContent = userStatsData.total || 0;
}

        // Load statistics data
        async function loadStatistics() {
            const token = localStorage.getItem('token');
            const response = await fetch('https://leopards-backend.onrender.com/api/stats/registrations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }

            statsData = await response.json();
        }

        // Load recent registrations
        async function loadRecentRegistrations() {
            const token = localStorage.getItem('token');
            const response = await fetch('https://leopards-backend.onrender.com/api/stats/recent', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recent registrations');
            }

            recentRegistrations = await response.json();
        }

        // Load recent messages
        async function loadRecentMessages() {
            const token = localStorage.getItem('token');
            const response = await fetch('https://leopards-backend.onrender.com/api/admin/contact-submissions?limit=5', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recent messages');
            }

            recentMessages = await response.json();
        }

       // Add this new function to handle message deletion
async function deleteMessage(messageId) {
    if (!confirm('Are you sure you want to delete this message?')) {
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://leopards-backend.onrender.com/api/admin/contact-submissions/${messageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete message');
        }

        // Refresh the messages list
        await loadRecentMessages();
        renderRecentMessages();
        
        // Optional: Show a success notification
        alert('Message deleted successfully');
        
    } catch (error) {
        console.error('Delete message error:', error);
        alert('Failed to delete message');
    }
}
      

        // Render statistics
        function renderStatistics() {
            const cards = statsCardsContainer.querySelectorAll('.stat-card');
            
            if (cards.length >= 4) {
                cards[0].querySelector('h3').textContent = statsData.total || 0;
                cards[1].querySelector('h3').textContent = statsData.pending || 0;
                cards[2].querySelector('h3').textContent = statsData.approved || 0;
                
                // Calculate new this week (example - you might need to implement this in your backend)
                cards[3].querySelector('h3').textContent = statsData.new_this_week || 'N/A';
            }
        }

        // Render recent registrations
        function renderRecentRegistrations() {
            recentRegistrationsTable.innerHTML = '';
            
            recentRegistrations.forEach(player => {
                const row = document.createElement('tr');
                
                // Format date
                const regDate = new Date(player.registration_date);
                const formattedDate = regDate.toLocaleDateString();
                
                // Determine status class
                let statusClass = 'status-pending';
                if (player.status === 'approved') statusClass = 'status-approved';
                if (player.status === 'rejected') statusClass = 'status-rejected';
                
                row.innerHTML = `
                    <td>${player.full_name}</td>
                    <td>${formattedDate}</td>
                    <td>${player.email || player.mobile_number || 'N/A'}</td>
                    <td><span class="status ${statusClass}">${player.status}</span></td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewPlayer(${player.player_id})">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </td>
                `;
                
                recentRegistrationsTable.appendChild(row);
            });
        }

        // Render recent messages
      function renderRecentMessages() {
    recentMessagesTable.innerHTML = '';
    
    recentMessages.forEach(message => {
        const row = document.createElement('tr');
        const subDate = new Date(message.submission_date);
        const formattedDate = subDate.toLocaleDateString();
        
        row.innerHTML = `
            <td>${message.first_name} ${message.last_name}</td>
            <td>${message.email}</td>
            <td class="message-cell">
                <div class="message-preview">${message.message}</div>
                ${message.message.length > 1 ? 
                    '' : 
                    ''
                }
            </td>
            <td>${formattedDate}</td>
            <td>
                <button class="btn btn-outline btn-sm delete-btn" data-id="${message.id}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        recentMessagesTable.appendChild(row);
    });

    // Add event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const messageId = e.currentTarget.getAttribute('data-id');
            await deleteMessage(messageId);
        });
    });

    // Add click handlers for "View More" buttons
    document.querySelectorAll('.view-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const messageCell = e.target.closest('.message-cell');
            const messagePreview = messageCell.querySelector('.message-preview');
            messagePreview.classList.toggle('expanded');
            e.target.textContent = messagePreview.classList.contains('expanded') ? 
                'View Less' : 'View More';
        });
    });
}
        // View player details
        function viewPlayer(playerId) {
            window.location.href = `player-details.html?id=${playerId}`;
        }

        // Logout function
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });

        // Error handling
        window.addEventListener('error', (event) => {
            console.error('Dashboard error:', event.error);
            alert('An error occurred. Please try again.');
        });