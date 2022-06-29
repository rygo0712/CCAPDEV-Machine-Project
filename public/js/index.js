$(document).ready(function () {

    // Redirect to view-post upon clicking a post in the home page
    $(".post-entry").on('click') 

    // Increase or decrease like count (toggle) upon clicking like
    $(".normal-like-button").on('click', function(){
        let _id = $(this).siblings('[name="_id"]').val();
        if ($(this).siblings('[name="_id"]').attr('class') == 'post-like'){
            //console.log(_id);
            $.get('/like-post', { _id: _id }, function(flag){
                //console.log(flag);
            })
        }
        
    })

    // Create a post

    // Create a comment on a post

    // Reply to a comment on a post

    // Delete a post

    // Delete a comment

    // Delete account

    // Edit profile
})