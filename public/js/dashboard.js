const newPostHandler = async (event) => {
    event.preventDefault();
  
    const post_title = document.querySelector('#post_title').value.trim();
    
    const post_body = document.querySelector('#post_body').value.trim();
  
    if (post_title && post_body) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ post_title, post_body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostHandler);