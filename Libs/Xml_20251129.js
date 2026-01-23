// File: JazzApplicationXml.js
// Date: 2023-10-14
// Author: Gunnar Lidén

// File content
// =============
//
// Class for the application XML file JazzApplication.xml
class JazzApplicationXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    // i_n_level_xml:            Directory levels to /www/XML/
    constructor(i_callback_function_name, i_n_level_xml) 
    {
        // Member variables
        // ================

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // Directory levels to /www/XML/
        this.m_n_level_xml = i_n_level_xml;

        // Path and name of XML file in the computer
        this.m_xml_file_name_local = 'XmlTestData/JazzApplicationTestData.xml';

        // The jazz application xml object
        this.m_object_xml = null;

        // Object holding the tags
        this.m_tags = new JazzApplicationTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML object for aapplication file and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getXmlApplicationFileName(), this.m_callback_function_name);

    } // constructor

    // Sets the XML object
    setXmlObject(i_object_xml)
    {
        this.m_object_xml = i_object_xml;

    } // setXmlObject

    // Returns the XML object
    getXmlObject()
    {
        return this.m_object_xml;

    } // getXmlObject    

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Member Data ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the member first name for a given member number
    getMemberName(i_member_number)
    {
        return this.getMemberNodeValue(this.m_tags.getMemberName(), i_member_number);
        
    } // getMemberName

    // TODO All other member data functions

    // Returns the member tasks
    getMemberTasks(i_member_number)
    {
        return this.getMemberNodeValue(this.m_tags.getMemberTasks(), i_member_number);
        
    } // getMemberTasks

    // Returns the member tasks short
    getMemberTasksShort(i_member_number)
    {
        return this.getMemberNodeValue(this.m_tags.getMemberTasksShort(), i_member_number);
        
    } // getMemberTasksShort

    // Returns the member active flag ("TRUE" or "FALSE")
    getMemberActiveFlag(i_member_number)
    {
        return this.getMemberNodeValue(this.m_tags.getMemberActiveFlag(), i_member_number);
        
    } // getMemberActiveFlag

    // Returns the member active flag (true or false)
    getMemberActiveFlagBool(i_member_number)
    {
        var flag_str = this.getMemberActiveFlag(i_member_number);

        if (flag_str == 'TRUE' || flag_str == 'true')
        {
            return true;
        }
        else
        {
            return false;
        }

    } // getMemberActiveFlagBool


    // Returns the member password
    getMemberPassword(i_member_number)
    {
        return this.getMemberNodeValue(this.m_tags.getMemberPassword(), i_member_number);
        
    } // getMemberPassword

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Member Data /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Member Utility Functions //////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns true if the member is in the IT team. The member must be active
    // i_member_name: Member (first) name
    // i_it_keyword_array: Array of tasks defining an IT task
    memberOfItTeam(i_member_name, i_it_keyword_array)
    {
        var ret_it_team = false;

        if (null == i_it_keyword_array)
        {
            alert("JazzApplicationXml.memberOfItTeam Input array of IT keywords is not defined");

            return false;            
        }

        var n_members = this.getNumberOfMembers();

        var n_keywords = i_it_keyword_array.length;
        if (n_keywords == 0)
        {
            alert("JazzApplicationXml.memberOfItTeam Zero IT keywords");

            return false;
        }

        for (var member_number=1; member_number <= n_members; member_number++)
        {
            var member_name = this.getMemberName(member_number);

            var member_active = this.getMemberActiveFlagBool(member_number);

            if (i_member_name == member_name && member_active)
            {
                var all_tasks = this.getMemberTasksShort(member_number) + ' ' +
                               this.getMemberTasks(member_number);

                for (var index_key=0; index_key < n_keywords; index_key++)
                {
                    var current_key = i_it_keyword_array[index_key];

                    var index_of = all_tasks.indexOf(current_key);

                    if (index_of >= 0)
                    {
                        ret_it_team = true;

                        break;
                    }

                } // index_key

            } // name found

        } // member_number

        return ret_it_team;

    } // memberOfItTeam

    // Test function
    // Returns the number of IT team members
    // i_it_keyword_array: Array of tasks defining an IT task
    getNumberOfItTeamMembers(i_it_keyword_array)
    {
        var ret_n_it_members = 0;

        var n_members = this.getNumberOfMembers();

        for (var member_number=1; member_number <= n_members; member_number++)
        {
            var member_name = this.getMemberName(member_number);

            if (this.memberOfItTeam(member_name, i_it_keyword_array))
            {
                ret_n_it_members = ret_n_it_members + 1;
            }

        }

        return ret_n_it_members;

    } // getNumberOfItTeamMembers


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Member Utility Functions ////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Password //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns true if name and password is OK
    namePasswordIsOk(i_name_str, i_password_str)
    {
        var ret_b_ok = false;

        var name_trim = i_name_str.trim();

        var password_trim = i_password_str.trim();

        var n_members = this.getNumberOfMembers();

        for (var member_number=1; member_number <= n_members; member_number++)
        {
            var member_name = this.getMemberName(member_number);

            var member_password = this.getMemberPassword(member_number);

            if (member_name == name_trim && member_password == password_trim)
            {
                ret_b_ok = true;

                break;
            }

        } // member_number

        return ret_b_ok;

    } // namePasswordIsOk

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Password ////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////    

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadOneXmlFile(i_object_xml, i_path_file_name_xml, i_callback_function_name)
    {
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
            alert("Error 404: File " + i_path_file_name_xml + " not found" );
        }	
    };
    
    // Open the file
    jazz_xmlhttp.open("GET", i_path_file_name_xml, true);
    
    jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
        
    jazz_xmlhttp.send();	

    } // jazzUtilLoadXml

    ///////////////////////////////////////////////////////////////////////////
    /////// End Load Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Members  //////////////////////////
    //////////////////////////////////////////////////////////////////////////

    // Returns the number of members
    getNumberOfMembers()
    {
        var ret_n_members = -12345;

        if (!this.checkApplicationXml()){ return ret_n_members; }

        var concert_nodes = this.m_object_xml.getElementsByTagName(this.m_tags.getMember());

        ret_n_members = concert_nodes.length;

        return ret_n_members;

    } // getNumberOfMembers

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Members  /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Member Node Value  ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the node value for a given member number and a tag name
    getMemberNodeValue(i_member_tag, i_member_number)
    {
        var ret_data = '';
        
        if (!this.checkApplicationXml()){ return ret_data; }

        var n_members = this.getNumberOfMembers();
        
        if (i_member_number < 1 || i_member_number > n_members)
        {
            alert("JazzApplicationXml.getMemberNodeValue Member number is not between 1 and " + n_members.toString());
            return ret_data;		
        }
            
        var member_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getMember());

        var member_node = member_nodes[i_member_number-1];
        
        var xml_node_value = this.getNodeValueTagName(member_node, i_member_tag);
        
        ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
        
        return ret_data;
        
    } // getMemberNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Member Node Value  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////  

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start XML Node Values  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the node value. Input is an XML node and the tag name
    getNodeValueTagName(i_node, i_xml_tag)
    {	
        return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
        
    } // getNodeValueTagName

    // Returns the node value. Input is an XML node 
    getNodeValue(i_node)
    {	
        return i_node.childNodes[0].nodeValue;
        
    } // getNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End XML Node Values  ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Not Set Values  ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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

    // Returns empty string if i_node_value is equal to m_not_yet_set_node_value
    removeFlagNodeValueNotSet(i_node_value)
    {
        if (!this.nodeValueIsSet(i_node_value))
        {
            return "";
        }
        
        return i_node_value; 
        
    } // removeFlagNodeValueNotSet

    // Return flag (string) g_not_yet_set_node_value if input string is empty
    setFlagNodeValueIsNotSetForEmptyString(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // setFlagNodeValueIsNotSetForEmptyString

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Not Set Values  /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the XML application file name and path
    getXmlApplicationFileName()
    {
        var ret_file_name = '';

        var level_xml_str = '';

        if (0 == this.m_n_level_xml)
        {
            level_xml_str = 'XML/';
        }
        else if (1 == this.m_n_level_xml)
        {
            level_xml_str = '../XML/';
        }
        else if (2 == this.m_n_level_xml)
        {
            level_xml_str = '../../XML/';
        }
        else if (3 == this.m_n_level_xml)
        {
            level_xml_str = '../../../XML/';
        }
        else
        {
            alert("JazzApplicationXml.getXmlApplicationFileName i_n_level= " + 
            this.m_n_level_xml.toString() + " nicht between 0 and 3");

            return ret_file_name;
        }

        ret_file_name = level_xml_str + 'JazzApplication.xml';

        if (!JazzApplicationXml.execApplicationOnServer())
        {
            var level_test_str = '';

            if (2 == this.m_n_level_xml)
            {
                level_test_str = '../';
            }
            else if (3 == this.m_n_level_xml)
            {
                level_test_str = '../../';
            }

            return level_test_str + this.m_xml_file_name_local;
        }        

        return ret_file_name;

    } // getXmlApplicationFileName

    // Check that the season program XML object is set
    checkApplicationXml()
    {      
        if (null == this.getXmlObject())
        {
            alert("JazzApplicationXml.checkApplicationXml Application XML object is null");

            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkApplicationXml

    // Returns true if the application runs on the server
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        var server_url = 'jazzliveaarau.ch';

        var index_url = current_base.indexOf(server_url);

        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }

    } // execApplicationOnServer    

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // JazzApplicationXml

// Class defining the tags of the XML application file
class JazzApplicationTags 
{
    // Creates the instance of the class
    constructor() 
    {
        // Member variables
        // ================

        ///// Start Publish Tags //////////////////////////////////////////////

        this.m_tag_application_publish_season_start_year = "PublishSeasonStartYear";


        ///// End Publish Tags ////////////////////////////////////////////////

        ///// Start Jazzclub Tags /////////////////////////////////////////////

        this.m_tag_application_club_name = 'ClubName';

        this.m_tag_application_club_email = 'EmailJazzLiveAarau';

        ///// End Jazzclub Tags ///////////////////////////////////////////////

        ///// Start About Us (Concept) Tags ///////////////////////////////////

        this.m_tag_application_about_us_header = "AboutUsHeader";
        this.m_tag_application_about_us_one = "AboutUsOne";
        this.m_tag_application_about_us_two = "AboutUsTwo";
        this.m_tag_application_about_us_three = "AboutUsThree";


        ///// End About Us (Concept) Tags /////////////////////////////////////

        ///// Start Requests Tags /////////////////////////////////////////////

        this.m_tag_application_request_caption = "RequestCaption";
        this.m_tag_application_request_header = "RequestHeader";
        this.m_tag_application_request_dates_display = "RequestDatesDisplay";
        this.m_tag_application_request_no_dates_text = "RequestNoDatesText";
        this.m_tag_application_request_dates_text = "RequestDatesText";
        this.m_tag_application_request_content_header = "RequestContentHeader";
        this.m_tag_application_request_content_one = "RequestContentOne";
        this.m_tag_application_request_content_two = "RequestContentTwo";
        this.m_tag_application_request_content_three = "RequestContentThree";
        this.m_tag_application_request_content_four = "RequestContentFour";
        this.m_tag_application_request_content_five = "RequestContentFive";
        this.m_tag_application_request_content_six = "RequestContentSix";
        this.m_tag_application_request_content_seven = "RequestContentSeven";
        this.m_tag_application_request_content_eight = "RequestContentEight";
        this.m_tag_application_request_content_nine = "RequestContentNine";
        this.m_tag_application_request_email_address = "RequestEmailAddress";
        this.m_tag_application_request_email_title = "RequestEmailTitle";
        this.m_tag_application_request_email_caption = "RequestEmailCaption";
        this.m_tag_application_request_email_remark = "RequestEmailRemark";
        this.m_tag_application_request_end_paragraph = "RequestEndParagraph";

        ///// End Requests Tags ///////////////////////////////////////////////

        ///// Start Premises Tags /////////////////////////////////////////////

        this.m_tag_application_premises_header = "PremisesHeader";
        this.m_tag_application_premises = "Premises";
        this.m_tag_application_premises_street = "PremisesStreet";
        this.m_tag_application_premises_city = "PremisesCity";
        this.m_tag_application_premises_website = "PremisesWebsite";
        this.m_tag_application_premises_telephone = "PremisesTelephone";
        this.m_tag_application_premises_photo = "PremisesPhoto";
        this.m_tag_application_premises_map = "PremisesMap";


        ///// End Premises Tags ///////////////////////////////////////////////

        ///// Start Reservation Tags //////////////////////////////////////////

        this.m_tag_application_reservation_url = "ReservationUrl";
        this.m_tag_application_reservation_not_allowed_flag = "ReservationNotAllowed";
        this.m_tag_application_reservation_not_allowed_text = "ReservationNotAllowedText";

        ///// End Reservation Tags ////////////////////////////////////////////

        ///// Start Newsletter Tags ///////////////////////////////////////////

        this.m_tag_application_newsletter_header = "NewsletterHeader";

        this.m_tag_application_newsletter_subject = "NewsletterSubject";

        ///// End Newsletter Tags /////////////////////////////////////////////

        ///// Start Supporter Tags ////////////////////////////////////////////

        this.m_tag_application_supporters_1 = "Supporters1";
        this.m_tag_application_supporters_2 = "Supporters2";
        this.m_tag_application_supporters_3 = "Supporters3";
        this.m_tag_application_supporters_4 = "Supporters4";

        ///// End Supporter Tags //////////////////////////////////////////////

        ///// Start Member Tags ///////////////////////////////////////////////

        this.m_tag_application_member = "Member";
        this.m_tag_application_member_name = "Name";
        this.m_tag_application_family_name = "FamilyName";
        this.m_tag_application_member_email_address = "EmailAddress";
        this.m_tag_application_member_email_private = 'EmailPrivate';
        this.m_tag_application_member_telephone = 'Telephone';
        this.m_tag_application_member_telephone_fix = 'TelephoneFix';
        this.m_tag_application_member_street = "Street";
        this.m_tag_application_member_city = "City";
        this.m_tag_application_member_post_code = "PostCode";
        this.m_tag_application_member_photo_small_size = "PhotoSmallSize";
        this.m_tag_application_member_tasks = "Tasks";
        this.m_tag_application_member_tasks_short = "TasksShort";
        this.m_tag_application_member_active_flag = "Vorstand";
        this.m_tag_application_member_order_number = "Number";
        this.m_tag_application_member_why = "Why";
        this.m_tag_application_member_start_year = 'StartYear';
        this.m_tag_application_member_end_year = 'EndYear';
        this.m_tag_application_member_password = 'Password';

        ///// End Member Tags /////////////////////////////////////////////////

        ///// Start Caption Tags //////////////////////////////////////////////

        this.m_tag_application_caption_contact_person_concert = "CaptionContactPersonConcert";
        this.m_tag_application_caption_musician_documents_contract = "CaptionMusicianDocumentsContract";
        this.m_tag_application_caption_musician_concert_info = "CaptionMusicianConcertInfo";
        this.m_tag_application_caption_musician_driveway_permit = "CaptionMusicianDrivewayPermit";
        this.m_tag_application_caption_unload_address = "CaptionUnloadAddress";
        this.m_tag_application_caption_parking_one = "CaptionParkingOne";
        this.m_tag_application_caption_parking_two = "CaptionParkingTwo";
        this.m_tag_application_caption_driveway_permit = "CaptionMusicianDrivewayPermit";

        ///// End Caption Tags ////////////////////////////////////////////////

        ///// Start Musician Info Tags ////////////////////////////////////////

        this.m_tag_application_contact_concert_member_number = "ContactConcertMemberNumber";
        // Not used: Data is retrieved with ContactConcertMemberNumber
        // this.m_tag_application_contact_concert_telephone = "ContactConcertTelephone";
        //this.m_tag_application_contact_concert_email = "ContactConcertEmail";

        this.m_tag_application_unload_street = "UnloadStreet";
        this.m_tag_application_unload_city = "UnloadCity";
        this.m_tag_application_parking_one = "ParkingOne";
        this.m_tag_application_parking_two = "ParkingTwo";


        ///// End Musician Info Tags //////////////////////////////////////////

    } // constructor

    // Get member variable functions
    // =============================

    ///// Start Member Tags ///////////////////////////////////////////////////

    getMember(){return this.m_tag_application_member;} 
    getMemberName(){return this.m_tag_application_member_name;} 

    getMemberTasks(){return this.m_tag_application_member_tasks;} 

    getMemberTasksShort(){return this.m_tag_application_member_tasks_short;} 

    getMemberActiveFlag(){return this.m_tag_application_member_active_flag;} 
   

    getMemberPassword(){return this.m_tag_application_member_password;} 

    ///// End Member Tags /////////////////////////////////////////////////////


} // JazzApplicationTags


// File: SeasonXml.js
// Date: 2025-11-29
// Author: Gunnar Lidén

// File content
// =============
//
// Class for the jazz season program XML file JazzProgramm_20NN_20MM.xml
class SeasonXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    // i_n_level_xml:            Directory levels to /www/XML/
    constructor(i_callback_function_name, i_n_level_xml, i_start_year) 
    {
        // Member variables
        // ================

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // Directory levels to /www/XML/
        this.m_n_level_xml = i_n_level_xml;

        // Season start year. Used for the construction of the XML file name
        this.m_start_year = i_start_year;

        // Path and name of test XML file in the computer
        this.m_xml_file_name_local = 'XmlTestData/SeasonProgramTestData.xml'; 

        // The jazz application xml object
        this.m_object_xml = null;

        // Object holding the tags
        this.m_tags = new SeasonTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML object for aapplication file and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getXmlSeasonFileName(), this.m_callback_function_name);

    } // constructor

    // Sets the XML object
    setXmlObject(i_object_xml)
    {
        this.m_object_xml = i_object_xml;

    } // setXmlObject

    // Returns the XML object
    getXmlObject()
    {
        return this.m_object_xml;

    } // getXmlObject    

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Season Functions ////////(///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the autumn year
    getYearAutumn()
    {
        return this.getSeasonNodeValue(this.m_tags.getYearAutumn());
        
    } // getGuestYear

    // Returns the autumn year of the season as integer
    getYearAutumnInt()
    {
        var ret_autumn_year_int = -12345;

        var autumn_year_str = this.getYearAutumn();

        if (autumn_year_str.length != 4)
        {
            ret_autumn_year_int = -1;

            return ret_autumn_year_int;
        }

        ret_autumn_year_int = parseInt(autumn_year_str);

        return ret_autumn_year_int;

    } // getYearAutumnInt

    // Returns the spring year
    getYearSpring()
    {
        return this.getSeasonNodeValue(this.m_tags.getYearSpring());
        
    } // getYearSpring

    // Returns the flag (string TRUE or FALSE) telling if the concert program is published
    getPublishProgram()
    {
        return this.getSeasonNodeValue(this.m_tags.getPublishProgram());
        
    } // getPublishProgram

    // Returns the flag (boolean true or false) telling if the concert program is published
    getPublishProgramBool()
    {
        if ('TRUE' == this.getPublishProgram())
        {
            return true;
        }
        else
        {
            return false;
        }
        
    } // getPublishProgramBool

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Season Functions ////////(/////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Concert Functions ////////(//////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the concert day name.
    getDayName(i_concert_number) // Previously getConcertDayName
    {
        return this.getConcertNodeValue(this.m_tags.getDayName(), i_concert_number);
        
    } // getDayName

   // Returns the concert day
   getDay(i_concert_number) // Previously getConcertDay
   {
       return this.getConcertNodeValue(this.m_tags.getDay(), i_concert_number);
       
   } // getDay

   // Returns the concert month
   getMonth(i_concert_number) // Previously getConcertMonth
   {
       return this.getConcertNodeValue(this.m_tags.getMonth(), i_concert_number);
       
   } // getMonth

   // Returns the concert year
   getYear(i_concert_number) // Previously getConcertYear
   {
       return this.getConcertNodeValue(this.m_tags.getYear(), i_concert_number);
       
   } // getYear

   // Returns the concert start hour
   getStartHour(i_concert_number) // Previously getConcertStartHour
   {
       return this.getConcertNodeValue(this.m_tags.getStartHour(), i_concert_number);
       
   } // getStartHour

   // Returns the concert start minute
   getStartMinute(i_concert_number) // Previously getConcertStartHour
   {
       return this.getConcertNodeValue(this.m_tags.getStartMinute(), i_concert_number);
       
   } // getStartMinute

   // Returns the concert end hour
   getEndHour(i_concert_number) // Previously getConcertEndHour
   {
       return this.getConcertNodeValue(this.m_tags.getEndHour(), i_concert_number);
       
   } // getEndHour
 
   // Returns the concert end minute
   getEndMinute(i_concert_number) // Previously getConcertEndMinute
   {
       return this.getConcertNodeValue(this.m_tags.getEndMinute(), i_concert_number);
       
   } // getEndMinute 

   // Returns the concert place
   getPlace(i_concert_number) // Previously getConcertEndMinute
   {
       return this.getConcertNodeValue(this.m_tags.getPlace(), i_concert_number);
       
   } // getPlace 

   // Returns the street for the concert place
   getStreet(i_concert_number)
   {
       return this.getConcertNodeValue(this.m_tags.getStreet(), i_concert_number);
       
   } // getStreet

   // Returns the city for the concert place
   getCity(i_concert_number)
   {
       return this.getConcertNodeValue(this.m_tags.getCity(), i_concert_number);
       
   } // getCity

   // Returns the concert cancelled flag
   // DO NOT CALL THIS FUNCTION DIRECTLY. ALWAYS CALL ConcertIsCancelled
   // For older seasonprograms the tag is not defined in the XML files 
   getCancelled(i_concert_number) // Previously getConcertCancelled
   {
       return this.getConcertNodeValue(this.m_tags.getCancelled(), i_concert_number);
       
   } // getCancelled 

   // Returns true if the concert was cancelled
   // Please note that for older seasonprograms the cancelled concert tag 
   // is not defined in the XML season program files 
   ConcertIsCancelled(i_concert_number)
   {
        var ret_value = false;

        if (!this.ConcertCancelledFlagIsDefinedInXmlFile())
        {
            return ret_value;
        }

        var concert_cancelled_str = this.getConcertCancelled(i_concert_number);
        
        if (concert_cancelled_str == 'TRUE')
        {
            ret_value = true;
        }
        else
        {
            ret_value = false;
        }

    return ret_value;

   } // ConcertIsCancelled

   // Returns true if the concert cancelled flag is defined in the season XML file
   ConcertCancelledFlagIsDefinedInXmlFile()
   {
        var year_autumn = this.getYearAutumn();

        if (year_autumn < 2019)
        {
            return false;
        }
        else
        {
            return true;
        }

   } // ConcertCancelledFlagIsDefinedInXmlFile

   // Returns the band name
    getBandName(i_concert_number)
    {
        return this.getConcertNodeValue(this.m_tags.getBandName(), i_concert_number);
        
    } // getBandName

   // Returns the concert short text
   getShortText(i_concert_number) // Previously getConcertShortText
   {
       return this.getConcertNodeValue(this.m_tags.getShortText(), i_concert_number);
       
   } // getShortText

   // Returns the concert additional text
   getAdditionalText(i_concert_number) // Previously getConcertAdditionalText
   {
       return this.getConcertNodeValue(this.m_tags.getAdditionalText(), i_concert_number);
       
   } // getAdditionalText
 
   // Returns the band website URL
   getBandWebsite(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getBandWebsite(), i_concert_number);
       
   } // getBandWebsite

   // Returns the band sound sample file name (mp3 or mp4 file)
   getSoundSample(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getSoundSample(), i_concert_number);
       
   } // getSoundSample

   // Returns the label for the additional text
   // Please note that this function not is implemented previously
   getLabelAdditionalText(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getLabelAdditionalText(), i_concert_number);
       
   } // getLabelAdditionalText
  
   // Returns the label for the concert flyer free text
   getLabelFlyerText(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getLabelFlyerText(), i_concert_number);
       
   } // getLabelFlyerText

   // Returns the concert flyer free text
   getFlyerText(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getFlyerText(), i_concert_number);
       
   } // getFlyerText

   // Returns the concert flyer free text
   getFlyerText(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getFlyerText(), i_concert_number);
       
   } // getFlyerText

   // Returns the flag that tells if the flyer text can be published on the homepage
   // DO NOT CALL THIS FUNCTION DIRECTLY. ALWAYS CALL FlyerTextCanBePublishedOnHomepage
   // For older seasonprograms the tag is not defined in the XML files 
   getFlyerTextHomepagePublish(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getFlyerTextHomepagePublish(), i_concert_number);
       
   } // getFlyerTextHomepagePublish

   // Returns true if the flyer text can be published on the homepage
   // Please note that for older seasonprograms this tag 
   // is not defined in the XML season program files 
   FlyerTextCanBePublishedOnHomepage(i_concert_number)
   {
       var ret_value = false;
   
       if (!this.HomepageFlyerPublishFlagIsDefinedInXmlFile())
       {
           return ret_value;
       }
   
       var concert_cancelled_str = this.getFlyerTextHomepagePublish(i_concert_number);
       
       if (concert_cancelled_str == 'TRUE')
       {
           ret_value = true;
       }
       else
       {
           ret_value = false;
       }
   
       return ret_value;
   
   } // FlyerTextCanBePublishedOnHomepage
   
   // Returns true if the homepage flyer publish flag is defined in the season XML file
   HomepageFlyerPublishFlagIsDefinedInXmlFile()
   {
       var year_autumn = this.getYearAutumn();
   
       if (year_autumn < 2019)
       {
           return false;
       }
       else
       {
           return true;
       }
   
   } // HomepageFlyerPublishFlagIsDefinedInXmlFile

   // Returns the file name of the concert mid size poster
   getPosterMidSize(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getPosterMidSize(), i_concert_number);
       
   } // getPosterMidSize

   // Returns the file name of the concert small size poster
   getPosterSmallSize(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getPosterSmallSize(), i_concert_number);
       
   } // getPosterSmallSize
 
   // Returns Returns the gallery one URL
   getPhotoGalleryOne(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getPhotoGalleryOne(), i_concert_number);
       
   } // getPhotoGalleryOne

   // Returns the gallery two URL
   getPhotoGalleryTwo(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getPhotoGalleryTwo(), i_concert_number);
       
   } // getPhotoGalleryTwo

   // Returns the gallery one ZIP file URL
   getPhotoGalleryOneZip(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getPhotoGalleryOneZip(), i_concert_number);
       
   } // getPhotoGalleryOneZip

   // Returns the gallery two ZIP file URL
   getPhotoGalleryTwoZip(i_concert_number) 
   {
       return this.getConcertNodeValue(this.m_tags.getPhotoGalleryTwoZip(), i_concert_number);
       
   } // getPhotoGalleryTwoZip

   // Returns the musician contact person name
   getContactPerson(i_concert_number) 
   {
       if (this.getYearAutumnInt() < 2016) return "";

       return this.getConcertNodeValue(this.m_tags.getContactPerson(), i_concert_number);
       
   } // getContactPerson

   // Returns the musician contact person email
   getContactEmail(i_concert_number) 
   {
       if (this.getYearAutumnInt() < 2016) return "";

       return this.getConcertNodeValue(this.m_tags.getContactEmail(), i_concert_number);
       
   } // getContactEmail

   // Returns the musician contact person telephone number
   getContactTelephone(i_concert_number) 
   {
       if (this.getYearAutumnInt() < 2016) return "";

       return this.getConcertNodeValue(this.m_tags.getContactTelephone(), i_concert_number);
       
   } // getContactTelephone

   // Returns the musician contact person street name and number
   getContactStreet(i_concert_number) 
   {
       if (this.getYearAutumnInt() < 2016) return "";

       return this.getConcertNodeValue(this.m_tags.getContactStreet(), i_concert_number);
       
   } // getContactStreet

   // Returns the musician contact person post code
   getContactPostCode(i_concert_number) 
   {
       if (this.getYearAutumnInt() < 2016) return "";

       return this.getConcertNodeValue(this.m_tags.getContactPostCode(), i_concert_number);
       
   } // getContactPostCode

   // Returns the musician contact person city name
   getContactCity(i_concert_number) 
   {
       if (this.getYearAutumnInt() < 2016) return "";

       return this.getConcertNodeValue(this.m_tags.getContactCity(), i_concert_number);
       
   } // getContactCity

   // Returns the musician contact person IBAN number
   getIbanNumber(i_concert_number) 
   {
       if (this.getYearAutumnInt() < 2016) return "";

       return this.getConcertNodeValue(this.m_tags.getIbanNumber(), i_concert_number);
       
   } // getIbanNumber
 
   // Returns the musician contact person remark
   getContactRemark(i_concert_number) 
   {
       if (this.getYearAutumnInt() < 2016) return "";

       return this.getConcertNodeValue(this.m_tags.getContactRemark(), i_concert_number);
       
   } // getContactRemark

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Concert Functions ////////(////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Musician Functions ////////(/////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the musician name
    getMusicianName(i_concert_number, i_musician_number)
    {
        return this.getMusicianNodeValue(this.m_tags.getMusicianName(), i_concert_number, i_musician_number);
         
    } // getMusicianName

    // Returns the musician instrument
    getMusicianInstrument(i_concert_number, i_musician_number)
    {
        return this.getMusicianNodeValue(this.m_tags.getMusicianInstrument(), i_concert_number, i_musician_number);
         
    } // getMusicianInstrument

    // Returns the musician text
    getMusicianText(i_concert_number, i_musician_number)
    {
        return this.getMusicianNodeValue(this.m_tags.getMusicianText(), i_concert_number, i_musician_number);
         
    } // getMusicianText

    // Returns the musician gender
    getMusicianGender(i_concert_number, i_musician_number)
    {
        return this.getMusicianNodeValue(this.m_tags.getMusicianGender(), i_concert_number, i_musician_number);
         
    } // getMusicianGender 

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Musician Functions ////////(///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Node Value Functions //////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the season node value for a given tag name
    getSeasonNodeValue(i_tag)
    {
        var ret_data = '';
        
        if (!this.checkSeasonXml()){ return ret_data; }

        var season_node = this.getXmlObject().getElementsByTagName(i_tag)[0];
        
        var season_node_value = this.getNodeValue(season_node);
        
        ret_data = this.removeFlagNodeValueNotSet(season_node_value);
        
        return ret_data;
        
    } // getSeasonNodeValue

    // Returns the concert node value for a given concert number and a tag name
    getConcertNodeValue(i_record_tag, i_concert_number)
    {
        var ret_data = '';
        
        if (!this.checkSeasonXml()){ return ret_data; }

        var n_records = this.getNumberOfConcerts();
        
        if (i_concert_number < 1 || i_concert_number > n_records)
        {
            alert("SeasonXml.getConcertNodeValue Record number is not between 1 and " + n_records.toString());
            return ret_data;		
        }
            
        var concert_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getConcert());

        var concert_rec_node = concert_rec_nodes[i_concert_number-1];
        
        var xml_node_value = this.getNodeValueTagName(concert_rec_node, i_record_tag);
        
        ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
        
        return ret_data;
        
    } // getConcertNodeValue

    // Returns a musician node value for a musician tag, musician number and concert number
    getMusicianNodeValue(i_musician_tag, i_concert_number, i_musician_number)
    {
        var ret_node_value = '';
        
        if (!this.checkSeasonXml()){ return ret_node_value; }
        
        var n_concerts = this.getNumberOfConcerts();
        
        if (i_concert_number < 1 || i_concert_number > n_concerts)
        {
            alert("SeasonXml.getMusicianNodeValue Concert number not between 1 and " + n_concerts.toString());
            return ret_data;		
        }
            
        var concert_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getConcert());

        var concert_node = concert_nodes[i_concert_number-1];
        
        var musician_nodes = concert_node.getElementsByTagName(this.m_tags.getMusician());
        
        if (i_musician_number < 1 || i_musician_number > musician_nodes.length)
        {
            alert("SeasonXml.getMusicianNodeValue Musician number is not between 1 and " + musician_nodes.length.toString());
            return ret_node_value;
        }

        var musician_node = musician_nodes[i_musician_number - 1];
        
        var musician_node_value = this.getNodeValueTagName(musician_node, i_musician_tag);
        
        ret_node_value = this.removeFlagNodeValueNotSet(musician_node_value);
        
        return ret_node_value;
        
    } // getMusicianNodeValue

    // Returns the node value. Input is an XML node and the tag name
    getNodeValueTagName(i_node, i_xml_tag)
    {	
        return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
        
    } // getNodeValueTagName

    // Returns the node value. Input is an XML node 
    getNodeValue(i_node)
    {	
        return i_node.childNodes[0].nodeValue;
        
    } // getNodeValue

    // Sets a node value. Input is an XML node, the tag name and the node value
    setNodeValue(i_node, i_xml_tag, i_node_value)
    {	
        i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue = i_node_value;
        
    } // setNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Node Value Functions ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Not Set Values  ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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

    // Returns empty string if i_node_value is equal to m_not_yet_set_node_value
    removeFlagNodeValueNotSet(i_node_value)
    {
        if (!this.nodeValueIsSet(i_node_value))
        {
            return "";
        }
        
        return i_node_value; 
        
    } // removeFlagNodeValueNotSet

    // Return flag (string) g_not_yet_set_node_value if input string is empty
    setFlagNodeValueIsNotSetForEmptyString(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // setFlagNodeValueIsNotSetForEmptyString

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Not Set Values  /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Records ////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    // Returns the number of concerts
    getNumberOfConcerts()
    {
        var ret_n_records = -1;

        if (!this.checkSeasonXml()){ return ret_n_records; }

        var concert_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getConcert());

        ret_n_records = concert_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfConcerts

    // Returns the number of musicians
    getNumberOfMusicians(i_concert_number)
    {
        var ret_n_records = -1;

        if (!this.checkSeasonXml()){ return ret_n_records; }

        var concert_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getConcert());

        var n_concerts = concert_rec_nodes.length;
        
        if (i_concert_number < 1 || i_concert_number > n_concerts)
        {
            alert("SeasonXml.getNumberOfMusicians Concert number not between 1 and " + n_concerts.toString());
            return ret_data;		
        }        
        
        var concert_node = concert_rec_nodes[i_concert_number-1];

        var musician_nodes = concert_node.getElementsByTagName(this.m_tags.getMusician());
	
        ret_n_records = musician_nodes.length;

        return ret_n_records;

    } // getNumberOfMusicians
  
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Records //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadOneXmlFile(i_object_xml, i_path_file_name_xml, i_callback_function_name)
    {
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
            alert("Error 404: File " + i_path_file_name_xml + " not found" );
        }	
    };
    
    // Open the file
    jazz_xmlhttp.open("GET", i_path_file_name_xml, true);
    
    jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
        
    jazz_xmlhttp.send();	

    } // loadOneXmlFile

    ///////////////////////////////////////////////////////////////////////////
    /////// End Load Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the XML season file name and path
    getXmlSeasonFileName()
    {
        var ret_file_name = '';

        var level_xml_str = '';

        if (0 == this.m_n_level_xml)
        {
            level_xml_str = 'XML/';
        }
        else if (1 == this.m_n_level_xml)
        {
            level_xml_str = '../XML/';
        }
        else if (2 == this.m_n_level_xml)
        {
            level_xml_str = '../../XML/';
        }
        else if (3 == this.m_n_level_xml)
        {
            level_xml_str = '../../../XML/';
        }
        else
        {
            alert("SeasonXml.getXmlSeasonFileName i_n_level= " + 
            this.m_n_level_xml.toString() + " not between 0 and 3");

            return ret_file_name;
        }

        ret_file_name = level_xml_str + SeasonXml.getSeasonFileNameWithoutPath(this.m_start_year);

        if (!JazzGuestsXml.execApplicationOnServer())
        {
            var level_test_str = '';

            if (2 == this.m_n_level_xml)
            {
                level_test_str = '../';
            }
            else if (3 == this.m_n_level_xml)
            {
                level_test_str = '../../';
            }

            return level_test_str + this.m_xml_file_name_local;
        }        

        return ret_file_name;

    } // getXmlSeasonFileName

    // Reurns the season file name without path
    static getSeasonFileNameWithoutPath(i_start_year)
    {
      var next_year = i_start_year + 1;
    
      var file_name = 'JazzProgramm_' + i_start_year.toString() + '_' + next_year.toString() + '.xml';
    
      return file_name;
    
    }// getSeasonFileNameWithoutPath

    // Check that the season program XML object is set
    checkSeasonXml()
    {      
        if (null == this.getXmlObject())
        {
            alert("SeasonXml.checkSeasonXml Jazz guests XML object is null");

            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkSeasonXml

    // Returns true if the application runs on the server
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        var server_url = 'jazzliveaarau.ch';

        var index_url = current_base.indexOf(server_url);

        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }

    } // execApplicationOnServer

    // Get the current season start year
    // Season changes 1/4
    static getCurrentSeasonStartYear()
    {
    
      var now_date = new Date();
      var now_year = now_date.getFullYear();
      var now_month = now_date.getMonth() + 1;
    
      var ret_current_season_start_year = now_year;
      
      if (now_month < 4)
      {
        ret_current_season_start_year = now_year - 1;
      }
    
      return ret_current_season_start_year;
    
    } // getCurrentSeasonStartYear

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Member Utility Functions //////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Get string array with all concert names
    getBandNameArray()
    {
        var concert_name_array = [];
    
        var n_concerts = this.getNumberOfConcerts();
    
        for (var concert_number=1; concert_number <= n_concerts; concert_number++)
        {
    
            var band_name =  this.getBandName(concert_number);

            concert_name_array[concert_number - 1] = band_name;

        }

        return concert_name_array;

    } // getBandNameArray

    // Returns an array of concerts that have been played
    // i_n_days=  0: At concert date the array will include the same day concert
    // i_n_days=  1: One day after  the array will include the (passed) concert 
    // i_n_days= -1: One day before the array will include the (next)   concert 
    bandNamePassedDateArray(i_n_days)
    {
        var concert_name_array = [];
    
        var n_concerts = this.getNumberOfConcerts();
    
        for (var concert_number=1; concert_number <= n_concerts; concert_number++)
        {
            var n_days = this.numberOfDaysForConcertToCurrentDate(concert_number);

            if (n_days <= i_n_days)
            {
                var band_name =  this.getBandName(concert_number);

                concert_name_array[concert_number - 1] = band_name;
            }

        } // concert_number

        return concert_name_array;

    } // bandNamePassedDateArray

    // Calculates the number of days for a concert to the current data
    numberOfDaysForConcertToCurrentDate(i_concert_number)
    {
        var concert_year = this.getYear(i_concert_number);

        var concert_month = this.getMonth(i_concert_number);

        var concert_day = this.getDay(i_concert_number);

        return SeasonXml.numberOfDaysToCurrentDate(concert_year, concert_month, concert_day);

    } // numberOfDaysForConcertToCurrentDate

    // Calculates the number of days to the current data
    // https://www.javatpoint.com/calculate-days-between-two-dates-in-javascript
    // This function is also in class UtilDate
    static numberOfDaysToCurrentDate(i_concert_year, i_concert_month, i_concert_day)
    {
        var current_date = new Date();

        var current_hours = current_date.getHours();

        var current_minutes = current_date.getMinutes();

        var current_seconds = current_date.getSeconds();

        // new Date(year, monthIndex, day, hours, minutes, seconds)

        var concert_date = new Date(i_concert_year, i_concert_month - 1, i_concert_day, 
                                current_hours, current_minutes, current_seconds);

        var time_difference = concert_date.getTime() - current_date.getTime();  
  
        var days_difference_float = time_difference / (1000 * 60 * 60 * 24);   

        var days_difference = Math.round(days_difference_float);

        return days_difference;

    } // numberOfDaysToCurrentDate

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Member Utility Functions ////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // SeasonXml

// Class defining the tags of the XML season program file
class SeasonTags 
{
    // Creates the instance of the class
    constructor() 
    {
        //////////////////////////////////////////////////////////
        ////////////// Season Start //////////////////////////////
        //////////////////////////////////////////////////////////

        this.m_tag_year_autumn = "YearAutum";
        this.m_tag_year_spring = "YearSpring";
        this.m_tag_publish_program = "PublishProgram";

        //////////////////////////////////////////////////////////
        ////////////// Season End ////////////////////////////////
        //////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////
        ////////////// Concert Start /////////////////////////////
        //////////////////////////////////////////////////////////

        this.m_tag_concert = "Concert";
        this.m_tag_day_name = "DayName";
        this.m_tag_day = "Day";
        this.m_tag_month = "Month";
        this.m_tag_year = "Year";
        this.m_tag_start_hour = "TimeStartHour";
        this.m_tag_start_minute = "TimeStartMinute";
        this.m_tag_end_hour = "TimeEndHour";
        this.m_tag_end_minute = "TimeEndMinute";
        this.m_tag_place = "Place";
        this.m_tag_street = "Street";
        this.m_tag_city = "City";
        this.m_tag_publish_flyer_text = "PublishFlyerText";
        this.m_tag_concert_cancelled = "ConcertCancelled";
        this.m_tag_band_name = "BandName";
        this.m_tag_short_text = "ShortText";
        this.m_tag_additional_text = "AdditionalText";
        this.m_tag_band_website = "BandWebsite";
        this.m_tag_band_sound_sample = "SoundSample";
        this.m_tag_label_additional_text = "LabelAdditionalText";

        this.m_tag_label_flyer_text = "LabelFlyerText";
        this.m_tag_flyer_text = "FlyerText";
        this.m_tag_flyer_text_homepage_publish = "FlyerTextHomepagePublish";

        this.m_tag_poster_mid_size = 'PosterMidSize';
        this.m_tag_poster_small_size = 'PosterSmallSize';
        this.m_tag_photo_gallery_one = 'PhotoGalleryOne';
        this.m_tag_photo_gallery_two = 'PhotoGalleryTwo';
        this.m_tag_photo_gallery_one_zip = 'PhotoGalleryOneZip';
        this.m_tag_photo_gallery_two_zip = 'PhotoGalleryTwoZip';

        this.m_tag_contact_person = "ContactPerson";
        this.m_tag_contact_email = "ContactEmail";
        this.m_tag_contact_telephone = "ContactTelephone";
        this.m_tag_contact_street = "ContactStreet";
        this.m_tag_contact_post_code = "ContactPostCode";
        this.m_tag_contact_city = "ContactCity";
        this.m_tag_contact_iban_number = "IbanNumber";
        this.m_tag_contact_remark = "ContactRemark";

        //////////////////////////////////////////////////////////
        ////////////// Concert End ///////////////////////////////
        //////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////
        ////////////// Musicians Start ///////////////////////////
        //////////////////////////////////////////////////////////

        this.m_tag_musician = "Musician";
        this.m_tag_musician_name = "Name";
        this.m_tag_musician_instrument = "Instrument";
        this.m_tag_musician_text = "Text";
        this.m_tag_musician_gender = "Gender";

        //////////////////////////////////////////////////////////
        ////////////// Musicians End /////////////////////////////
        //////////////////////////////////////////////////////////

    } // constructor

    // Get member variable functions
    // =============================

    getYearAutumn(){return this.m_tag_year_autumn;} 
    getYearSpring(){return this.m_tag_year_spring;} 
    getPublishProgram(){return this.m_tag_publish_program;} 


    getConcert(){return this.m_tag_concert;} 
    getDayName(){return this.m_tag_day_name;} // Previously getConcertDayName
    getDay(){return this.m_tag_day;} // Previously getConcertDay
    getMonth(){return this.m_tag_month;} // Previously getConcertMonth
    getYear(){return this.m_tag_year;} // Previously getConcertYear
    getStartHour(){return this.m_tag_start_hour;} // Previously getConcertStartHour
    getStartMinute(){return this.m_tag_start_minute;} // Previously getConcertStartMinute
    getEndHour(){return this.m_tag_end_hour;} // Previously getConcertEndHour
    getEndMinute(){return this.m_tag_end_minute;} // Previously getConcertEndMinute
    getPlace(){return this.m_tag_place;} // Previously getConcertPlace
    getStreet(){return this.m_tag_street;}
    getCity(){return this.m_tag_city;}

    getCancelled(){return this.m_tag_concert_cancelled;} // Not defined in old (before 2019) season programs // Previously getConcertCancelled
    getBandName(){return this.m_tag_band_name;} 
    getShortText(){return this.m_tag_short_text;} // Previously getConcertShortText
    getAdditionalText(){return this.m_tag_additional_text;} // Previously getConcertAdditionalText
    getBandWebsite(){return this.m_tag_band_website;} 
    getSoundSample(){return this.m_tag_band_sound_sample;} 

    getLabelAdditionalText(){return this.m_tag_label_additional_text;} // TODO Not used previously
    getLabelFlyerText(){return this.m_tag_label_flyer_text;} 
    getFlyerText(){return this.m_tag_flyer_text;}
    getFlyerTextHomepagePublish(){return this.m_tag_publish_flyer_text;} // Only defined after 2019

    getPosterMidSize(){return this.m_tag_poster_mid_size;} 
    getPosterSmallSize(){return this.m_tag_poster_small_size;} 
    getPhotoGalleryOne(){return this.m_tag_photo_gallery_one;} 
    getPhotoGalleryTwo(){return this.m_tag_photo_gallery_two;} 
    getPhotoGalleryOneZip(){return this.m_tag_photo_gallery_one_zip;} 
    getPhotoGalleryTwoZip(){return this.m_tag_photo_gallery_two_zip;} 

    getContactPerson(){return this.m_tag_contact_person;}  // Not defined before 2016
    getContactEmail(){return this.m_tag_contact_email;}  // Not defined before 2016
    getContactTelephone(){return this.m_tag_contact_telephone;} // Not defined before 2016
    getContactStreet(){return this.m_tag_contact_street;} // Not defined before 2016
    getContactPostCode(){return this.m_tag_contact_post_code;} // Not defined before 2016
    getContactCity(){return this.m_tag_contact_city;} // Not defined before 2016
    getIbanNumber(){return this.m_tag_contact_iban_number;} // Not defined before 2016
    getContactRemark(){return this.m_tag_contact_remark;} // Not defined before 2016

    getMusician(){return this.m_tag_musician;} 
    getMusicianName(){return this.m_tag_musician_name;} 
    getMusicianInstrument(){return this.m_tag_musician_instrument;} 
    getMusicianText(){return this.m_tag_musician_text;} 
    getMusicianGender(){return this.m_tag_musician_gender;} 


} // SeasonTags



// File: JazzGuestsXml.js
// Date: 2025-04-10
// Author: Gunnar Lidén

// File content
// =============
//
// Class for the jazz guests XML files JazzGuests.xml and JazzGuestsUploaded.xml
class JazzGuestsXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    // i_n_level_xml:            Directory levels to /www/XML/
    // i_b_update_xml:           Eq. false: JazzGuests.xml Eq. true: azzGuestsUpload.xml
    constructor(i_callback_function_name, i_n_level_xml, i_b_update_xml) 
    {
        // Member variables
        // ================

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // Directory levels to /www/XML/
        this.m_n_level_xml = i_n_level_xml;

        // Boolean telling if JazzGuestsUploaded.xml shall be used
        this.m_b_update_xml = i_b_update_xml;

        // Path and name of XML file in the computer
        this.m_xml_file_name_local = 'XmlTestData/JazzGuestsTestData.xml';

        // Path and name of the upload XML file in the computer
        this.m_xml_file_name_upload_local = 'XmlTestData/JazzGuestsUploadTestData.xml';

        // The jazz application xml object
        this.m_object_xml = null;

        // Object holding the tags
        this.m_tags = new JazzGuestsTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML object for aapplication file and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getXmlJazzGuestsFileName(), this.m_callback_function_name);

    } // constructor

    static statusPendingRecordInUploaded()
    {
        return 'PendingRecordInUploaded';
    }

    static statusDescriptionPendingRecordInUploaded()
    {
        return 'User uploaded to JazzGuestsLoaded.xml. Admin uploads to homepage';
    }

    static statusAdminAddedOrChecked()
    {
        return 'AddedOrCheckedRecordByAdmin';
    }

    static statusDescriptionAdminAddedOrChecked()
    {
        return 'Admin has moved from JazzGuestsLoaded.xml or added directly';
    }

    static statusTestAdminAddedOrChecked()
    {
        return 'TEST_AddedOrCheckedRecordByAdmin';
    }

    static statusDescriptionTestAdminAddedOrChecked()
    {
        return 'TEST Admin has moved from JazzGuestsLoaded.xml or added directly';
    }

    static statusUserUploadedRecordToHomepage()
    {
        return 'UploadedRecordByGuestToHomepage';
    }

    static statusDescriptionUserUploadedRecordToHomepage()
    {
        return 'User uploaded to JazzGuests.xml. Admin checks record';
    }

    // Returns the status description for a given status key
    getStatusDescription(i_status_key)
    {
        if (i_status_key == JazzGuestsXml.statusPendingRecordInUploaded())
        {
            return JazzGuestsXml.statusDescriptionPendingRecordInUploaded();
        }
        else if (i_status_key == JazzGuestsXml.statusAdminAddedOrChecked())
        {
            return JazzGuestsXml.statusDescriptionAdminAddedOrChecked();
        }
        else if (i_status_key == JazzGuestsXml.statusTestAdminAddedOrChecked())
        {
            return JazzGuestsXml.statusDescriptionTestAdminAddedOrChecked();
        }
        else if (i_status_key == JazzGuestsXml.statusUserUploadedRecordToHomepage())
        {
            return JazzGuestsXml.statusDescriptionUserUploadedRecordToHomepage();
        }
        else
        {
            return 'No description of status key= ' + i_status_key;
        }

    } // getStatusDescription

    // Sets the XML object
    setXmlObject(i_object_xml)
    {
        this.m_object_xml = i_object_xml;

    } // setXmlObject

    // Returns the XML object
    getXmlObject()
    {
        return this.m_object_xml;

    } // getXmlObject    

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Get Guest Data ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the guest record year
    getGuestYear(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestYear(), i_record_number);
        
    } // getGuestYear

    // Returns the guest record month
    getGuestMonth(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestMonth(), i_record_number);
        
    } // getGuestMonth

    // Returns the guest record day
    getGuestDay(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestDay(), i_record_number);
        
    } // getGuestDay

    // Returns the guest record band
    getGuestBand(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestBand(), i_record_number);
        
    } // getGuestBand

    // Returns the guest record musicians
    getGuestMusicians(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestMusicians(), i_record_number);
        
    } // getGuestMusicians

    // Returns the guest record header
    getGuestHeader(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestHeader(), i_record_number);
        
    } // getGuestHeader

    // Returns the guest record text
    getGuestText(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestText(), i_record_number);
        
    } // getGuestText

    // Returns the guest record names
    getGuestNames(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestNames(), i_record_number);
        
    } // getGuestNames

    // Returns the guest record remark
    getGuestRemark(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestRemark(), i_record_number);
        
    } // getGuestRemark

    // Returns the guest record file name
    getGuestFileName(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestFileName(), i_record_number);
        
    } // getGuestFileName

    // Returns the guest record file type
    getGuestFileType(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestFileType(), i_record_number);
        
    } // getGuestFileType

    // Returns the guest record avatar
    getGuestAvatar(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestAvatar(), i_record_number);
        
    } // getGuestAvatar

    // Returns the guest record email
    getGuestEmail(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestEmail(), i_record_number);
        
    } // getGuestEmail

    // Returns the guest record telephone
    getGuestTelephone(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestTelephone(), i_record_number);
        
    } // getGuestTelephone

    // Returns the guest record status
    getGuestStatus(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestStatus(), i_record_number);
        
    } // getGuestStatus

    // Returns true if the guest record status is pending record in XML uploaded
    isGuestStatusPendingRecordInUpdate(i_record_number)
    {
        if (this.getGuestStatus(i_record_number) == JazzGuestsXml.statusPendingRecordInUploaded())
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isGuestStatusPendingRecordInUpdate

    // Returns true if the guest record status is added or checked by an administrator
    isGuestStatusAddedOrCheckedByAdmin(i_record_number)
    {
        if (this.getGuestStatus(i_record_number) == JazzGuestsXml.statusAdminAddedOrChecked())
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isGuestStatusAddedOrCheckedByAdmin

    // Returns true if the guest record status is TEST added or checked by an administrator 
    isGuestStatusTestAddedOrCheckedByAdmin(i_record_number)
    {
        if (this.getGuestStatus(i_record_number) == JazzGuestsXml.statusTestAdminAddedOrChecked())
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isGuestStatusTestAddedOrCheckedByAdmin

    // Returns true if the guest record status is uploaded by guest directly to homepage
    isGuestStatusUploadedByGuestToHomepage(i_record_number)
    {
        if (this.getGuestStatus(i_record_number) == JazzGuestsXml.statusUserUploadedRecordToHomepage())
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isGuestStatusUploadedByGuestToHomepage

    // Returns the guest record publish flag as string
    getGuestPublish(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestPublish(), i_record_number);
        
    } // getGuestPublish

    // Returns the guest record publish flag as boolean
    getGuestPublishBool(i_record_number)
    {
        var flag_str = this.getGuestPublish(i_record_number);

        if ("TRUE" == flag_str)
        {
            return true;
        }
        else
        {
            return false;
        }
        
    } // getGuestPublishBool

    // Returns the guest record registration as string
    getGuestRegNumber(i_record_number)
    {
        return this.getGuestNodeValue(this.m_tags.getGuestRegNumber(), i_record_number);
        
    } // getGuestRegNumber

    // Returns the guest record registration as integer
    getGuestRegNumberInt(i_record_number)
    {
        var node_value_str = this.getGuestRegNumber(i_record_number);

        return parseInt(node_value_str);
        
    } // getGuestRegNumberInt

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Get Guest Data //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Set Guest Data ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the guest record year
    setGuestYear(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestYear(), i_record_number, i_node_value);
        
    } // setGuestYear


    // Sets the guest record month
    setGuestMonth(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestMonth(), i_record_number, i_node_value);
        
    } // setGuestMonth

    // Sets the guest record day
    setGuestDay(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestDay(), i_record_number, i_node_value);
        
    } // setGuestDay

    // Sets the guest record band
    setGuestBand(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestBand(), i_record_number, i_node_value);
        
    } // setGuestBand

    // Sets the guest record musicians
    setGuestMusicians(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestMusicians(), i_record_number, i_node_value);
        
    } // setGuestMusicians

    // Sets the guest record header
    setGuestHeader(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestHeader(), i_record_number, i_node_value);
        
    } // setGuestHeader

    // Sets the guest record text
    setGuestText(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestText(), i_record_number, i_node_value);
        
    } // setGuestText

    // Sets the guest record names
    setGuestNames(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestNames(), i_record_number, i_node_value);
        
    } // setGuestNames

    // Sets the guest record remark
    setGuestRemark(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestRemark(), i_record_number, i_node_value);
        
    } // setGuestRemark

    // Sets the guest record file name
    setGuestFileName(i_record_number, i_node_value)
    {
        return this.setGuestNodeValue(this.m_tags.getGuestFileName(), i_record_number, i_node_value);
        
    } // setGuestFileName

   // Sets the guest record file type
   setGuestFileType(i_record_number, i_node_value)
   {
       return this.setGuestNodeValue(this.m_tags.getGuestFileType(), i_record_number, i_node_value);
       
   } // setGuestFileType

   // Sets the guest record avatar
   setGuestAvatar(i_record_number, i_node_value)
   {
       return this.setGuestNodeValue(this.m_tags.getGuestAvatar(), i_record_number, i_node_value);
       
   } // setGuestAvatar

   // Sets the guest record email
   setGuestEmail(i_record_number, i_node_value)
   {
       return this.setGuestNodeValue(this.m_tags.getGuestEmail(), i_record_number, i_node_value);
       
   } // setGuestEmail

   // Sets the guest record telephone
   setGuestTelephone(i_record_number, i_node_value)
   {
        return this.setGuestNodeValue(this.m_tags.getGuestTelephone(), i_record_number, i_node_value);
        
   } // setGuestTelephone   

   // Sets the guest record status
   setGuestStatus(i_record_number, i_node_value)
   {
        return this.setGuestNodeValue(this.m_tags.getGuestStatus(), i_record_number, i_node_value);
        
   } // setGuestStatus  

   // Sets the guest record status to pending record in XMK update
   setGuestStatusPendingRecordInUpdate(i_record_number)
   {
        return this.setGuestNodeValue(this.m_tags.getGuestStatus(), i_record_number, JazzGuestsXml.statusPendingRecordInUploaded());
        
   } // setGuestStatusPendingRecordInUpdate  

   // Sets the guest record status to added or checked by an administrator
   setGuestStatusAddedOrCheckedByAdmin(i_record_number)
   {
        return this.setGuestNodeValue(this.m_tags.getGuestStatus(), i_record_number, JazzGuestsXml.statusAdminAddedOrChecked());
        
   } // setGuestStatusAddedOrCheckedByAdmin

   // Sets the guest record status to uploaded directly to homepage by guest
   setGuestStatusUploadedByGuestToHomepage(i_record_number)
   {
        return this.setGuestNodeValue(this.m_tags.getGuestStatus(), i_record_number, JazzGuestsXml.statusUserUploadedRecordToHomepage());
        
   } // setGuestStatusUploadedByGuestToHomepage

   // Sets the guest record status to TEST added or checked by an administrator
   setGuestStatusTestAddedOrCheckedByAdmin(i_record_number)
   {
        return this.setGuestNodeValue(this.m_tags.getGuestStatus(), i_record_number, JazzGuestsXml.statusTestAdminAddedOrChecked());
        
   } // setGuestStatusTestAddedOrCheckedByAdmin	

   // Sets the guest record publish flag as string
   setGuestPublish(i_record_number, i_node_value)
   {
       return this.setGuestNodeValue(this.m_tags.getGuestPublish(), i_record_number, i_node_value);
       
   } // setGuestPublish

   // Sets the guest record publish flag as string
   setGuestPublishBool(i_record_number, i_node_value_boolean)
   {
      if (i_node_value_boolean)
      {
          this.setGuestPublish(i_record_number, "TRUE");
      }
      else
      {
          this.setGuestPublish(i_record_number, "FALSE");
      }
       
   } // setGuestPublishBool

   // Sets the guest record registration number as string
   setGuestRegNumber(i_record_number, i_node_value)
   {
       return this.setGuestNodeValue(this.m_tags.getGuestRegNumber(), i_record_number, i_node_value);
       
   } // setGuestRegNumber

   // Sets the guest record registration number as int
   setGuestRegNumberInt(i_record_number, i_node_value_int)
   {
       var node_value_str = i_node_value_int.toString();

       return this.setGuestRegNumber(i_record_number, node_value_str);
       
   } // setGuestRegNumberInt

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Set Guest Data //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Append Guest Node  ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

	// https://www.webdeveloper.com/forum/d/231973-append-xml-node-in-javascript/3

	// Appends a guest node   
    appendGuestNode()
    {
        var new_guest = this.getXmlObject().createElement(this.m_tags.getGuest());

        var year_node = this.getXmlObject().createElement(this.m_tags.getGuestYear());
        var year_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        year_node.appendChild(year_text);
        new_guest.appendChild(year_node);

        var month_node = this.getXmlObject().createElement(this.m_tags.getGuestMonth());
        var month_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        month_node.appendChild(month_text);
        new_guest.appendChild(month_node);

        var day_node = this.getXmlObject().createElement(this.m_tags.getGuestDay());
        var day_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        day_node.appendChild(day_text);
        new_guest.appendChild(day_node);

        var band_node = this.getXmlObject().createElement(this.m_tags.getGuestBand());
        var band_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        band_node.appendChild(band_text);
        new_guest.appendChild(band_node);

        var musicians_node = this.getXmlObject().createElement(this.m_tags.getGuestMusicians());
        var musicians_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        musicians_node.appendChild(musicians_text);
        new_guest.appendChild(musicians_node);

        var header_node = this.getXmlObject().createElement(this.m_tags.getGuestHeader());
        var header_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        header_node.appendChild(header_text);
        new_guest.appendChild(header_node);

        var text_node = this.getXmlObject().createElement(this.m_tags.getGuestText());
        var text_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        text_node.appendChild(text_text);
        new_guest.appendChild(text_node);

        var names_node = this.getXmlObject().createElement(this.m_tags.getGuestNames());
        var names_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        names_node.appendChild(names_text);
        new_guest.appendChild(names_node);

        var remark_node = this.getXmlObject().createElement(this.m_tags.getGuestRemark());
        var remark_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        remark_node.appendChild(remark_text);
        new_guest.appendChild(remark_node);

        var file_name_node = this.getXmlObject().createElement(this.m_tags.getGuestFileName());
        var file_name_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        file_name_node.appendChild(file_name_text);
        new_guest.appendChild(file_name_node);

        var file_type_node = this.getXmlObject().createElement(this.m_tags.getGuestFileType());
        var file_type_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        file_type_node.appendChild(file_type_text);
        new_guest.appendChild(file_type_node);

        var avatar_node = this.getXmlObject().createElement(this.m_tags.getGuestAvatar());
        var avatar_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        avatar_node.appendChild(avatar_text);
        new_guest.appendChild(avatar_node);

        var email_node = this.getXmlObject().createElement(this.m_tags.getGuestEmail());
        var email_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        email_node.appendChild(email_text);
        new_guest.appendChild(email_node);

        var telephone_node = this.getXmlObject().createElement(this.m_tags.getGuestTelephone());
        var telephone_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        telephone_node.appendChild(telephone_text);
        new_guest.appendChild(telephone_node);

        var status_node = this.getXmlObject().createElement(this.m_tags.getGuestStatus());
        var status_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        status_node.appendChild(status_text);
        new_guest.appendChild(status_node);

        var publish_node = this.getXmlObject().createElement(this.m_tags.getGuestPublish());
        var publish_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        publish_node.appendChild(publish_text);
        new_guest.appendChild(publish_node);

        var reg_number_node = this.getXmlObject().createElement(this.m_tags.getGuestRegNumber());
        var reg_number_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        reg_number_node.appendChild(reg_number_text);
        new_guest.appendChild(reg_number_node);

        this.getXmlObject().documentElement.appendChild(new_guest);	

    } // appendGuestNode
	   
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Append Guest Node  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Delete Guest Node  ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

	// Deletes a guest node   
    deleteGuestNode(i_record_number)
    {
        if (!this.checkJazzGuestsXml()){ return false; }

        var n_records = this.getNumberOfGuestRecords();
        
        if (i_record_number < 1 || i_record_number > n_records)
        {
            alert("JazzGuestsXml.deleteGuestNode Record number is not between 1 and " + n_records.toString());
            return false;		
        }

        var guest_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getGuest());

        var guest_rec_node = guest_rec_nodes[i_record_number-1];

        guest_rec_node.parentNode.removeChild(guest_rec_node);

    } // deleteGuestNode

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Delete Guest Node  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Utility Functions /////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Initialize the last (appended) gust node for a file of type IMG
    initAppendedForImg()
    {
        var n_records = this.getNumberOfGuestRecords();

        var current_date = new Date();
        var current_year = current_date.getFullYear();
        var current_month = current_date.getMonth() + 1;
        var current_day = current_date.getDate();

        this.setGuestYear(n_records, current_year.toString());

        this.setGuestMonth(n_records, current_month.toString());

        this.setGuestDay(n_records, current_day.toString());

        this.setGuestFileType(n_records, "IMG");

        this.setGuestPublishBool(n_records, false);

        this.setGuestRegNumberInt(n_records, this.getNextRegNumberInt());

    } // initAppendedForImg

    getNextRegNumberInt()
    {
        var n_records = this.getNumberOfGuestRecords();

        var max_record_number = -1;

        for (var record_number=1; record_number <= n_records; record_number++)
        {
            var reg_number_str = this.getGuestRegNumber(record_number);

            if (reg_number_str.length > 1) // Only last one may not be set
            {
                var reg_number_int = this.getGuestRegNumberInt(record_number);

                if (reg_number_int > max_record_number)
                {
                    max_record_number = reg_number_int;
                }

            } // defined
        } // record_number

        var ret_number_int = max_record_number + 1;

        return ret_number_int;

    } // getNextRegNumberInt

    // Get an array of record numbers with file type IMG that can be published
    getRecordsImageArray()
    {
        var record_numbers_image_array = [];
    
        var index_out = -1;
    
        var n_records = this.getNumberOfGuestRecords();
    
        for (var record_number=1; record_number <= n_records; record_number++)
        {
    
            var file_type =  this.getGuestFileType(record_number);

            var record_publish =  this.getGuestPublish(record_number);
    
            if (file_type == 'IMG' && record_publish == "TRUE")
            {
                index_out = index_out + 1;
    
                record_numbers_image_array[index_out] = record_number;
            }
           
        } // record_number
    
        if (index_out == -1)
        {
            alert("JazzGuestsXml.getRecordsImageArray failed");
    
            return null;
        }

        return record_numbers_image_array;
    
    } // getRecordsImageArray

    // Get an array of JazzGuest records with the file type IMG that can be published
    getJazzGuestArray()
    {
        var jazz_guest_record_array = [];
    
        var index_out = -1;
    
        var n_records = this.getNumberOfGuestRecords();
    
        for (var record_number=1; record_number <= n_records; record_number++)
        {
    
            var file_type =  this.getGuestFileType(record_number);

            var record_publish =  this.getGuestPublish(record_number);
    
            if (file_type == 'IMG' && record_publish == "TRUE")
            {
                var jazz_guest_record = new JazzGuest();

                jazz_guest_record.setJazzGuestRecord(this, record_number);

                index_out = index_out + 1;
    
                jazz_guest_record_array[index_out] = jazz_guest_record;
            }
           
        } // record_number
    
        if (index_out == -1)
        {
            alert("JazzGuestsXml.getRecordsImageArray failed");
    
            return null;
        }

        return jazz_guest_record_array;
    
    } // getRecordsImageArray

    // Get string array with all headers
    getHeaderArray()
    {
        var record_header_array = [];
    
        var n_records = this.getNumberOfGuestRecords();
    
        for (var record_number=1; record_number <= n_records; record_number++)
        {
    
            var header_txt =  this.getGuestHeader(record_number);

            record_header_array[record_number - 1] = header_txt;

        }

        return record_header_array;

    } // getHeaderArray

    // Returns the record number for a given registration number <JazzGuestRegNumber>
    // Returns negative number if a record not is found
    getRecordNumberForRegistrationNumber(i_registration_number)
    {
        var ret_record_number = -1;

        var n_records = this.getNumberOfGuestRecords();
    
        for (var record_number=1; record_number <= n_records; record_number++)
        {
    
            var registration_number =  this.getGuestRegNumber(record_number);

            if (registration_number == i_registration_number)
            {
                ret_record_number = record_number;

                break;
            }
            
        }

        return ret_record_number;

    } // getRecordNumberForRegistrationNumber

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Member Utility Functions ////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadOneXmlFile(i_object_xml, i_path_file_name_xml, i_callback_function_name)
    {
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
            alert("Error 404: File " + i_path_file_name_xml + " not found" );
        }	
    };
    
    // Open the file
    jazz_xmlhttp.open("GET", i_path_file_name_xml, true);
    
    jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
        
    jazz_xmlhttp.send();	

    } // loadOneXmlFile

    ///////////////////////////////////////////////////////////////////////////
    /////// End Load Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Guest Items  ///////////////////////
    //////////////////////////////////////////////////////////////////////////

    // Returns the number of guest records
    getNumberOfGuestRecords()
    {
        var ret_n_records = -1;

        if (!this.checkJazzGuestsXml()){ return ret_n_records; }

        var guest_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getGuest());

        ret_n_records = guest_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfGuestRecords
  

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Guest Items //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Record Node Value  ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the guest node value for a given guest record number and a tag name
    getGuestNodeValue(i_record_tag, i_record_number)
    {
        var ret_data = '';
        
        if (!this.checkJazzGuestsXml()){ return ret_data; }

        var n_records = this.getNumberOfGuestRecords();
        
        if (i_record_number < 1 || i_record_number > n_records)
        {
            alert("JazzGuestsXml.getNodeValue Record number is not between 1 and " + n_records.toString());
            return ret_data;		
        }
            
        var guest_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getGuest());

        var guest_rec_node = guest_rec_nodes[i_record_number-1];
        
        var xml_node_value = this.getNodeValueTagName(guest_rec_node, i_record_tag);
        
        ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
        
        return ret_data;
        
    } // getGuestNodeValue

    // Sets the guest node value for a given guest record number and a tag name
    setGuestNodeValue(i_record_tag, i_record_number, i_guest_record_node_value)
    {	
        if (!this.checkJazzGuestsXml()){ return; }

        var n_records = this.getNumberOfGuestRecords();
        
        if (i_record_number < 1 || i_record_number > n_records)
        {
            alert("JazzGuestsXml.setJazzTaskNodeValue Record number is not between 1 and " + n_records.toString());
            
            return;		
        }
            
        var guest_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getGuest());

        var guest_rec_node = guest_rec_nodes[i_record_number-1];
        
        var node_value = this.setFlagNodeValueIsNotSetForEmptyString(i_guest_record_node_value);
        
        this.setNodeValue(guest_rec_node, i_record_tag, node_value);
        
    } // setGuestNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Record Node Value  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////  

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start XML Node Values  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the node value. Input is an XML node and the tag name
    getNodeValueTagName(i_node, i_xml_tag)
    {	
        return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
        
    } // getNodeValueTagName

    // Returns the node value. Input is an XML node 
    getNodeValue(i_node)
    {	
        return i_node.childNodes[0].nodeValue;
        
    } // getNodeValue

    // Sets a node value. Input is an XML node, the tag name and the node value
    setNodeValue(i_node, i_xml_tag, i_node_value)
    {	
        i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue = i_node_value;
        
    } // setNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End XML Node Values  ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Not Set Values  ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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

    // Returns empty string if i_node_value is equal to m_not_yet_set_node_value
    removeFlagNodeValueNotSet(i_node_value)
    {
        if (!this.nodeValueIsSet(i_node_value))
        {
            return "";
        }
        
        return i_node_value; 
        
    } // removeFlagNodeValueNotSet

    // Return flag (string) g_not_yet_set_node_value if input string is empty
    setFlagNodeValueIsNotSetForEmptyString(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // setFlagNodeValueIsNotSetForEmptyString

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Not Set Values  /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the XML jazz guests file name and path
    getXmlJazzGuestsFileName()
    {
        var ret_file_name = '';

        var level_xml_str = '';

        if (0 == this.m_n_level_xml)
        {
            level_xml_str = 'XML/';
        }
        else if (1 == this.m_n_level_xml)
        {
            level_xml_str = '../XML/';
        }
        else if (2 == this.m_n_level_xml)
        {
            level_xml_str = '../../XML/';
        }
        else if (3 == this.m_n_level_xml)
        {
            level_xml_str = '../../../XML/';
        }
        else
        {
            alert("JazzGuestsXml.getXmlJazzGuestsFileName i_n_level= " + 
            this.m_n_level_xml.toString() + " not between 0 and 3");

            return ret_file_name;
        }

        if (this.m_b_update_xml)
        {
            var level_uploaded_str = level_xml_str.replace('XML', 'JazzGuests') + 'Uploaded/';
            ret_file_name = level_uploaded_str + 'JazzGuestsUploaded.xml';
        }
        else
        {
            ret_file_name = level_xml_str + 'JazzGuests.xml';
        }

        if (!JazzGuestsXml.execApplicationOnServer())
        {
            var level_test_str = '';

            if (2 == this.m_n_level_xml)
            {
                level_test_str = '../';
            }
            else if (3 == this.m_n_level_xml)
            {
                level_test_str = '../../';
            }

            if (this.m_b_update_xml)
            {
                return level_test_str + this.m_xml_file_name_upload_local;
            }
            else
            {
                return level_test_str + this.m_xml_file_name_local;
            }   
        }        

        return ret_file_name;

    } // getXmlJazzGuestsFileName

    // Check that the season program XML object is set
    checkJazzGuestsXml()
    {      
        if (null == this.getXmlObject())
        {
            alert("JazzGuestsXml.checkJazzGuestsXml Jazz guests XML object is null");

            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkJazzGuestsXml

    // Returns true if the application runs on the server
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        var server_url = 'jazzliveaarau.ch';

        var index_url = current_base.indexOf(server_url);

        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }

    } // execApplicationOnServer    

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // JazzGuestsXml

// Class defining the tags of the XML jazz guest file
class JazzGuestsTags 
{
    // Creates the instance of the class
    constructor() 
    {
        this.m_tag_guests = "HomepageJazzGuests";
        this.m_tag_guest = "JazzGuest";
        this.m_tag_guest_year = "JazzGuestYear";
        this.m_tag_guest_month = "JazzGuestMonth";
        this.m_tag_guest_day = "JazzGuestDay";
        this.m_tag_guest_band = "JazzGuestBand";
        this.m_tag_guest_musicians = "JazzGuestMusicians";
        this.m_tag_guest_header = "JazzGuestHeader";
        this.m_tag_guest_text = "JazzGuestText";
        this.m_tag_guest_names = "JazzGuestNames";
        this.m_tag_guest_remark = "JazzGuestRemark";
        this.m_tag_guest_file_name = "JazzGuestFileName";
        this.m_tag_guest_file_type = "JazzGuestFileType";
        this.m_tag_guest_avatar = "JazzGuestAvatar";
        this.m_tag_guest_email = "JazzGuestEmail";
        this.m_tag_guest_telephone = "JazzGuestTelephone";
        this.m_tag_guest_status = "JazzGuestStatus";
        this.m_tag_guest_publish = "JazzGuestPublish";
        this.m_tag_guest_number = "JazzGuestRegNumber";

    } // constructor

    // Get member variable functions
    // =============================

    getGuest(){return this.m_tag_guest;} 
    getGuestYear(){return this.m_tag_guest_year;} 
    getGuestMonth(){return this.m_tag_guest_month;} 
    getGuestDay(){return this.m_tag_guest_day;} 
    getGuestBand(){return this.m_tag_guest_band;} 
    getGuestMusicians(){return this.m_tag_guest_musicians;} 
    getGuestHeader(){return this.m_tag_guest_header;} 
    getGuestText(){return this.m_tag_guest_text;} 
    getGuestNames(){return this.m_tag_guest_names;} 
    getGuestRemark(){return this.m_tag_guest_remark;} 
    getGuestFileName(){return this.m_tag_guest_file_name;}
    getGuestFileType(){return this.m_tag_guest_file_type;}
    getGuestAvatar(){return this.m_tag_guest_avatar;}
    getGuestEmail(){return this.m_tag_guest_email;}
    getGuestTelephone(){return this.m_tag_guest_telephone;} 
    getGuestStatus(){return this.m_tag_guest_status;}
    getGuestPublish(){return this.m_tag_guest_publish;}
    getGuestRegNumber(){return this.m_tag_guest_number;}

} // JazzGuestsTags


// File: JazzGuestSearch.js
// Date: 2023-12-06
// Author: Gunnar Lidén

// File content
// =============
//
// Class handling the search for jazz guest images. 

class JazzGuestSearch
{
    // Creates the instance of the class
    constructor(i_jazz_guests_obj)
    {
        // Member variables
        // ================

        // The result of the search: A list of photo data objects
        this.m_result_list = new PhotoDataList();

        // The XML object corresponding to file 
        this.m_jazz_guests_obj = i_jazz_guests_obj;

        // Search string
        this.m_search_str = "";

        // Search words array
        this.m_search_words_array = [];

        // Flag telling if only published <JazzGuestPublish> shall be searched
        this.m_only_published = true;

        // Include <JazzGuestBand> in the search
        this.m_include_band = true; 

        // Include <JazzGuestMusicians> in the search
        this.m_include_musicians = true; 

        // Include <JazzGuestNames> in the search
        this.m_include_names = true; 

        // Include <JazzGuestHeader> in the search
        this.m_include_header = false; 

        // Include <JazzGuestText> in the search
        this.m_include_text = false; 

        // Include <JazzGuestRemark> in the search
        this.m_include_remark = false; 

        // Include <JazzGuestYear> in the search
        this.m_include_year = false; 

    } // constructor

    // Set include <JazzGuestBand> in the search
    setIncludeBand(i_include_band)
    {
        this.m_include_band = i_include_band;

    } //setIncludeBand

    // Returns true if <JazzGuesBand> shall be included in the search
    includeBand()
    {
        return this.m_include_band;

    } // includeBand

    // Set include <JazzGuestMusicians> in the search
    setIncludeMusicians(i_include_musicians)
    {
        this.m_include_musicians = i_include_musicians;

    } //setIncludeMusicians

    // Returns true if <JazzGuestMusicians> shall be included in the search
    includeMusicians()
    {
        return this.m_include_musicians;

    } // includeMusicians

    // Set include <JazzGuestNames> in the search
    setIncludeNames(i_include_names)
    {
        this.m_include_names = i_include_names;

    } //setIncludeNames

    // Returns true if <JazzGuestNames> shall be included in the search
    includeNames()
    {
        return this.m_include_names;

    } // includeNames

    // Set include <JazzGuestHeader> in the search
    setIncludeHeader(i_include_header)
    {
        this.m_include_header = i_include_header;

    } // setIncludeHeader

    // Returns true if <JazzGuestHeader> shall be included in the search
    includeHeader()
    {
        return this.m_include_header;
        
    } // includeHeader

    // Set include <JazzGuestText> in the search
    setIncludeText(i_include_text)
    {
        this.m_include_text = i_include_text;

    } // setIncludeText

    // Returns true if <JazzGuestText> shall be included in the search
    includeText()
    {
        return this.m_include_text;
        
    } // includeText

    // Set include <JazzGuestRemark> in the search
    setIncludeRemark(i_include_remark)
    {
        this.m_include_remark = i_include_remark;

    } // setIncludeRemark

    // Returns true if <JazzGuestRemark> shall be included in the search
    includeRemark()
    {
        return this.m_include_remark;
        
    } // includeRemark

    // Set include <JazzGuestYear> in the search
    setIncludeYear(i_include_year)
    {
        this.m_include_year = i_include_year;

    } // setIncludeYear

    // Returns true if <JazzGuestYear> shall be included in the search
    includeYear()
    {
        return this.m_include_year;
        
    } // includeYear

    // Member functions
    // ================

     // Executes the search and returns a list of found photos (photo data objects)
     // 1. Initialization. Call of PhotoData.init
     // 2. Search. Call of executeNoInit
    execute(i_search_str)
    {
        this.m_result_list.init();

        this.executeNoInit(i_search_str);

    } // execute

    // Executes the search and returns a list of found photos (photo data objects)
    // 1. Chack the search string. Call UtilSearch.checkSearchString 
    // 2. Set the search string and the array of search words. Call of setSearchStringAndArray
    // 3. Check that XML object is created
    // 4. Loop for all concert seasons. Call of getNumberOfSeasonPrograms
    executeNoInit(i_search_str)
    {

        if (!UtilSearch.checkSearchString(i_search_str))
        {
            return this.m_result_list;
        }

        this.setSearchStringAndArray(i_search_str);

        if (null == this.m_jazz_guests_obj)
        {
            alert("JazzGuestSearch.execute Jazz Guests XML object is null");

            return this.m_result_list;
        }

        var n_guest_records = this.m_jazz_guests_obj.getNumberOfGuestRecords();

        var result_guest_numbers = [];

        var n_records_found = 0;

        for (var record_number=1; record_number <= n_guest_records; record_number++)
        {
            var b_publish =  this.m_jazz_guests_obj.getGuestPublishBool(record_number);

            if (b_publish)
            {
                if (this.includeNames())
                {
                    var guest_names = this.m_jazz_guests_obj.getGuestNames(record_number);

                    if (UtilSearch.searchCriterionFulfilled(guest_names, this.m_search_words_array))
                    {
                        result_guest_numbers[n_records_found] = record_number;
        
                        n_records_found = n_records_found + 1;
                    }

                } // includeNames

                if (this.includeMusicians())
                {
                    var musician_names = this.m_jazz_guests_obj.getGuestMusicians(record_number);

                    if (UtilSearch.searchCriterionFulfilled(musician_names, this.m_search_words_array))
                    {
                        result_guest_numbers[n_records_found] = record_number;
        
                        n_records_found = n_records_found + 1;
                    }

                } // includeMusicians

                if (this.includeBand())
                {
                    var band_name = this.m_jazz_guests_obj.getGuestBand(record_number);

                    if (UtilSearch.searchCriterionFulfilled(band_name, this.m_search_words_array))
                    {
                        result_guest_numbers[n_records_found] = record_number;
        
                        n_records_found = n_records_found + 1;
                    }

                } // includeBand

                if (this.includeHeader())
                {
                    var header_txt = this.m_jazz_guests_obj.getGuestHeader(record_number);

                    if (UtilSearch.searchCriterionFulfilled(header_txt, this.m_search_words_array))
                    {
                        result_guest_numbers[n_records_found] = record_number;
        
                        n_records_found = n_records_found + 1;
                    }

                } // includeHeader

                if (this.includeText())
                {
                    var text_txt = this.m_jazz_guests_obj.getGuestText(record_number);

                    if (UtilSearch.searchCriterionFulfilled(text_txt, this.m_search_words_array))
                    {
                        result_guest_numbers[n_records_found] = record_number;
        
                        n_records_found = n_records_found + 1;
                    }

                } // includeText

                if (this.includeRemark())
                {
                    var remark_txt = this.m_jazz_guests_obj.getGuestRemark(record_number);

                    if (UtilSearch.searchCriterionFulfilled(remark_txt, this.m_search_words_array))
                    {
                        result_guest_numbers[n_records_found] = record_number;
        
                        n_records_found = n_records_found + 1;
                    }

                } // includeRemark

                if (this.includeYear())
                {
                    var year_txt = this.m_jazz_guests_obj.getGuestYear(record_number);

                    if (UtilSearch.searchCriterionFulfilled(year_txt, this.m_search_words_array))
                    {
                        result_guest_numbers[n_records_found] = record_number;
        
                        n_records_found = n_records_found + 1;
                    }

                } // includeYear

            } // b_publish

        } // guest_record

        var n_guest_images = result_guest_numbers.length;

        for (var guest_image_index = 0; guest_image_index < n_guest_images; guest_image_index++)
        {
            var guest_number = result_guest_numbers[guest_image_index];
    
            var photo_data = UtilSearch.getPhotoDataForGuestImage(this.m_jazz_guests_obj, guest_number);		
    
            if (photo_data != null)
            {
                this.m_result_list.appendPhotoData(photo_data);
            }
    
        } // guest_image_index      
        
        return this.m_result_list;

    } // execute

     // Executes the search and returns a list of found photos (photo data objects)
     // Input data is an array of search strings e.g. an array of musician names.
    executeArray(i_search_str_array)
    {
        this.m_result_list.init();

        if (null == i_search_str_array)
        {
            alert("JazzGuestSearch.executeArray Input search string array is null");

            return null;
        }
        if (0 == i_search_str_array.length)
        {
            alert("JazzGuestSearch.executeArray Input search string array is empty");

            return null;
        }

        for (var index_str=0; index_str < i_search_str_array.length; index_str++)
        {
            var search_str = i_search_str_array[index_str];

            this.executeNoInit(search_str);
        }

        return this.m_result_list;

    } // executeArray

    // Initialize the array of photos (photo data objects) found by searching
    // (clear/empty the array)
    init()
    {
        this.m_photo_data_array = [];

    } // init    

    // Get and set functions for the member variables
    // ==============================================

    // Returns the search string
    getSearchString() { return this.m_search_str;} 

    // Sets the search string and the array of search words
    setSearchStringAndArray(i_search_str) 
    { 
        this.m_search_str = i_search_str;

        this.m_search_words_array = UtilSearch.getSearchWordArray(i_search_str);

    } // setSearchStringAndArray

} // JazzGuestSearch

// File: JazzGuestRecord.js
// Date: 2024-03-12
// Author: Gunnar Lidén

// File content
// =============
//
// Record (class) corresponding to one <JazzGuest> in JazzGuests.xml and JazzGuestsUploaded.xml
//

class JazzGuest
{
    constructor()
    {
        // Member variables (fields)
        // =========================

        // <JazzGuestHeader>
        this.m_header = '';

        // <JazzGuestText>
        this.m_text = '';

        // <JazzGuestNames>
        this.m_names = '';

        // <JazzGuestFileName>
        this.m_file_name = '';

        // <JazzGuestFileType>
        this.m_file_type = '';

        // <JazzGuestStatus>
        this.m_status = '';

        // <JazzGuestBand>
        this.m_band = '';

        // <JazzGuestMusicians>
        this.m_musicians = '';

        // <JazzGuestYear>
        this.m_year = '';

        // <JazzGuestMonth>
        this.m_month = '';

        // <JazzGuestDay>
        this.m_day = '';

        // <JazzGuestRemark>
        this.m_remark = '';

        // <JazzGuestAvatar>
        this.m_avatar = '';

        // <JazzGuestEmail>
        this.m_email = '';

        // <JazzGuestTelephone>
        this.m_telephone = '';

        // <JazzGuestPublish>
        this.m_publish = '';

        // <JazzGuestRegNumber>
        this.m_reg_number = '';

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Get Guest Data ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Get <JazzGuestHeader>
    getHeader()
    {
        return this.m_header;

    } // getHeader

    // Get <JazzGuestText>
    getText()
    {
        return this.m_text;

    } // getText

    // Get <JazzGuestNames>
    getNames()
    {
        return this.m_names;

    } // getNames

    // Get <JazzGuestFileName>
    getFileName()
    {
        return this.m_file_name;

    } // getFileName

    // Get <JazzGuestFileType>
    getFileType()
    {
        return this.m_file_type;

    } // getFileType

    // Get <JazzGuestStatus>
    getStatus()
    {
        return this.m_status;

    } // getStatus

    // Get <JazzGuestBand>
    getBand()
    {
        return this.m_band;

    } // getBand

    // Get <JazzGuestMusicians>
    getMusicians()
    {
        return this.m_musicians;

    } // getMusicians

    // Get <JazzGuestYear>
    getYear()
    {
        return this.m_year;

    } // getYear

    // Get <JazzGuestMonth>
    getMonth()
    {
        return this.m_month;

    } // getMonth

    // Get <JazzGuestDay>
    getDay()
    {
        return this.m_day;

    } // getDay

    // Get <JazzGuestRemark>
    getRemark()
    {
        return this.m_remark;

    } // getRemark

    // Get <JazzGuestAvatar>
    getAvatar()
    {
        return this.m_avatar;

    } // getAvatar

    // Get <JazzGuestEmail>
    getEmail()
    {
        return this.m_email;

    } // getEmail

    // Get <JazzGuestTelephone>
    getTelephone()
    {
        return this.m_telephone;

    } // getTelephone

    // Get <JazzGuestPublish> as string
    getPublish()
    {
        return this.m_publish;

    } // getPublish

    // Get <JazzGuestPublish> as boolean
    getPublishBool()
    {
        if (this.getPublish() == 'TRUE')
        {
            return true;
        }
        else
        {
            return false;
        }

    } // getPublishBool

    // Get <JazzGuestRegNumber>
    getRegNumber()
    {
        return this.m_reg_number;

    } // getRegNumber

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Get Guest Data //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Set Guest Data ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Set <JazzGuestHeader>
    setHeader(i_header)
    {
        this.m_header = i_header;

    } // setHeader

    // Set <JazzGuestText>
    setText(i_text)
    {
        this.m_text = i_text;

    } // setText

    // Set <JazzGuestNames>
    setNames(i_names)
    {
        this.m_names = i_names;

    } // setNames

    // Set <JazzGuestFileName>
    setFileName(i_file_name)
    {
        this.m_file_name = i_file_name;

    } // setFileName

    // Set <JazzGuestFileType>
    setFileType(i_file_type)
    {
        this.m_file_type = i_file_type;

    } // setFileType

    // Set <JazzGuestStatus>
    setStatus(i_status)
    {
        this.m_status = i_status;

    } // setStatus

    // Set <JazzGuestBand>
    setBand(i_band)
    {
        this.m_band = i_band;

    } // setBand

    // Set <JazzGuestMusicians>
    setMusicians(i_musicians)
    {
        this.m_musicians = i_musicians;

    } // setMusicians

    // Set <JazzGuestYear>
    setYear(i_year)
    {
        this.m_year = i_year;

    } // setYear

    // Set <JazzGuestMonth>
    setMonth(i_month)
    {
        this.m_month = i_month;

    } // setMonth

    // Set <JazzGuestDay>
    setDay(i_day)
    {
        this.m_day = i_day;

    } // setDay

    // Set <JazzGuestRemark>
    setRemark(i_remark)
    {
        this.m_remark = i_remark;

    } // setRemark

    // Set <JazzGuestAvatar>
    setAvatar(i_avatar)
    {
        this.m_avatar = i_avatar;

    } // setAvatar

    // Set <JazzGuestEmail>
    setEmail(i_email)
    {
        this.m_email = i_email;

    } // setEmail

    // Set <JazzGuestTelephone>
    setTelephone(i_telephone)
    {
        this.m_telephone = i_telephone;

    } // setTelephone

    // Set <JazzGuestPublish> as string
    setPublish(i_publish)
    {
        this.m_publish = i_publish;

    } // setPublish

    // Set <JazzGuestPublish> as boolean
    setPublishBool(i_publish)
    {
        if (i_publish)
        {
            this.m_publish = 'TRUE';
        }
        else
        {
            this.m_publish = 'FALSE';
        }

    } // setPublishBool

    // Set <JazzGuestRegNumber>
    setRegNumber(i_reg_number)
    {
        this.m_reg_number = i_reg_number;

    } // setRegNumber

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Set Guest Data //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Utility Functions /////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Set jazz guest record with data from a guest XML object
    // i_guest_xml_object: XML object corresponding to JazzGuests.xml or JazzGuestsUploaded.xml
    // i_record_number:    Guest record number
    setJazzGuestRecord(i_guest_xml_object, i_record_number)
    {
        var unescape_str = '';

        unescape_str = UtilXml.unescapeString(i_guest_xml_object.getGuestHeader(i_record_number));

        this.setHeader(unescape_str);

        unescape_str = UtilXml.unescapeString(i_guest_xml_object.getGuestText(i_record_number));

        this.setText(unescape_str);

        unescape_str = UtilXml.unescapeString(i_guest_xml_object.getGuestNames(i_record_number));

        this.setNames(unescape_str);

        this.setFileName(i_guest_xml_object.getGuestFileName(i_record_number));

        this.setFileType(i_guest_xml_object.getGuestFileType(i_record_number));

        this.setStatus(i_guest_xml_object.getGuestStatus(i_record_number));

        this.setBand(i_guest_xml_object.getGuestBand(i_record_number));

        this.setMusicians(i_guest_xml_object.getGuestMusicians(i_record_number));

        this.setYear(i_guest_xml_object.getGuestYear(i_record_number));

        this.setMonth(i_guest_xml_object.getGuestMonth(i_record_number));

        this.setDay(i_guest_xml_object.getGuestDay(i_record_number));

        unescape_str = UtilXml.unescapeString(i_guest_xml_object.getGuestRemark(i_record_number));

        this.setRemark(unescape_str);

        this.setAvatar(i_guest_xml_object.getGuestAvatar(i_record_number));

        this.setEmail(i_guest_xml_object.getGuestEmail(i_record_number));

        this.setTelephone(i_guest_xml_object.getGuestTelephone(i_record_number));

        this.setPublish(i_guest_xml_object.getGuestPublish(i_record_number));

        this.setRegNumber(i_guest_xml_object.getGuestRegNumber(i_record_number));

    } // setJazzGuestRecord

    // Set XML object jazz guest record data
    // i_guest_xml_object: XML object corresponding to JazzGuests.xml or JazzGuestsUploaded.xml
    // i_record_number:    Guest record number
    setXmlJazzGuestRecord(i_guest_xml_object, i_record_number)
    {
        var escape_str = '';

        escape_str = UtilXml.escapeString(this.getHeader());

        i_guest_xml_object.setGuestHeader(i_record_number, escape_str);

        escape_str = UtilXml.escapeString(this.getText());

        i_guest_xml_object.setGuestText(i_record_number, escape_str);

        escape_str = UtilXml.escapeString(this.getNames());

        i_guest_xml_object.setGuestNames(i_record_number, escape_str);

        i_guest_xml_object.setGuestFileName(i_record_number, this.getFileName());

        i_guest_xml_object.setGuestFileType(i_record_number, this.getFileType());

        i_guest_xml_object.setGuestStatus(i_record_number, this.getStatus());

        i_guest_xml_object.setGuestBand(i_record_number, this.getBand());

        i_guest_xml_object.setGuestMusicians(i_record_number, this.getMusicians());

        i_guest_xml_object.setGuestYear(i_record_number, this.getYear());

        i_guest_xml_object.setGuestMonth(i_record_number, this.getMonth());

        i_guest_xml_object.setGuestDay(i_record_number, this.getDay());

        escape_str = UtilXml.escapeString(this.getRemark());

        i_guest_xml_object.setGuestRemark(i_record_number, escape_str);

        i_guest_xml_object.setGuestAvatar(i_record_number, this.getAvatar());

        i_guest_xml_object.setGuestEmail(i_record_number, this.getEmail());

        i_guest_xml_object.setGuestTelephone(i_record_number, this.getTelephone());

        i_guest_xml_object.setGuestPublish(i_record_number, this.getPublish());

        i_guest_xml_object.setGuestRegNumber(i_record_number, this.getRegNumber());

    } // setXmlJazzGuestRecord

    // Append the jazz guest record to the guest XML object
    // i_guest_xml_object: XML object corresponding to JazzGuests.xml or JazzGuestsUploaded.xml
    appendXmlJazzGuestRecord(i_guest_xml_object)
    {    
        i_guest_xml_object.appendGuestNode();

        var n_records = i_guest_xml_object.getNumberOfGuestRecords();

        this.setXmlJazzGuestRecord(i_guest_xml_object, n_records);

    } // appendXmlJazzGuestRecord

    // Returns true if records are equal
    static recordsAreEqual(i_rec_one, i_rec_two)
    {
        var ret_equal = true;

        if (i_rec_one.m_header != i_rec_two.m_header)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestHeader> not equal");
        }

        if (i_rec_one.m_text != i_rec_two.m_text)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestText> not equal");
        }

        if (i_rec_one.m_names != i_rec_two.m_names)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestNames> not equal");
        }

        if (i_rec_one.m_file_name != i_rec_two.m_file_name)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestFileName> not equal");
        }   

        if (i_rec_one.m_file_type != i_rec_two.m_file_type)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestFileType> not equal");
        }   

        if (i_rec_one.m_status != i_rec_two.m_status)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestStatus> not equal");
        }   

        if (i_rec_one.m_band != i_rec_two.m_band)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestBand> not equal");
        }   

        if (i_rec_one.m_musicians != i_rec_two.m_musicians)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestMusicians> not equal");
        }   

        if (i_rec_one.m_year != i_rec_two.m_year)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestYear> not equal");
        }   

        if (i_rec_one.m_month != i_rec_two.m_month)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestMonth> not equal");
        }   

        if (i_rec_one.m_day != i_rec_two.m_day)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestDay> not equal");
        }   

        if (i_rec_one.m_remark != i_rec_two.m_remark)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestRemark> not equal");
        }   

        if (i_rec_one.m_avatar != i_rec_two.m_avatar)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestAvatar> not equal");
        }   

        if (i_rec_one.m_email != i_rec_two.m_email)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestEmail> not equal");
        }   

        if (i_rec_one.m_telephone != i_rec_two.m_telephone)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestTelephone> not equal");
        }   

        if (i_rec_one.m_publish != i_rec_two.m_publish)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestPublish> not equal");
        } 

        if (i_rec_one.m_reg_number != i_rec_two.m_reg_number)
        {
            ret_equal = false;

            console.log("JazzGuestRecord.recordsAreEqual <JazzGuestRegNumber> not equal");
        } 

        return ret_equal;

    } // recordsAreEqual

    // Returns true if the guest record status is pending record in XML uploaded
    isGuestStatusPendingRecordInUpdate()
    {
        if (this.getStatus() == JazzGuestsXml.statusPendingRecordInUploaded())
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isGuestStatusPendingRecordInUpdate

    // Returns true if the guest record status is added or checked by an administrator
    isGuestStatusAddedOrCheckedByAdmin()
    {
        if (this.getStatus() == JazzGuestsXml.statusAdminAddedOrChecked())
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isGuestStatusAddedOrCheckedByAdmin

    // Returns true if the guest record status is TEST added or checked by an administrator 
    isGuestStatusTestAddedOrCheckedByAdmin()
    {
        if (this.getStatus() == JazzGuestsXml.statusTestAdminAddedOrChecked())
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isGuestStatusTestAddedOrCheckedByAdmin

    // Returns true if the guest record status is uploaded by guest directly to homepage
    isGuestStatusUploadedByGuestToHomepage()
    {
        if (this.getStatus() == JazzGuestsXml.statusUserUploadedRecordToHomepage())
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isGuestStatusUploadedByGuestToHomepage

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Utility Functions ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    

} // JazzGuest
// File: PhotosSearch.js
// Date: 2022-12-07
// Author: Gunnar Lidén

// File content
// =============
//
// Functions handling the search for photos
//
// Reference: https://www.w3schools.com/js/js_classes.asp

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Photo Search Class  ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class handling the search for jazz photos
class PhotosSearch
{
    // Creates the instance of the class
    constructor(i_galerie_one_xml, i_galerie_two_xml)
    {
        // Member variables
        // ================

        // Galerie one XML object
        this.m_galerie_one_xml = i_galerie_one_xml;

        // Galerie two XML object
        this.m_galerie_two_xml = i_galerie_two_xml;

        // The result of the search: A list of photo data objects
        this.m_result_list = new PhotoDataList();

        // Search string
        this.m_search_str = "";

        // Search words array
        this.m_search_words_array = [];

    } // constructor

    // Member functions
    // ================
    
    // Executes the search and returns a list of found photos (photo data objects)
    // 1. Chack the search string. Call UtilSearch.checkSearchString 
    // 2. Set the search string and the array of search words. Call of setSearchStringAndArray
    // 3. Loop for all concert seasons. Call of getNumberOfSeasonPrograms
    // 3.1 Get the season program XML object and set as active XML season program
    //     Call of getSeasonProgramXmlObject and setActiveSeasonProgramXmlObject
    // 3.2 Get the season start year. Call of getYearAutumn
    // 3.3 Loop for all season concerts. Call of getNumberOfConcerts
    // 3.3.1 Loop for all (two) XML gallery files.
    //
    // x. Set active season XML object to current season. 
    //    Call of setActiveSeasonProgramXmlToCurrentSeason
    execute(i_search_str)
    {
        this.m_result_list.init();

        if (!UtilSearch.checkSearchString(i_search_str))
        {
            return this.m_result_list;
        }    

        setActivePhotoXmlToGalleries();

        this.setSearchStringAndArray(i_search_str);

        var b_current_season = true;

        var n_seasons = getNumberOfSeasonPrograms(b_current_season);

        //n_seasons = n_seasons - 6;  // For test
    
        var loop_end = 0;
    
        //loop_end = n_seasons - 4;   // For test

        for (var index_season=n_seasons-1; index_season >= loop_end; index_season--)
        {
            var current_season_program_xml_object = getSeasonProgramXmlObject(index_season);
    
            setActiveSeasonProgramXmlObject(current_season_program_xml_object);

            var season_start_year = getYearAutumn();
    
            var n_concerts = getNumberOfConcerts();
            
            for (var concert_number=n_concerts; concert_number >= 1; concert_number--)
            {
                for (var file_number=1; file_number <= 2; file_number++)
                {
                    var active_xml_photo_object = null;
                    if (1 == file_number)
                    {
                        active_xml_photo_object = this.m_galerie_one_xml;
                    }
                    else if (2 == file_number)
                    {
                        active_xml_photo_object = this.m_galerie_two_xml;
                    }

                    if(!this.searchOneConcert(active_xml_photo_object, season_start_year, concert_number))
                    {
                        return this.m_result_list;
                    }

                } // file_number

            } // concert_number

        } // index_season

        setActiveSeasonProgramXmlToCurrentSeason();

        return this.m_result_list;

    } // execute

    // Search after photos in one concert. Found photos are added to m_result_list
    // 1. Set the active photo gallerie XML object active_xml_photo_object
    //    Call of setActivePhotoGallerieXmlObject
    searchOneConcert(i_active_xml_photo_object, i_season_start_year, i_concert_number)
    {
        var ret_bool = true;

        if (!setActivePhotoGallerieXmlObject(i_active_xml_photo_object))
        {
            ret_bool = false;

            return ret_bool;
        }

        var photo_season_number = this.getPhotoSeasonNumber(i_season_start_year);
        if (photo_season_number <= 0)
        {
            // No objects added. Not an error
            return ret_bool;
        }

        var photo_concert_number = this.getPhotoConcertNumber(photo_season_number, i_concert_number);
        if (photo_concert_number <= 0)
        {
            // No objects added. Not an error
            return ret_bool;
        }

        var photo_numbers = this.getPhotoNumbers(photo_season_number, photo_concert_number);
        if (photo_numbers.length == 0)
        {
            // No objects added. Not an error
            return ret_bool;
        }

        if (!this.appendPhotos(i_active_xml_photo_object, photo_season_number, photo_concert_number, photo_numbers))
        {
            ret_bool = false;

            return ret_bool;
        }

        return ret_bool;

    } // searchOneConcert

    // Append photos (photo data objects) to m_result_list
    appendPhotos(i_active_xml_photo_object, i_photo_season_number, i_photo_concert_number, i_photo_numbers)
    {
        var ret_bool = true;

        if (!setActivePhotoGallerieXmlObject(i_active_xml_photo_object))
        {
            ret_bool = false;

            return ret_bool;
        }

        var band_name =  getSeasonPhotoBandName(i_photo_season_number, i_photo_concert_number);

        var concert_year = getSeasonPhotoConcertYear(i_photo_season_number, i_photo_concert_number);

        var concert_month = getSeasonPhotoConcertMonth(i_photo_season_number, i_photo_concert_number);

        var concert_day = getSeasonPhotoConcertDay(i_photo_season_number, i_photo_concert_number);

        var gallery_name = getSeasonPhotoGalleryName(i_photo_season_number, i_photo_concert_number);

        var photographer_name = getSeasonPhotographerName(i_photo_season_number, i_photo_concert_number);

        var zip_file_name = getSeasonPhotoZipName(i_photo_season_number, i_photo_concert_number);

        var photo_texts = this.getPhotoTextsArray(i_photo_season_number, i_photo_concert_number);

        for (var photo_number=1; photo_number <= i_photo_numbers.length; photo_number++)
        {
            var image_number = i_photo_numbers[photo_number-1];

            var url_photo = getGalleryPhotoUrl(gallery_name, concert_year, concert_month, concert_day, image_number);

            var photo_data = new PhotoData(url_photo);

            var photo_text = photo_texts[image_number - 1];

            photo_data.setText(photo_text);

            var url_photo_small = getGalleryPhotoUrlSmall(gallery_name, concert_year, concert_month, concert_day, image_number);

            photo_data.setUrlSmall(url_photo_small);

            photo_data.setBand(band_name);

            photo_data.setYear(concert_year);

            photo_data.setMonth(concert_month);

            photo_data.setDay(concert_day);

            photo_data.setPhotographer(photographer_name);

            photo_data.setZip(zip_file_name);

            photo_data.setGalleryName(gallery_name);

            photo_data.setActivePhotoXmlName(getActivePhotoXmlName());
            
            this.m_result_list.appendPhotoData(photo_data);

        }

        return ret_bool;

    } // appendPhotos

    // Returns the photo season number for the input start year
    // Returns -1 if photo season not exists
    getPhotoSeasonNumber(i_season_start_year)
    {
        var ret_number = -1;

        var n_photo_seasons = getNumberOfPhotoSeasons();
        if (n_photo_seasons <= 0)
        {
            return ret_number;
        }

        for (var photo_season_number=1; photo_season_number <= n_photo_seasons; photo_season_number++)
        {
            var start_year = getPhotoStartYearSeason(photo_season_number);

            if (i_season_start_year == start_year)
            {
                ret_number = photo_season_number;

                break;
            }

        } // photo_season_number

        return ret_number;

    } // getPhotoSeasonNumber

    // Returns the photo concert number for the input photo season number and concert number
    // Returns -1 if photo concer not exists
    getPhotoConcertNumber(i_photo_season_number, i_concert_number)
    {
        var ret_number = -1;

        var n_photo_concerts = getNumberOfSeasonPhotoConcerts(i_photo_season_number);
        if (n_photo_concerts <= 0)
        {
            return ret_number;
        }

        for (var photo_concert_number=1; photo_concert_number <= n_photo_concerts; photo_concert_number++)
        {
            var concert_number = getSeasonPhotoConcertNumber(i_photo_season_number, photo_concert_number);

            if (i_concert_number == concert_number)
            {
                ret_number = photo_concert_number;

                break;
            }

        } // photo_concert_number

        return ret_number;
  
    } // getPhotoConcertNumber

    // Returns the photo texts in an array
    getPhotoTextsArray(i_photo_season_number, i_photo_concert_number)
    {
        var ret_photo_texts = [];

        ret_photo_texts[0] = getSeasonPhotoTextOne(i_photo_season_number, i_photo_concert_number);
        ret_photo_texts[1] = getSeasonPhotoTextTwo(i_photo_season_number, i_photo_concert_number);
        ret_photo_texts[2] = getSeasonPhotoTextThree(i_photo_season_number, i_photo_concert_number);
        ret_photo_texts[3] = getSeasonPhotoTextFour(i_photo_season_number, i_photo_concert_number);
        ret_photo_texts[4] = getSeasonPhotoTextFive(i_photo_season_number, i_photo_concert_number);
        ret_photo_texts[5] = getSeasonPhotoTextSix(i_photo_season_number, i_photo_concert_number);
        ret_photo_texts[6] = getSeasonPhotoTextSeven(i_photo_season_number, i_photo_concert_number);
        ret_photo_texts[7] = getSeasonPhotoTextEight(i_photo_season_number, i_photo_concert_number);
        ret_photo_texts[8] = getSeasonPhotoTextNine(i_photo_season_number, i_photo_concert_number);

        return ret_photo_texts;

    } // getPhotoTextsArray

    // Returns an array with numbers defining the photos that includes the search word array 
    getPhotoNumbers(i_photo_season_number, i_photo_concert_number)
    {
        var ret_photo_numbers = [];

        var photo_texts = this.getPhotoTextsArray(i_photo_season_number, i_photo_concert_number);

        var n_photos_found = 0;

        for (var photo_number=1; photo_number <= 9; photo_number++)
        {
            var photo_text =  photo_texts[photo_number - 1];

            if (UtilSearch.searchCriterionFulfilled(photo_text, this.m_search_words_array))
            {
                ret_photo_numbers[n_photos_found] = photo_number;

                n_photos_found = n_photos_found + 1;
            }

        } // photo_number

        return ret_photo_numbers;

    } // getPhotoNumbers

    // Get and set functions for the member variables
    // ==============================================

    // Returns the search string
    getSearchString() { return this.m_search_str;} 

    // Sets the search string and the array of search words
    setSearchStringAndArray(i_search_str) 
    { 
        this.m_search_str = i_search_str;

        this.m_search_words_array = UtilSearch.getSearchWordArray(i_search_str);

    } // setSearchStringAndArray


} // PhotosSearch

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Photo Search Class  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// File: PhotoDataList.js
// Date: 2022-12-06
// Author: Gunnar Lidén

// File content
// =============
//
// Functions handling the search for photos
//

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Photo List Class  ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// Class holding a list of PhotoData objects
class PhotoDataList
{
    // Creates the instance of the class
    constructor()
    {
        // Member variables
        // ================

        // Array of photos (photo data objects) found by searching
        this.m_photo_data_array = [];

    } // constructor

    // Member functions
    // ================

    // Get the list
    getList()
    {
        return this.m_photo_data_array;
    
    } // getList
    
    // Appends a photo (a photo data object) found by searching
    // Photo will not be appended if already in the array or if not allowed to publish
    appendPhotoData(i_photo_data)
    {
        if (this.alreadyInPhotoDataArray(i_photo_data))
        {
            return;
        }

        if (!this.photoDataIsAllowedToBePublished(i_photo_data))
        {
            return;
        }

        this.m_photo_data_array[this.getNumberOfPhotos()] = i_photo_data;

    } // appendPhotoData

    // Appends a photo (a photo data object) for a photo show
    // The same image is allowed and a check if it can be published is
    // not applicable
    appendPhotoDataForPhotoShow(i_photo_data)
    {
        this.m_photo_data_array[this.getNumberOfPhotos()] = i_photo_data;

    } // appendPhotoDataForPhotoShow

    // Returns true if photo is allowed to be published.
    // For the homepage test version all photos will be displayed TODO
    photoDataIsAllowedToBePublished(i_photo_data)
    {
        //TODO if (getFlagOnlyAudienceRandomPhotosAfterLogin()) 
        //TODO {
        //TODO    return true;
        //TODO }

        if (i_photo_data.getPublish())
        {
            return true;
        }
        else
        {
            return false;
        }

    } // photoDataIsAllowedToBePublished
    
    // Returns true if the image already is in the array
    // In the beginning, there were not one gallery for one concert.
    // The XML photo files are changed for this case. Problably because
    // there was a need to get a gallery for each concert...  
    alreadyInPhotoDataArray(i_photo_data)
    {
        var ret_exists = false;

        var input_photo_url = i_photo_data.getUrl();

        for (var index_photo=0; index_photo < this.m_photo_data_array.length; index_photo++)
        {
            var current_photo_url = this.m_photo_data_array[index_photo].getUrl();

            if (current_photo_url == input_photo_url)
            {
                ret_exists = true;

                break;
            }

        } // index_photo
        
        return ret_exists;

    } // alreadyInPhotoDataArray

    // Returns the number of photos (photo data objects) found by searching
    getNumberOfPhotos()
    {
        return this.m_photo_data_array.length;

    } // getNumberOfPhotos

    // Returns the photo data object for a given photo number
    getPhotoData(i_photo_number)
    {
        if (i_photo_number <= 0 || i_photo_number > this.m_photo_data_array.length)
        {
            alert("PhotoDataList.getPhotoData Photo number " + i_photo_number.toString() + ' is not between 1 and ' + this.m_photo_data_array.length.toString());
            
            return null;
        }

        return this.m_photo_data_array[i_photo_number - 1];

    } // getPhotoData

    // Returns true if photos were found, i.e. there are photos to display
    photosFound()
    {
        if (this.m_photo_data_array.length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // photosFound    

    // Initialize the array of photos (photo data objects) found by searching
    // (clear/empty the array)
    init()
    {
        this.m_photo_data_array = [];

    } // init    

} // PhotoDataList

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Photo List Class  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Photo Class  //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding all data for a photo
class PhotoData 
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

        // URL (server address) for the big (original) photo
        this.m_url_big = "";        

        // Photo text
        this.m_text = "";

        // ZIP file name for the photo
        this.m_zip = "";

        // Photographer
        this.m_photographer = "";

       // Day
       this.m_day = "";

       // Month
       this.m_month = "";

       // Year
       this.m_year = ""; 

       // Band name
       this.m_band = "";        

       // Publish flag
       this.m_publish = true;

       // Gallery name (number)
       this.m_gallery_name = "";

       // Text row one for audience photo
       this.m_audience_row_one = "";

       // Text row two for audience photo
       this.m_audience_row_two = "";

       // Names for audience photo
       this.m_audience_names = "";
                     
       // Remark for audience photo
       this.m_audience_remark = "";

       // Text row one for photo show photo
       this.m_photoshow_row_one = "";

       // Text row two for photo show photo
       this.m_photoshow_row_two = "";

       // Text row three for photo show photo
       this.m_photoshow_row_three = "";
                                  
       // Name of the active photo XML object
       // Values: Galleries, GalleryOne, GalleryTwo and AudiencePhotos
       this.m_active_photo_xml_name = 'Undefined';

    } // constructor

    // Get and set functions for the member variables
    // ==============================================

    // Returns the URL (server address) for the photo
    getUrl() { return this.m_url;} 

    // Sets the URL (server address) for the photo
    setUrl(i_url_photo) { this.m_url = i_url;} 

    // Returns the URL (server address) for the small photo
    getUrlSmall() { return this.m_url_small;} 

    // Sets the URL (server address) for the small photo
    setUrlSmall(i_url_small) { this.m_url_small = i_url_small;}

    // Returns the URL (server address) for the big photo
    getUrlBig() { return this.m_url_big;} 

    // Sets the URL (server address) for the big photo
    setUrlBig(i_url_big) { this.m_url_big = i_url_big;}    
    
    // Returns the photo text
    getText() { return this.m_text;} 

    // Sets the photo text
    setText(i_text) { this.m_text = i_text;}     

    // Returns the ZIP file name for the photo
    getZip() { return this.m_zip;} 

    // Sets the ZIP file name for the photo
    setZip(i_zip) { this.m_zip = i_zip;}     

    // Returns the photographer
    getPhotographer() { return this.m_photographer;} 

    // Sets the photographer
    setPhotographer(i_photographer) { this.m_photographer = i_photographer;}

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

    // Returns the band name
    // Band names may be incorrect for Gallery one photos older than from 
    // Please see addBandOnlyIfInfoCorrect
    getBand() 
    { 
        return this.m_band;
        
        /*QQQQ Pseudo galleries added 20220309
        if (this.photoBandInfoIsCorrect())
        {
            return this.m_band;
        }
        else
        {
            return '';
        }
        Pseudo galleries added 20220309 QQQ*/
    } 

    // Sets the band name
    setBand(i_band) { this.m_band = i_band;}       

    // Returns the gallery name (number)
    getGalleryName() { return this.m_gallery_name;} 

    // Sets the URL gallery name (number)
    setGalleryName(i_gallery_name) { this.m_gallery_name = i_gallery_name;}    

    // Returns the text row one for audience photo
    getAudienceRowOne() { return this.m_audience_row_one;} 

    // Sets the row one for audience photo
    setAudienceRowOne(i_audience_row_one) { this.m_audience_row_one = i_audience_row_one;} 
	
    // Returns the text row two for audience photo
    getAudienceRowTwo() { return this.m_audience_row_two;} 
	
    // Sets the row two for audience photo
    setAudienceRowTwo(i_audience_row_two) { this.m_audience_row_two = i_audience_row_two;} 
	
    // Returns the names for audience photo
    getAudienceNames() { return this.m_audience_names;} 
	
    // Sets the names for audience photo
    setAudienceNames(i_audience_names) { this.m_audience_names = i_audience_names;} 
		
    // Returns the remark for audience photo
    getAudienceRemark() { return this.m_audience_remark;} 
	
    // Sets the remark for audience photo
    setAudienceRemark(i_audience_remark) { this.m_audience_remark = i_audience_remark;} 

    // Returns the text row one for photo show photo
    getPhotoShowRowOne() { return this.m_photoshow_row_one;} 

    // Sets the row one for audience photo
    setPhotoShowRowOne(i_photoshow_row_one) { this.m_photoshow_row_one = i_photoshow_row_one;} 

    // Returns the text row two for photo show photo
    getPhotoShowRowTwo() { return this.m_photoshow_row_two;} 

    // Sets the row two for audience photo
    setPhotoShowRowTwo(i_photoshow_row_two) { this.m_photoshow_row_two = i_photoshow_row_two;} 
	
    // Returns the text row three for photo show photo
    getPhotoShowRowThree() { return this.m_photoshow_row_three;} 

    // Sets the row three for audience photo
    setPhotoShowRowThree(i_photoshow_row_three) { this.m_photoshow_row_three = i_photoshow_row_three;} 
		    
    // Returns active photo XML name
    getActivePhotoXmlName() { return this.m_active_photo_xml_name;} 

    // Sets the active photo XML name
    setActivePhotoXmlName(i_active_photo_xml_name) { this.m_active_photo_xml_name = i_active_photo_xml_name;}   
    
    // Returns the publish flag
    getPublish() { return this.m_publish;} 

    // Sets the publish flag
    setPublish(i_publish) { this.m_publish = i_publish;}    

    // Returns true if the band information (name) is correct.
    // Prior to 2008 there were Peter Günthard galleries with
    // photos from multiple concerts. The function that gets
    // the band names has difficulties linking a photo to the
    // right concert
    // Pseudo galleries were added 20220309. Function no longer needed
    photoBandInfoIsCorrect()
    {
        var photographer_name = this.getPhotographer();

        if (photographer_name != 'Peter Günthart')
        {
            return true;
        }

        var photo_year = this.getYear();

        if (photo_year >= 2008)
        {
            return true;
        }
        else
        {
            return false;
        }
      
    } // photoBandInfoIsCorrect

    // Returns true if it is an audience photo
    audiencePhoto()
    {
        if ('AudiencePhotos' == this.m_active_photo_xml_name)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // audiencePhoto

    // Returns true if it is a gallery photo
    galleryPhoto()
    {
        if ('GalleryOne' == this.m_active_photo_xml_name || 
            'GalleryTwo' == this.m_active_photo_xml_name ||
            'Galleries'  == this.m_active_photo_xml_name)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // galleryPhoto

    // Returns true if it is an audience photo
    imageListPhoto()
    {
        if ('ImageList' == this.m_active_photo_xml_name)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // imageListPhoto

    // Check functions for the member variables
    // ========================================

} // PhotoData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Photo Class  ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// File: PrettyPrintXml.js
// Date: 2024-02-15
// Author: Gunnar Lidén

// Reference:
// https://www.w3schools.com/xml/tryit.asp?filename=try_dom_loop

// File content
// =============
//
// Class that creates a pretty print (formatted) string of an XML object
class PrettyPrintXml
{
    // Creates the instance of the class
    // i_xml_object: XML object
    constructor(i_xml_object) 
    {
        // Member variables
        // ================

        // Input XML object
        this.m_xml_object_pretty_print = i_xml_object;

        // Flag telling if the the output string is to be displayed as HTML or Windows
        this.m_pretty_print_b_html = null;

        // Flag telling if debug data shall be written to the console
        this.m_b_debug_to_console = false;

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Main Functions ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the XML object as a formatted (pretty print) HTML string
    xmlToHtmlFormattedString()
    {
        this.m_pretty_print_b_html = true;

        return this.xmlToFormattedString();

    } // xmlToHtmlFormattedString

    // Returns the XML object as a formatted (pretty print) Windows string
    xmlToWinFormattedString()
    {
        this.m_pretty_print_b_html = false;

        return this.xmlToFormattedString();

    } // xmlToWinFormattedString

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Main Functions //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the XML object as a formatted (pretty print) string
    // Member variable m_pretty_print_b_html determines if output is HTML or Window
    xmlToFormattedString()
    {
        if (this.m_xml_object_pretty_print == null)
        {
            alert("PrettyPrintXml.xmlToFormattedString m_xml_object_pretty_print = null");

            return "";
        }

        if (this.m_pretty_print_b_html == null)
        {
            alert("PrettyPrintXml.xmlToFormattedString m_pretty_print_b_html = null");

            return "";
        }

        var ret_xml_str = '';

        ret_xml_str = ret_xml_str + this.declarationLinePrettyPrint() + this.newLinePrettyPrint();

        ret_xml_str = ret_xml_str + this.addCommentsPrettyPrint();
    
        var root_name = this.m_xml_object_pretty_print.documentElement.nodeName; // TODO Error
    
        ret_xml_str = ret_xml_str +  '<'  + root_name + '>';
    
        var nodes_level_one = this.m_xml_object_pretty_print.documentElement.childNodes;
    
        var n_tabs = 1;
        for (var index_node=0; index_node < nodes_level_one.length; index_node++)
        {
            var current_node = nodes_level_one[index_node];
    
            if (current_node.nodeType == 1)
            {
                var tag_name = current_node.nodeName;
    
                ret_xml_str = ret_xml_str + 
                    this.newLinePrettyPrint() + this.tabsLinePrettyPrint(n_tabs) + '<'  + tag_name + '>';
    
                if (current_node.childElementCount > 0)
                {
                    ret_xml_str = ret_xml_str + this.getNodePrettyPrint(current_node, n_tabs + 1);
                }        
                        
                ret_xml_str = ret_xml_str +         
                    this.newLinePrettyPrint() + this.tabsLinePrettyPrint(n_tabs) + '</' + tag_name + '>';
            }
        }
    
        ret_xml_str = ret_xml_str +  this.newLinePrettyPrint() + '</'  + root_name + '>';
    
        this.debugPrettyPrintToConsoleLog(ret_xml_str);
    

        return ret_xml_str;

    } // xmlToWinFormattedString

    // Function that wiil be called recursivly
    getNodePrettyPrint(i_node, i_n_tabs)
    {
        var ret_node_str = '';

        var child_nodes = i_node.childNodes;

        for (var index_node=0; index_node < child_nodes.length; index_node++)
        {
            var current_node = child_nodes[index_node];

            if (current_node.nodeType == 1)
            {
                var tag_name = current_node.nodeName;

                ret_node_str = ret_node_str + this.newLinePrettyPrint() + this.tabsLinePrettyPrint(i_n_tabs) + '<'  + tag_name + '>';

                if (current_node.childElementCount > 0)
                {
                    ret_node_str = ret_node_str + this.getNodePrettyPrint(current_node, i_n_tabs + 1);

                    ret_node_str = ret_node_str + this.newLinePrettyPrint() + this.tabsLinePrettyPrint(i_n_tabs) + '</'  + tag_name + '>';
                }
                else
                {
                    ret_node_str = ret_node_str + current_node.innerHTML;

                    ret_node_str = ret_node_str + '</'  + tag_name + '>';
                }    

                
            }
        }

        return ret_node_str;

    } // getNodePrettyPrint

    // Returns the first lines (nodes) of comment
    // Does not work, and is actually not requested
    // Just kept as something to look at later in order to understand
    getCommentsPrettyPrint()
    {
        var ret_xml_comments_str = '';
    
        var nodes_level_one = this.m_xml_object_pretty_print.documentElement.childNodes;
    
    
        for (var index_node=0; index_node < nodes_level_one.length; index_node++)
        {
            var current_node = nodes_level_one[index_node];
    
            if (current_node.nodeType == 8)
            {
                ret_xml_comments_str = ret_xml_comments_str + this.startCommentPrettyPrint();
    
                ret_xml_comments_str = ret_xml_comments_str + 'Retrieved comment text';
    
                ret_xml_comments_str = ret_xml_comments_str + this.endCommentPrettyPrint();
    
                ret_xml_comments_str = ret_xml_comments_str + this.newLinePrettyPrint();
            }
        }
    
    
        return ret_xml_comments_str;
    
    } // getCommentsPrettyPrint

    // Returns the start declaration line for the XML file
    declarationLinePrettyPrint()
    {
        return '<?xml version= "1.0" encoding="utf-8"?>';
    
    } // declarationLinePrettyPrint

    // Comments to add to the output XML file
    addCommentsPrettyPrint()
    {
        return '<!-- This XML file is created from an XML object by the function xmlToFormattedString -->'  + this.newLinePrettyPrint();
    
    } // addCommentsPrettyPrint    

    // Returns end of line
    newLinePrettyPrint()
    {
        if(this.m_pretty_print_b_html)
        {
            return '<br>';
        }
        else
        {
            return '\n';
        }
    
    } // newLinePrettyPrint

    // Returns tabs
    tabsLinePrettyPrint(i_n_tabs)
    {
        var ret_windows_spaces = '';
        
        for (var tab_number=1; tab_number <= i_n_tabs; tab_number++)
        {
            if(this.m_pretty_print_b_html)
            {
                ret_windows_spaces = ret_windows_spaces + '&nbsp;&nbsp;&nbsp;&nbsp;';
            }
            else
            {
                ret_windows_spaces = ret_windows_spaces + '    ';
            }
        }
    
        return ret_windows_spaces;
    
    } // tabsLinePrettyPrint

    // Returns start of a comment
    startCommentPrettyPrint()
    {
        return '<!--  ';
    
    } // startCommentPrettyPrint

    // Returns end of a comment
    endCommentPrettyPrint()
    {
        return ' -->';
        
    } // endCommentPrettyPrint  

    // Convert XML object to string
    xmlToString(i_xml_object)
    {
        // https://www.dotnettricks.com/learn/javascript/convert-string-to-xml-and-xml-to-string-using-javascript
        
        //code for IE
        if (window.ActiveXObject) 
        {
           var out_xml_str = i_xml_object.xml; return out_xml_str;
        } 
        // code for Chrome, Safari, Firefox, Opera, etc.
        else 
        {
           return (new XMLSerializer()).serializeToString(i_xml_object);
        }
        
     } // xmlToString    

    // Displays the input string in the debugger Console
    debugPrettyPrintToConsoleLog(i_xml_str)
    {
        if (!this.m_b_debug_to_console)
        {
            return;
        }

        console.log(i_xml_str);
    
    } // debugPrettyPrintToConsoleLog  

     // Set flag telling tha debug data shall NOT be written to the console
     noDebugToConsole()
     {
        this.m_b_debug_to_console = false;  

     } // noDebugToConsole

     // Set flag telling tha debug data shall NOT be written to the console
     writeDebugToConsole()
     {
        this.m_b_debug_to_console = true;  
              
     } // writeDebugToConsole

} // PrettyPrintXml
// File: UtilXml.js
// Date: 2024-02-05
// Author: Gunnar Lidén

// File content
// =============
//
// Class with XML utility functions
//
// 
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start UtilXml Class  ////////////////////////(///////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class UtilXml
{
    // Escape chars before saving as XML value
    static escapeString(i_string)
    {
        if (UtilXml.isStringEscaped(i_string))
        {
            return i_string;
        }

        var ret_escape_str = '';

        var escape_array = UtilXml.arrayChars();

        var unescape_array = UtilXml.arrayEscapeStrings();

        var n_chars = i_string.length;

        for (var index_char=0; index_char < n_chars; index_char++)
        {
            var current_char = i_string[index_char];

            var escape_str = UtilXml.oneEscapeString(current_char);

            var escape_str_length = escape_str.length

            if (escape_str_length == 0)
            {
                ret_escape_str = ret_escape_str + current_char;
            }
            else
            {
                ret_escape_str = ret_escape_str + escape_str;
            }

        } // index_char

        return ret_escape_str;

    } // escapeString

    // Unescape codes after retrieval of XML value
    static unescapeString(i_string)
    {
        if (!UtilXml.isStringEscaped(i_string))
        {
            return i_string;
        }

        var escape_array = UtilXml.arrayChars();

        var unescape_array = UtilXml.arrayEscapeStrings();

        var ret_unescape_str = i_string;

        var n_array = UtilXml.escapeArrayLength();

        for (var index_array=0; index_array < n_array; index_array++)
        {
            var current_code = unescape_array[index_array];

            var current_char = escape_array[index_array];

            ret_unescape_str = ret_unescape_str.replaceAll(current_code, current_char);
        }

        return ret_unescape_str;

    } // unescapeString

    // Returns true if there is at least one character that have been escaped
    static isStringEscaped(i_string)
    {
        var ret_b_escaped = false;

        var unescape_array = UtilXml.arrayEscapeStrings();

        var n_array = UtilXml.escapeArrayLength();

        for (var index_array=0; index_array < n_array; index_array++)
        {
            var current_code = unescape_array[index_array];

            var index_code = i_string.indexOf(current_code);

            if (index_code >= 0)
            {
                ret_b_escaped = true;

                break;
            }
        }

        return ret_b_escaped;

    } // isStringEscaped

    // Returns the length of the arrayChars and arrayEscapeStrings 
    static escapeArrayLength()
    {
        var escape_array = UtilXml.arrayChars();

        var unescape_array = UtilXml.arrayEscapeStrings();

        var n_chars = escape_array.length;

        if (n_chars != unescape_array.length)
        {
            alert("UtilXml.getArrayLength Arrays not OK");

            return -1;
        }    

        return n_chars;

    } // escapeArrayLength

    // Returns escape code for the input char
    static oneEscapeString(i_char)
    {
        var escape_array = UtilXml.arrayChars();

        var unescape_array = UtilXml.arrayEscapeStrings();

        var n_chars = UtilXml.escapeArrayLength();

        for (var index_char=0; index_char < n_chars; index_char++)
        {
            var current_char = escape_array[index_char];

            if (i_char == current_char)
            {
                return unescape_array[index_char];
            }
            
        }

        return '';

    } // oneEscapeString


    // Returns an array that shall be escaped
    static arrayChars()
    {
        var ret_char_array = [];

        ret_char_array[0] = '<';

        ret_char_array[1] = '>';

        ret_char_array[2] = '"';

        ret_char_array[3] = "'";

        ret_char_array[4] = '&';

        return ret_char_array;

    } // arrayChars

    // Returns an array with the escape strings for arrayChars
    static arrayEscapeStrings()
    {
        var ret_escape_array = [];

        ret_escape_array[0] = '&lt;';

        ret_escape_array[1] = '&gt;';

        ret_escape_array[2] = '&quot;';

        ret_escape_array[3] = '&apos;';

        ret_escape_array[4] = '&amp;';

        return ret_escape_array;

    } // arrayEscapeStrings



} // UtilXml




///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End UtilXml Class  //////////////////////////(///////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// File: ApplicationsVersionXml.js
// Date: 2024-10-30
// Author: Gunnar Lidén

// File content
// =============
//
// Class for the handling of applications versions
class ApplicationsVersion
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading. '' is erlaubt
    // i_url_relative_dir:       Relative URL to the directory ApplicationsVersion
    // 
    constructor(i_callback_function_name, i_url_relative_dir) 
    {
        // Member variables
        // ================

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // Directory levels to /www/XML/
        //QQthis.m_n_level_xml = i_n_level_xml;

        // Relative URL to the directory ApplicationsVersion
        this.m_url_relative_dir = i_url_relative_dir;

        // Path and name of XML file in the computer
        this.m_xml_file_name_local = 'XmlTestData/ApplicationsVersionTestData.xml';

        // The jazz application xml object
        this.m_object_xml = null;

        // Object holding the tags
        this.m_tags = new ApplicationsVersionTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML object for applications versions file and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getXmlApplicationsVersionFileName(), this.m_callback_function_name);

    } // constructor

    // Return some text
    static someText()
    {
        return 'Some text ....';
    }

    // Sets the XML object
    setXmlObject(i_object_xml)
    {
        this.m_object_xml = i_object_xml;

    } // setXmlObject

    // Returns the XML object
    getXmlObject()
    {
        return this.m_object_xml;

    } // getXmlObject    

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Get Application Data //////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the application name
    getApplicationName(i_record_number)
    {
        return this.getApplicatinVersionNodeValue(this.m_tags.getApplicationName(), i_record_number);
        
    } // getApplicationName

    // Returns the application URL
    getApplicationUrl(i_record_number)
    {
        return this.getApplicatinVersionNodeValue(this.m_tags.getApplicationUrl(), i_record_number);
        
    } // getApplicationUrl

    // Returns the application description
    getApplicationDescription(i_record_number)
    {
        return this.getApplicatinVersionNodeValue(this.m_tags.getApplicationDescription(), i_record_number);
        
    } // getApplicationDescription

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Get Application Data ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Set Application Data //////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the application name
    setApplicationName(i_record_number, i_node_value)
    {
        return this.setApplicatinVersionNodeValue(this.m_tags.getApplicationName(), i_record_number, i_node_value);
        
    } // setApplicationName


    // Sets the application URL
    setApplicationUrl(i_record_number, i_node_value)
    {
        return this.setApplicatinVersionNodeValue(this.m_tags.getApplicationUrl(), i_record_number, i_node_value);
        
    } // setApplicationUrl

    // Sets the application description
    setApplicationDescription(i_record_number, i_node_value)
    {
        return this.setApplicatinVersionNodeValue(this.m_tags.getApplicationDescription(), i_record_number, i_node_value);
        
    } // setApplicationDescription

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Set Application Data ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Append Application Version Node  //////////
    ///////////////////////////////////////////////////////////////////////////

	// https://www.webdeveloper.com/forum/d/231973-append-xml-node-in-javascript/3

	// Appends aa application version node   
    appendApplicationVersionNode()
    {
        var new_application = this.getXmlObject().createElement(this.m_tags.getApplication());

        var name_node = this.getXmlObject().createElement(this.m_tags.getApplicationName());
        var name_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        name_node.appendChild(name_text);
        new_application.appendChild(name_node);

        var url_node = this.getXmlObject().createElement(this.m_tags.getApplicationUrl());
        var url_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        url_node.appendChild(url_text);
        new_application.appendChild(url_node);

        var descr_node = this.getXmlObject().createElement(this.m_tags.getApplicationDescription());
        var descr_text = this.getXmlObject().createTextNode(this.m_not_yet_set_node_value);
        descr_node.appendChild(descr_text);
        new_application.appendChild(descr_node);

        this.getXmlObject().documentElement.appendChild(new_application);	

    } // appendApplicationVersionNode
	   
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Append Application Version Node  ////////////
    ///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Delete Application Version Node  ////////// 
    ///////////////////////////////////////////////////////////////////////////

	// Deletes aa application version node   
    deleteApplicationVersionNode(i_record_number)
    {
        if (!this.checkApplicationsVersion()){ return false; }

        var n_records = this.getNumberOfApplicationVersionRecords();
        
        if (i_record_number < 1 || i_record_number > n_records)
        {
            alert("ApplicationsVersion.deleteApplicationVersionNode Record number is not between 1 and " + n_records.toString());
            return false;		
        }

        var application_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getApplication());

        var application_rec_node = application_rec_nodes[i_record_number-1];

        application_rec_node.parentNode.removeChild(application_rec_node);

    } // deleteApplicationVersionNode

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Delete Application Version Node  ////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Utility Functions /////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Get URL for a given application name
    getUrlByName(i_application_name)
    {
        var n_records = this.getNumberOfApplicationVersionRecords();

        for (var i_record=1; i_record <= n_records; i_record++)
        {
            var application_name = this.getApplicationName(i_record);

            if (application_name == i_application_name)
            {
                return this.getApplicationUrl(i_record);
            }

        }

        alert('ApplicatinVersion.getUrlByName A not defined name in the ApplicationsVersions.xml file: ' + i_application_name);

        return '';

    } // getUrlByName

    // Initialize the last (appended) applications version record
    initAppendedRecord()
    {
        var n_records = this.getNumberOfApplicationVersionRecords();

        this.setApplicationName(n_records, 'A name ... TODO');


    } // initAppendedRecord

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Member Utility Functions ////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadOneXmlFile(i_object_xml, i_path_file_name_xml, i_callback_function_name)
    {
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

            if (i_callback_function_name.length > 0)
            {
                i_callback_function_name(); 
            }  
        }
        else if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 404) 
        {
            alert("Error 404: File " + i_path_file_name_xml + " not found" );
        }	
    };
    
    // Open the file
    jazz_xmlhttp.open("GET", i_path_file_name_xml, true);
    
    jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
        
    jazz_xmlhttp.send();	

    } // loadOneXmlFile

    ///////////////////////////////////////////////////////////////////////////
    /////// End Load Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Application Version Records  ///////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the number of application version records
    getNumberOfApplicationVersionRecords()
    {
        var ret_n_records = -1;

        if (!this.checkApplicationsVersion()){ return ret_n_records; }

        var application_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getApplication());

        ret_n_records = application_rec_nodes.length;

        return ret_n_records;

    } // getNumberOfApplicationVersionRecords
  

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Application Version Records  /////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Record Node Value  ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the application version node value for a givenapplication version record number and a tag name
    getApplicatinVersionNodeValue(i_record_tag, i_record_number)
    {
        var ret_data = '';
        
        if (!this.checkApplicationsVersion()){ return ret_data; }

        var n_records = this.getNumberOfApplicationVersionRecords();
        
        if (i_record_number < 1 || i_record_number > n_records)
        {
            alert("ApplicationsVersion.getApplicatinVersionNodeValue Record number is not between 1 and " + n_records.toString());
            return ret_data;		
        }
            
        var application_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getApplication());

        var application_rec_node = application_rec_nodes[i_record_number-1];
        
        var xml_node_value = this.getNodeValueTagName(application_rec_node, i_record_tag);
        
        ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
        
        return ret_data;
        
    } // getApplicatinVersionNodeValue

    // Sets the application version node value for a given application version record number and a tag name
    setApplicatinVersionNodeValue(i_record_tag, i_record_number, i_app_record_node_value)
    {	
        if (!this.checkApplicationsVersion()){ return; }

        var n_records = this.getNumberOfApplicationVersionRecords();
        
        if (i_record_number < 1 || i_record_number > n_records)
        {
            alert("ApplicationsVersion.setApplicatinVersionNodeValue Record number is not between 1 and " + n_records.toString());
            
            return;		
        }
            
        var application_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getApplication());

        var application_rec_node = application_rec_nodes[i_record_number-1];
        
        var node_value = this.setFlagNodeValueIsNotSetForEmptyString(i_app_record_node_value);
        
        this.setNodeValue(application_rec_node, i_record_tag, node_value);
        
    } // setApplicatinVersionNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Record Node Value  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////  

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start XML Node Values  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the node value. Input is an XML node and the tag name
    getNodeValueTagName(i_node, i_xml_tag)
    {	
        return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
        
    } // getNodeValueTagName

    // Returns the node value. Input is an XML node 
    getNodeValue(i_node)
    {	
        return i_node.childNodes[0].nodeValue;
        
    } // getNodeValue

    // Sets a node value. Input is an XML node, the tag name and the node value
    setNodeValue(i_node, i_xml_tag, i_node_value)
    {	
        i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue = i_node_value;
        
    } // setNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End XML Node Values  ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Not Set Values  ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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

    // Returns empty string if i_node_value is equal to m_not_yet_set_node_value
    removeFlagNodeValueNotSet(i_node_value)
    {
        if (!this.nodeValueIsSet(i_node_value))
        {
            return "";
        }
        
        return i_node_value; 
        
    } // removeFlagNodeValueNotSet

    // Return flag (string) g_not_yet_set_node_value if input string is empty
    setFlagNodeValueIsNotSetForEmptyString(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // setFlagNodeValueIsNotSetForEmptyString

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Not Set Values  /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the XML applications version file name and path
    getXmlApplicationsVersionFileName()
    {
        var ret_file_name = '';

        ret_file_name = this.m_url_relative_dir + 'ApplicationsVersionXml/' + 'ApplicationsVersion.xml';

        /*QQQQQQ
        var level_xml_str = '';

        if (0 == this.m_n_level_xml)
        {
            level_xml_str = 'XML/';
        }
        else if (1 == this.m_n_level_xml)
        {
            level_xml_str = '../XML/';
        }
        else if (2 == this.m_n_level_xml)
        {
            level_xml_str = '../../XML/';
        }
        else if (3 == this.m_n_level_xml)
        {
            level_xml_str = '../../../XML/';
        }
        else
        {
            alert("ApplicationsVersion.getXmlApplicationsVersionFileName i_n_level= " + 
            this.m_n_level_xml.toString() + " not between 0 and 3");

            return ret_file_name;
        }

        ret_file_name = level_xml_str + 'JazzGu ests.xml';
        QQQQ*/

        if (!ApplicationsVersion.execApplicationOnServer())
        {
            var level_test_str = '';

            /*QQQQ
            if (2 == this.m_n_level_xml)
            {
                level_test_str = '../';
            }
            else if (3 == this.m_n_level_xml)
            {
                level_test_str = '../../';
            }
            QQQ*/

            return level_test_str + this.m_xml_file_name_local; 
        }        

        return ret_file_name;

    } // getXmlApplicationsVersionFileName

    // Check that the applications vesrsion XML object is set
    checkApplicationsVersion()
    {      
        if (null == this.getXmlObject())
        {
            alert("ApplicationsVersion.checkApplicationsVersion Jazz applications version XML object is null");

            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkApplicationsVersion

    // Returns true if the application runs on the server
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        var server_url = 'jazzliveaarau.ch';

        var index_url = current_base.indexOf(server_url);

        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }

    } // execApplicationOnServer    

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // ApplicationsVersion

// Class defining the tags of the applicans versions file
class ApplicationsVersionTags 
{
    // Creates the instance of the class
    constructor() 
    {
        this.m_tag_applications_versions = "ApplicationsVersions";
        this.m_tag_application = "ApplicationVersion";
        this.m_tag_application_name = "ApplicationName";
        this.m_tag_application_url = "ApplicationUrl";
        this.m_tag_application_descr = "ApplicationDescription";

    } // constructor

    // Get member variable functions
    // =============================

    getApplication(){return this.m_tag_application;} 
    getApplicationName(){return this.m_tag_application_name;} 
    getApplicationUrl(){return this.m_tag_application_url;} 
    getApplicationDescription(){return this.m_tag_application_descr;} 

} // ApplicationsVersionTags

