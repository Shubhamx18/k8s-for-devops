// Form validation and submission
function setupRegistrationForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                showAlert('success', result.message);
                form.reset();
                
                // Redirect to students page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/students';
                }, 2000);
            } else {
                showAlert('error', result.message);
            }
        } catch (error) {
            showAlert('error', 'An error occurred. Please try again.');
        }
    });
}

// Show alert messages
function showAlert(type, message) {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    
    alertContainer.innerHTML = `
        <div class="alert ${alertClass} show">
            ${message}
        </div>
    `;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        const alert = alertContainer.querySelector('.alert');
        if (alert) {
            alert.classList.remove('show');
        }
    }, 5000);
}

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }

    try {
        const response = await fetch(`/student/${id}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (result.success) {
            showAlert('success', result.message);
            // Reload the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            showAlert('error', result.message);
        }
    } catch (error) {
        showAlert('error', 'An error occurred. Please try again.');
    }
}

// Load statistics
async function loadStats() {
    const statsContainer = document.getElementById('statsContainer');
    if (!statsContainer) return;

    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();

        let courseStats = '';
        for (const [course, count] of Object.entries(stats.courses)) {
            courseStats += `
                <div class="stat-card">
                    <div class="stat-number">${count}</div>
                    <div class="stat-label">${course}</div>
                </div>
            `;
        }

        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${stats.totalStudents}</div>
                <div class="stat-label">Total Students</div>
            </div>
            ${courseStats}
        `;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupRegistrationForm();
    loadStats();
    setupSearch();
});
