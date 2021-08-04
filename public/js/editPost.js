  
const updatePostHandler = async (event) => {
    event.preventDefault();
  
    const post_title = document.querySelector('#post_title').value.trim();
    const post_body = document.querySelector('#post_body').value.trim();
  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ post_title, post_body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const deletePostHandler = async (event) => {
    event.preventDefault();
  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  const cancelBtnHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')){
    document.location.replace('/dashboard');
  }};
  
  document
  .querySelector('.updateBtn')
  .addEventListener('click', updatePostHandler);
  
  document
  .querySelector('.deleteBtn')
  .addEventListener('click', deletePostHandler);
  
  document
  .querySelector('.cancelBtn')
  .addEventListener('click', cancelBtnHandler);