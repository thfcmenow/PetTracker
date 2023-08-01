
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
        $(".uk-card").off()
        $(".uk-card").click("on", function () {
            // UI
            $(".resultTable").html("")
            $(".uk-card").css("background-color", "#f8f8f8")
            $(".uk-card").css("font-weight", "400")
            $(this).css("background-color", "#f3ebb1")
            $(this).css("font-weight", "600")

            // Prepare Data
            let name = $(this).attr("role")
            let index = config.init.findIndex(x => x.name === name);

            // Header Details
            console.log("config.init",config[name])
            let details = "<div class='firstRow'>Recieved: $" + config.init[index].Paid + "</div>"
            details += "<div class='firstRow'>Visits: " + config[name].length + "</div><div class='firstRow'>" + "Money Left: $" + (config.init[index].Paid - (config[name].length * config.Visit)) + "</div>"
            details += "<div class='firstRow'>Visits Paid For: $" + config[name].length * config.Visit + "</div>"

            // RENDER
            $(".pre_resultTable").html(details)

            var eventDates = []
            config[name].forEach(function(obj){
                eventDates.push(obj.date)
            })
            /*var eventDates = [
                '2023-08-01',
                '2023-08-05',
                '2023-08-10',
                // Add more dates as needed...
              ];
              */
             var sdate = moment(eventDates[0], "MM/DD/YYYY");
             console.log(sdate)
             $('#calendar').fullCalendar('destroy');
            $('#calendar').fullCalendar({
                defaultDate: sdate,
                defaultView: 'month',
                events: eventDates.map(function (date) {
                  return {
                    title: '$20',
                    start: date,
                    
                  };
                })
              }); 
              $('.fc-button-group').remove()
              $(".fc-right").remove()
              $(".fc-time").remove()
  

         /*   config[name].forEach(function (element,index) {

                

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
            }) */
       

            // fade in results
            // appConfig.useTransitionEffect ? fade( $( ".cell:first" ),appConfig.timer) : $(".cell").show()

        })
    }

    // main routine
    $.get("./json/config.json", function (res) {

        let config = res

        config.init.forEach(function (element) {
            let newCard = new card(cardHTML.replace("~item~", element.id), element.id)
            newCard.html = newCard.html.replace("~name~", element.name)
            if (element.type !== undefined) newCard.html = newCard.html.replace("~type~", element.type)
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

    }) // get