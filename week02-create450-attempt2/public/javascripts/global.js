var orderListData = [];

// DOM Ready =============================================================
$(document).ready(function () {
    
    // initially populate the order table
    populateOrderTable();

    // make a link in the table that is the salesman ID and when clicked
    // displays info for the whole order in the orderDetails area.
    $('#orderListTable table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // change the submit button
    $('#btnSubmit').on('click', submitRoutine);

    // change the bulk button
    $('#btnBulk').on('click', bulkRoutine);
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

function bulkRoutine(event){
    event.preventDefault();

    //var confirmation = confirm('You sure you want to add a crap-load of orders (450!)?');

    

    // change to 450
    var ordersToAdd = 2;

    var i;
    for(i = 0;i < ordersToAdd; i++){
        rd = getRandomData();
        var newOrder = {
            storeNumber: rd.storeNumber,
            salesPersonID: rd.salesPersonID,
            itemNumber: rd.itemNumber,
            timePurch: rd.timePurch,
            pricePaid: rd.pricePaid
        }
        const body = JSON.stringify({newOrder});

        //AJAX to post object to the add-order service
        $.ajax({
            type: 'POST',
            data: newOrder,
            url: '/users/add-order',
            dataType: 'JSON'
        }).done(function(response){
            if(response.msg === ''){
                populateOrderTable();
            }
            else{
                alert('Error: ' + response.msg);
            }
        });
    };
};

// Fill Order Table Columns with data
function populateOrderTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/users/order-list', function (data) {

        // Stick our user data array into a userlist variable in the global object
        orderListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            // CHANGE *** Made changes to the list so that it shows values
            // from HW2 *******************************************
            tableContent += '<tr>';
            // Modified so that rel points to the unique db ID in order to
            // show correct sale when asked to display.
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this._id + '">' + this.salesPersonID + '</a></td>';
            tableContent += '<td>' + this.itemNumber + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#orderListTable table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisSalesPersonID = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = orderListData.map(function (arrayItem) {
        // Modified so that the uniqe sales ID is selected rather than the salesPersonID which can repeat itself.
        return arrayItem._id;
    // Had a weird issue with the array being off by 1 (-1), after deleting the first entry, it fixed itself... Don't know how.
    }).indexOf(thisSalesPersonID);

    // Get our User Object
    var thisOrderObject = orderListData[arrayPosition];

    //Populate Info Box
    // CHANGE *** Modified the existing code so it returns the correct values from HW2***************************
    $('#itemNumber').text(thisOrderObject.itemNumber);
    $('#timePurch').text(thisOrderObject.timePurch);
    $('#storeNumber').text(thisOrderObject.storeNumber);
    $('#pricePaid').text(thisOrderObject.pricePaid);
    $('#salesPersonID').text(thisOrderObject.salesPersonID);

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

