// File: JubileeXml.js
// Date: 2026-01-23
// Author: Gunnar Lidén

// File content
// =============
//
// Loading function
// ----------------
// The class JubileeXml loads the XML file Jubilee.xml. Loading means that an 
// XML object will be created that holds all the data in the file Jubilee.xml.
// This "XML file object" is stored in the class member variable m_file_xml. 
//
// Get and set functions
// ---------------------
// The class JubileeXml has member functions for get and set of values, like
// for instance get and set the text of a jubilee photo. Input parameter for these 
// functions are always the photo number. For the text example: 
// getPhotoUrl(photo_number) and setPhotoUrl(photo_number, i_text)
//
// Append function
// ---------------
// The class JubileeXml also has functions for appending (adding) a jubilee photo. 





// Before displaying data on the web page, the file Jubilee.xml must be loaded, which means
// that the file must be converted to an XML "file-object" that holds all the data of the file.
// The class JubileeXml has functions that creates and stores this XML "file-object".  
// Data from the XML file can only be displayed after the load of of the XML file. Before
// loading there is no data available. Waiting for something is with JavaScript implemented
// with a callback function. The function in class JubileeXml will call this function when
// the loading has been done.
// Input for the creation of an object of the class JubileeXml is the name of the callback
// function.   
// Please observe that the name and the path for the XML file is hardcoded in JubileeXml
// For developing and testing there are test XML files. These file name are defined in the
// file Jubilee.xml. The directory name for the test files is hardcoded in class JubileeXml 
// Class corresponding to the XML file Jubilee.xml
//

