// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}

//Use drop down info to select a state and scroll down to that candidate's line.
$("#candidate_dropdown ").change(function () { //when the drop down changes, do a thing
    var choice = $(this).find("option:selected").val(); //get selected value

    //ID of element = "can##"

    //div id = "can#"
    var element = "#can" + choice;

    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 2000);
});
