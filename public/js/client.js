
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
    var cardHTML = "<div>"
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
        
    function setupListeners(config) {
        $(".uk-card").click("on", function () {
            // UI
            $(".resultTable").html("")
            $(".uk-card").css("background-color", "#f8f8f8")
            $(".uk-card").css("font-weight", "400")
            $(this).css("background-color", "#f3ebb1")
            $(this).css("font-weight", "600")

            // DATA
            let name = $(this).attr("role")
            let index = config.init.findIndex(x => x.name === name);
            let details = "<div class='firstRow'>Recieved: $" + config.init[index].Paid + "</div>"
            details += "<div class='firstRow'>Visits: " + config[name].length + "</div>"
            details += "<div class='firstRow'>Visits Paid For: $" + config[name].length * config.Visit + "</div>"

            // RENDER
            $(".resultTable").append(details)
            config[name].forEach(function (element) {
                let row = "<div class='cell'>" + element.date + "</div>"
                row += "<div class='cell'>" + element.day + "</div>"
                row += "<div class='cell'>" + "$" + config.Visit + "</div>"
                $(".resultTable").append(row)
            })

            // fade in results
            appConfig.useTransitionEffect ? fade( $( ".cell:first" ),appConfig.timer) : $(".cell").show()

        })
    }

    // main routine
    $.get("./json/config.json", function (res) {

        let config = res

        config.init.forEach(function (element) {
            let newCard = new card(cardHTML.replace("~item~", element.id), element.id)
            newCard.html = newCard.html.replace("~name~", element.name)
            $(".startPoint").append(newCard.html)
        })

        setupListeners(config) // for cards

    }) // get