$(document).ready(function () {

    //Set time
    const currentDay = $("header #currentDay");

    // click caller
    var calClick = {};
    var refreshCheck = moment();

    // Create table 
    function createScheduler(today, calClick) {

        let rowTime = moment(today).hour(9);
        const calendar = $("div.container");
        calendar.empty();

        // Create sufficent tables
        for (let i = 1; i < 10; i++) {

            const row = $("<div>").addClass("row");

            // Color change based on time
            let timeColor = "";
            if (today.isBefore(rowTime, "hour")) {
                timeColor = "future"
            } else if (today.isAfter(rowTime, "hour")) {
                timeColor = "past"
            } else {
                timeColor = "present"
            };

            calendar.append(row);

            row.append($("<div>").addClass("col-2 hour").text(rowTime.format("h A")));

            let timeBlock = rowTime.format("hA");
            row.append($("<textarea>").addClass(`col-8 ${timeColor}`).text(calClick[timeBlock]));

            row.append($("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").attr("aria-label", "Save").attr("id", rowTime.format("hA")));


            rowTime.add(1, "hour");


            refreshCheck = moment();
        };
    };


    // Launch function
    function launchScheduler() {
        const today = moment();
        currentDay.text(today.format('LL'));
        createScheduler(today, calClick);
    };

    // Call saved content
    function loadSave() {
        const storedCal = JSON.parse(localStorage.getItem("calClick"));
        if (storedCal) {
            calClick = storedCal;
        };
    };

    // On load preform:
    loadSave();
    launchScheduler();
    changeColor();


    // Refesh checker
    function changeColor() {
        const checkRealTime = setInterval(function () {
            if (moment().isAfter(refreshCheck, "minute")) {
                launchScheduler();
            }
        }, 50000);
    };


    // Save to local storage
    function saveLocal() {
        localStorage.setItem("calClick", JSON.stringify(calClick));
    };


    // Save functionality
    $(document).on("click", "button.saveBtn", function (event) {
        let calDesc = event.currentTarget.parentElement.children[1].value;
        calClick[event.currentTarget.id] = calDesc;
        saveLocal();
    });

});