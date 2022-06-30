$(document).ready(function () {

    // Redirect to view-post upon clicking a post in the home page
    //$(".post-entry").on('click') 

    // Increase or decrease like count (toggle) upon clicking like
    $(".normal-like-button").on('click', function(){
        let obj = $(this);
        let _id = obj.siblings('[name="_id"]').val(); //returns double the id string separated by ','
        

        // If the post/comment has not yet been liked
        if (obj.siblings('[name="_id"]').attr('class') == 'post-like') {
            
            console.log('jqueryid: ' + _id);
            $.get('/like-post', { _id: _id }, function(newLikeCount){
                obj.siblings('.normal-like-count').text(newLikeCount.likes);
            })
        }
        else if (obj.siblings('[name="_id"]').attr('class') == 'comment-like') {
            console.log('jqueryid: ' + _id);
            $.get('/like-comment', { _id: _id }, function(newLikeCount) {
                obj.siblings('.normal-like-count').text(newLikeCount.likes);
            });
        }
    });

    function readURLprofpic(input){
        if (input.files && input.files[0]){
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.profile-pic-editprofile').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function readURLfavechar(input){
        if (input.files && input.files[0]){
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.favechar-img-editprofile').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $(".changeprofilepic-editprofile").change(function(){
        readURLprofpic(this);
    });

    $(".changefavecharpic-editprofile").change(function(){
        readURLfavechar(this);
    });

    // Create a post

    // Create a comment on a post

    // Reply to a comment on a post

    // Delete a post

    // Delete a comment

    // Delete account

    // Edit profile
})