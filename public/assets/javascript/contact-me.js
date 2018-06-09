// Add User button click
$('#submitButton').on('click', addUser);
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newVisitor = {
            'firstName': $('#firstNameInput').val(),
            'lastName': $('#lastNameInput').val(),
            'email': $('#emailInput').val(),
            'message': $('#textInput').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newVisitor,
            url: '/addvisitor',
            dataType: 'JSON'
        }).then(function( data ) {
            console.log("response" + data);
            console.log("firstnameajax: " + data.firstName)

        });

        // Clear the form inputs
        $('#firstNameInput').val('');
        $('#lastNameInput').val('');
        $('#emailInput').val('');
        $('#textInput').val('');
    }
    return false;

};