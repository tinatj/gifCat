var cats = ["black cat", "white cat", "orange cat", "tiny cat", "brown cat", "mancoon"]
var results;

// next after creating an array of catsos, we shall continue with a function for to display the data of catsos
function renderButtons() {
    // deletes the cat btns prior to adding new catso btns
    // in contrary we would see repeated btns
    $("#house-buttons").empty();

    //to loop throuth the array of catsGifs
    for (var j = 0; j < cats.length; j++) {
        //therefore is the dinamic  creation/generating of btns for each entity in the catso's array . to remember $("<button>") syntax here!!! o~0 for jQuery  crte the start and end tag!/

        var e = $("<button>");
        ///shall add classe
        e.addClass("cats");
        //data-attr with value pf the catsos with index j{}
        e.attr("data-name", cats[j]);
        //we need to provide text with via the value of the cats, with index j
        e.text(cats[j]);
        //add the btn to the html doc/file
        $("#house-buttons").append(e);
    }
}
//next function is handling the events with one butn being clicked.
$("#add-a-cat").on("click", function (event) {
    ///event.preventDefault prevents the form from trying to submit itself...
    ////we are using a form so that the user can hit enter instead of clicking the button if she/he would like to.
    event.preventDefault();
    ////this line will grab the text from the input box
    var catsos = $("#cat-input").val().trim();
    //this cot from the text box is now being added to the inital array
    cats.push(catsos);
    //calling renderBtns(); which handles the processing of our cats array
    renderButtons();

    $("#cat-input").val(" ");
});

renderButtons();


// http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=l26dX5NQCXIN191YQugGuaMlcQRF55aI&limit=10
// Api Key: l26dX5NQCXIN191YQugGuaMlcQRF55aI

$(document).on("click", ".cats", displaygif)
function displaygif() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + ($(this).text()) + "&api_key=l26dX5NQCXIN191YQugGuaMlcQRF55aI&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET',

    }).then(function(response){
        console.log(response);
        results = response.data;
        for (i=0; i<response.data.length; i++){
            var gifMove = response.data[i].images.fixed_height.url;
            var gifStill = response.data[i].images.fixed_height_still.url;
            var gifs = $("<img>").addClass("searchGif")
            .attr("src", gifStill).attr("gifMove", gifMove).attr("moving", "false").attr("imgNo", i);
            $("#cat-view").prepend(gifs);
        }
    });
    $(document).on("click", ".searchGif",function()
    {
        var state = $(this).attr("moving");
        if (state == "false") {
            $(this).attr("src", $(this).attr("gifMove"));
            $(this).attr("moving","true");
        }
        else {
            $(this).attr("src", results[($(this).attr("imgNo"))].images.fixed_height_still.url);
            $(this).attr("moving", "false");
        } 
    })

}