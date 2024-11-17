const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const toggleBtn = document.getElementById('toggle-btn');
const formTitle = document.getElementById('form-title');

// Toggle between signup and login form
toggleBtn.addEventListener('click', () => {
    if (signupForm.classList.contains('active')) {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
        formTitle.textContent = 'Login';
        toggleBtn.textContent = "Don't have an account? Signup here.";
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        formTitle.textContent = 'Signup';
        toggleBtn.textContent = 'Already have an account? Login here.';
    }
});

// Handle signup form submission
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email-signup').value,
        password: document.getElementById('password-signup').value
    };

    try {
        const response = await fetch('https://xage-loginorsignup-express.onrender.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        });

        const result = await response.json();
        if (response.status === 201) {
            // Provide feedback to the user in a better way than alert
            alert('Signup successful!');
            window.location.href = 'https://xage-homepage-react.onrender.com/'; 
        } else {
            throw new Error(result.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert(`Signup failed: ${error.message}`);
    }
});

// Handle login form submission
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = {
        email: document.getElementById('email-login').value,
        password: document.getElementById('password-login').value,
    };
  
    console.log("Login form data:", formData);

    try {
        const response = await fetch('https://xage-loginorsignup-express.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        });

        const result = await response.json();
        if (response.status === 200) {
            alert('Login successful!');
            // Redirecting to the main page after successful login
            window.location.href = 'https://xage-homepage-react.onrender.com/';
        } else {
            throw new Error(result.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert(`Login failed: ${error.message}`);
    }
});