///////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class Jubilee  ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// Class corresponding to the XML element <JubileePhoto> in the file Jubilee.xml
class JubileeXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    constructor(i_callback_function_name) 
    {
        // Member variables
        // ================

        // Path and name of XML file on the server
        this.m_xml_file_name_server = 'Xml/Jubilee.xml';

        // Path to the XML test data directory in the computer 
        this.m_xml_dir_name_local = 'Xml/TestData/';

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // The jubilee photos xml object
        this.m_file_xml = null;

        // Object holding the tags
        this.m_tags = new JubileeTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML object and calls the function m_callback_function_name
        this.loadXmlFile(this, this.getDirNameXmlTestData(), this.m_callback_function_name);

    } // constructor

    // Sets the XML object
    setXmlObject(i_jubilee_photos_xml)
    {
        this.m_file_xml = i_jubilee_photos_xml;

    } // setXmlObject

    // Returns the XML object
    getXmlObject()
    {
        return this.m_file_xml;

    } // getXmlObject

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Get Jubilee Photo Data ////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the photo URL for a given photonumber
    getPhotoUrl(i_photo_number)
    {
        return this.getNodeValue(this.m_tags.getPhotoUrl(), i_photo_number);
        
    } // getPhotoUrl

    // Returns the small photo URL for a given photo number
    getSmallPhotoUrl(i_photo_number)
    {
        return this.getNodeValue(this.m_tags.getSmallPhotoUrl(), i_photo_number);
        
    } // getSmallPhotoUrl

    // Returns the photo text for a given photo number
    getPhotoText(i_photo_number)
    {
        return this.getNodeValue(this.m_tags.getPhotoText(), i_photo_number);
        
    } // getPhotoText

    // Returns the photo event name for a given photo number
    getPhotoEvent(i_photo_number)
    {
        return this.getNodeValue(this.m_tags.getPhotoEvent(), i_photo_number);
        
    } // getPhotoEvent

    // Returns the photo year for a given photo number
    getPhotoYear(i_photo_number)
    {
        return this.getNodeValue(this.m_tags.getPhotoYear(), i_photo_number);
        
    } // getPhotoYear

    // Returns the photo month for a given photo number
    getPhotoMonth(i_photo_number)
    {
        return this.getNodeValue(this.m_tags.getPhotoMonth(), i_photo_number);
        
    } // getPhotoMonth

    // Returns the photo day for a given photo number
    getPhotoDay(i_photo_number)
    {
        return this.getNodeValue(this.m_tags.getPhotoDay(), i_photo_number);
        
    } // getPhotoDay

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Get Jubilee Photo Data //////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Set Jubilee Photo Data ////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the photo URL for a given photonumber
    setPhotoUrl(i_photo_number, i_node_value)
    {
        return this.setJubileePhotoNodeValue(this.m_tags.getPhotoUrl(), i_photo_number, i_node_value);
        
    } // setPhotoUrl

    // Sets the small photo URL for a given photo number
    setSmallPhotoUrl(i_photo_number, i_node_value)
    {
        return this.setJubileePhotoNodeValue(this.m_tags.getSmallPhotoUrl(), i_photo_number, i_node_value);
        
    } // setSmallPhotoUrl

    // Sets the photo text for a given photo number
    setPhotoText(i_photo_number, i_node_value)
    {
        return this.setJubileePhotoNodeValue(this.m_tags.getPhotoText(), i_photo_number, i_node_value);
        
    } // setPhotoText

    // Sets the photo event name for a given photo number
    setPhotoEvent(i_photo_number, i_node_value)
    {
        return this.setJubileePhotoNodeValue(this.m_tags.getPhotoEvent(), i_photo_number, i_node_value);
        
    } // setPhotoEvent

    // Sets the photo year for a given photo number
    setPhotoYear(i_photo_number, i_node_value)
    {
        return this.setJubileePhotoNodeValue(this.m_tags.getPhotoYear(), i_photo_number, i_node_value);
        
    } // setPhotoYear

    // Sets the photo month for a given photo number
    setPhotoMonth(i_photo_number, i_node_value)
    {
        return this.setJubileePhotoNodeValue(this.m_tags.getPhotoMonth(), i_photo_number, i_node_value);
        
    } // setPhotoMonth

    // Sets the photo day for a given photo number
    setPhotoDay(i_photo_number, i_node_value)
    {
        return this.setJubileePhotoNodeValue(this.m_tags.getPhotoDay(), i_photo_number, i_node_value);
        
    } // setPhotoDay
    
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Set Jubilee Photo Data //////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number of Jubilee Photos  /////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the number of Jubilee Photos
    getNumberOfJubileePhotos()
    {
        var ret_n_photos = -12345;

        if (!this.checkXmlObject()){ return ret_n_photos; }

        var photo_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJubileePhoto());

        ret_n_photos = photo_nodes.length;

        return ret_n_photos;

    } // getNumberOfJubileePhotos 

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number of Jubilee Photos  ///////////////////
    ///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Jubilee Photo Node Value  /////////////////
	///////////////////////////////////////////////////////////////////////////

	// Returns the node value for a given photo number and a tag name
	getJubileePhotoNodeValue(i_jubilee_photo_tag, i_photo_number)
	{
		var ret_data = '';
		
		if (!this.checkXmlObject()){ return ret_data; }

		var n_photos = this.getNumberOfJubileePhotos();
		
		if (i_photo_number < 1 || i_photo_number > n_photos)
		{
			alert("JubileeXml.getJubileePhotoNodeValue Jubilee photo number is not between 1 and " + n_photos.toString());
			
			return ret_data;		
		}
			
		var photo_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJubileePhoto());

		var photo_node = photo_nodes[i_photo_number-1];
		
		var xml_node_value = this.getNodeValueTagName(photo_node, i_jubilee_photo_tag);
		
		ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
		
		return ret_data;
		
	} // getJubileePhotoNodeValue


	// Sets the node value for a given photo number and a tag name
	setJubileePhotoNodeValue(i_jubilee_photo_tag, i_photo_number, i_jazz_photo_node_value)
	{	
		if (!this.checkXmlObject()){ return; }

		var n_photos = this.getNumberOfJubileePhotos();
		
		if (i_photo_number < 1 || i_photo_number > n_photos)
		{
			alert("JubileeXml.setJubileePhotoNodeValue Jubilee photo number is not between 1 and " + n_photos.toString());
			
			return;		
		}
			
		var photo_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJubileePhoto());

		var photo_node = photo_nodes[i_photo_number-1];
		
		var node_value = this.setFlagNodeValueIsNotSetForEmptyString(i_jazz_photo_node_value);
		
		this.setNodeValue(photo_node, i_jubilee_photo_tag, node_value);
		
	} // setJubileePhotoNodeValue

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Jubilee Photo Node Value  ///////////////////
    ///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Append Jubilee Photo Node  ////////////////
    ///////////////////////////////////////////////////////////////////////////
    
	// Appends a jubilee photo node to the XML object
	appendJubileePhotoNode(i_n_references)
	{
	   var new_jubilee_photo = this.m_file_xml.createElement(this.m_tags.getJubileePhoto());
	   
	   var photo_url_node = this.m_file_xml.createElement(this.m_tags.getPhotoUrl());
	   var photo_url_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   photo_url_node.appendChild(photo_url_text);
	   new_jubilee_photo.appendChild(photo_url_node);
	   
	   var small_photo_url_node = this.m_file_xml.createElement(this.m_tags.getSmallPhotoUrl());
	   var small_photo_url_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   small_photo_url_node.appendChild(small_photo_url_text);
	   new_jubilee_photo.appendChild(small_photo_url_node);
	   
	   var photo_text_node = this.m_file_xml.createElement(this.m_tags.getPhotoText());
	   var photo_text_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   photo_text_node.appendChild(photo_text_text);
	   new_jubilee_photo.appendChild(photo_text_node);

	   var photo_event_node = this.m_file_xml.createElement(this.m_tags.getPhotoEvent());
	   var photo_event_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   photo_event_node.appendChild(photo_event_text);
	   new_jubilee_photo.appendChild(photo_event_node);
	   
	   var photo_year_node = this.m_file_xml.createElement(this.m_tags.getPhotoYear());
	   var photo_year_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   photo_year_node.appendChild(photo_year_text);
	   new_jubilee_photo.appendChild(photo_year_node);

	   var photo_month_node = this.m_file_xml.createElement(this.m_tags.getPhotoMonth());
	   var photo_month_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   photo_month_node.appendChild(photo_month_text);
	   new_jubilee_photo.appendChild(photo_month_node);
	   
	   var photo_day_node = this.m_file_xml.createElement(this.m_tags.getPhotoDay());
	   var photo_day_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   photo_day_node.appendChild(photo_day_text);
	   new_jubilee_photo.appendChild(photo_day_node);

	   this.m_file_xml.documentElement.appendChild(new_jubilee_photo);	
	   
	} // appendJubileePhotoNode
   
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Append Jubilee Photo Node  //////////////////
	///////////////////////////////////////////////////////////////////////////
    
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Delete Jubilee Photo Node  ////////////////
	///////////////////////////////////////////////////////////////////////////

	// Deletes the node defined by the photo number
	deleteJJubileePhotoNode(i_photo_number)
	{
		if (!this.checkXmlObject()){ return false; }

		var n_photos = this.getNumberOfJubileePhotos();
		
		if (i_photo_number < 1 || i_photo_number > n_photos)
		{
			alert("JubileeXml.deleteJJubileePhotoNode Jubilee Photo number is not between 1 and " + n_photos.toString());
			
			return false;		
		}

		var photo_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJubileePhoto());

		var photo_node = photo_nodes[i_photo_number-1];

		photo_node.parentNode.removeChild(photo_node);	

		return true;

	} // deleteJJubileePhotoNode
			
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Delete Jubilee Photo Node  //////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Node Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the node value for a given photo number and a tag name
    getNodeValue(i_jubilee_photo_tag, i_photo_number)
    {
        var ret_data = '';
        
        if (!this.checkXmlObject()){ return ret_data; }

        var n_photos = this.getNumberOfJubileePhotos();
        
        if (i_photo_number < 1 || i_photo_number > n_photos)
        {
            alert("JubileeXml.getNodeValue Jubilee Photo number is not between 1 and " + n_photos.toString());
            
            return ret_data;		
        }
            
        var photo_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJubileePhoto());
        
        var photo_node = photo_nodes[i_photo_number-1];
        
        var xml_node_value = this.getNodeValueTagName(photo_node, i_jubilee_photo_tag);
        
        ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
        
        return ret_data;
        
    } // getNodeValue    

    // Sets the node value for a given photo number and a tag name
    setJubileePhotoNodeValue(i_jubilee_photo_tag, i_photo_number, i_jazz_photo_node_value)
    {	
        if (!this.checkXmlObject()){ return; }

        var n_photos = this.getNumberOfJubileePhotos();
        
        if (i_photo_number < 1 || i_photo_number > n_photos)
        {
            alert("JubileeXml.setJubileePhotoNodeValue Jubilee Photo number is not between 1 and " + n_photos.toString());
            
            return;		
        }
            
        var photo_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJubileePhoto());

        var photo_node = photo_nodes[i_photo_number-1];
        
        var node_value = this.setFlagNodeValueIsNotSetForEmptyString(i_jazz_photo_node_value);
        
        this.setNodeValue(photo_node, i_jubilee_photo_tag, node_value);
        
    } // setJubileePhotoNodeValue

    ///////////////////////////////////////////////////////////////////////////
    /////// End Node Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////    

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadXmlFile(i_object_xml, i_path_dir_name_xml, i_callback_function_name)
    {
        var file_name_xml = i_path_dir_name_xml + 'Jubilee.xml';

        // Request server object for the XML file
        var jazz_xmlhttp = new XMLHttpRequest();
    
        // Event function: The server will return state and status 
        // from object functions open and send.
        jazz_xmlhttp.onreadystatechange = function() 
        {
            if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 200) 
            {
                var xml_object = jazz_xmlhttp.responseXML;

                i_object_xml.setXmlObject(xml_object);

                i_callback_function_name();    
            }
            else if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 404) 
            {
                alert("Error 404: File " + file_name_xml + " not found" );
            }	
        };
        
        // Open the file
        jazz_xmlhttp.open("GET", file_name_xml, true);
        
        jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
            
        jazz_xmlhttp.send();	

    } // jazzUtilLoadXml

    ///////////////////////////////////////////////////////////////////////////
    /////// End Load Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the path to the XML test data directory in the computer 
    getDirNameXmlTestData()
    {
        if (UtilServer.execApplicationOnServer())
        {
            return this.m_xml_file_name_server;
        }
        else
        {
            return this.m_xml_dir_name_local;
        }

    } // getDirNameXmlTestData

    // Returns the node value. Input is an XML node and the tag name
    getNodeValueTagName(i_node, i_xml_tag)
    {
        return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
        
    } // getNodeValueTagName

    // Sets a node value. Input is an XML node, the tag name and the node value
    // Copied from FlyerXml.js
    setNodeValue(i_node, i_xml_tag, i_node_value)
    {	
        i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue = i_node_value;
        
    } // setNodeValue

    // Returns empty string if i_node_value is equal to m_not_yet_set_node_value
    removeFlagNodeValueNotSet(i_node_value)
    {
        if (!this.nodeValueIsSet(i_node_value))
        {
            return "";
        }
        
        return i_node_value; 
        
    } // removeFlagNodeValueNotSet

    // Returns true if the node value is set
    nodeValueIsSet(i_node_value)
    {
        if (i_node_value == this.m_not_yet_set_node_value)
        {
            return false;
        }
        else
        {
            return true;
        }
        
    } // nodeValueIsSet

    // Return flag (string) this.m_not_yet_set_node_value if input string is empty
    // Copied from FlyerXml.js
    setFlagNodeValueIsNotSetForEmptyString(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // setFlagNodeValueIsNotSetForEmptyString    

    // Same as function above. Just a shorter name
    modNodeValue(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // modNodeValue


    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Check Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Check that the jubilee photos XML object is set
    checkXmlObject()
    {
        if (null == this.m_file_xml)
        {
            alert("JubileeXml.checkXmlObject Jubilee photos XML object m_file_xml is null");
            
            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkXmlObject

    ///////////////////////////////////////////////////////////////////////////
    /////// End Check Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // JubileeXml

///////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class Jubilee  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeTags  ////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Class defining the tags of the XML file Jubilee.xml
class JubileeTags 
{
    // Creates the instance of the class
    constructor() 
    {
        // Member variables
        // ================

        this.m_tag_jubilee_photo = "JubileePhoto";
        this.m_tag_photo_url = "PhotoUrl";
        this.m_tag_small_photo_url = "SmallPhotoUrl";
        this.m_tag_photo_text = "PhotoText";
        this.m_tag_photo_event = "PhotoEvent";
        this.m_tag_photo_year = "PhotoYear";
        this.m_tag_photo_month = "PhotoMonth";
        this.m_tag_photo_day = "PhotoDay";

    } // constructor

    // Get member variable functions
    // =============================

    getJubileePhoto(){return this.m_tag_jubilee_photo;} 
    getPhotoUrl(){return this.m_tag_photo_url;} 
    getSmallPhotoUrl(){return this.m_tag_small_photo_url;} 
    getPhotoText(){return this.m_tag_photo_text;} 
    getPhotoEvent(){return this.m_tag_photo_event;}
    getPhotoYear(){return this.m_tag_photo_year;} 
    getPhotoMonth(){return this.m_tag_photo_month;} 
    getPhotoDay(){return this.m_tag_photo_day;} 

} // JubileeTags

///////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeTags  //////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeData  ////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Class holding all data for a jubilee photo
class JubileeData 
{
    // Creates the instance of the class
    constructor(i_url_photo) 
    {
        // Member variables
        // ================

        // URL (server address) for the photo
        this.m_url = i_url_photo;

        // URL (server address) for the small photo
        this.m_url_small = "";      

        // Photo text
        this.m_text = "";

       // Photo event name
       this.m_event = "";   

       // Year
       this.m_year = "";      

       // Month
       this.m_month = "";

       // Day
       this.m_day = "";

    } // constructor

    // Get and set functions for the member variables
    // ==============================================

    // Returns the URL (server address) for the photo
    getUrl() { return this.m_url;} 

    // Sets the URL (server address) for the photo
    setUrl(i_url) { this.m_url = i_url;} 

    // Returns the URL (server address) for the small photo
    getUrlSmall() { return this.m_url_small;} 

    // Sets the URL (server address) for the small photo
    setUrlSmall(i_url_small) { this.m_url_small = i_url_small;}  
    
    // Returns the photo text
    getText() { return this.m_text;} 

    // Sets the photo text
    setText(i_text) { this.m_text = i_text;}

    // Returns the event name
    getEvent() { return this.m_event;} 

    // Sets the band name
    setEvent(i_event) { this.m_event = i_event;}

    // Returns the day
    getDay() { return this.m_day;} 

    // Sets the day
    setDay(i_day) { this.m_day = i_day;}

    // Returns the month
    getMonth() { return this.m_month;} 

    // Sets the month
    setMonth(i_month) { this.m_month = i_month;}

    // Returns the year
    getYear() { return this.m_year;} 

    // Sets the year
    setYear(i_year) { this.m_year = i_year;}

    // Check functions for the member variables
    // ========================================

} // JubileeData


///////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeData  //////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeDataList  ////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Class holding a list of JubileeData objects
class JubileeDataList
{
    // Creates the instance of the class
    constructor()
    {
        // Member variables
        // ================

        // Array of JubileeData objects)
        this.m_jubilee_data_array = [];

    } // constructor

    // Member functions
    // ================

    // Get the list
    getList()
    {
        return this.m_jubilee_data_array;
    
    } // getList
    
    // Appends a Jubilee object
    // Object will not be appended if already in the array
    appendJubileeData(i_jubilee_data)
    {
        if (this.alreadyInJubileeDataArray(i_jubilee_data))
        {
            return;
        }

        this.m_jubilee_data_array[this.getNumberOfJubileeObjects()] = i_jubilee_data;

    } // appendJubileeData
    
    // Returns true if the image already is in the array 
    alreadyInJubileeDataArray(i_jubilee_data)
    {
        var ret_exists = false;

        var input_photo_url = i_jubilee_data.getUrl();

        for (var index_photo=0; index_photo < this.m_jubilee_data_array.length; index_photo++)
        {
            var current_photo_url = this.m_jubilee_data_array[index_photo].getUrl();

            if (current_photo_url == input_photo_url)
            {
                ret_exists = true;

                break;
            }

        } // index_photo
        
        return ret_exists;

    } // alreadyInJubileeDataArray

    // Returns the number of JubileeData objects
    getNumberOfJubileeObjects()
    {
        return this.m_jubilee_data_array.length;

    } // getNumberOfJubileeObjects

    // Returns the photo data object for a given photo number
    getPhotoData(i_photo_number)
    {
        if (i_photo_number <= 0 || i_photo_number > this.m_jubilee_data_array.length)
        {
            alert("JubileeDataList.getPhotoData Photo number " + i_photo_number.toString() + ' is not between 1 and ' + this.m_jubilee_data_array.length.toString());
            
            return null;
        }

        return this.m_jubilee_data_array[i_photo_number - 1];

    } // getPhotoData

    // Returns true there are photos to display
    photosDefined()
    {
        if (this.m_jubilee_data_array.length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // photosDefined    

    // Initialize the array ofJubileeData objects
    // (clear/empty the array)
    init()
    {
        this.m_jubilee_data_array = [];

    } // init    

} // JubileeDataList


///////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeDataList  //////////////////////////
///////////////////////////////////////////////////////////////////////////////
