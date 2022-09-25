$("input").css("border-color","ced4da")
    $("input").css("background-color","white")
    if (localStorage.getItem("pass") !== "") {
        $("#password").val(localStorage.getItem("pass"))
    }
    highlight = (obj,major) => {
        highlightFail = true
        obj.css("border-color","red")
        if (major) {
            obj.css("background-color","yellow")
            $("#search").html("Locked")
        }
    }
    