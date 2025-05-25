document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('user-details-form');
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    
    // Create profile display container with inline styling
    const profileContainer = document.createElement('div');
    profileContainer.style.display = 'none';
    profileContainer.style.background = '#ffffff';
    profileContainer.style.padding = '25px';
    profileContainer.style.borderRadius = '10px';
    profileContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    profileContainer.style.marginTop = '30px';
    profileContainer.style.fontFamily = 'Arial, sans-serif';
    userForm.parentNode.insertBefore(profileContainer, userForm.nextSibling);

    // Load saved profile data if exists
    if (Object.keys(userProfile).length > 0) {
        document.getElementById('user-age').value = userProfile.age || '';
        document.getElementById('user-diet').value = userProfile.diet || 'omnivore';
        document.getElementById('user-allergies').value = userProfile.allergies ? userProfile.allergies.join(', ') : '';
        document.getElementById('user-intolerances').value = userProfile.intolerances ? userProfile.intolerances.join(', ') : '';
        document.getElementById('user-conditions').value = userProfile.conditions ? userProfile.conditions.join(', ') : '';
        document.getElementById('user-cuisines').value = userProfile.cuisines ? userProfile.cuisines.join(', ') : '';
        document.getElementById('user-goals').value = userProfile.goals || 'maintain';
        
        // Display the profile if data exists
        displayProfile();
    }

    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const updatedProfile = {
            age: parseInt(document.getElementById('user-age').value) || 0,
            diet: document.getElementById('user-diet').value,
            allergies: document.getElementById('user-allergies').value.split(',').map(item => item.trim()).filter(item => item !== ''),
            intolerances: document.getElementById('user-intolerances').value.split(',').map(item => item.trim()).filter(item => item !== ''),
            conditions: document.getElementById('user-conditions').value.split(',').map(item => item.trim()).filter(item => item !== ''),
            cuisines: document.getElementById('user-cuisines').value.split(',').map(item => item.trim()).filter(item => item !== ''),
            goals: document.getElementById('user-goals').value,
            lastUpdated: new Date().toLocaleString()
        };
        
        // Save to local storage
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        
        // Update display
        displayProfile();
    });

    function displayProfile() {
        const user = JSON.parse(localStorage.getItem('userProfile'));
        if (user) {
            profileContainer.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #2E7D32; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Your Health Profile</h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                        <!-- Basic Info Column -->
                        <div>
                            <h4 style="color: #1B5E20; margin-bottom: 15px;">Basic Information</h4>
                            <p style="margin: 10px 0; padding-bottom: 8px; border-bottom: 1px dashed #e0e0e0;">
                                <strong style="color: #333; min-width: 120px; display: inline-block;">Age:</strong> 
                                ${user.age || 'Not specified'}
                            </p>
                            <p style="margin: 10px 0; padding-bottom: 8px; border-bottom: 1px dashed #e0e0e0;">
                                <strong style="color: #333; min-width: 120px; display: inline-block;">Diet Type:</strong> 
                                ${user.diet.charAt(0).toUpperCase() + user.diet.slice(1)}
                            </p>
                            <p style="margin: 10px 0; padding-bottom: 8px; border-bottom: 1px dashed #e0e0e0;">
                                <strong style="color: #333; min-width: 120px; display: inline-block;">Health Goals:</strong> 
                                ${user.goals.replace('-', ' ').toUpperCase()}
                            </p>
                        </div>
                        
                        <!-- Health Info Column -->
                        <div>
                            <h4 style="color: #1B5E20; margin-bottom: 15px;">Health Details</h4>
                            <p style="margin: 10px 0; padding-bottom: 8px; border-bottom: 1px dashed #e0e0e0;">
                                <strong style="color: #333; min-width: 120px; display: inline-block;">Allergies:</strong> 
                                ${user.allergies.length > 0 ? user.allergies.join(', ') : 'None'}
                            </p>
                            <p style="margin: 10px 0; padding-bottom: 8px; border-bottom: 1px dashed #e0e0e0;">
                                <strong style="color: #333; min-width: 120px; display: inline-block;">Intolerances:</strong> 
                                ${user.intolerances.length > 0 ? user.intolerances.join(', ') : 'None'}
                            </p>
                            <p style="margin: 10px 0; padding-bottom: 8px; border-bottom: 1px dashed #e0e0e0;">
                                <strong style="color: #333; min-width: 120px; display: inline-block;">Conditions:</strong> 
                                ${user.conditions.length > 0 ? user.conditions.join(', ') : 'None'}
                            </p>
                        </div>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h4 style="color: #1B5E20; margin-bottom: 15px;">Preferences</h4>
                        <p style="margin: 10px 0;">
                            <strong style="color: #333; min-width: 120px; display: inline-block;">Preferred Cuisines:</strong> 
                            ${user.cuisines.length > 0 ? user.cuisines.join(', ') : 'None specified'}
                        </p>
                    </div>
                    
                    <p style="font-size: 0.9em; color: #666; text-align: right;">
                        Last updated: ${user.lastUpdated || 'Never'}
                    </p>
                    
                    <button id="edit-profile" style="
                        background-color: #4CAF50;
                        color: white;
                        padding: 12px 25px;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 16px;
                        margin-top: 15px;
                        transition: all 0.3s;
                        display: block;
                        width: 100%;
                    " onmouseover="this.style.backgroundColor='#3e8e41'" 
                     onmouseout="this.style.backgroundColor='#4CAF50'">
                        Edit Profile
                    </button>
                </div>
            `;
            
            // Add edit button functionality
            document.getElementById('edit-profile').addEventListener('click', function() {
                profileContainer.style.display = 'none';
                userForm.style.display = 'block';
            });
            
            // Hide form and show profile
            userForm.style.display = 'none';
            profileContainer.style.display = 'block';
        }
    }
});