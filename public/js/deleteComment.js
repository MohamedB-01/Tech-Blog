const deleteCommentHandler = async (event) => {
    event.preventDefault();
  
    const currentUserId = document.querySelector('.sessUserId').getAttribute('data-id');
  
    if(!currentUserId){
      alert('You must be logged in to add or delete comments.')
      return;
    }
  
  
    if (event.target.hasAttribute('data-id')) {
      const deleteData = event.target.getAttribute('data-id');
  
      var deleteDataArr = deleteData.split(",");
  
      var id = deleteDataArr[0]
      var user_id = deleteDataArr[1];
      var sess_user_id = currentUserId;
  
      if(user_id === sess_user_id) { 
        const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to delete comment.');
        }
      } else {
        alert('Users can only delete their own comments');
      }
    }
  };
  
  document
    .querySelectorAll('.delete-btn').forEach(item => {
      item.addEventListener('click', deleteCommentHandler);
    });