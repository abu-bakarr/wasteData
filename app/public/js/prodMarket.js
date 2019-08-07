// INITALIZING FARMERS DATA TABLE / COLLECTION REFERENCE
var connectedRef = firebase.database().ref(".info/connected"); // will holds the offline data
//var prodMarketRef = firebase.database().ref('productMarketData');

var prodMarketRef = firebase.database().ref('wasteData');

// setting the database app persistence for offline cache storage
// FirebaseDatabase.service.setPersistenceEnabled( true );

// var ref:DatabaseReference = FirebaseDatabase.service.getReference("scores");
// ref.keepSynced(true);

// //This will work
// root.child("event_list").keepSynced(true);
// root.child("user_events").child(uid).keepSynced(true);

var offlineData = [];

// this event listener is listening for a form submit
document.getElementById('productMarketForm').addEventListener('submit', submitMarketForm);

// submitFarmersForm function
function submitMarketForm(e) {

    //preventing the form from submit automatically
    e.preventDefault();

    // getting the values
    var senderName = getInptValue('senderName');
    var community = getInptValue('community');
    var ward = getInptValue('ward');
    var constituency = getInptValue('constituency');
    var westType = getInptValue('westType');
    var mktDate = getInptValue('mktDate');


    connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
            console.log("connected");
            //calling the send and save data
            saveMarketData(senderName, community, ward, constituency, westType, mktDate);

        } else {
            console.log("not connected");
        }
    });

    // connectedRef.on("value", function(snap) {
    //     if (snap.val() === true) {

    //         console.log("connected");
    //         //calling the send and save data
    //         saveMarketData(senderName,community,ward,constituency,westType,prodMktDate,
    //             prodName, prodMktWHS_Unit, prodMktWHS_Weight, prodMktWHS_Price, prodMktRET_Unit, prodMktRET_Weight, prodMktRET_Price);

    //         offlineData.reset(); // reseting the array
    //     } else {
    //         console.log("not connected");

    //         offlineData += saveMarketData(senderName,community,ward,constituency,westType,prodMktDate,
    //             prodName, prodMktWHS_Unit, prodMktWHS_Weight, prodMktWHS_Price, prodMktRET_Unit, prodMktRET_Weight, prodMktRET_Price);
    //     }
    // });

    // making a new market post  request to the server 
    $('#btn-new-mktData').click(e => {
        e.preventDefault();

        // // getting the values
        // var senderName = getInptValue('mktLocality');
        // var community = getInptValue('mktChiefdom');
        // var ward = getInptValue('mktDistrict');
        // var constituency = getInptValue('mktRegion');
        // var westType = getInptValue('mktEnumerator');
        // var prodName = getInptValue('mktProductName');
        // var prodMktWHS_Unit = getInptValue('WHS_Unit');
        // var prodMktWHS_Weight = parseInt(getInptValue('WHS_Weight'));
        // var prodMktWHS_Price = parseInt(getInptValue('WHS_Price'));
        // var prodMktRET_Unit = getInptValue('RET_Unit');
        // var prodMktRET_Weight = parseInt(getInptValue('RET_Weight'));
        // var prodMktRET_Price = parseInt(getInptValue('RET_Price'));

        // ajax request to make a new product
        // $.ajax({
        //     type: 'POST',
        //     url: '/inputMarketData',
        //     data: {
        //         senderName: senderName,
        //         community: community,
        //         ward: ward,
        //         constituency: constituency,
        //         westType: westType,
        //         mktDate: mktDate
        //     },
        //     success: function(response) {

        //     }
        // });
    });


    // show submitAlert
    document.querySelector('.submitAlert').style.display = 'block';

    // hide submitAlert after 3 seconds
    setTimeout(function() {
        document.querySelector('.submitAlert').style.display = 'none';
    }, 3000);

    // clear form
    document.getElementById('productMarketForm').reset();
}


// function to get form inputs
function getInptValue(id) {
    return document.getElementById(id).value;
}

// SEND AND SAVE MESSAGE TO FIREBASE FUNCTION
function saveMarketData(senderName, community, ward, constituency, westType, mktDate) {
    var newProdMarketRef = prodMarketRef.push();

    newProdMarketRef.set({
        senderName: senderName,
        community: community,
        ward: ward,
        constituency: constituency,
        westType: westType,
        mktDate: mktDate

    });
}