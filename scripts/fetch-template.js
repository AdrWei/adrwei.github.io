fetch('/posts/posts.json')
    .then(response => response.json())
    .then(posts => {
        const container = document.body;
        posts.forEach(post => {
            const postComponent = document.createElement('post-component');
            postComponent.setAttribute('post-title', post.title);
            postComponent.setAttribute('post-content', post.content);
            container.appendChild(postComponent);
        });
    });
