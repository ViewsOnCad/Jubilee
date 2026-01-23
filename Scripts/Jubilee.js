// File: Jubilee.js
// Date: 2026-04-23
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the application Jubilee.htm

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Instance of TODO
var g_jubilee_TODO = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialization application Jubilee.htm
// 1. 
function initJubilee()
{
    console.log("initJubilee Enter ");

    g_jubilee_xml = new JubileeXml(afterLoadOfJubileeXml);


} // initJubilee

// Callback after loading Jubilee.xml
function afterLoadOfJubileeXml()
{
    console.log("afterLoadOfJubileeXml Enter ");

    testJubileeXml();


    g_jubilee_image_data = new JubileeImageData('id_div_image_container');

    // Temporary !!!!! JubileeImage.setImages();

} // afterLoadOfJubileeXml

function testJubileeXml()
{
    var n_photos = g_jubilee_xml.getNumberOfJubileePhotos();

    var photo_url = g_jubilee_xml.getPhotoUrl(1);

    var small_photo_url = g_jubilee_xml.getSmallPhotoUrl(2);

     var photo_text = g_jubilee_xml.getPhotoText(1);

     var photo_event = g_jubilee_xml.getPhotoEvent(2);

     var photo_year = g_jubilee_xml.getPhotoYear(2);
     var photo_month = g_jubilee_xml.getPhotoMonth(2);
     var photo_day = g_jubilee_xml.getPhotoDay(2);

    console.log("testJubileeXml n_photos=        " + n_photos);
    console.log("testJubileeXml photo_url=       " + photo_url);
    console.log("testJubileeXml small_photo_url= " + small_photo_url);
    console.log("testJubileeXml photo_text=      " + photo_text);
    console.log("testJubileeXml photo_event=     " + photo_event);
    console.log("testJubileeXml photo_year=      "  + photo_year);
    console.log("testJubileeXml photo_month=     " + photo_month);
    console.log("testJubileeXml photo_day=       " + photo_day);

    var photo_add_url = g_jubilee_xml.getPhotoUrl(2);

    var small_photo_add_url = g_jubilee_xml.getSmallPhotoUrl(1);

    var jubilee_data = new JubileeData(photo_add_url);

    jubilee_data.setUrlSmall(small_photo_add_url);

    jubilee_data.setText("Text added ");

    jubilee_data.setEvent("Event added");

    jubilee_data.setYear("2026");

    jubilee_data.setMonth("1");

    jubilee_data.setDay(22); // Note not string

    var jubilee_data_list = new JubileeDataList();

    jubilee_data_list.appendJubileeData(jubilee_data)

    var n_jubilee_objects = jubilee_data_list.getNumberOfJubileeObjects();

    console.log("testJubileeXml n_jubilee_objects=  " + n_jubilee_objects.toString());

    jubilee_data.setUrl("Ghhh/jjjjjj/h.jpg");

    jubilee_data_list.appendJubileeData(jubilee_data)

    var n_jubilee_objects = jubilee_data_list.getNumberOfJubileeObjects();

    console.log("testJubileeXml n_jubilee_objects=  " + n_jubilee_objects.toString());

} // testJubileeXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Import Functions //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function importJubileePhotosStart()
{
    console.log("importJubileePhotosStart Enter "); 

    var import_xml_filename = 'NotUsed';

    g_import_guestbook_xml = new ImportGuestbookXml(g_jubilee_xml, import_xml_filename, afterLoadOfGuestbookXml);


} // importJubileePhotosStart   

function afterLoadOfGuestbookXml( )
{
    console.log("afterLoadOfGuestbookXml Enter ");

} // afterLoadOfGuestbookXml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Import Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start GUI Event Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the information icon
function clickJubileeInfo()
{
    var file_name = 'Info/InfoJubilee.htm';

     importJubileePhotosStart()

    //Temporarwly !!!!!!!!!!!!!!!!!!! window.open(file_name, '_blank');

} // clickJubileeInfo

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End GUI Event Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

