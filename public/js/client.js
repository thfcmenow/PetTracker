
    // setup from imported json
    // var config = <%- JSON.stringify(data) %> // ejs scriptlet move to ejs
    // data = config

    const appConfig = {
        "timer":2,
        "useTransitionEffect":true,
        "title":"YPL Tracker"
    }

    $("#title").html(appConfig.title)

    // setup cards
    var cardHTML = "<div class='~type~'>"
    cardHTML += '<div role="~name~" class="uk-card uk-card-default uk-card-body">~item~</div>'
    cardHTML += "</div>"

    class card {
        constructor(html, id) {
            this.html = html;
            this.id = id;
        }
    }

    function fade( el, timer ){
        el.fadeOut( timer , function() {
            $( this ).fadeIn( timer , function() {
                fade( $( this ).next(), timer ) ;
            } ) ;
        } ) ;
    }
        
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var d = new Date();

    function setupListeners(config) {
        $(".uk-card").click("on", function () {
            // UI
            $(".resultTable").html("")
            $(".uk-card").css("background-color", "#f8f8f8")
            $(".uk-card").css("font-weight", "400")
            $(this).css("background-color", "#f3ebb1")
            $(this).css("font-weight", "600")

            // Prepare Data
            let name = $(this).attr("role")
            let index = config.findIndex(x => x.id === name);
            console.log("config",config)
            console.log("index",index)

            // Header Details
            console.log("config.init",config[index])
            let details = "<div class='firstRow'>Received: $" + config[index]["received"] + "</div>"
            details += "<div class='firstRow'>Visits: " + config[index]["visits"] + "</div>"
           
            // RENDER
            $(".pre_resultTable").html(details)

            // get actual records for visit
            getRecord(name)

           /* config[name].forEach(function (element) {
                let row = "<div class='cell'>" + element.date + "</div>"
                let d = new Date(element.date)
                let day = weekday[d.getDay()]
                row += "<div class='cell'>" + day
                if (element.note !== undefined) {
                    row += "<li>" + element.note + "</li>"
                }
                row += "</div>"
                row += "<div class='cell'>" + "$" + config.Visit + "</div>"
                
               
                if (element.count !== 0) {
                    $(".resultTable").append(row)
                }
                
            })*/
       

            // fade in results
            appConfig.useTransitionEffect ? fade( $( ".cell:first" ),appConfig.timer) : $(".cell").show()

        })
    }

function renderRow(data){
    console.log(data)
    let row = ""
    data.forEach(function(element){
        row += "<div class='cell'>" + element.entry + "</div>"
        let d = new Date(element.entry)
        let day = weekday[d.getDay()]
        row += "<div class='cell'>" + day
        if (element.note !== undefined) {
            row += "<li>" + element.note + "</li>"
        }
        row += "</div>"
        row += "<div class='cell'>" + "$20" + "</div>"
    })
    $(".resultTable").append(row)
    
}

function dynamo(local){
    

        let config = JSON.parse(local)
        config.forEach(function (element) {
            let newCard = new card(cardHTML.replace("~item~", element.range), element.range)
            newCard.html = newCard.html.replace("~name~",element.id)
            $(".startPoint").append(newCard.html)
        })

        setupListeners(config) // for cards

        // hide archive
        $(".archive").hide()

        // btn show archive
        $("#showArchive").on("click",function(){
            $(".archive").show()
            $(this).hide()
        })

    } 

    function getRecord(id){
        let localStore = localStorage.getItem("yuki-" + id)
        if (localStore == undefined){
        $.get("./getDetails",{name:id},function(res){
            local = res
            console.log(res)
            localStorage.setItem("yuki-" + id,JSON.stringify(local))
            renderRow(local)
        })
    } else {
            renderRow(JSON.parse(localStore))
    }
    }
  

    function initialDBSetup(dbVersion){
        let local = localStorage.getItem("yuki-config")

        // new user
        if (local == undefined){
            $.get("./getDetails",{name:"getIndex"},function(res){
                local = res
                localStorage.setItem("yuki-config",JSON.stringify(local))
            })
        } 

        // check to see if you have the latest data, if not retrieve
        if (local !== undefined){
            let localData = JSON.parse(local)
            let latest = localData.find(x => x.id === dbVersion)
            if (latest == undefined){
                $.get("./getDetails",{name:"getIndex"},function(res){
                    local = res
                    localStorage.setItem("yuki-config",JSON.stringify(local))
                    dynamo(local)
                })
            } else {
                dynamo(local)
            }
        }
    }

   // begin
        $.get("./json/latestDynamo.json", function (res) {
           let dbVersion = res.version
           initialDBSetup(dbVersion)
        })
    