
// DOM Ready =============================================================
$(document).ready(function () {
    // initially populate the list
    var rd = populateList();

    // change the values button
    $('#btnRandomData').on('click', populateList);

    // change the submit button
    $('#btnSubmit').on('click', submitRoutine);
  });

const items = [123456, 123654, 321456, 321654, 654123,
654321, 543216, 354126, 621453, 623451];
const stores = [
    {
        number: 98053,
        employees: [1, 2, 3, 4]
    },
    {
        number: 98007,
        employees: [5, 6, 7, 8]
    },
    {
        number: 98077,
        employees: [9, 10, 11, 12]
    },
    {
        number: 98055,
        employees: [13, 14, 15, 16]
    },
    {
        number: 98011,
        employees: [17, 18, 19, 20]
    },
    {
        number: 98046,
        employees: [21, 22, 23, 24]
    }
];

// Fill table with data
function populateList() {
    rd = getRandomData();
    $('#itemNumber').text(rd.itemNumber);
    $('#timePurch').text(rd.timePurch);
    $('#storeNumber').text(rd.storeNumber);
    $('#pricePaid').text(rd.pricePaid);
    $('#salesPersonID').text(rd.salesPersonID);
    return rd;
};

function submitRoutine(data) {
    var data = rd;
    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: data,
        url: '/',
        dataType: 'JSON'
    }).done(function (response) {   

        // Check for successful (blank) response
        if (response.msg === '') {
            console.log('sent');
        }
        else {
            // If something goes wrong, alert the error msg that our service returned
            alert('Error: ' + response.msg);
        }
    });
};

const getRandomData = () =>{
    var store = stores[Math.floor(Math.random()*stores.length)];

    var storeNumber = store.number;
    var salesPersonID = store.employees[Math.floor(Math.random()*store.employees.length)];
    var itemNumber = items[Math.floor(Math.random()*items.length)];
    var timePurch = getTimePurchased();
    var pricePaid = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    randomPayload = {
        storeNumber: storeNumber,
        salesPersonID: salesPersonID,
        itemNumber: itemNumber,
        timePurch: timePurch,
        pricePaid: pricePaid
    };
    return randomPayload;
};

const getTimePurchased = () =>{
    var currentDate = new Date();
    var currentDateString = currentDate.toLocaleDateString(undefined, {  
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    })

    var currentTimeString = currentDate.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    return currentDateString + ":" + currentTimeString;//dateString;
};