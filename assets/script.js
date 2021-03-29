$(document).ready(function () {

    //Set time
    const currentDateEl = $("header #currentDay");


    var calClick = {};


    var hourRendered = moment();


    function renderCalendar(today, calClick) {

        let rowTime = moment(today).hour(9);
        const calendar = $("div.container");
        calendar.empty();


        for (let i = 1; i < 10; i++) {

            const row = $("<div>").addClass("row");


            let classOfHour = "";
            if (today.isBefore(rowTime, "hour")) {
                classOfHour = "future"
            } else if (today.isAfter(rowTime, "hour")) {
                classOfHour = "past"
            } else {
                classOfHour = "present"
            };

            calendar.append(row);

            row.append($("<div>").addClass("col-2 hour").text(rowTime.format("h A")));

            let timeBlock = rowTime.format("hA");
            row.append($("<textarea>").addClass(`col-8 ${classOfHour}`).text(calClick[timeBlock]));

            row.append($("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").attr("aria-label", "Save").attr("id", rowTime.format("hA")));


            rowTime.add(1, "hour");


            hourRendered = moment();
        };
    };



    function initCalendar() {
        const today = moment();
        currentDateEl.text(today.format('LL'));
        renderCalendar(today, calClick);
    };


    function loadCal() {
        const storedCal = JSON.parse(localStorage.getItem("calClick"));
        if (storedCal) {
            calClick = storedCal;
        };
    };


    loadCal();
    initCalendar();
    hourTracker();



    function hourTracker() {
        const checkHourInterval = setInterval(function () {
            if (moment().isAfter(hourRendered, "minute")) {
                initCalendar();
            }
        }, 60000);
    };



    function storeCal() {
        localStorage.setItem("calClick", JSON.stringify(calClick));
    };



    $(document).on("click", "button.saveBtn", function (event) {
        let calDesc = event.currentTarget.parentElement.children[1].value;
        calClick[event.currentTarget.id] = calDesc;
        storeCal();
    });

});