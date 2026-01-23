// File: JubileeImportXml.js
// Date: 2026-01-23
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class creating a jubilee image

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Instance of ImportGuestbookXml
var g_import_guestbook_xml = null;

// Instance of ImportGuestbookXml
var g_import_gallery_xml = null;

// Instance of ImportAudienceXml
var g_import_audience_xml = null;



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class ImportGalleryXml ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class ImportGalleryXml
{
    // Constructor
    constructor(i_jubilee_xml, i_import_xml_filename)
    {
        // Member variables
        // =================

        // Instance of the class JubileeXml
        this.m_jubilee_xml = i_jubilee_xml;

        // Filename of the XML file with photos to import
        this.m_import_xml_filename = i_import_xml_filename;

        // Output JubileeDataList with an array of JubileeData objects
        this.m_jubilee_data_list = new JubileeDataList;

    } // constructor

    // Return the instance of the class JubileeXml
    getJubileeXml()
    {
        return this.m_jubilee_xml;

    } // getJubileeXml

    // Return the filename of the XML file with photos to import
    getImportXmlFilename()
    {
        return this.m_import_xml_filename;

    } // getImportXmlFilename

    // Return the output JubileeDataList with an array of JubileeData objects
    getJubileeDataList()
    {
        return this.m_jubilee_data_list;

    } // getJubileeDataList

} // ImportGalleryXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class ImportGalleryXml /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class ImportAudienceXml ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class ImportAudienceXml
{
    // Constructor
    constructor(i_jubilee_xml, i_import_xml_filename)
    {
        // Member variables
        // =================

        // Instance of the class JubileeXml
        this.m_jubilee_xml = i_jubilee_xml;

        // Filename of the XML file with photos to import
        this.m_import_xml_filename = i_import_xml_filename;

        // Output JubileeDataList with an array of JubileeData objects
        this.m_jubilee_data_list = new JubileeDataList;

    } // constructor

    // Return the instance of the class JubileeXml
    getJubileeXml()
    {
        return this.m_jubilee_xml;

    } // getJubileeXml

    // Return the filename of the XML file with photos to import
    getImportXmlFilename()
    {
        return this.m_import_xml_filename;

    } // getImportXmlFilename

    // Return the output JubileeDataList with an array of JubileeData objects
    getJubileeDataList()
    {
        return this.m_jubilee_data_list;

    } // getJubileeDataList

} // ImportAudienceXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class ImportAudienceXml /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class ImportGuestbookXml //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class ImportGuestbookXml   
{
    // Constructor
    constructor(i_jubilee_xml, i_import_xml_filename, i_callback_reload_xml_uploaded_object)
    {
        // Member variables
        // =================

        // Instance of the class JubileeXml
        this.m_jubilee_xml = i_jubilee_xml;

        // Filename of the XML file with photos to import
        this.m_import_xml_filename = i_import_xml_filename;

        // Output JubileeDataList with an array of JubileeData objects
        this.m_jubilee_data_list = new JubileeDataList;

        // XML object JazzGuestsXml with photos 
        this.m_guests_uploaded_xml = null;

        // Callback function to reload XML uploaded object
        this.m_callback_reload_xml_uploaded_object = i_callback_reload_xml_uploaded_object;

        this.loadImportXml();

    } // constructor

    // Return the instance of the class JubileeXml
    getJubileeXml()
    {
        return this.m_jubilee_xml;

    } // getJubileeXml

    // Return the filename of the XML file with photos to import
    getImportXmlFilename()
    {
        return this.m_import_xml_filename;

    } // getImportXmlFilename

    // Return the output JubileeDataList with an array of JubileeData objects
    getJubileeDataList()
    {
        return this.m_jubilee_data_list;

    } // getJubileeDataList

    loadImportXml()
    {
        console.log("ImportGuestbookXml loadImportXml Enter ");

        var n_level_xml = 2;

        var update_xml = true;

        this.m_guests_uploaded_xml = new JazzGuestsXml(this.m_callback_reload_xml_uploaded_object, n_level_xml, update_xml);

    }   // loadImportXml


} // ImportGuestbookXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class ImportGuestbookXml ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////