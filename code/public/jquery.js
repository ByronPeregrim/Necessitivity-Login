$("#login, #login_back_button").on("click",function(){
    $("#login").toggleClass("hide");
    $("#signup").toggleClass("hide");
    $("#user_login_form").toggleClass("hide");
    $("#input_username_box").toggleClass("hide");
    $("#input_password_box").toggleClass("hide");
    $("#login_button_box").toggleClass("hide");
    $("#login_back_button").toggleClass("hide");
    $("#login_submit_button").toggleClass("hide");
    $("#account_recovery_links").toggleClass("hide");
    $("#login_account_recovery_links").toggleClass("hide");
});

$("#signup, #signup_back_button").on("click",function(){
    $("#login").toggleClass("hide");
    $("#signup").toggleClass("hide");
    $("#signup_form_text").toggleClass("hide");
    $("#user_signup_form").toggleClass("hide");
    $("#user_signup_form > input").toggleClass("hide");
    $("#height_label").toggleClass("hide");
    $("#height_box").toggleClass("hide");
    $("#height_ft").toggleClass("hide");
    $("#height_in").toggleClass("hide");
    $("#weight_box").toggleClass("hide");
    $("#weight_label").toggleClass("hide");
    $("#weight").toggleClass("hide");
    $("#signup_button_box").toggleClass("hide");
    $("#signup_back_button").toggleClass("hide");
    $("#signup_submit_button").toggleClass("hide");
    $("#account_recovery_links").toggleClass("hide");
});

$("#login_account_recovery_links > a").on("click",function(){
    $("#user_login_form").toggleClass("hide");
    $("#input_username_box").toggleClass("hide");
    $("#input_password_box").toggleClass("hide");
    $("#login_button_box").toggleClass("hide");
    $("#login_back_button").toggleClass("hide");
    $("#login_submit_button").toggleClass("hide");
    $("#login_account_recovery_links").toggleClass("hide");
    $("#account_recovery_button_box").toggleClass("hide");
    $("#account_recovery_back_button").toggleClass("hide");
    $("#account_recovery_text").toggleClass("hide");
    $("#account_recovery_submit_button").toggleClass("hide");
    $("#account_recovery_input").toggleClass("hide");
});

$("#account_recovery_links > a, #account_recovery_back_button").on("click", function(){
    $("#login").toggleClass("hide");
    $("#signup").toggleClass("hide");
    $("#account_recovery_button_box").toggleClass("hide");
    $("#account_recovery_back_button").toggleClass("hide");
    $("#account_recovery_text").toggleClass("hide");
    $("#account_recovery_submit_button").toggleClass("hide");
    $("#account_recovery_input").toggleClass("hide");
    $("#account_recovery_links").toggleClass("hide");
});