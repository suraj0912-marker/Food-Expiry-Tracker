// Food Expiry Tracker JavaScript with API Integration
const apiUrl = "http://localhost:9090/api/fooditems";

// Get DOM elements
const foodForm = document.getElementById('foodForm');
const foodTable = document.getElementById('foodTable');
const tableBody = foodTable.querySelector('tbody');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as minimum date for expiry
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('expiryDate').setAttribute('min', today);
    
    // Load food items from API
    fetchFoodItems();
});

// Add event listener for form submission
foodForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    await addFoodItem();
});

// Fetch all food items from API
async function fetchFoodItems() {
    try {
        showLoadingState();
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayFoodItems(data);
        checkExpiringItems(data);
        
    } catch (error) {
        console.error('Error fetching food items:', error);
        showErrorMessage('Failed to load food items. Please check your connection.');
        showEmptyState();
    }
}

// Function to add a new food item
async function addFoodItem() {
    const name = document.getElementById('name').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const expiryDate = document.getElementById('expiryDate').value;

    // Validate inputs
    if (!name || !quantity || !expiryDate) {
        showErrorMessage('Please fill in all fields');
        return;
    }

    if (quantity <= 0) {
        showErrorMessage('Quantity must be greater than 0');
        return;
    }

    // Check if expiry date is not in the past
    const today = new Date();
    const expiry = new Date(expiryDate);
    
    if (expiry < today.setHours(0, 0, 0, 0)) {
        showErrorMessage('Expiry date cannot be in the past');
        return;
    }

    // Create food item object
    const foodItem = {
        name: name,
        quantity: quantity,
        expiryDate: expiryDate
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(foodItem)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Clear form and refresh list
        foodForm.reset();
        await fetchFoodItems();
        showSuccessMessage('Food item added successfully!');
        
    } catch (error) {
        console.error('Error adding food item:', error);
        showErrorMessage('Failed to add food item. Please try again.');
    }
}

// Function to delete a food item
async function deleteFoodItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${id}`, { 
            method: "DELETE" 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        await fetchFoodItems();
        showSuccessMessage('Food item deleted successfully!');
        
    } catch (error) {
        console.error('Error deleting food item:', error);
        showErrorMessage('Failed to delete food item. Please try again.');
    }
}

// Function to display all food items in the table
function displayFoodItems(items) {
    tableBody.innerHTML = '';

    if (!items || items.length === 0) {
        showEmptyState();
        return;
    }

    // Sort items by expiry date (closest first)
    const sortedItems = items.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

    sortedItems.forEach(item => {
        const row = document.createElement('tr');
        const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
        
        // Add warning class if expiring soon
        if (daysUntilExpiry <= 3 && daysUntilExpiry >= 0) {
            row.className = 'expiring-soon';
        } else if (daysUntilExpiry < 0) {
            row.className = 'expired';
        }

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${formatDate(item.expiryDate)} ${getExpiryStatus(item.expiryDate)}</td>
            <td><button class="delete-btn" onclick="deleteFoodItem(${item.id})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to show empty state
function showEmptyState() {
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'empty-state';
    emptyRow.innerHTML = '<td colspan="5">No food items added yet. Start by adding your first item!</td>';
    tableBody.appendChild(emptyRow);
}

// Function to show loading state
function showLoadingState() {
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #718096;"><div style="font-size: 2rem; margin-bottom: 10px;">⏳</div>Loading food items...</td></tr>';
}

// Function to get days until expiry
function getDaysUntilExpiry(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Function to get expiry status
function getExpiryStatus(expiryDate) {
    const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
    
    if (daysUntilExpiry < 0) {
        return '🔴 EXPIRED';
    } else if (daysUntilExpiry === 0) {
        return '⚠️ Expires Today';
    } else if (daysUntilExpiry <= 3) {
        return `⚠️ Expires in ${daysUntilExpiry} day${daysUntilExpiry > 1 ? 's' : ''}`;
    } else if (daysUntilExpiry <= 7) {
        return `🟡 Expires in ${daysUntilExpiry} days`;
    } else {
        return `🟢 ${daysUntilExpiry} days left`;
    }
}

// Function to format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Function to show success message
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

// Function to show error message
function showErrorMessage(message) {
    showNotification(message, 'error');
}

// Generic notification function
function showNotification(message, type = 'success') {
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}-notification`;
    notification.textContent = message;
    
    const backgroundColor = type === 'success' 
        ? 'linear-gradient(135deg, #48bb78, #38a169)' 
        : 'linear-gradient(135deg, #f56565, #e53e3e)';
    
    const shadowColor = type === 'success' 
        ? 'rgba(72, 187, 120, 0.3)' 
        : 'rgba(245, 101, 101, 0.3)';

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 15px ${shadowColor};
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Function to check for expiring items and show notifications
function checkExpiringItems(items) {
    if (!items || items.length === 0) return;
    
    const expiringItems = items.filter(item => {
        const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
        return daysUntilExpiry <= 3 && daysUntilExpiry >= 0;
    });

    const expiredItems = items.filter(item => {
        const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
        return daysUntilExpiry < 0;
    });

    if (expiredItems.length > 0) {
        console.warn(`⚠️ You have ${expiredItems.length} expired item${expiredItems.length > 1 ? 's' : ''}!`);
        setTimeout(() => {
            showErrorMessage(`⚠️ You have ${expiredItems.length} expired item${expiredItems.length > 1 ? 's' : ''}!`);
        }, 1500);
    }

    if (expiringItems.length > 0) {
        console.warn(`⚠️ You have ${expiringItems.length} item${expiringItems.length > 1 ? 's' : ''} expiring soon!`);
        setTimeout(() => {
            showNotification(`⚠️ ${expiringItems.length} item${expiringItems.length > 1 ? 's are' : ' is'} expiring soon!`, 'warning');
        }, 2500);
    }
}

// Add refresh functionality
function refreshFoodItems() {
    fetchFoodItems();
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + R to refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshFoodItems();
        showSuccessMessage('Data refreshed!');
    }
});

// Add some CSS styles for expired and expiring items
const style = document.createElement('style');
style.textContent = `
    .expiring-soon {
        background-color: rgba(255, 193, 7, 0.1) !important;
    }
    
    .expired {
        background-color: rgba(220, 53, 69, 0.1) !important;
    }
    
    .expiring-soon:hover,
    .expired:hover {
        background-color: rgba(255, 193, 7, 0.2) !important;
    }
    
    .notification {
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
`;
document.head.appendChild(style);