
 document.querySelector('.theme-toggle').addEventListener('click', () => {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    document.querySelector('.theme-toggle').textContent = newTheme === 'light' ? 'Dark' : 'Light';
});


document.getElementById('search').addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim(); 
    const errorDiv = document.getElementById('error'); 
    const userCard = document.getElementById('user-card'); 

    if (!username) {
        errorDiv.textContent = 'Please enter a username.'; 
        errorDiv.style.display = 'block';
        userCard.style.display = 'none';
        return;
    }

    errorDiv.style.display = 'none';
    userCard.style.display = 'none';

    try {
        const response = await fetch(`https://api.github.com/users/${username}`); 

        if (!response.ok) {
            throw new Error('User not found'); 
        }

        const data = await response.json(); 

    
        document.getElementById('avatar').src = data.avatar_url || '';
        document.getElementById('name').textContent = data.name || 'No name provided';
        document.getElementById('username-display').innerHTML = `<a id="profile-link" href="${data.html_url}" target="_blank">@${data.login}</a>`;
        document.getElementById('bio').textContent = data.bio || 'This profile has no bio';
        document.getElementById('repos').textContent = data.public_repos || 0;
        document.getElementById('followers').textContent = data.followers || 0;
        document.getElementById('following').textContent = data.following || 0;
        document.getElementById('location').textContent = data.location || 'Not Available';
        
        const blog = data.blog || 'Not Available';
        document.getElementById('blog').textContent = blog !== 'Not Available' ? blog : 'Not Available';
        document.getElementById('blog').href = blog.startsWith('http') ? blog : '#';

        const twitter = data.twitter_username || 'Not Available';
        document.getElementById('twitter').textContent = twitter !== 'Not Available' ? `@${twitter}` : 'Not Available';

        document.getElementById('company').textContent = data.company || 'Not Available';

        userCard.style.display = 'flex'; 
    } catch (error) {
        errorDiv.textContent = error.message; 
        errorDiv.style.display = 'block';
    }
});