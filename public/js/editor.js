var datesToPush = []

// date-picker
$("#addDate").on("click",function(){
    let theDate = $("#date-picker").val()
    let miniDate = theDate.split("-")
    let month = miniDate[1]
    let day = miniDate[2]
    let year = miniDate[0]
    let final = month + "/" + day + "/" + year
    datesToPush.push(final)
    $("#thedates").append("<div class='entry'>" + final + " <button class='remove' data-id='" + final + "'>Remove</button></div>")
    removeListener()
}
)

function removeListener(){
    $(".remove").off()
    $(".remove").on("click",function(){
        let index = datesToPush.indexOf($(this).attr("data-id"));
        if (index > -1) { // only splice array when item is found
           datesToPush.splice(index, 1); // 2nd parameter means remove one item only
        }

        console.log(datesToPush); 
    })
}
