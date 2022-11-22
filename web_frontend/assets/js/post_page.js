var edit_reply_values; /*Set empty variable to get edit reply id */ 
document.addEventListener("click", function(event){
    (event.target && event.target.classList == "confirm_delete_button") ? event.target.closest(".delete_button_container").classList.add("show_delete_option") : "" ;
    (event.target && event.target.classList == "delete_button_no") ? event.target.closest(".delete_button_container").classList.remove("show_delete_option") : "" ;
    /*This function and event triggers the delete post or reply and remove the element selected*/
    (event.target && event.target.classList == "delete_button_yes") ? deletePostReply(event.target) : "";
    /*This function and event triggers and focuses comment or reply you want to edit*/
    (event.target && event.target.classList == "reply_button") ? editPostComments(event.target) : "";
    /*This event and function validates the input for post and reply inputs*/
    (event.target && event.target.classList[1] == "post_reply_button") ? validatePostReply(event.target) : "";
});

/*
    DOCU: This function and event triggers the delete post or reply and remove the element selected
    *Triggered: (event.target && event.target.classList == "delete_button_yes") ? deletePostReply(event.target) : "";
    *Last Update Date: November 21, 2022
    *Parameter: selected_post - selected post to delete
    *Author: Stan Bernie Nudo
*/
function deletePostReply(selected_post){
    let post_reply_delete = selected_post.closest(".post_item").querySelector(".reply_thread");

    selected_post.closest("li").remove(); /*Remove selected post or reply*/
    /*Setting the subtracted reply count to the main comment response count*/
    post_reply_delete.closest(".post_item").querySelectorAll(".comment_response")[0].textContent = post_reply_delete.querySelectorAll("li").length;
    getPostCount(); /*This function counts the posts to hide and show the no post yet background */
}

/*
    DOCU: This function and event triggers and focuses comment or reply you want to edit
    *Triggered: (event.target && event.target.classList == "reply_button") ? editPostComments(event.target) : "";
    *Last Update Date: November 21, 2022
    *Parameter: reply_button - get reply button element
    *Author: Stan Bernie Nudo
*/
function editPostComments(reply_button){
    let reply_box = reply_button.closest(".post_item").querySelectorAll(".post_reply_input")[0];
    let post_edit_box_value = reply_button.closest(".response_container").previousElementSibling.textContent;

    reply_box.value = post_edit_box_value; /*Assign value of the selected posts or replies to the commented textarea*/
    reply_box.nextElementSibling.textContent = "Save"; /*Change the button text to Save if edit is triggered*/
    reply_box.focus(); /*Focus the pointed textarea where to edit*/
    edit_reply_values = reply_button.closest("li").id.toString(); /*Get the selected post to edit id and assign to global variable*/
}

/*
    DOCU: This event and function validates the input for post and reply inputs
    *Triggered: (event.target && event.target.classList[1] == "post_reply_button") ? validatePostReply(event.target) : "";
    *Last Update Date: November 21, 2022
    *Parameter: submit_post_reply_button - Get the save button of the selected comment or response
    *Author: Stan Bernie Nudo
*/
function validatePostReply(submit_post_reply_button){
    let send_post_comment = submit_post_reply_button.previousElementSibling;
    let cloned_post = document.getElementById("clone_post").cloneNode(true);
    let post_reply_container = document.createElement("p"); /*Create an ID for the created new post or reply by time*/
    let post_reply_id = new Date().getTime();

    /*Validation part for the post and reply*/
    if(!send_post_comment.value.length){
        send_post_comment.closest(".post_reply_containers").classList.add("input_error");
    }else{
        send_post_comment.closest(".post_reply_containers").classList.remove("input_error");
        post_reply_container.textContent = send_post_comment.value; /*Setting the value for the new comment or replies*/
        cloned_post.prepend(post_reply_container); /*Appen the post value to the new cloned post*/
        cloned_post.id = post_reply_id; /*Set id for the new clone post*/

        if(submit_post_reply_button.getAttribute("id") == "post_button"){ /*Append post if post is saved*/
            cloned_post.classList.add("post_item");
            document.getElementById("post_list_container").append(cloned_post);
            getPostCount(); /*This function counts the posts to hide and show the no post yet background*/
        }else if(edit_reply_values){ /*Change comment content if comment is edited*/
            document.getElementById(edit_reply_values).querySelectorAll("p")[0].textContent = send_post_comment.value;
            edit_reply_values = ""; /*Re Set edit reply values to none*/
        }
        else{ /*Append create reply or response*/
            cloned_post.classList.add("reply_item");
            submit_post_reply_button.closest(".post_reply_containers").nextElementSibling.append(cloned_post);

            let response_count = submit_post_reply_button.closest(".post_reply_containers").nextElementSibling.querySelectorAll("li").length;
            submit_post_reply_button.closest(".post_reply_containers").previousElementSibling.querySelectorAll(".comment_response")[0].textContent = response_count;
        }

        send_post_comment.value = ""; /*Set input post and reply to empty after creating post and replies*/
        submit_post_reply_button.textContent = "Comment"; /*Change back button to comment again after edit reply is succeeded*/
    }
}

/*
    DOCU: This function counts the posts to hide and show the no post yet background 
    *Triggered: validatePostReply() and deletePostReply()
    *Last Update Date: November 21, 2022
    *Parameter: None
    *Author: Stan Bernie Nudo
*/
function getPostCount(){
    let post_container = document.getElementById("post_list_container");
    /*Show the post background if no post is added and hide there was a post added*/
    (post_container.querySelectorAll(".post_item").length) ? post_container.classList.add("has_comments") : post_container.classList.remove("has_comments");
}