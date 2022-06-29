$(document).ready(function () {

    // Redirect to view-post upon clicking a post in the home page
    //$(".post-entry").on('click') 

    // Increase or decrease like count (toggle) upon clicking like
    $(".normal-like-button").on('click', function(){
        let _id = $(this).siblings('[name="_id"]').val(); //returns double the id string separated by ','

        // If the post/comment has not yet been liked
        if ($(this).siblings('[name="_id"]').attr('class') == 'post-like') {
            
            console.log('jqueryid: ' + _id);
            $.get('/like-post', { _id: _id }, function(newLikeCount){
                $('.normal-like-count').text(newLikeCount.likes);
            })
        }
        else if ($(this).siblings('[name="_id"]').attr('class') == 'comment-like') {
            console.log('jqueryid: ' + _id);
            $.get('/like-comment', { _id: _id }, function(newLikeCount) {
                $('.normal-like-count').text(newLikeCount.likes);
            });
        }
        

        
    });

    // Create a post

    // Create a comment on a post

    // Reply to a comment on a post

    // Delete a post

    // Delete a comment

    // Delete account

    // Edit profile
})