// Function to render posts
function renderPosts(posts) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = ''; // Clear previous results

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('card', 'p-3', 'mb-3');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p><strong>ID:</strong> ${post.id}</p>
            <p>${post.body}</p>
        `;
        resultContainer.appendChild(postElement);
    });
}

// Function to render a single post
function renderPost(post) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = ''; // Clear previous results

    const postElement = document.createElement('div');
    postElement.classList.add('card', 'p-3');
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p><strong>ID:</strong> ${post.id}</p>
        <p>${post.body}</p>
    `;
    resultContainer.appendChild(postElement);
}

// Function to render a message
function renderMessage(message) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `<div class="alert alert-success">${message}</div>`;
}

// Function to fetch all posts
function getAllPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            renderPosts(posts);
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Function to fetch post with id of 10
function getPostById() {
    fetch('https://jsonplaceholder.typicode.com/posts/10')
        .then(response => response.json())
        .then(post => {
            renderPost(post);
        })
        .catch(error => console.error('Error fetching post:', error));
}

function createNewPost() {
    const post = {
        title: 'New Post',
        body: 'This is the body of the new post.',
        userId: 1 // Assuming user ID
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        return response.json();
    })
    .then(data => {
        console.log('New post created:', data);
        // Render or perform any other actions with the newly created post data
        renderPost(data); // Example: Render the newly created post on the page
    })
    .catch(error => console.error('Error creating post:', error));
}


// Function to replace the post with id of 12
function replacePost() {
    const updatedPost = {
        title: 'Updated Post Title',
        body: 'Updated body content.',
        userId: 1 // Assuming user ID
    };

    fetch('https://jsonplaceholder.typicode.com/posts/12', {
        method: 'PUT',
        body: JSON.stringify(updatedPost),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(data => {
        renderPost(data); // Render updated post on the page
    })
    .catch(error => console.error('Error updating post:', error));
}

// Function to update the title of post with id of 12
function updatePostTitle() {
    const updatedTitle = {
        title: 'Updated Title'
    };

    fetch('https://jsonplaceholder.typicode.com/posts/12', {
        method: 'PATCH',
        body: JSON.stringify(updatedTitle),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(data => {
        renderPost(data); // Render updated post on the page
    })
    .catch(error => console.error('Error updating post title:', error));
}

// Function to delete the post with id of 12
function deletePost() {
    fetch('https://jsonplaceholder.typicode.com/posts/12', {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            return 'Post deleted successfully';
        }
        throw new Error('Failed to delete post');
    })
    .then(message => {
        renderMessage(message); // Render success message on the page
    })
    .catch(error => console.error('Error deleting post:', error));
}
