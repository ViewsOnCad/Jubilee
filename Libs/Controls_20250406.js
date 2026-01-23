// File: JazzButton.js
// Date: 2023-05-08
// Author: Gunnar Lidén

// File content
// =============
//
// Class JazzButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Button ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// // Class that creates a button control
class JazzButton 
{
    // Creates the instance of the class
    constructor(i_id_button, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the button control
        this.m_id_button = i_id_button;

        // The identity of the container for the button control
        this.m_id_div_container = i_id_div_container;

        // The container element for the button control
        this.m_el_div_container = null;

        // The class for the button control
        this.m_class = '';

        // The onclick function name. Only the name is input
        this.m_onclick_function = '';

        // The caption for the button
        this.m_caption = '';

        // The width of the button
        this.m_width = '';

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Inner elements of start input m_el_div_container
        this.m_div_container_inner_html_start = "";
        
        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setDivInnerHtmlStartElements();

        this.setControl();

    } // constructor

    // Set div inner elements if already existing at start
    // Criterion is that '<input' or '<button' is contained in the string 
    // TODO add more elements
    setDivInnerHtmlStartElements()
    {
        var inner_html_start = this.m_el_div_container.innerHTML;

        if (inner_html_start.length > 0)
        {
            var index_input = inner_html_start.indexOf("<input");

            var index_button = inner_html_start.indexOf("<button");

            if (index_input >= 0 || index_button >= 0)
            {
                this.m_div_container_inner_html_start = inner_html_start;
            } // div is set with <input> and/or <button> elements

        } // div is set with something ...

    } // setDivInnerHtmlStartElements

    // Set functions for the layout member variables
    // =============================================

    // Sets the class for the button control 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the caption for the button control 
    // There will be no caption if this function not is called
    setCaption(i_caption) 
    {
      this.m_caption = i_caption;

      this.setControl();

    } // setCaption    

    // Sets the width of a button
    setWidth(i_width)
    {
        this.m_width = i_width;

        this.setControl();

    } // setWidth

    // Sets the label text for the button
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the button
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the button
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove    
     // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle
    
    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Returns the button element
    getButtonElement()
    {
        return document.getElementById(this.m_id_button);

    } // getButtonElement

    // Hide the button
    hideButton()
    {
        this.getButtonElement().style.display = 'none';

    } // hideButton

 
    // Display the button
    showButton()
    {
        this.getButtonElement().style.display = 'block';

    } // showButton   

    // Sets the onchange function name. Only the name is input
    setOnclickFunctionName(i_onclick_function) 
    {
      this.m_onclick_function = i_onclick_function;

      this.setControl();

    } // setOnchangeFunctionName     

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzButton error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    // Append if input div already had elements
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        if (this.m_div_container_inner_html_start.length > 0)
        {

            var appended_html = this.m_div_container_inner_html_start + html_str;

            this.m_el_div_container.innerHTML = appended_html;
        }
        else
        {
            this.m_el_div_container.innerHTML = html_str;
        }       

    } // setControl
        
    // Returns the string that defines the HTML button string
    // <button id="id_button" class="cl_button" onclick= "eventXyz" title="Tip ...">Click me</button>  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_button, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_button, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str +  '<button  id="' + this.m_id_button + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }

        if (this.m_onclick_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onclick="' + this.m_onclick_function + '()" ';
        }

        if (this.m_width.length > 0)
        {
            ret_html_str = ret_html_str + '  style="width:' + this.m_width + '" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>'; 

        if (this.m_caption.length > 0)
        {
            ret_html_str = ret_html_str + this.m_caption;
        }

        // this.m_width
        
        ret_html_str = ret_html_str + '</button>'; 

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_button, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Button //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// File: JazzTextBox.js
// Date: 2024-02-04
// Author: Gunnar Lidén

// File content
// =============
//
// Class JazzTextBox

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Text Box //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates a text box
// The code that will be generated is 
// <label for="id_text_box">Label text</label>
// <input type="text" id="id_text_box" value="My remark" size="20" maxlength="30" oninput="myFunction()" title="Tip ...">  
// Compulsary input is the identity of the text box and the container 
// (normally a <div> element), where the text box shall be placed 
// Here is a sample how an object of the class can be created:
// var remark_text_box = new JazzTextBox("id_remark_text_box", "i_id_container")
class JazzTextBox 
{
    // Function that is executed when an object of this class is created
    constructor(i_id_text_box, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the text box
        this.m_id_text_box = i_id_text_box;

        // The identity of the container for the text box
        this.m_id_div_container = i_id_div_container;

        // The container element for the text box
        this.m_el_div_container = null;

        // The class for the text box
        this.m_class = '';
    
        // The value of the text box
        this.m_value = '';

        // Placeholder text (instructions what to write)
        this.m_placeholder_text = '';

        // Input type. For this class may 'number' and 'tel' also be applicable
        // In telephones the number keyboard will be invoked for these types
        this.m_input_type = 'text';

        // For type number the minimum number e.g. 0
        this.m_number_min = '';

        // For type number the maximum number e.g. 9
        this.m_number_max = '';

        // The oninput function name. Only the name is input
        this.m_oninput_function = '';

        // Flag telling if the text box shall be read only
        this.m_read_only_flag = false;        

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Size of the text box. Size is the number of characters
        // If size not is set there will be no attribute size= "20"
        // Then the default value for the browser application will be the size
        this.m_text_box_size = '';

        // Maximum length (number of characters) of the input string 
        // If the maximum length not is defined there will be no attribute maxlength= "30"
        // Then the default value for the browser application will be the maximum length
        this.m_maxlength = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Inner elements of start input m_el_div_container
        this.m_div_container_inner_html_start = "";

        // Initialization
        // ==============        

        this.setDivContainerElement();

        this.setDivInnerHtmlStartElements();

        this.setControl();

    } // constructor

    // Set div inner elements if already existing at start
    // Criterion is that '<input' or '<button' is contained in the string 
    // TODO add more elements
    setDivInnerHtmlStartElements()
    {
        var inner_html_start = this.m_el_div_container.innerHTML;

        if (inner_html_start.length > 0)
        {
            var index_input = inner_html_start.indexOf("<input");

            var index_button = inner_html_start.indexOf("<button");

            if (index_input >= 0 || index_button >= 0)
            {
                this.m_div_container_inner_html_start = inner_html_start;
            } // div is set with <input> and/or <button> elements

        } // div is set with something ...

    } // setDivInnerHtmlStartElements

    // Set and get functions
    // =====================

    // Sets the value for the text box 
    setValue(i_value) 
    {
      this.m_value = i_value;

      var element_html = this.getHtmlElement();

      element_html.value = this.m_value;

      // Not necessary this.setControl();

    } // setValue

    // Returns the value of the text box
    getValue()
    {
        var element_html = this.getHtmlElement();

        var value = element_html.value;

        this.setValue(value);

        return this.m_value;

    } // getValue    

    // Set placeholder text (instructions what to write)
    setPlaceholderText(i_placeholder_text)
    {
        this.m_placeholder_text = i_placeholder_text;

        this.setControl();

    } // setPlaceholderText

    // Set focus
    setFocus()
    {
        var element_html = this.getHtmlElement();

        if (null != element_html)
        {
            element_html.focus();
        }

    } // setFocus

    // Lose focus
    loseFocus()
    {
        var element_html = this.getHtmlElement();

        if (null != element_html)
        {
            element_html.blur();
        }

    } // loseFocus
    
    // Set functions for the layout member variables
    // =============================================

    // Set the oninput function name. Only the name is input
    setOninputFunctionName(i_oninput_function)
    {
        this.m_oninput_function = i_oninput_function;

        this.setControl();

    } // setOninputFunctionName

    // Sets the class for the text box 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the label text for the text box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the text box
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the text box
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove
    
    // Sets the text box size. The size is the number of characters
    setSize(i_text_box_size) 
    {
        this.m_text_box_size = i_text_box_size;
        
        this.setControl();

    } // setSize

    // Sets the maximum length of the input string. 
    // The maximum length value is the number of characters
    setMaxlength(i_maxlength) 
    {
        this.m_maxlength = i_maxlength; 

        this.setControl();

    } // setMaxlength

    // Set read only flag to false or true
    setReadOnlyFlag(i_read_only_flag)
    {
        this.m_read_only_flag = i_read_only_flag; 

        this.setControl();

    } // setReadOnlyFlag

    // Set input type to text (default in this class)
    setInputTypeToText()
    {
        this.m_input_type = 'text';

    } // setInputTypeToText

    // Set input type to number. Can be used to invoke number keyboards in telephones
    setInputTypeToNumber()
    {
        this.m_input_type = 'number';

    } // setInputTypeToNumber

    // For type number set the minimum number e.g. 0
    setNumberMin(i_number_min)
    {
        this.m_number_min = i_number_min;
     
    } // setNumberMin

    // For type number set the maximum number e.g. 9
    setNumberMax(i_number_max)
    {
        this.m_number_max = i_number_max;  

    } // setNumberMax

    // Set input type to telephone. Can be used to invoke number keyboards in telephones
    setInputTypeToTelephone()
    {
        this.m_input_type = 'tel';

    } // setInputTypeToTelephone

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzTextBox error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    // Append if the input div element had elements
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();


        if (this.m_div_container_inner_html_start.length > 0)
        {

            var appended_html = this.m_div_container_inner_html_start + html_str;

            this.m_el_div_container.innerHTML = appended_html;
        }
        else
        {
            this.m_el_div_container.innerHTML = html_str;
        }       

    } // setControl

    // Returns the HTML text box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_text_box);

    } // getHtmlElement

    // Returns the string that defines the HTML text box string
    // <input type="text" id="id_text_box" value="My remark" size="20" maxlength="30" title="Tip ...">  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="' + this.m_input_type + '" id="' + this.m_id_text_box + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        ret_html_str = ret_html_str + ' value= "' + this.m_value + '" ';

        if (this.m_text_box_size.length > 0)
        {
            ret_html_str = ret_html_str + ' size="' + this.m_text_box_size + '" ';
        }

        if (this.m_number_min.length > 0)
        {
            ret_html_str = ret_html_str + ' min="' + this.m_number_min + '" ';
        }

        if (this.m_number_max.length > 0)
        {
            ret_html_str = ret_html_str + ' max="' + this.m_number_max + '" ';
        }

        if (this.m_maxlength.length > 0)
        {
            ret_html_str = ret_html_str + ' maxlength="' + this.m_maxlength + '" ';
        }
        if ( this.m_placeholder_text.length > 0)
        {
            ret_html_str = ret_html_str + ' placeholder="' + this.m_placeholder_text + '" ';
        }

        if (this.m_oninput_function.length > 0)
        {
            ret_html_str = ret_html_str + ' oninput="' + this.m_oninput_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        if (this.m_read_only_flag)
        {
            ret_html_str = ret_html_str + ' readonly';
        }

        ret_html_str = ret_html_str + '>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzTextBox

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Text Box ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// File: JazzControlCheckBox.js
// Date: 2021-05-11
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for the standard control: Check box
//
// Reference: https://www.w3schools.com/js/js_classes.asp
//            https://www.w3schools.com/tags/att_input_type_checkbox.asp

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control check box //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates a check box
// The code that will be generated is 
// <label for="id_check_box">Label text</label>
// <input type="checkbox" id="id_check_box" value="NotUsed" name="NotUsed" oninput="myFunction()" title="Tip ...">  
// Compulsary input is the identity of the check box and the container 
// (normally a <div> element), where the check box shall be placed 
// Here is a sample how an object of the class can be created:
// var my_check_box = new JazzCheckBox("id_check_box", "i_id_container")
class JazzCheckBox 
{
    // Function that is executed when an object of this class is created
    constructor(i_id_check_box, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the check box
        this.m_id_check_box = i_id_check_box;

        // The identity of the container for the check box
        this.m_id_div_container = i_id_div_container;

        // The container element for the check box
        this.m_el_div_container = null;

        // The class for the check box
        this.m_class = '';
    
        // The name of the check box
        this.m_name = '';

        // The value of the check box
        this.m_value = '';

        // The oninput function name. Only the name is input
        this.m_oninput_function = '';     

        // Label text
        this.m_label_text = '';

        // Label position relative the check box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the check box
        this.m_label_text_position = 'left'; 

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Initialization
        // ==============        

        this.setDivContainerElement();

        this.setControl();

    } // constructor

    // Set and get functions
    // =====================


    // Sets the checkbox to checked or unchecked
    // Input is a string with the values TRUE or FALSE
    setCheck(i_check)
    {
        var element_html = this.getHtmlElement();

        if (i_check == "TRUE")
        {
            element_html.checked = true;
        }
        else if (i_check == "FALSE")
        {
            element_html.checked = false;
        }
        else
        {
            alert("JazzCheckBox.setCheck Input string " + i_check + " is not TRUE or FALSE");
        } 

    } // setCheck

    // Gets the checkbox state checked or unchecked
    // Output is a string with the values TRUE or FALSE
    getCheck()
    {
        var element_html = this.getHtmlElement();
        
        if( element_html.checked == true)
        {
            return "TRUE";
        }
        else
        {
            return "FALSE";
        }

    } // getCheck


    // Set functions for the PHP attributes 
    // =====================================

    // Sets the attribute name of the check box 
    setName(i_name) 
    {
      this.m_name = i_name;

      this.setControl();

    } // setName

    // Sets the attribute value of the check box 
    setValue(i_value) 
    {
      this.m_value = i_value;

      var element_html = this.getHtmlElement();

      this.setControl();

    } // setValue  
    
    // Set functions for the layout member variables
    // =============================================

    // Set the oninput function name. Only the name is input
    setOninputFunctionName(i_oninput_function)
    {
        this.m_oninput_function = i_oninput_function;

        this.setControl();

    } // setOninputFunctionName

    // Sets the class for the check box 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the label text for the check box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the check box
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the check box
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the check box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzCheckBox error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

    } // setControl

    // Returns the HTML check box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_check_box);

    } // getHtmlElement

    // Returns the string that defines the HTML check box string
    //<input type="checkbox" id="id_check_box" value="NotUsed" name="NotUsed" oninput="myFunction()" title="Tip ...">  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_check_box, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_check_box, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="checkbox" id="' + this.m_id_check_box + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        //QQQ ret_html_str = ret_html_str + ' value= "' + this.m_value + '" ';

        if (this.m_value.length > 0)
        {
            ret_html_str = ret_html_str + ' value="' + this.m_text_box_size + '" ';
        }

        if (this.m_name.length > 0)
        {
            ret_html_str = ret_html_str + ' name="' + this.m_name + '" ';
        }

        if (this.m_oninput_function.length > 0)
        {
            ret_html_str = ret_html_str + ' oninput="' + this.m_oninput_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_check_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzCheckBox

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control check box ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// File: JazzDropdown.js
// Date: 2024-12-22
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for standard dropdown 
//
// Reference: https://www.w3schools.com/js/js_classes.asp


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Dropdown //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// // Class that creates a dropdown control
class JazzDropdown 
{
    // Creates the instance of the class
    constructor(i_id_drop_down, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the dropdown control
        this.m_id_drop_down = i_id_drop_down;

        // The identity of the container for the dropdown control
        this.m_id_div_container = i_id_div_container;

        // The container element for the dropdown control
        this.m_el_div_container = null;

        // The class for the dropdown control
        this.m_class = '';        

        // The input dropdown name array
        this.m_drop_down_name_array = [];

        // The corresponding number array
        this.m_drop_down_number_array = [];

        // Append string that is added to the dropdown name array
        this.m_append_str = '';

        // The onchange function name. Only the name is input
        this.m_onchange_function = '';

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left';         

        // The dropdown (select element) option number 
        this.m_select_option_number = -12345;

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';        

        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setControl();        
    
    } // constructor

    // Set and get functions
    // ======================

    // Sets the member variable and also the the dropdown element
    setSelectOptionNumber(i_select_option_number) 
    {

        this.m_select_option_number = i_select_option_number;

        var element_dropdown = this.getSelectionElement();

        element_dropdown.value = this.m_select_option_number;

    } // setSelectOptionNumber

   // Gets the select option number from the dropdown (select) element.
   // (Also the member variable m_select_option_number is set)
   getSelectOptionNumber() 
   {
        var element_dropdown = this.getSelectionElement();
        
        this.m_select_option_number =  element_dropdown.value;

        return this.m_select_option_number;

   } // setSelectOptionNumber
   
   // Returns true if the selected option number is for the append item
   selectedOptionNumberIsAppendItem(i_select_option_number)
   {
       var b_append = false;

       if (this.m_append_str.length == 0)
       {
           return b_append;
       }

       var name_array_input_length = this.m_drop_down_name_array.length;

       if (i_select_option_number == name_array_input_length + 1)
       {
            b_append = true;
       }
    
       return b_append;

   } // selectedOptionNumberIsAppendItem
        
    // Set functions for the layout member variables
    // =============================================

    // Sets the class for the dropdown control 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the name array for the dropdown control 
    setNameArray(i_drop_down_name_array) 
    {
      this.m_drop_down_name_array = i_drop_down_name_array;

      this.setNumberArray();

      this.setControl();

    } // setNameArray

    // Sets the append string that is added to the dropdown name array
    setAppendString(i_append_str)
    {
        this.m_append_str = i_append_str;

        this.setControl();

    } // setAppendString

    // Sets the onchange function name. Only the name is input
    setOnchangeFunctionName(i_onchange_function) 
    {
      this.m_onchange_function = i_onchange_function;

      this.setControl();

    } // setOnchangeFunctionName 

    // Sets the label text for the dropdown control
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the dropdown control
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the dropdown control
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove    
    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Returns the selection element
    getSelectionElement()
    {
        return document.getElementById(this.m_id_drop_down);

    } // getSelectionElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzDropdown error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;        

    } // setControl
    
    // Sets the number array 
    setNumberArray()
    {
        this.m_drop_down_number_array = [];

        var array_number = 0;
        
        for (var index_name=0; index_name < this.m_drop_down_name_array.length; index_name++)
        {
            array_number = array_number + 1;

            this.m_drop_down_number_array[index_name] = array_number;
        }

    } // setNumberArray

    // Returns the string that defines the HTML dropdown string
    // <select id="id_drop_down" class="cl_drop_down" onchange= "eventNewTask" title="Tip ...">  
    // <option value="1" >A0001</option>
    // <option value="2" >A0002</option>    
    // </select>
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_drop_down, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_drop_down, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str +  '<select  id="' + this.m_id_drop_down + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }

        if (this.m_onchange_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onchange="' + this.m_onchange_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>'; 

        var n_options = this.m_drop_down_name_array.length;

        if (this.m_append_str.length > 0)
        {
            n_options = n_options + 1;
        }

        for (var index_name=0; index_name < n_options; index_name++)
        {
            var current_name = '';

            var current_number_str = '';

            if (index_name < this.m_drop_down_name_array.length)
            {
                current_name = this.m_drop_down_name_array[index_name];

                current_number_str = this.m_drop_down_number_array[index_name].toString();
            }
            else
            {
                current_name = this.m_append_str;

                current_number_str = n_options.toString();
            }

            var option_str = '<option value="' + current_number_str + '">' +
                                    current_name + '</option>';

            ret_html_str = ret_html_str + option_str;  
        }        

        ret_html_str = ret_html_str + '</select>';
        
        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_drop_down, this.m_title);
        } 
        
        return ret_html_str;

    } // getHtmlString

} // JazzDropdown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Dropdown ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// File: JazzControlUploadFile.js
// Date: 2022-03-02
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for the upload of a file

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Upload File ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// References
// Multiple files: https://www.w3schools.com/jsref/prop_fileupload_files.asp
//        Example: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_fileupload_files
// One File: https://www.w3schools.com/tags/att_input_type_file.asp
//  Example: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_file
//  Filter: https://www.w3schools.com/tags/att_input_accept.asp
// Example: http://www.htmlcodes.ws/html-tags/input_accept.cfm
// PHP Upload: https://www.w3schools.com/php/php_file_upload.asp
// https://stackoverflow.com/questions/16616250/form-submit-with-ajax-passing-form-data-to-php-without-page-refresh
// http://jquery.malsup.com/form/ (plugin upload form with Ajax)
// https://github.com/jquery-form/form (plugin upload form with Ajax)

// Class for a button that uploads a file to the server
class JazzUploadFile 
{
    // Function that is executed when an object of this class is created
    // 1. Member variables are set
    // 2. 
    constructor(i_id_upload_button, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the text box
        this.m_id_upload_button = i_id_upload_button;

        // The identity of the container for the text box
        this.m_id_div_container = i_id_div_container;

        // The identity of the form
        this.m_id_upload_form = '';

        // The identity of the submit button
        this.m_id_upload_submit_button = '';        

        // Selected file name (without path)
        this.m_selected_file_name = '';

        // The container element for the text box
        this.m_el_div_container = null;

        // The class for the text box
        this.m_class = '';

        // The onchange function name. Only the name is input
        this.m_onchange_function = '';

        // Filter for file types (extensions), for instance '.docx,.doc"
        this.m_accept_extensions = '';
        
        // Caption for the button
        this.m_button_caption = '';

        // Value that is the selected file name
        this.m_value = '';
        
        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Maximum length (number of characters) of the input string 
        // If the maximum length not is defined there will be no attribute maxlength= "30"
        // Then the default value for the browser application will be the maximum length
        this.m_maxlength = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Initialization
        // ==============        

        this.setDivContainerElement();

        this.m_id_upload_form = this.m_id_upload_button + '_form';

        this.m_id_upload_submit_button  = this.m_id_upload_button + '_submit_button';

        this.setControl();

    } // constructor

    // Set and get functions
    // =====================
 
    // Set the selected file name and activate the upload file function
    setSelectedFileNameActivateUploadFileFunction()
    {
        var el_upload = this.getHtmlElement();

        var path_file_name = el_upload.value;

        this.m_selected_file_name = this.getOnlyFileName(path_file_name);

        this.activateAjaxUploadFunction();

    } // setSelectedFileNameActivateUploadFileFunction

    // Returns the selected file name (without path)
    getSelectedFileName()
    {
        return  this.m_selected_file_name;

    } // getSelectedFileName

    // Get the server URL (address) for the selected file.
    // Please note that the actual directory path is set by UploadFileToServer.php
    getSelectedFileServerUrl()
    {
        var ret_url = '';

        ret_url = ret_url + '/www/Tasks/Documents/' + this.getSelectedFileName();

        return ret_url;

    } // getSelectedFileServerUrl

    // Initialize selected file name
    initSelectedFileName()
    {
        var el_upload = this.getHtmlElement();

        el_upload.value = '';

    } // initSelectedFileName

    // Checks the selected file name
    checkSelectedFileName(i_reg_number)
    {
        if (this.m_selected_file_name.length == 0)
        {
            alert("JazzUploadFile.checkSelectedFileName Selected file name is not set");

            return false;
        }

        if (!this.checkFileNamePoints())
        {
            return false;
        }

        var index_point = this.m_selected_file_name.indexOf('.');

        var name_without_ext =  this.m_selected_file_name.substring(0, index_point);

        var file_ext = this.m_selected_file_name.substring(index_point);

        if (i_reg_number == name_without_ext)
        {
            return true;
        }
        else
        {
            alert("Du hast Aufgabe " + this.m_selected_file_name + " anstatt " + i_reg_number + file_ext + " gewählt. Bitte überprüfen!");

            this.initSelectedFileName();

            return false;
        }


    } // checkSelectedFileName

    // Returns false if the file name contains more than one point (extension)
    checkFileNamePoints()
    {
        var n_points = 0;

        for (var index_char=0; index_char < this.m_selected_file_name.length; index_char++)
        {
            var current_char = this.m_selected_file_name.substring(index_char, index_char + 1);

            if (current_char == '.')
            {
                n_points = n_points + 1;
            }
        }

        if (n_points != 1)
        {
            alert("Dateiname " + this.m_selected_file_name + " darf nur ein Punkt (Extension) haben.");

            return false
        }
        else
        {
            return true;
        }

    } // checkFileNamePoints

    // TODO Make this to a utility function
    getOnlyFileName(i_path_file_name)
    {
        var ret_file_name = '';
/*
https://stackoverflow.com/questions/423376/how-to-get-the-file-name-from-a-full-path-using-javascript
var substringTest = function (str) {
    return str.substring(str.lastIndexOf('/')+1);
}
function replaceAll(txt, replace, with_this) {
            return txt.replace(new RegExp(replace, 'g'),with_this);
        }
 var correctPath = replaceAll(path,"%20"," ");
*/      
        // In the example is '/' used. 
        // In some browsers may only the file name be returned in value
        var index_last_slash = i_path_file_name.lastIndexOf('\\');

        if (index_last_slash < 0)
        {
            return ret_file_name;
        }

        ret_file_name = i_path_file_name.substring(index_last_slash + 1);

        return ret_file_name;

    } // getOnlyFileName
    
    // Set functions for the layout member variables
    // =============================================

    // Set the onchange function name. Only the name is input
    setOnchangeFunctionName(i_onchange_function)
    {
        this.m_onchange_function = i_onchange_function;

        this.setControl();

    } // setOnchangeFunctionName

    // Sets the class for the upload file button
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the caption for the button
    setButtonCaption(i_button_caption) 
    {
      this.m_button_caption = i_button_caption;

      this.setControl();

    } // setButtonCaption 

    // Display the submit button caption
    displayButtonCaption()
    {
        var el_submit_button = this.getElementSubmitButton();

        if (el_submit_button != null)
        {
            el_submit_button.value = this.m_button_caption;
        }   

    } // displayButtonCaption

    // Hide the submit button caption
    hideButtonCaption()
    {
        var el_submit_button = this.getElementSubmitButton();

        if (el_submit_button != null)
        {
            el_submit_button.value = '';
        }

    } // hideButtonCaption    

    // Set filter for file types (extensions), for instance '.docx,.doc"
    setExtensions(i_accept_extensions)
    {
        this.m_accept_extensions = i_accept_extensions;

        this.setControl();
    }

    // Sets the label text for the upload file button
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the upload file button
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the upload file button
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the upload file button
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove

    // Hides or displays the upload div
    hideUploadDiv(i_b_hide)
    {
        if (i_b_hide)
        {
            this.m_el_div_container.style.display = 'none';
        }
        else
        {
            this.m_el_div_container.style.display = 'block';
        }

    } // hideUploadDiv

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzUploadFile error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Activates the function (the form) that will upload a file. When the user clicks the
    // submit button of the form the file will be uploaded.  
    // The input data is the <form> that holds the input data for the upload. 
    // The submit button event function is set to the file UploadFileToServer.php and
    // the one input variable is the file name.
    // Do not fully understand how it works...
    activateAjaxUploadFunction()
    {
        // alert("Enter activateAjaxUploadFunction");

        $('#' + this.m_id_upload_form).ajaxForm(function() { 
           alert('Datei ist hochgeladen');
           //QQQQQQ   location.reload(); // Close <div>
        }); 

        // alert("Exit activateAjaxUploadFunction");

    } // activateAjaxUploadFunction

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

        this.hideButtonCaption();

    } // setControl

    // Returns the HTML text box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_upload_button);

    } // getHtmlElement

    // this.m_id_upload_form
    // Returns the string that defines the HTML upload file button string
    // <form action="Php/UploadFileToServer.php" method="post" enctype="multipart/form-data">
    // <input type="file" id="id_upload_button" onchange="eventFileSelected" accept=".doc,.docx" title="Tip ...">  
    // <input type="submit" value="Upload file" name="submit">
    // </form>
    getHtmlString()
    {
        var ret_html_str = '';

        ret_html_str = ret_html_str + 
            '<form id= "' + this.m_id_upload_form + '" ';

            ret_html_str = ret_html_str + 
            ' action="Php/UploadFileToServer.php" method="post" enctype="multipart/form-data">';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_upload_button, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_upload_button, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="file" id="' + this.m_id_upload_button + '" ';

        ret_html_str = ret_html_str + 'name="name_file_to_upload" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        if (this.m_onchange_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onchange="' + this.m_onchange_function + '()" ';
        }

        if (this.m_accept_extensions.length > 0)
        {
            ret_html_str = ret_html_str + ' accept="' + this.m_accept_extensions + '" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>';

        ret_html_str = ret_html_str + '<input id="' + this.m_id_upload_submit_button + '" ';

        ret_html_str = ret_html_str + ' type="submit" value="';
        
        ret_html_str = ret_html_str + this.m_button_caption + '" name="name_submit">';

        ret_html_str = ret_html_str + '</form>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

    // Returns the submit butto element
    getElementSubmitButton()
    {
        return  document.getElementById(this.m_id_upload_submit_button);

    } // getElementSubmitButton

} // JazzUploadFile


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Upload File /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// File: JazzControlDatePicker.js
// Date: 2021-04-16
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for a date picker

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Date Picker ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Referrences
// https://www.jquery-az.com/learn-use-jquery-ui-datepicker-calendar-widget-examples-free-code/
// https://www.geeksforgeeks.org/jquery-ui-date-picker/
// 

// Class for a button that uploads a file to the server
class JazzDatePicker 
{
    // Function that is executed when an object of this class is created
    // 1. Member variables are set
    // 2. 
    constructor(i_id_date_picker, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the text box
        this.m_id_date_picker = i_id_date_picker;

        // The identity of the container for the text box
        this.m_id_div_container = i_id_div_container;

        // The container element for the text box
        this.m_el_div_container = null;

        // The class for the text box
        this.m_class = '';
    
        // The value of the text box
        this.m_value = '';

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Size of the text box. Size is the number of characters
        // If size not is set there will be no attribute size= "20"
        // Then the default value for the browser application will be the size
        this.m_text_box_size = '';

        // Maximum length (number of characters) of the input string 
        // If the maximum length not is defined there will be no attribute maxlength= "30"
        // Then the default value for the browser application will be the maximum length
        this.m_maxlength = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';    

        // The onchange function name. Only the name is input
        this.m_onchange_function = '';
        
        this.setDivContainerElement();

        this.setControl();        

    } // constructor

    // Start the date picker
    startDatePicker()
    {
        var ref_id_str = '#' + this.m_id_date_picker;

        $(function() { 
            $(ref_id_str).datepicker(
                { 
                dateFormat: 'yy-mm-dd'
            }); 
        }); 

    } // startDatePicker

    // Set and get functions
    // =====================

    // Sets the value for the date picker text box
    setValue(i_value) 
    {
      this.m_value = i_value;

      var element_html = this.getHtmlElement();

      element_html.value = this.m_value;

      // Not necessary this.setControl();

    } // setValue

    // Returns the value of the date picker text box
    getValue()
    {
        var element_html = this.getHtmlElement();

        var value = element_html.value;

        this.setValue(value);

        return this.m_value;

    } // getValue    

    // Set functions for the layout member variables
    // =============================================

    // Sets the class for the text box 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the onchange function name. Only the name is input
    setOnchangeFunctionName(i_onchange_function) 
    {
      this.m_onchange_function = i_onchange_function;

      this.setControl();

    } // setOnchangeFunctionName 

    // Sets the label text for the text box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the text box
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the text box
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove
    
    // Sets the text box size. The size is the number of characters
    setSize(i_text_box_size) 
    {
        this.m_text_box_size = i_text_box_size;
        
        this.setControl();

    } // setSize

    // Sets the maximum length of the input string. 
    // The maximum length value is the number of characters
    setMaxlength(i_maxlength) 
    {
        this.m_maxlength = i_maxlength; 

        this.setControl();

    } // setMaxlength
   
    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle
    
    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
        alert("JazzDatePicker error: HTML element with id= " + this.m_id_div_container + " does not exist.");

        ret_b_check = false;
        }   
    
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

    } // setControl

    // Returns the HTML text box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_date_picker);

    } // getHtmlElement

    // Returns the string that defines the HTML text box string
    // <input type="text" id="id_date_picker" value="" size="20" maxlength="30" title="Tip ...">  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_date_picker, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_date_picker, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="text" id="' + this.m_id_date_picker + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        ret_html_str = ret_html_str + ' value= "' + this.m_value + '" ';

        if (this.m_text_box_size.length > 0)
        {
            ret_html_str = ret_html_str + ' size="' + this.m_text_box_size + '" ';
        }

        if (this.m_maxlength.length > 0)
        {
            ret_html_str = ret_html_str + ' maxlength="' + this.m_maxlength + '" ';
        }
        
        if (this.m_onchange_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onchange="' + this.m_onchange_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_date_picker, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString


} // JazzDatePicker

// File: UtilControls.js
// Date: 2023-05-09
// Author: Gunnar Lidén

// File content
// =============
//
// Utility functions for controls

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

    // Returns the label string. Sample string:
    // <label for="id_text_box" title= "Tooltip for the control ..." >Label text</label>
    function getHtmlElementLabelString(i_label_str, i_id_control, i_title)
    {
        var ret_label_str = '';

        if (i_label_str == 0)
        {
            alert("getHtmlElementLabelString Input label string is not set");

            return ret_label_str;
        }

        if (i_id_control == 0)
        {
            alert("getHtmlElementLabelString Input control identity string must be set");

            return ret_label_str;
        }

        ret_label_str = ret_label_str + '<label for= "' + i_id_control + '" ';

        if (i_title.length > 0)
        {
            ret_label_str = ret_label_str + ' title="' + i_title + '" ';
        }

        ret_label_str = ret_label_str + '>';

        ret_label_str = ret_label_str + i_label_str;

        ret_label_str = ret_label_str + '</label>';

        return ret_label_str;

    } // getHtmlElementLabelString
    
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



// File: GridList.js
// Date: 2023-11-18
// Author: Gunnar Lidén

// File content
// =============
//
// Class GridList

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Grid List /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// // Class that creates a grid list control
class GridList 
{
    // Creates the instance of the class
    // i_id_my_fctn_str: 
    // Application unique string for the calling function. 
    // Used to construct identities and class names
    // i_id_div_container:
    // Place holder for the gridlist
    constructor(i_id_my_fctn_str, i_id_div_container) 
    {
        // Member variables
        // ================

        // String used to construct identities and class names that are
        // unique for an application
        this.m_id_my_fctn_str = i_id_my_fctn_str;

        // The identity of the container for the grid list control
        this.m_id_div_container = i_id_div_container;

        // Grid list case
        this.m_grid_list_case = 'case_one';

        // Array of record numbers defining the records and used for m_onclick_function
        // that can get additional data about the record from another the the original
        // source like for instance the JazzGuestsXml XML object (file JazzGuests.xml).
        this.m_rec_number_array = null;

        // Array of icon get function names. No icons if null
        this.m_rec_icon_name_array = null;

        // Array of texts for field one. No field one if null
        this.m_rec_text_field_one_array = null;

        // Array of texts for field two. No field two if null
        this.m_rec_text_field_two_array = null;
        
        // Array of texts for field three. No field three if null
        this.m_rec_text_field_three_array = null;

        // The number of columns
        this.m_n_columns = 3;

        // Position before grid row of icon display all record rows
        this.m_row_pos_all_rec_icon = 2;

        // Styles for grid list element. Separate with semicolon
        this.m_style_grid_list = 'padding-bottom: 10px';

        // Styles for grid list row. Separate with semicolon
        this.m_style_row = 'padding-bottom: 10px';

        // Styles for grid list record. Separate with semicolon
        this.m_style_record = 'padding: 10px';

        // Styles for grid list record icon. Separate with semicolon
        this.m_style_record_icon = 'padding: 10px';

        // Styles for grid list record field one. Separate with semicolon
        this.m_style_record_field_one = 'font-size: 10px; font-weight: bold';

        // Styles for grid list record field one. Separate with semicolon
        this.m_style_record_field_two = 'font-size: 10px; font-style: italic';

        // Styles for grid list record field one. Separate with semicolon
        this.m_style_record_field_three = 'font-size: 10px; font-style: italic';

        // The container element for the grid list control
        this.m_el_div_container = null;

        // The onclick record function name. Only the name is input
        // The function gets record number from m_rec_number_array as input
        this.m_onclick_function = '';

        // The grid list record height
        this.m_rec_height = '30px';

        // The grid list text record width 
        this.m_rec_text_width = '210px';

        // The grid list icon record width 
        this.m_rec_icon_width = '30px';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';
        
        // Initialization
        // ==============

        this.setDivContainerElement();

    } // constructor

    // Set functions for the layout member variables
    // =============================================

    // Set grid list record case to one
    setRecordCaseOne()
    {
        this.m_grid_list_case = 'case_one';

    } // setRecordCaseOne

    // Set grid list record case to two
    setRecordCaseTwo()
    {
        this.m_grid_list_case = 'case_two';

    } // setRecordCaseTwo

    // Returns true if grid list record case is one
    isRecordCaseOne()
    {
        if (this.m_grid_list_case == 'case_one')
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isRecordCaseOne

    // Returns true if grid list record case is two
    isRecordCaseTwo()
    {
        if (this.m_grid_list_case == 'case_two')
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isRecordCaseTwo

    // Sets the grid list record height
    setRecordHeight(I_rec_height) 
    {
      this.m_rec_height = i_rec_height;

    } // setRecHeight    

    // Sets the grid list text record width
    setRecordTextWidth(i_rec_text_width)
    {
        this.m_rec_text_width = i_rec_text_width;

    } // setRecordTextWidth

    // Sets the grid list icon record width
    setRecordIconWidth(i_rec_icon_width)
    {
        this.m_rec_icon_width = i_rec_icon_width;

    } // setRecordIconWidth

    // Set styles for grid list element. Separate with semicolon
    setStyleGridListString(i_style_grid_list)
    {
        this.m_style_grid_list = i_style_grid_list;

    } // setStyleGridListString  

    // Set styles for grid list row. Separate with semicolon
    setStyleRowString(i_style_row)
    {
        this.m_style_row = i_style_row;

    } // setStyleRowString  

    // Set styles for grid list record. Separate with semicolon
    setStyleRecordString(i_style_record)
    {
        this.m_style_record = i_style_record;

    } // setStyleRecordString

    // Set styles for grid list record icon. Separate with semicolon
    setStyleRecordIconString(i_style_record_icon)
    {
        this.m_style_record_icon = i_style_record_icon;

    } // setStyleRecordIconString

    // Set styles for grid list record field one. Separate with semicolon
    setStyleRecordFieldOneString(i_style_record_field_one)
    {
        this.m_style_record_field_one = i_style_record_field_one;

    } // setStyleRecordFieldOneString

    // Set styles for grid list record field two. Separate with semicolon
    setStyleRecordFieldTwoString(i_style_record_field_two)
    {
        this.m_style_record_field_two = i_style_record_field_two;

    } // setStyleRecordFieldTwoString

    // Set styles for grid list record field two. Separate with semicolon
    setStyleRecordFieldThreeString(i_style_record_field_three)
    {
        this.m_style_record_field_three = i_style_record_field_three;

    } // setStyleRecordFieldThreeString 

    // Set array of record numbers defining the records and used for m_onclick_function
    setRecordNumberArray(i_rec_number_array)
    {
        this.m_rec_number_array = i_rec_number_array;

    } // setRecordNumberArray

    // Set array of icon get function names.
    setRecordIconNameArray(i_rec_icon_name_array)
    {
        this.m_rec_icon_name_array = i_rec_icon_name_array;

    } // setRecordIconNameArray

    // Set array of texts for field one.
    setRecordTextFieldOneArray(i_rec_text_field_one_array)
    {
        this.m_rec_text_field_one_array = i_rec_text_field_one_array;

    } // setRecordTextFieldOneArray

    // Set array of texts for field two.
    setRecordTextFieldTwoArray(i_rec_text_field_two_array)
    {
        this.m_rec_text_field_two_array = i_rec_text_field_two_array;

    } // setRecordTextFieldTwoArray    

    // Set array of texts for field three.
    setRecordTextFieldThreeArray(i_rec_text_field_three_array)
    {
        this.m_rec_text_field_three_array = i_rec_text_field_three_array;

    } // setRecordTextFieldThreeArray    

    // Set the number of columns
    setNumberOfColumns(i_n_columns)
    {
        this.m_n_columns = i_n_columns;

    } // setNumberOfColumns

    // Set the position before grid row of icon display all record rows
    setRowPosForAllRecIcon(i_row_pos_all_rec_icon)
    {
        this.m_row_pos_all_rec_icon = i_row_pos_all_rec_icon;

    } // setRowPosForAllRecIcon

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

    } // setTitle
    
    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Sets the onchange function name. Only the name is input
    // If not defined the records are not clickable
    setOnclickFunctionName(i_onclick_function) 
    {
      this.m_onclick_function = i_onclick_function;

    } // setOnchangeFunctionName     

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("GridList error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Returns HTML string for field one, two or three for a given record index
    // Please not that arrays m_rec_text_field_one_array, _two_ and _three_
    // normally not are all records from the original XML object source. The
    // array m_rec_number_array hold the references for the original source 
    getFieldString(i_record_index, i_field, i_n_tabs)
    {
        var ret_field_str = '';

        if (i_field <= 0 || i_field >= 4)
        {
            alert("GridList.getFieldString i_field= " + i_field.toString() + " is not implemented");

            return ret_field_str;
        }            
      
        var field_style_str = '';

        if (this.m_grid_list_case == 'case_one')
        {
            field_style_str = 'clear: both';
        }
        else if (this.m_grid_list_case == 'case_two')
        {
            field_style_str = 'float: left';
        }
        else
        {
            alert("GridList.getFieldString Case " + this.m_grid_list_case + " is not implemented");

            return ret_field_str;
        }

        var inner_html = '';

        if (i_field == 1 && this.m_style_record_field_one.length > 0)
        {
            field_style_str = field_style_str + '; ' + this.m_style_record_field_one;

            if (this.m_rec_text_field_one_array != null)
            {
                inner_html = this.m_rec_text_field_one_array[i_record_index];
            }
        }
        else if (i_field == 2 && this.m_style_record_field_two.length > 0)
        {
            field_style_str = field_style_str + ';' + this.m_style_record_field_two;

            if (this.m_rec_text_field_two_array != null)
            {
                inner_html = this.m_rec_text_field_two_array[i_record_index];
            }
        }
        else if (i_field == 3 && this.m_style_record_field_three.length > 0)
        {
            field_style_str = field_style_str + '; ' + this.m_style_record_field_three;

            if (this.m_rec_text_field_three_array != null)
            {
                inner_html = this.m_rec_text_field_three_array[i_record_index];
            }
        }

        if (inner_html.length == 0)
        {
            return ret_field_str;
        }

        ret_field_str = ret_field_str +
        UtilHtml.getDivElementLeafStyleString('', field_style_str, inner_html, i_n_tabs);

        return ret_field_str;

    } // getFieldString

    // Returns element record
    getElementRecord(i_record_index)
    {
        return document.getElementById(getIdRecord(i_record_index));

    } // getElementRecord

    // Returns the identity string for the record element
    getIdRecord(i_record_index)
    {
        var ret_id_record_str = 'id_grid_list';

        ret_id_record_str = ret_id_record_str + this.m_id_my_fctn_str;

        ret_id_record_str = ret_id_record_str + '_rec_' + i_record_index.toString();

        return ret_id_record_str;
        
    } // getIdRecord

    // Returns a on click statement. Input record number ist the reference number for
    // the original XML object source for the data, for example JazzGuests.
    // These record numbers are stored in array m_rec_number_array
    getClickEventStatementString(i_record_number)
    {
        if (this.m_onclick_function.length == 0)
        {
            return '';
        }

        return 'onclick= "' + this.m_onclick_function + '(' + i_record_number.toString() + ')"';

    } // getClickEventStyleString

    // Returns element row
    getElementRow(i_row_number)
    {
        return document.getElementById(getIdRow(i_row_number));

    } // getElementRow

    // Returns the identity string for the row element
    getIdRow(i_row_number)
    {
        var ret_id_row_str = 'id_grid_list';

        ret_id_row_str = ret_id_row_str + this.m_id_my_fctn_str;

        ret_id_row_str = ret_id_row_str + '_row_' + i_row_number.toString();

        return ret_id_row_str;
        
    } // getIdRow

    // Returns the HTML string that defines the field one element
    // Please note that getFieldString set styles depending on grid case
    getFieldOneString(i_record_index, i_n_tabs)
    {
        return this.getFieldString(i_record_index, 1, i_n_tabs+1); 

    } // getFieldOneString

    // Returns the HTML string that defines the field two element
    // Please note that getFieldString set styles depending on grid case
    getFieldTwoString(i_record_index, i_n_tabs)
    {
        return this.getFieldString(i_record_index, 2, i_n_tabs+1); 

    } // getFieldTwoString

    // Returns the HTML string that defines the field three element
    // Please note that getFieldString set styles depending on grid case
    getFieldThreeString(i_record_index, i_n_tabs)
    {
        return this.getFieldString(i_record_index, 3, i_n_tabs+1); 

    } // getFieldThreeString

    // Returns the HTML string that defines the group element for case one
    getGroupCaseOneString(i_record_index, i_n_tabs)
    {
        var div_inner_html_array = [];

        var index_out = -1;

        var field_one_str = this.getFieldOneString(i_record_index, i_n_tabs+1);

        var field_two_str = this.getFieldTwoString(i_record_index, i_n_tabs+1);

        var field_three_str = this.getFieldThreeString(i_record_index, i_n_tabs+1);

        if (field_one_str.length > 0)
        {
            index_out = index_out + 1;

            div_inner_html_array[index_out] = field_one_str;
        }

        if (field_two_str.length > 0)
        {
            index_out = index_out + 1;

            div_inner_html_array[index_out] = field_two_str;
        }       

        if (field_three_str.length > 0)
        {
            index_out = index_out + 1;

            div_inner_html_array[index_out] = field_three_str;
        }   
        
        if (index_out < 0)
        {
            // alert("GridList.getGroupCaseOneString Warning No text fields are defined");

            return '';
        }

        var styles_group_txt_str = 'float: left; margin-left: 10px; width: ' + this.m_rec_text_width;

        return UtilHtml.getDivElementGroupStyleString('', styles_group_txt_str, div_inner_html_array, i_n_tabs);

    } // getGroupCaseOneString

    // Returns HTML string for the icon
    getIconString(i_record_index, i_n_tabs)
    {
        var ret_icon_str = '';

        if (this.m_rec_icon_name_array == null)
        {
            return ret_icon_str;
        }

        var file_name_icon = this.m_rec_icon_name_array[i_record_index];

        if (file_name_icon.length == 0)
        {
            return ret_icon_str;
        }

        var id_div_el_icon = '';

        var styles_str =  'float: left; margin-right: 4px';

        var icon_width = this.m_rec_icon_width;

        var event_fctn =  '';

        var icon_title =  '';

        ret_icon_str = ret_icon_str +

        UtilHtml.getDivElementIconStyleString(id_div_el_icon, styles_str, file_name_icon, icon_width, event_fctn, icon_title, i_n_tabs);

        return ret_icon_str;

    } // getIconString

    // Returns the HTML string that defines the record element for case one
    getRecordCaseOne(i_record_index, i_n_tabs)
    {
        var rec_styles_str =  'float: left; margin-right: 4px; cursor: pointer'; // border: 1px solid blue;

        var icon_str = this.getIconString(i_record_index, i_n_tabs+1);

        var group_str =  this.getGroupCaseOneString(i_record_index, i_n_tabs+1);

        var div_inner_html_array = [];

        var index_out = -1;

        if (icon_str.length > 0)
        {
            index_out = index_out + 1;

            div_inner_html_array[index_out] = icon_str;

        }

        if (group_str.length > 0)
        {
            index_out = index_out + 1;

            div_inner_html_array[index_out] = group_str;
        }

        if (index_out < 0)
        {
            alert("GridList.getRecordCaseOne No icon and no group with text elements are defined");

            return '';
        }

        //20240318 var record_number = this.m_rec_number_array[i_record_index];

        //20240318 var event_str = this.getClickEventStatementString(record_number);

        var event_str = this.getClickEventStatementString(i_record_index);

        return UtilHtml.getDivElementGroupStyleEventString(this.getIdRecord(i_record_index), rec_styles_str, event_str, div_inner_html_array, i_n_tabs);
        
    } // getRecordCaseOne

    // Returns the HTML string that defines one row element for case one
    getRowCaseOne(i_row_number, i_start_record_index, i_end_record_index, i_n_tabs)
    {
        if (i_start_record_index < i_end_record_index)
        {
            alert("GridList.getRowCaseOne Record start index " + 
            i_start_record_index.toString() + " is less than end index " +
            i_end_record_index.toString());

            return '';
        }

        var row_styles_str =  'overflow: hidden; margin-top: 5px; clear: both; border'; // : 1px solid black;

        var div_inner_html_array = [];

        var index_out = 0;

        for (var rec_index=i_start_record_index; rec_index >= i_end_record_index; rec_index--)
        {
            div_inner_html_array[index_out] = this.getRecordCaseOne(rec_index, i_n_tabs+1);

            index_out = index_out + 1;
        }

        return UtilHtml.getDivElementGroupStyleString(this.getIdRow(i_row_number), row_styles_str, div_inner_html_array, i_n_tabs+1);

    } // getRowCaseOne

    // Returns the HTML string that defines the grid list case one element
    getGridListCaseOneString(i_n_tabs)
    {
        var div_inner_html_array = [];

        var index_out = -1;

        var n_records = this.m_rec_number_array.length;

        var start_record_index = n_records - 1;

        var end_row_number = parseInt(n_records/this.m_n_columns) + 1;

        for (var row_number=1; row_number <= end_row_number; row_number++)
        {
            var end_record_index = start_record_index - this.m_n_columns + 1;

            if (end_record_index < 0)
            {
                end_record_index = 0;
            }

            var row_str = this.getRowCaseOne(row_number, start_record_index, end_record_index, i_n_tabs+1);

            if (row_str.length > 0)
            {
                index_out = index_out + 1;

                div_inner_html_array[index_out] = row_str;

                start_record_index = end_record_index - 1;

                if (start_record_index < 0)
                {
                    break;
                }
            }
            else
            {
                break;
            }

        } // row_number

        var id_grid_list = 'id_div_grid_list_' + this.m_id_my_fctn_str;

        var grid_list_styles_str =  'clear: both; ' + this.m_style_grid_list;

        return UtilHtml.getDivElementGroupStyleString(id_grid_list, grid_list_styles_str, div_inner_html_array, i_n_tabs+1);

    } // getGridListCaseOneString

    // Returns false if input data not is OK
    checkInputData()
    {
        if (this.m_rec_number_array == null || this.m_rec_number_array.length == 0)
        {
            alert("GridList.checkInputData Record number array is not defined");

            return false;
        }

        var n_records = this.m_rec_number_array.length;

        var n_defined_data_arrays = 0;

        if (this.m_rec_text_field_one_array != null)
        {
            n_defined_data_arrays = n_defined_data_arrays + 1;

            if (n_records != this.m_rec_text_field_one_array.length)
            {
                alert("GridList.checkInputData The number of records in array m_rec_text_field_one_array is not equal to the number in array m_rec_number_array");

                return false;
            }
        }
        
        if (this.m_rec_text_field_two_array != null)
        {
            n_defined_data_arrays = n_defined_data_arrays + 1;

            if (n_records != this.m_rec_text_field_two_array.length)
            {
                alert("GridList.checkInputData The number of records in array m_rec_text_field_two_array is not equal to the number in array m_rec_number_array");

                return false;
            }
        }

        if (this.m_rec_text_field_three_array != null)
        {
            n_defined_data_arrays = n_defined_data_arrays + 1;

            if (n_records != this.m_rec_text_field_three_array.length)
            {
                alert("GridList.checkInputData The number of records in array m_rec_text_field_three_array is not equal to the number in array m_rec_number_array");

                return false;
            }
        }

        if (this.m_rec_icon_name_array != null)
        {
            n_defined_data_arrays = n_defined_data_arrays + 1;

            if (n_records != this.m_rec_icon_name_array.length)
            {
                alert("GridList.checkInputData The number of records in array m_rec_icon_name_array is not equal to the number in array m_rec_number_array");

                return false;
            }
        }

        if (0 == n_defined_data_arrays)
        {
            alert("GridList.checkInputData At least one text or icon array must be defined");

            return false;            
        }

        return true;

    } // checkInputData

    // Returns the string that defines the HTML grid list string
    getHtmlString(i_n_tabs)
    {
        if (!this.checkInputData())
        {
            return '';
        }

        var ret_html_str = '';

        var n_tabs = 2;

        var ret_html_str = this.getGridListCaseOneString(n_tabs);


        /*

        */

        return ret_html_str;

    } // getHtmlString

} // GridList

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Grid List ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// File: UtilHtml.js
// Date: 2024-03-17
// Author: Gunnar Lidén

// File content
// =============
//
// Class UtilHtml with string functions for the generation of HTML code

// This class should replace UtilityGenerateHtml.js

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Grid List /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Static string functions for the generation of HTML code
class UtilHtml 
{
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Group Div Elements //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Get the string that defines the div for a group of div elements
    static getDivElementGroupString(i_id_div_group, i_cl_div_group, i_div_inner_html_array, i_n_tabs)
    {
        var ret_div_group_str = '';
        
        ret_div_group_str = ret_div_group_str + this.getTabs(i_n_tabs);
    
        ret_div_group_str = ret_div_group_str + this.getDivStartString(i_id_div_group, i_cl_div_group);
    
        ret_div_group_str = ret_div_group_str + this.getNewLine();
    
        for (var div_index=0; div_index < i_div_inner_html_array.length; div_index++)
        {
            ret_div_group_str = ret_div_group_str + i_div_inner_html_array[div_index];
        }
        
        ret_div_group_str = ret_div_group_str + this.getTabs(i_n_tabs);
    
        ret_div_group_str = ret_div_group_str + this.getDivEndString(i_id_div_group, i_cl_div_group);
    
        ret_div_group_str = ret_div_group_str + this.getNewLine() + this.getNewLine();
    
        return ret_div_group_str;
    
    } // getDivElementGroupString

    // Get the string that defines the div for a group of div elements. Styles as string is input data
    static getDivElementGroupStyleString(i_id_div_group, i_styles_str, i_div_inner_html_array, i_n_tabs)
    {
        var ret_div_group_str = '';
        
        ret_div_group_str = ret_div_group_str + this.getTabs(i_n_tabs);
    
        ret_div_group_str = ret_div_group_str + this.getDivStartStyleString(i_id_div_group, i_styles_str);
    
        ret_div_group_str = ret_div_group_str + this.getNewLine();
    
        for (var div_index=0; div_index < i_div_inner_html_array.length; div_index++)
        {
            ret_div_group_str = ret_div_group_str + i_div_inner_html_array[div_index];
        }
        
        ret_div_group_str = ret_div_group_str + this.getTabs(i_n_tabs);
    
        ret_div_group_str = ret_div_group_str + this.getDivEndStyleString(i_id_div_group, i_styles_str);
    
        ret_div_group_str = ret_div_group_str + this.getNewLine() + this.getNewLine();
    
        return ret_div_group_str;
    
    } // getDivElementGroupStyleString

    // Get the string that defines the div for a group of div elements. 
    // Styles as string is input data and also an event statement like oncklick= "onClickRecord(4)" where 4 is a record number
    static getDivElementGroupStyleEventString(i_id_div_group, i_styles_str, i_event_str, i_div_inner_html_array, i_n_tabs)
    {
        var ret_div_group_str = '';
        
        ret_div_group_str = ret_div_group_str + this.getTabs(i_n_tabs);
    
        ret_div_group_str = ret_div_group_str + this.getDivStartStyleEventString(i_id_div_group, i_styles_str, i_event_str);
    
        ret_div_group_str = ret_div_group_str + this.getNewLine();
    
        for (var div_index=0; div_index < i_div_inner_html_array.length; div_index++)
        {
            ret_div_group_str = ret_div_group_str + i_div_inner_html_array[div_index];
        }
        
        ret_div_group_str = ret_div_group_str + this.getTabs(i_n_tabs);
    
        ret_div_group_str = ret_div_group_str + this.getDivEndStyleString(i_id_div_group, i_styles_str);
    
        ret_div_group_str = ret_div_group_str + this.getNewLine() + this.getNewLine();
    
        return ret_div_group_str;
    
    } // getDivElementGroupStyleEventString

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Group Div Elements //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Leaf Div Element ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Get the HTML string that defines a leaf div element
    // Returned string is 
    // <div id= "i_id_element_leaf" class= "i_cl_element_leaf" >i_inner_html</div>
    // The returned string has i_n_tabs tabs and ends with a new line
    // Input identity i_id_element_leaf and class i_cl_element_leaf may be empty
    // Also the inner HTML i_inner_html may be empty 
    static getDivElementLeafString(i_id_element_leaf, i_cl_element_leaf, i_inner_html, i_n_tabs)
    {
        var ret_leaf_str = '';
    
        ret_leaf_str = ret_leaf_str + this.getTabs(i_n_tabs) +  this.getDivIdEqualString(i_id_element_leaf);
    
        ret_leaf_str = ret_leaf_str + this.getClassEqualString(i_cl_element_leaf);
    
        ret_leaf_str = ret_leaf_str + ' >';
    
        ret_leaf_str = ret_leaf_str + i_inner_html;
    
        ret_leaf_str = ret_leaf_str + this.getDivEndString('', '');
    
        ret_leaf_str = ret_leaf_str + this.getNewLine();
    
        return ret_leaf_str;
    
    } // getDivElementLeafString

    // Get the HTML string that defines a leaf div element
    // Returned string is 
    // <div id= "i_id_element_leaf" style= "i_styles_str" >i_inner_html</div>
    // The returned string has i_n_tabs tabs and ends with a new line
    // Input identity i_id_element_leaf and class i_styles_str may be empty
    // Also the inner HTML i_inner_html may be empty 
    static getDivElementLeafStyleString(i_id_element_leaf, i_styles_str, i_inner_html, i_n_tabs)
    {
        var ret_leaf_str = '';
    
        ret_leaf_str = ret_leaf_str + this.getTabs(i_n_tabs) +  this.getDivIdEqualString(i_id_element_leaf);
    
        ret_leaf_str = ret_leaf_str + this.getStyleEqualString(i_styles_str);
    
        ret_leaf_str = ret_leaf_str + ' >';
    
        ret_leaf_str = ret_leaf_str + i_inner_html;
    
        ret_leaf_str = ret_leaf_str + this.getDivEndString('', '');
    
        ret_leaf_str = ret_leaf_str + this.getNewLine();
    
        return ret_leaf_str;
    
    } // getDivElementLeafStyleString


    // Same as getDivElementLeafStyleString but with click event function
    static getDivElementLeafStyleClickString(i_id_element_leaf, i_styles_str, i_onclick_function, i_inner_html, i_n_tabs)
    {
        var ret_leaf_str = '';
    
        ret_leaf_str = ret_leaf_str + this.getTabs(i_n_tabs) +  this.getDivIdEqualString(i_id_element_leaf);
    
        ret_leaf_str = ret_leaf_str + this.getStyleEqualString(i_styles_str);

        if (i_onclick_function.length > 0)
        {
            var index_paranthesis = i_onclick_function.indexOf('(');

            if (index_paranthesis > 0)
            {
                ret_leaf_str = ret_leaf_str + ' onclick= "' + i_onclick_function + '" ';
            }
            else
            {
                ret_leaf_str = ret_leaf_str + ' onclick= "' + i_onclick_function + '()" ';
            }
        }
    
        ret_leaf_str = ret_leaf_str + ' >';
    
        ret_leaf_str = ret_leaf_str + i_inner_html;
    
        ret_leaf_str = ret_leaf_str + this.getDivEndString('', '');
    
        ret_leaf_str = ret_leaf_str + this.getNewLine();
    
        return ret_leaf_str;
    
    } // getDivElementLeafStyleClickString

    // Get the HTML string that defines a leaf div element
    // Returned string is 
    // <div id= "i_id_element_leaf" style= "i_styles_str" >i_inner_html</div>
    // The returned string has i_n_tabs tabs and ends with a new line
    // Input identity i_id_element_leaf and class i_styles_str may be empty
    // Also the inner HTML i_inner_html may be empty 
    static getDivElementLeafStyleMouseString(i_id_element_leaf, i_styles_str, i_on_mouse_over, i_on_mouse_out, i_inner_html, i_n_tabs)
    {
        var ret_leaf_str = '';
    
        ret_leaf_str = ret_leaf_str + this.getTabs(i_n_tabs) +  this.getDivIdEqualString(i_id_element_leaf);
    
        ret_leaf_str = ret_leaf_str + this.getStyleEqualString(i_styles_str);

        var index_paranthesis= -1;

        if (i_on_mouse_over.length > 0)
        {
            index_paranthesis = i_on_mouse_over.indexOf('(');

            if (index_paranthesis > 0)
            {
                ret_leaf_str = ret_leaf_str + ' onmouseover= "' + i_on_mouse_over + '" ';
            }
            else
            {
                ret_leaf_str = ret_leaf_str + ' onmouseover= "' + i_on_mouse_over + '()" ';
            }
        }

        if (i_on_mouse_out.length > 0)
        {
            index_paranthesis = i_on_mouse_out.indexOf('(');

            if (index_paranthesis > 0)
            {
                ret_leaf_str = ret_leaf_str + ' onmouseout= "' + i_on_mouse_out + '" ';
            }
            else
            {
                ret_leaf_str = ret_leaf_str + ' onmouseout= "' + i_on_mouse_out + '()" ';
            }
        }

        ret_leaf_str = ret_leaf_str + ' >';
    
        ret_leaf_str = ret_leaf_str + i_inner_html;
    
        ret_leaf_str = ret_leaf_str + this.getDivEndString('', '');
    
        ret_leaf_str = ret_leaf_str + this.getNewLine();
    
        return ret_leaf_str;
    
    } // getDivElementLeafStyleMouseString

    // Get the HTML string that defines a div icon element string
    // Returned string is
    // 
    // <div id= "i_id_div_el_icon" class= "i_cl_div_el_icon" >
    //    <img src= "i_file_name_icon" width= "i_width" onclick= "i_event_fctn" title= "i_title">
    // </div  <!-- i_cl_div_el_icon -->
    //
    // The returned string has i_n_tabs tabs and ends with a new line
    // Input identity i_id_div_el_icon and class i_cl_div_el_icon may be empty
    // Identity and calls are for the div element. Icon image has no identity and no class
    static getDivElementIconString(i_id_div_el_icon, i_cl_div_el_icon, i_file_name_icon, i_width, i_event_fctn, i_title, i_n_tabs)
    {
        var ret_icon_str = '';
    
        var image_str = this.getImgString(i_file_name_icon, 'Icon', '', '', i_width, i_event_fctn, i_title);
    
        ret_icon_str = ret_icon_str + this.getTabs(i_n_tabs) +  this.getDivIdEqualString(i_id_div_el_icon);
    
        ret_icon_str = ret_icon_str + this.getClassEqualString(i_cl_div_el_icon);
    
        ret_icon_str = ret_icon_str + ' >';
        
        ret_icon_str = ret_icon_str + this.getNewLine();	
    
        ret_icon_str = ret_icon_str + this.getTabs(i_n_tabs + 1);
        
        ret_icon_str = ret_icon_str + image_str;
       
        ret_icon_str = ret_icon_str + this.getNewLine();	
    
        ret_icon_str = ret_icon_str + this.getTabs(i_n_tabs);
    
        ret_icon_str = ret_icon_str + this.getDivEndString('', i_cl_div_el_icon);
    
        ret_icon_str = ret_icon_str + this.getNewLine();
    
        return ret_icon_str;
    
    } // getDivElementIconString

    // Get the HTML string that defines a div icon element string
    // Returned string is
    // 
    // <div id= "i_id_div_el_icon" style= "i_styles_str" >
    //    <img src= "i_file_name_icon" width= "i_width" onclick= "i_event_fctn" title= "i_title">
    // </div  <!-- i_styles_str -->
    //
    // The returned string has i_n_tabs tabs and ends with a new line
    // Input identity i_id_div_el_icon and style i_styles_str may be empty
    // Identity and calls are for the div element. Icon image has no identity and no class
    static getDivElementIconStyleString(i_id_div_el_icon, i_styles_str, i_file_name_icon, i_width, i_event_fctn, i_title, i_n_tabs)
    {
        var ret_icon_str = '';
    
        var image_str = this.getImgString(i_file_name_icon, 'Icon', '', '', i_width, i_event_fctn, i_title);
    
        ret_icon_str = ret_icon_str + this.getTabs(i_n_tabs) +  this.getDivIdEqualString(i_id_div_el_icon);
    
        ret_icon_str = ret_icon_str + this.getStyleEqualString(i_styles_str);
    
        ret_icon_str = ret_icon_str + ' >';
        
        ret_icon_str = ret_icon_str + this.getNewLine();	
    
        ret_icon_str = ret_icon_str + this.getTabs(i_n_tabs + 1);
        
        ret_icon_str = ret_icon_str + image_str;
       
        ret_icon_str = ret_icon_str + this.getNewLine();	
    
        ret_icon_str = ret_icon_str + this.getTabs(i_n_tabs);
    
        ret_icon_str = ret_icon_str + this.getDivEndStyleString('', i_styles_str);
    
        ret_icon_str = ret_icon_str + this.getNewLine();
    
        return ret_icon_str;
    
    } // getDivElementIconStyleString

    // Same as getDivElementIconString but with the additional input parameters:
    // Identity and class for the image and image height
    // TODO Replace this. with UtilHtml.
    static getDivElementIconImageString(i_id_div_el_icon, i_cl_div_el_icon, i_id_el_icon, i_cl_el_icon, i_file_name_icon, i_width, i_height, i_event_fctn, i_title, i_n_tabs)
    {
        var ret_icon_str = '';
    
        // var image_str = getImgString(i_file_name_icon, 'Icon', '', '', i_width, i_event_fctn, i_title);
    
        var image_str = this.getImgWidthHeightString(i_file_name_icon, 'Icon', i_id_el_icon, i_cl_el_icon, i_width, i_height, i_event_fctn, i_title);
    
        ret_icon_str = ret_icon_str + this.getTabs(i_n_tabs) +  this.getDivIdEqualString(i_id_div_el_icon);
    
        ret_icon_str = ret_icon_str + this.getClassEqualString(i_cl_div_el_icon);
    
        ret_icon_str = ret_icon_str + ' >';
        
        ret_icon_str = ret_icon_str + this.getNewLine();	
    
        ret_icon_str = ret_icon_str + this.getTabs(i_n_tabs + 1);
        
        ret_icon_str = ret_icon_str + image_str;
       
        ret_icon_str = ret_icon_str + this.getNewLine();	
    
        ret_icon_str = ret_icon_str + this.getTabs(i_n_tabs);
    
        ret_icon_str = ret_icon_str + this.getDivEndString('', i_cl_div_el_icon);
    
        ret_icon_str = ret_icon_str + this.getNewLine();
    
        return ret_icon_str;
    
    } // getDivElementIconImageString

    // The returned string has i_n_tabs tabs and ends with a new line
    // Input identity i_id_div_el_image and class i_cl_div_el_image may be empty
    // Identity and calls are for the div element.
    // Input is an string defining an image element
    static getDivElementImageSimpleString(i_id_div_el_image, i_cl_div_el_image, i_el_image_str, i_n_tabs)
    {
        var ret_image_str = '';
    
        ret_image_str = ret_image_str + this.getTabs(i_n_tabs) +  this.getDivIdEqualString(i_id_div_el_image);
    
        ret_image_str = ret_image_str + this.getClassEqualString(i_cl_div_el_image);
    
        ret_image_str = ret_image_str + ' >';
        
        ret_image_str = ret_image_str + this.getNewLine();	
    
        ret_image_str = ret_image_str + this.getTabs(i_n_tabs + 1);
        
        ret_image_str = ret_image_str + i_el_image_str;
    
        ret_image_str = ret_image_str + this.getDivEndString('', i_cl_div_el_image);
    
        ret_image_str = ret_image_str + this.getNewLine();
    
        return ret_image_str;
    
    } // getDivElementImageSimpleString

    // The returned string has i_n_tabs tabs and ends with a new line
    // Input identity i_id_div_el_image and class i_cl_div_el_image may be empty
    // Identity and calls are for the div element. Image has no identity and no class
    static getDivElementImageString(i_id_div_el_image, i_cl_div_el_image, i_file_name_image, i_alt, i_width, i_event_fctn, i_title, i_n_tabs)
    {
        var ret_image_str = '';
    
        var image_str = this.getImgString(i_file_name_image, i_alt, '', '', i_width, i_event_fctn, i_title);
    
        ret_image_str = ret_image_str + this.getTabs(i_n_tabs) +  this.getDivIdEqualString(i_id_div_el_image);
    
        ret_image_str = ret_image_str + this.getClassEqualString(i_cl_div_el_image);
    
        ret_image_str = ret_image_str + ' >';
        
        ret_image_str = ret_image_str + this.getNewLine();	
    
        ret_image_str = ret_image_str + this.getTabs(i_n_tabs + 1);
        
        ret_image_str = ret_image_str + image_str;
    
        ret_image_str = ret_image_str + this.getDivEndString('', i_cl_div_el_image);
    
        ret_image_str = ret_image_str + this.getNewLine();
    
        return ret_image_str;
    
    } // getDivElementImageString

    ///////////////////////////////////////////////////////////////////////////
    /////// End Leaf Div Element //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Dropdown Element ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the HTML code (string) for a dropdown element
    static getElementDropDownString(i_dropdown_name_array, i_dropdown_number_array, i_id_dropdown, i_cl_dropdown, i_name_dropdown, i_event_fctn, i_n_tabs)
    {
        // https://www.w3schools.com/tags/att_select_name.asp
        
        var ret_dropdown_str = '';
    
        if (!this.getClassEqualStringcheckgetElementDropDownArrays(i_dropdown_name_array, i_dropdown_number_array))
        {
            return ret_dropdown_str;
        }
    
        var select_start_str = this.getStartSelectString(i_id_dropdown, i_cl_dropdown, i_name_dropdown, i_event_fctn, i_n_tabs + 1);
        if (select_start_str.length == 0)
        {
            return ret_dropdown_str;
        }
    
        var select_end_str = this.getEndSelectString(i_n_tabs);
    
        ret_dropdown_str = ret_dropdown_str + select_start_str;
    
        for (var index_option=0; index_option < i_dropdown_name_array.length; index_option++)
        {
            var dropdown_name = i_dropdown_name_array[index_option];
    
            var dropdown_number = i_dropdown_number_array[index_option];
    
            ret_dropdown_str = ret_dropdown_str + this.getSelectOptionString(dropdown_name, dropdown_number, i_n_tabs + 1);
        }
    
        ret_dropdown_str = ret_dropdown_str + select_end_str;
    
        return ret_dropdown_str;
    
    } // getElementDropDownString

    // '<select class= "custom_select" id= "id_dropdown_concerts" name="dropdown_concerts"  onchange= "eventSelectConcertDropDown()" ><br>';
    // Returns the selection start tag with attributes
    // Returns empty string if input data not is valid
    static getStartSelectString(i_id_dropdown, i_cl_dropdown, i_name_dropdown, i_event_fctn, i_n_tabs)
    {
        var ret_selection_str = '';
    
        if (!this.checkStartSelectInput(i_id_dropdown, i_cl_dropdown, i_name_dropdown, i_event_fctn))
        {
            return ret_selection_str;
        }
    
        ret_selection_str = ret_selection_str + this.getTabs(i_n_tabs);
    
        ret_selection_str = ret_selection_str + '<select ';
    
        ret_selection_str = ret_selection_str + this.getDivIdEqualString(i_id_dropdown);
    
        ret_selection_str = ret_selection_str + this.getClassEqualString(i_cl_dropdown);
    
        ret_selection_str = ret_selection_str + this.getNameEqualString(i_name_dropdown);
    
        ret_selection_str = ret_selection_str + this.getEventOnchangeEqualString(i_event_fctn);
    
        ret_selection_str = ret_selection_str + ' >';
    
        ret_selection_str = ret_selection_str + this.getNewLine();
    
        return ret_selection_str;
    
    } // getStartSelectString

    // Returns </select>
    static getEndSelectString(i_n_tabs)
    {
        return this.getTabs(i_n_tabs) + '</select>' + getNewLine();
    
    } // getEndSelectString

    // var option_str = '<option value="' + g_drop_down_concert_number_array[index_dropdown].toString() + '">' + g_drop_down_concert_name_array[index_dropdown] + '</option><br>';
    // Returns select option string
    // Returns empty string if input data not is OK
    static getSelectOptionString(i_dropdown_name, i_dropdown_number, i_n_tabs)
    {
        var ret_option_str = '';
    
        if (i_dropdown_name.length == 0)
        {
            alert("UtilHtml.getSelectOptionString Input name is not defined");
    
            return ret_option_str;
        }
    
        var dropdown_number_str = i_dropdown_number.toString();
    
        if (dropdown_number_str.length == 0)
        {
            alert("UtilHtml.getSelectOptionString Input number is not defined");
    
            return ret_option_str;
        }
    
        ret_option_str = ret_option_str + this.getTabs(i_n_tabs);
    
        ret_option_str = ret_option_str + '<option value="' + dropdown_number_str + '" >'
    
        ret_option_str = ret_option_str + i_dropdown_name;
    
        ret_option_str = ret_option_str + '</option>';
    
        ret_option_str = ret_option_str + this.getNewLine();
    
        return ret_option_str;
    
    } // getSelectOptionString

    // Returns true if start selection input data is OK
    static checkStartSelectInput(i_id_dropdown, i_cl_dropdown, i_name_dropdown, i_event_fctn)
    {
        var ret_b_selection = true;
    
        if (i_id_dropdown.length == 0)
        {
            alert("UtilHtml.checkStartSelectInput Identity is not defined");
    
            ret_b_selection = false;
        }
    
        if (i_cl_dropdown.length == 0)
        {
            alert("UtilHtml.checkStartSelectInput Class is not defined");
    
            ret_b_selection = false;
        }
    
        if (i_name_dropdown.length == 0)
        {
            alert("UtilHtml.checkStartSelectInput Name is not defined");
    
            ret_b_selection = false;
        }
    
        if (i_event_fctn.length == 0)
        {
            alert("UtilHtml.checkStartSelectInput Event function is not defined");
    
            ret_b_selection = false;
        }
    
        return ret_b_selection;
    
    } // checkStartSelectInput
    
    // Returns true if the arrays are OK
    static checkgetElementDropDownArrays(i_dropdown_name_array, i_dropdown_number_array)
    {
        var ret_b_arrays = false;
    
        if (null == i_dropdown_name_array || null == i_dropdown_number_array)
        {
            alert("UtilHtml.checkgetElementDropDownArrays i_dropdown_name_array or i_dropdown_number_array is null");
    
            return ret_b_arrays;
        }
    
        if (i_dropdown_name_array.length == 0)
        {
            alert("UtilHtml.checkgetElementDropDownArrays i_dropdown_name_array has no elements");
    
            return ret_b_arrays;
        }
        
        if (i_dropdown_number_array.length == 0)
        {
            alert("UtilHtml.checkgetElementDropDownArrays i_dropdown_number_array has no elements");
    
            return ret_b_arrays;
        }
    
        if (i_dropdown_name_array.length != i_dropdown_number_array.length)
        {
            alert("UtilHtml.checkgetElementDropDownArrays i_dropdown_name_array and i_dropdown_number_array do not have the same number of elements");
    
            return ret_b_arrays;
        }    
    
        ret_b_arrays = true;
    
        return ret_b_arrays;
    
    } // checkgetElementDropDownArrays

    ///////////////////////////////////////////////////////////////////////////
    /////// End Dropdown Element //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Image Elements //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns string for an image
    // Input parameters
    // i_file_name:  File name with path of the image 
    // i_alt:        Alternative image text
    // i_id:         Element identity 
    // i_class:      Class 
    // i_width:      Image width
    // i_height:     Image height
    // i_event_fctn: Event function string
    // i_title       Title string will be tooltip in desktop computers
    static getImgWidthHeightString(i_file_name, i_alt, i_id, i_class, i_width, i_height, i_event_fctn, i_title)
    {
        var ret_img_str = '';
    
        if (i_file_name.length == 0)
        {
            alert("getImgWidthHeightString No input image file name");
    
            return ret_img_str;
        }
    
        if (i_alt.length == 0)
        {
            alert("getImgWidthHeightString Input alternative text is empty");
    
            return ret_img_str;
        }
    
        ret_img_str =  ret_img_str + '<img '; 
    
        ret_img_str =  ret_img_str + 'src= "' + i_file_name + '" ';
    
        ret_img_str =  ret_img_str + 'alt= "' + i_alt + '" ';
    
        if (i_id.length > 0)
        {
            ret_img_str =  ret_img_str + 'id= "' + i_id + '" ';
        }
    
        if (i_class.length > 0)
        {
            ret_img_str =  ret_img_str + 'class= "' + i_class + '" ';
        }
    
        if (i_width.length > 0)
        {
            ret_img_str =  ret_img_str + 'width= "' + i_width + '" ';
        }
    
        if (i_height.length > 0)
        {
            ret_img_str =  ret_img_str + 'height= "' + i_height + '" ';
        }    
    
        if (i_event_fctn.length > 0)
        {
            ret_img_str =  ret_img_str + 'onclick= "' + i_event_fctn + '" ';
        }
    
        if (i_title.length > 0)
        {
            ret_img_str =  ret_img_str + 'title= "' + i_title + '" ';
        }    
    
        ret_img_str =  ret_img_str + ' >'; 
    
        return ret_img_str;
    
    } // getImgWidthHeightString

    // Returns string for an image. All attributes may be defined
    // Input parameters
    // i_file_name:  File name with path of the image 
    // i_alt:        Alternative image text
    // i_id:         Element identity 
    // i_style:      Styles
    // i_width:      Image width
    // i_height:     Image height
    // i_event_fctn: Event function string
    // i_title       Title string will be tooltip in desktop computers
    static getImgAllStyleString(i_file_name, i_alt, i_id, i_style, i_width, i_height, i_event_fctn, i_title)
    {
        var ret_img_str = '';
    
        ret_img_str =  ret_img_str + '<img '; 

        if (i_file_name.length > 0)
        {
            ret_img_str =  ret_img_str + 'src= "' + i_file_name + '" ';
        }
        else
        {
            console.log("getImgAllStyleString Warning: No input image file name");
        }

        if (i_alt.length > 0)
        {
            ret_img_str =  ret_img_str + 'alt= "' + i_alt + '" ';
        }
        else
        {
            console.log("getImgAllStyleString Warning: Input alternative text is empty");
        }
    
        if (i_id.length > 0)
        {
            ret_img_str =  ret_img_str + 'id= "' + i_id + '" ';
        }
    
        if (i_style.length > 0)
        {
            ret_img_str =  ret_img_str + 'style= "' + i_style + '" ';
        }
    
        if (i_width.length > 0)
        {
            ret_img_str =  ret_img_str + 'width= "' + i_width + '" ';
        }
    
        if (i_height.length > 0)
        {
            ret_img_str =  ret_img_str + 'height= "' + i_height + '" ';
        }    
    
        if (i_event_fctn.length > 0)
        {
            var index_paranthesis = i_event_fctn.indexOf('(');
            
            if (index_paranthesis > 0)
            {
                ret_img_str = ret_img_str + ' onclick= "' + i_event_fctn + '" ';
            }
            else
            {
                ret_img_str = ret_img_str + ' onclick= "' + i_event_fctn + '()" ';
            }
        }
    
        if (i_title.length > 0)
        {
            ret_img_str =  ret_img_str + 'title= "' + i_title + '" ';
        }    
    
        ret_img_str =  ret_img_str + ' >'; 
    
        return ret_img_str;
    
    } // getImgAllStyleString


    // Returns string for an image
    // Input parameters
    // i_file_name:  File name with path of the image 
    // i_alt:        Alternative image text
    // i_id:         Element identity 
    // i_class:      Class 
    // i_width:      Image width
    // i_event_fctn: Event function string
    // i_title       Title string will be tooltip in desktop computers
    static getImgString(i_file_name, i_alt, i_id, i_class, i_width, i_event_fctn, i_title)
    {
        var ret_img_str = '';
    
        if (i_file_name.length == 0)
        {
            alert("getImgString No input image file name");
    
            return ret_img_str;
        }
    
        if (i_alt.length == 0)
        {
            alert("getImgString Input alternative text is empty");
    
            return ret_img_str;
        }
    
        ret_img_str =  ret_img_str + '<img '; 
    
        ret_img_str =  ret_img_str + 'src= "' + i_file_name + '" ';
    
        ret_img_str =  ret_img_str + 'alt= "' + i_alt + '" ';
    
        if (i_id.length > 0)
        {
            ret_img_str =  ret_img_str + 'id= "' + i_id + '" ';
        }
    
        if (i_class.length > 0)
        {
            ret_img_str =  ret_img_str + 'class= "' + i_class + '" ';
        }
    
        if (i_width.length > 0)
        {
            ret_img_str =  ret_img_str + 'width= "' + i_width + '" ';
        }
    
        if (i_event_fctn.length > 0)
        {
            ret_img_str =  ret_img_str + 'onclick= "' + i_event_fctn + '" ';
        }
    
        if (i_title.length > 0)
        {
            ret_img_str =  ret_img_str + 'title= "' + i_title + '" ';
        }    
    
        ret_img_str =  ret_img_str + ' >'; 
    
        return ret_img_str;
    
    } // getImgString

        // Returns string for an image
    // Input parameters
    // i_file_name:  File name with path of the image 
    // i_alt:        Alternative image text
    // i_id:         Element identity 
    // i_style_str:  Style string
    // i_width:      Image width
    // i_event_fctn: Event function string
    // i_title       Title string will be tooltip in desktop computers
    static getImgStyleString(i_file_name, i_alt, i_id, i_style_str, i_width, i_event_fctn, i_title)
    {
        var ret_img_str = '';
    
        if (i_file_name.length == 0)
        {
            alert("getImgStyleString No input image file name");
    
            return ret_img_str;
        }
    
        if (i_alt.length == 0)
        {
            alert("getImgStyleString Input alternative text is empty");
    
            return ret_img_str;
        }
    
        ret_img_str =  ret_img_str + '<img '; 
    
        ret_img_str =  ret_img_str + 'src= "' + i_file_name + '" ';
    
        ret_img_str =  ret_img_str + 'alt= "' + i_alt + '" ';
    
        if (i_id.length > 0)
        {
            ret_img_str =  ret_img_str + 'id= "' + i_id + '" ';
        }
    
        if (i_style_str.length > 0)
        {
            ret_img_str =  ret_img_str + 'style= "' + i_style_str + '" ';
        }
    
        if (i_width.length > 0)
        {
            ret_img_str =  ret_img_str + 'width= "' + i_width + '" ';
        }
    
        if (i_event_fctn.length > 0)
        {
            ret_img_str =  ret_img_str + 'onclick= "' + i_event_fctn + '" ';
        }
    
        if (i_title.length > 0)
        {
            ret_img_str =  ret_img_str + 'title= "' + i_title + '" ';
        }    
    
        ret_img_str =  ret_img_str + ' >'; 
    
        return ret_img_str;
    
    } // getImgStyleString

    ///////////////////////////////////////////////////////////////////////////
    /////// End Image Elements ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Div Sub Elements ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns start div + id + equal + id_element
    // If input id string is empty only div start is returned
    static getDivIdEqualString(i_id_element)
    {
        if (i_id_element.length == 0)
        {
            return '<div ';
        }
    
        return '<div id= ' + '"' + i_id_element + '"';
    
    } // getDivIdEqualString

    // Returns start div tag. Input data is identity of the div and the class of the div
    // Empty identity and/or class string is allowed
    static getDivStartString(i_id_element, i_cl_element)
    {
        var ret_div_start_str = '';
    
        if (i_id_element.length > 0)
        {
            ret_div_start_str = ret_div_start_str + this.getDivIdEqual();
    
            ret_div_start_str = ret_div_start_str + '"' + i_id_element + '" ';
        }
        else
        {
            ret_div_start_str = ret_div_start_str + '<div';
        }
    
        if (i_cl_element.length > 0)
        {
            ret_div_start_str = ret_div_start_str + this.getClassEqual();
    
            ret_div_start_str = ret_div_start_str + '"' + i_cl_element + '" ';
        }
     
        ret_div_start_str = ret_div_start_str + '>';
    
        return ret_div_start_str;
    
    } // getDivStartString    

    // Returns start div tag. Input data is identity of the div and a style string for the div
    // Empty identity and/or style string is allowed
    static getDivStartStyleString(i_id_element, i_styles_str)
    {
        var ret_div_start_str = '';
    
        if (i_id_element.length > 0)
        {
            ret_div_start_str = ret_div_start_str + getDivIdEqual();
    
            ret_div_start_str = ret_div_start_str + '"' + i_id_element + '" ';
        }
        else
        {
            ret_div_start_str = ret_div_start_str + '<div';
        }
    
        if (i_styles_str.length > 0)
        {
            ret_div_start_str = ret_div_start_str + getStyleEqual();
    
            ret_div_start_str = ret_div_start_str + '"' + i_styles_str + '" ';
        }
     
        ret_div_start_str = ret_div_start_str + '>';
    
        return ret_div_start_str;
    
    } // getDivStartStyleString

    // Returns start div tag. 
    // Input data is identity of the div, a style string for the div and an event statement
    // Empty identity and/or style string is allowed
    static getDivStartStyleEventString(i_id_element, i_styles_str, i_event_str)
    {
        var ret_div_start_str = '';
    
        if (i_id_element.length > 0 && i_event_str.length > 0)
        {
            ret_div_start_str = ret_div_start_str + getDivIdEqual();
    
            ret_div_start_str = ret_div_start_str + '"' + i_id_element + '" ';

            ret_div_start_str = ret_div_start_str + ' ' + i_event_str + ' ';
        }
        else if (i_id_element.length > 0)
        {
            ret_div_start_str = ret_div_start_str + getDivIdEqual();
    
            ret_div_start_str = ret_div_start_str + '"' + i_id_element + '" ';
        }
        else
        {
            ret_div_start_str = ret_div_start_str + '<div';
        }
    
        if (i_styles_str.length > 0)
        {
            ret_div_start_str = ret_div_start_str + getStyleEqual();
    
            ret_div_start_str = ret_div_start_str + '"' + i_styles_str + '" ';
        }
     
        ret_div_start_str = ret_div_start_str + '>';
    
        return ret_div_start_str;
    
    } // getDivStartStyleEventString

    // Returns end div tag. Input data is identity of the div and the class of the div
    // Output is the class name or the identity as a comment
    // Empty identity and/or class string is allowed
    static getDivEndString(i_id_element, i_cl_element)
    {
        var ret_div_end_str = '';
        
        ret_div_end_str = ret_div_end_str + this.getDivEnd();
        
        var start_comment_str = '  <!-- ';
        
        var end_comment_str = '  -->';
        
        if (i_cl_element.length > 0)
        {
            ret_div_end_str = ret_div_end_str + start_comment_str + i_cl_element + end_comment_str;
        }
        else if (i_id_element.length > 0)
        {
            ret_div_end_str = ret_div_end_str + start_comment_str + i_id_element + end_comment_str;
        }
    
        return ret_div_end_str;
    
    } // getDivEndString

    // Returns end div tag. Input data is identity of the div and the class of the div
    // Output is the style string or the identity as a comment
    // Empty identity and/or style string is allowed
    static getDivEndStyleString(i_id_element, i_styles_str)
    {
        var ret_div_end_str = '';
        
        ret_div_end_str = ret_div_end_str + this.getDivEnd();
        
        var start_comment_str = '  <!-- ';
        
        var end_comment_str = '  -->';
        
        if (i_id_element.length > 0)
        {
            ret_div_end_str = ret_div_end_str + start_comment_str + i_id_element + end_comment_str;
        }
        else if (i_styles_str.length > 0)
        {
            ret_div_end_str = ret_div_end_str + start_comment_str + i_styles_str + end_comment_str;
        }
    
        return ret_div_end_str;
    
    } // getDivEndStyleString

    // Returns the div end tag
    static getDivEnd()
    {
        return '</div>';
    
    } // getDivEnd

    // Returns class + equal + cl_element
    // If the input class name is empty an empty string will be returned
    static getClassEqualString(i_cl_element)
    {
        if (i_cl_element.length > 0)
        {
            return ' class= ' + '"' + i_cl_element + '" ';
        }
        else
        {
            return '';
        }
    
    } // getClassEqualString

    // Returns style + equal + cl_element
    // If the input style string is empty an empty string will be returned
    static getStyleEqualString(i_styles_str)
    {
        if (i_styles_str.length > 0)
        {
            return ' style= ' + '"' + i_styles_str + '" ';
        }
        else
        {
            return '';
        }
    
    } // getStyleEqualString

    // Returns name + equal + cl_element
    // If the input name is empty an empty string will be returned
    static getNameEqualString(i_name)
    {
        if (i_name.length > 0)
        {
            return ' name= ' + '"' + i_name + '" ';
        }
        else
        {
            return '';
        }
    
    } // getNameEqualString

    // Returns onhange + equal + cl_element
    // If the input name is empty an empty string will be returned
    static getEventOnchangeEqualString(i_event_fctn)
    {
        if (i_event_fctn.length > 0)
        {
            return ' onchange= ' + '"' + i_event_fctn + '" ';
        }
        else
        {
            return '';
        }
    
    } // getEventOnchangeEqualString

    ///////////////////////////////////////////////////////////////////////////
    /////// End Div Sub Elements /////////////((///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Style String Functions //////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Append style like for instance 'cursor: pointer'
    static appendStyle(i_style, i_append_style)
    {
        var ret_str = '';

        var index_colon = i_append_style.indexOf(':');

        if (index_colon < 0)
        {
            alert("UtilHtml.appendStyle No colon in input string");

            return i_style;
        }

        if (i_style.trim().length == 0)
        {
            ret_str = i_append_style.trim();
        }
        else
        {
            ret_str = i_style.trim() + '; ' + i_append_style.trim();
        }

        return ret_str;

    } // appendStyle

    // Appends float left
    static appendLeftStyle(i_style)
    {
        return UtilHtml.appendStyle(i_style, 'float: left');

    } // appendLeftStyle

    // Appends float right
    static appendRightStyle(i_style)
    {
        return UtilHtml.appendStyle(i_style, 'float: right');

    } // appendRightStyle

    // Appends clear both
    static appendClearStyle(i_style)
    {
        return UtilHtml.appendStyle(i_style, 'clear: both');

    } // appendClearStyle

    // Appends cursor pointer
    static appendCursorStyle(i_style)
    {
        return UtilHtml.appendStyle(i_style, 'cursor: pointer');

    } // appendCursorStyle

    // Appends font size
    static appendFontSizeStyle(i_style, i_font_size)
    {
        return UtilHtml.appendStyle(i_style, 'font-size: ' + i_font_size.trim());

    } // appendFontSizeStyle

    // Appends font bold
    static appendFontBoldStyle(i_style)
    {
        return UtilHtml.appendStyle(i_style, 'font-weight: bold');

    } // appendFontBoldStyle

    // Appends font color
    static appendFontColorStyle(i_style, i_font_color)
    {
        return UtilHtml.appendStyle(i_style, 'color: ' + i_font_color.trim());

    } // appendFontColorStyle

    // Appends background color
    static appendBackgroundStyle(i_style, i_bg_color)
    {
        return UtilHtml.appendStyle(i_style, 'background-color: ' + i_bg_color.trim());

    } // appendBackgroundStyle

    // Appends text align center
    static appendAlignCenterStyle(i_style)
    {
        return UtilHtml.appendStyle(i_style, 'text-align: center');

    } // appendAlignCenterStyle

    // Appends text align center
    static appendOverflowHiddenStyle(i_style)
    {
        return UtilHtml.appendStyle(i_style, 'overflow: hidden');

    } // appendOverflowHiddenStyle

    // Appends margin top
    static appendMarginTopStyle(i_style, i_dist)
    {
        return UtilHtml.appendStyle(i_style, 'margin-top: ' + i_dist.trim());

    } // appendMarginTopStyle

    // Appends margin bottom
    static appendMarginBottomStyle(i_style, i_dist)
    {
        return UtilHtml.appendStyle(i_style, 'margin-bottom: ' + i_dist.trim());

    } // appendMarginBottomStyle

    // Appends margin left
    static appendMarginLeftStyle(i_style, i_dist)
    {
        return UtilHtml.appendStyle(i_style, 'margin-left: ' + i_dist.trim());

    } // appendMarginLeftStyle

    // Appends margin right
    static appendMarginRightStyle(i_style, i_dist)
    {
        return UtilHtml.appendStyle(i_style, 'margin-right: ' + i_dist.trim());

    } // appendMarginRightStyle

    // Appends padding top
    static appendPaddingTopStyle(i_style, i_dist)
    {
        return UtilHtml.appendStyle(i_style, 'padding-top: ' + i_dist.trim());

    } // appendPaddingTopStyle

    // Appends padding bottom
    static appendPaddingBottomStyle(i_style, i_dist)
    {
        return UtilHtml.appendStyle(i_style, 'padding-bottom: ' + i_dist.trim());

    } // appendPaddingBottomStyle

    // Appends padding left
    static appendPaddingLeftStyle(i_style, i_dist)
    {
        return UtilHtml.appendStyle(i_style, 'padding-left: ' + i_dist.trim());

    } // appendPaddingLeftStyle

    // Appends padding right
    static appendPaddingRightStyle(i_style, i_dist)
    {
        return UtilHtml.appendStyle(i_style, 'padding-right: ' + i_dist.trim());

    } // appendPaddingRightStyle

    ///////////////////////////////////////////////////////////////////////////
    /////// End Style String Functions ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Basic String Functions //////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns a new line
    static getNewLine()
    { 
        var ret_new_line_str = '\n';
     
        return ret_new_line_str;
    
    } // getNewLine

    // Returns tab as spaces
    static getTabs(i_number_tabs)
    {
        var ret_tabs = '';

        var tab_number_spaces = 4;
    
        for (var i_tab=1; i_tab<=i_number_tabs; i_tab++)
        {
            for (var i_space=1; i_space <= tab_number_spaces; i_space++ )
            {
                ret_tabs = ret_tabs + ' ';
            } 
        }
    
        return ret_tabs;
    
    } // getTabs

    ///////////////////////////////////////////////////////////////////////////
    /////// End Basic String Functions ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // UtilHtml
// File: DisplayImage.js
// Date: 2024-10-11
// Author: Gunnar Lidén

// File content
// =============
//
// Class DisplayImage
// Creation of a display image control
class DisplayImage 
{
   // Creates the instance of the class
    // i_id_my_fctn_str: 
    // Application unique string for the calling function. 
    // Used to construct identities and class names
    // i_id_div_container:
    // Place holder for the DisplayImage element
    constructor(i_id_my_fctn_str, i_id_div_container) 
    {
        // Member variables
        // ================

        // String used to construct identities and class names that are
        // unique for an application
        this.m_id_my_fctn_str = i_id_my_fctn_str;

        // The identity of the container for the control
        this.m_id_div_container = i_id_div_container;

        // The container element
        this.m_el_div_container = null;

        // Defines the active index record for arrays m_rec_image_file_name_array,
        // m_rec_text_field_one_array, m_rec_text_field_two_array, ........
        //  i.e. the image and the text that shall be displayed
        this.m_active_index_record = 0;

        // Image container height
        this.m_image_container_height = '650px';

        // Array of record numbers defining the records and used for m_onclick_function
        // that can get additional data about the record from another the the original
        // source like for instance the JazzGuestsXml XML object (file JazzGuests.xml).
        this.m_rec_number_array = null;

        // Array of image file name (URLs)
        this.m_rec_image_file_name_array = null;

        // Array of texts for field one. No field one if null
        this.m_rec_text_field_one_array = null;

        // Array of texts for field two. No field two if null
        this.m_rec_text_field_two_array = null;
        
        // Array of texts for field three. No field three if null
        this.m_rec_text_field_three_array = null;

        // Array of texts for field four. No field four if null
        this.m_rec_text_field_four_array = null;

        // The onclick icon next image function name. Only the name is input
        this.m_onclick_icon_next_image_function_name = '';

        // The onclick icon previous image function name. Only the name is input
        this.m_onclick_icon_prev_image_function_name = '';

        // The onclick icon full screen image function name. Only the name is input
        this.m_onclick_icon_full_screen_image_function_name = '';

        // The onclick icon close image function name. Only the name is input
        this.m_onclick_icon_close_image_function_name = '';

        // Image file name
        this.m_image_file_name = '';    

        // Image default/undefined file name
        this.m_image_deault_file_name = 'https://jazzliveaarau.ch/Homepage/Icons/jazz_photo_undefined.png';

        // Styles for a display image picture container element. Separate with semicolon
        // Function sets clear:both; height: m_image_container_height
        this.m_style_picture_container = '';

        // Width of the image picture container element
        this.m_width_picture_container = '92%';

        // Instance of class DisplayImageText
        this.m_display_image_text = null;

        // Instance of class JazzToolbar for the left toolbar
        this.m_left_toolbar = null;

        // Instance of class JazzToolbar for the right toolbar
        this.m_right_toolbar = null;

        // Event function name for mouse over toolbar
        this.m_on_mouse_over_function_name = '';

        // Event function name for mouse out toolbar
        this.m_on_mouse_out_function_name = '';

        // Flag telling if div borders shall be displayed for debugging
        this.m_display_div_borders = false;

        // Initialization
        this.init()

    } // constructor

    // Initialization
    init()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

        if (null == this.m_el_div_container)
        {
            alert("DisplayImage.init m_el_div_container= null")

            return;
        }

        this.m_display_image_text = new DisplayImageText(this.m_id_my_fctn_str, this.getIdDisplayImageTextContainer());

    } // init

    // Create the image-text control
    instantiate()
    {
        var n_tabs = 1;

        this.m_el_div_container.innerHTML = this.getHtmlString(n_tabs);

        this.createToolbars();

        var index_max = this.m_rec_image_file_name_array.length - 1;

        this.setActiveIndexRecord(index_max);

        this.setDisplayActiveRecord();

        this.hideImageToolbars();

    } // instantiate

    // Get the active record number
    getActiveRecordNumber()
    {
        return this.m_rec_number_array[this.m_active_index_record];
        
    } // getActiveRecordNumber()

    ///////////////////////////////////////////////////////////////
    ////// Active record set functions ////////////////////////////
    ///////////////////////////////////////////////////////////////

    // Defines the active index record for arrays m_rec_image_file_name_array,
    // m_rec_text_field_one_array, m_rec_text_field_two_array, ........
    //  i.e. the image and the text that shall be displayed
    setActiveIndexRecord(i_active_index_record)
    {
        var index_max = this.m_rec_image_file_name_array.length - 1;

        if (i_active_index_record < 0 || i_active_index_record > index_max)
        {
            alert("DisplayImage.setActiveIndexRecord Index not between 0 and " + index_max.toString());

            return;
        }

        this.m_active_index_record = i_active_index_record;

        this.hideDisplayNextPreviousImageIcons();

    } // setActiveIndexRecord

    // Set image and texts for the active image record (m_active_index_record)
    // and display the data
    setDisplayActiveRecord()
    {
        var image_url = this.m_rec_image_file_name_array[this.m_active_index_record];

        var text_one = this.m_rec_text_field_one_array[this.m_active_index_record];

        var text_two = this.m_rec_text_field_two_array[this.m_active_index_record];

        var text_three = this.m_rec_text_field_three_array[this.m_active_index_record];

        var text_four = this.m_rec_text_field_four_array[this.m_active_index_record];

        this.setScalePositionDisplayImage(image_url);

        this.m_display_image_text.setTextOne(text_one);

        this.m_display_image_text.setTextTwo(text_two);

        this.m_display_image_text.setTextThree(text_three);

        this.m_display_image_text.setTextFour(text_four);

    } // setDisplayActiveRecord

    // Set and display the previous jazz guest record
    setAndDisplayPreviousRecord()
    {
        if (this.m_active_index_record >= 1)
        {
            this.m_active_index_record = this.m_active_index_record - 1;
        }
        else
        {
            console.log("this.m_active_index_record Error m_active_index_record= " 
                            + this.m_active_index_record.toString());

            return;
        }

        this.hideDisplayNextPreviousImageIcons();

        this.setDisplayActiveRecord();

    } // setAndDisplayPreviousRecord

    // Set and display the next jazz guest record
    setAndDisplayNextRecord()
    {
        var index_max = this.m_rec_image_file_name_array.length - 1;

        if (this.m_active_index_record <= index_max - 1)
        {
            this.m_active_index_record = this.m_active_index_record + 1;
        }
        else
        {
            console.log("this.setAndDisplayNextRecord Error m_active_index_record= " 
                            + this.m_active_index_record.toString() + 
                            ' index_max= ' + index_max.toString());

            return;
        }

        this.hideDisplayNextPreviousImageIcons();

        this.setDisplayActiveRecord();

    } // setAndDisplayNextRecord


    ///////////////////////////////////////////////////////////////
    ////// Image functions ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    // Set the image file name, scale, position and display image
    setScalePositionDisplayImage(i_image_file_name)
    {
        console.log("DisplayImage.setScalePositionDisplayImage i_image_file_name= " + i_image_file_name);

        this.m_image_file_name = i_image_file_name;   

        var el_div_container = this.getElementPictureContainer();

        if (null == el_div_container)
        {
            alert("DisplayImage.setScalePositionDisplayImage Picture container element is null");

            return;
        }

        UtilImage.replaceImageInDivContainer(i_image_file_name, el_div_container);

    } // setScalePositionDisplayImage

    // Hide the image container div
    hideImageContainerDiv()
    {
        var el_div_container = document.getElementById(this.m_id_div_container);

        el_div_container.style.display = 'none';

    } // hideImageContainerDiv

    // Display the image container div
    displayImageContainerDiv()
    {
        var el_div_container = document.getElementById(this.m_id_div_container);

        el_div_container.style.display = 'block';

    } // displayImageContainerDiv

    // Hide or display the next and previous image icons
    hideDisplayNextPreviousImageIcons()
    {
        var index_max = this.m_rec_image_file_name_array.length - 1;

        if (this.m_active_index_record == 0)
        {
            this.m_left_toolbar.displayIcon(2);

            this.m_right_toolbar.hideIcon(2);     

        }
        else if (this.m_active_index_record == index_max)
        {
            this.m_left_toolbar.hideIcon(2);

            this.m_right_toolbar.displayIcon(2);        
        }
        else
        {
            this.m_left_toolbar.displayIcon(2);

            this.m_right_toolbar.displayIcon(2);
        }

    } // hideDisplayNextPreviousImageIcons

    // Set image height
    setImageContainerHeight(i_image_container_height)
    {
      this.m_image_container_height = i_image_container_height;   

    } // setImageContainerHeight

    ///////////////////////////////////////////////////////////////
    ////// Left And Right Toolbar /////////////////////////////////
    ///////////////////////////////////////////////////////////////

    // Create the left and right toolbar
    createToolbars()
    {
        var object_left_one = new JazzToolbarData('JazzIcon');

        object_left_one.setImageUrl('https://jazzliveaarau.ch/Homepage/Icons/icon_slideshow_increase_screen.png');

        object_left_one.setOnclickFunctionName(this.m_onclick_icon_full_screen_image_function_name);

        object_left_one.setLabelText(''); // No label

        object_left_one.setTitle('Bild auf Vollschirm anschauen');

        object_left_one.setImageAlt('Vollschirm icon');

        object_left_one.setWidth('11px');


        var object_left_two = new JazzToolbarData('JazzIcon');

        object_left_two.setImageUrl('https://jazzliveaarau.ch/Homepage/Icons/icon_slideshow_back.png');

        object_left_two.setOnclickFunctionName(this.m_onclick_icon_next_image_function_name);

        object_left_two.setLabelText(''); // No label

        object_left_two.setTitle('Nächtes Bild');

        object_left_two.setImageAlt('Nächste Icon');

        object_left_two.setWidth('11px');


        var object_right_one = new JazzToolbarData('JazzIcon');

        object_right_one.setImageUrl('https://jazzliveaarau.ch/Homepage/Icons/icon_slideshow_exit.png');

        object_right_one.setOnclickFunctionName(this.m_onclick_icon_close_image_function_name);

        object_right_one.setLabelText(''); // No label

        object_right_one.setTitle('Bild zu machen');

        object_right_one.setImageAlt('X Icon');

        object_right_one.setWidth('15px');


        var object_right_two = new JazzToolbarData('JazzIcon');

        object_right_two.setImageUrl('https://jazzliveaarau.ch/Homepage/Icons/icon_slideshow_forward.png');

        object_right_two.setOnclickFunctionName(this.m_onclick_icon_prev_image_function_name);

        object_right_two.setLabelText(''); // No label

        object_right_two.setTitle('Voriges Bild');

        object_right_two.setImageAlt('Zurück Icon');

        object_right_two.setWidth('11px');


        var left_toolbar_data_array = [];

        left_toolbar_data_array[0] = object_left_one;
    
        left_toolbar_data_array[1] = object_left_two;

        var left_unique_str = 'left_' + this.m_id_my_fctn_str;

        this.m_left_toolbar = new JazzToolbar(left_toolbar_data_array, left_unique_str, this.getIdLeftImageToolbarContainer());

        this.m_left_toolbar.setMarginLeft('0px')
        
        this.m_left_toolbar.setMarginTop('5px')

        this.m_left_toolbar.setMarginBottom('100px')
    
        this.m_left_toolbar.setBackgroundColor('black');
    
        this.m_left_toolbar.setVerticalToTrue();

        this.m_left_toolbar.instantiate();


        var right_toolbar_data_array = [];

        right_toolbar_data_array[0] = object_right_one;
    
        right_toolbar_data_array[1] = object_right_two;

        var right_unique_str = 'right_' + this.m_id_my_fctn_str;

        this.m_right_toolbar = new JazzToolbar(right_toolbar_data_array, right_unique_str, this.getIdRightImageToolbarContainer());

        this.m_right_toolbar.setMarginLeft('0px')
        
        this.m_right_toolbar.setMarginTop('5px')

        this.m_right_toolbar.setMarginBottom('100px')
    
        this.m_right_toolbar.setBackgroundColor('black');
    
        this.m_right_toolbar.setVerticalToTrue();

        this.m_right_toolbar.instantiate();

    } // createToolbars

    // Hide image toolbars
    hideImageToolbars()
    {
        this.m_left_toolbar.hideAllIconsInheritBackgroundColor();

        this.m_right_toolbar.hideAllIconsInheritBackgroundColor();

    } // hideImageToolbars

    // Display image toolbars
    displayImageToolbars()
    {
        this.m_left_toolbar.displayAllIcons();

        this.m_right_toolbar.displayAllIcons();

        this.hideDisplayNextPreviousImageIcons();

    } // displayImageToolbars

    // Set the event function name for mouse over
    setMouseOverFunctionName(i_on_mouse_over_function_name)
    {
        this.m_on_mouse_over_function_name = i_on_mouse_over_function_name;

    } // setMouseOverFunctionName

     // Set the event function name for mouse out
    setMouseOutFunctionName(i_on_mouse_out_function_name)
    {
        this.m_on_mouse_out_function_name = i_on_mouse_out_function_name;
        
    } // setMouseOutFunctionName       

    ///////////////////////////////////////////////////////////////
    ////// Input data arrays //////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    // Set array of record numbers defining the records
    setRecordNumberArray(i_rec_number_array)
    {
        this.m_rec_number_array = i_rec_number_array;

    } // setRecordNumberArray

    // Set array of image file name (URLs)
    setRecordImageFileNameArray(i_rec_image_file_name_array)
    {
        this.m_rec_image_file_name_array = i_rec_image_file_name_array;

    } // setRecordImageFileNameArray

    // Set array of texts for field one.
    setRecordTextFieldOneArray(i_rec_text_field_one_array)
    {
        this.m_rec_text_field_one_array = i_rec_text_field_one_array;

    } // setRecordTextFieldOneArray

    // Set array of texts for field two.
    setRecordTextFieldTwoArray(i_rec_text_field_two_array)
    {
        this.m_rec_text_field_two_array = i_rec_text_field_two_array;

    } // setRecordTextFieldTwoArray    

    // Set array of texts for field three.
    setRecordTextFieldThreeArray(i_rec_text_field_three_array)
    {
        this.m_rec_text_field_three_array = i_rec_text_field_three_array;

    } // setRecordTextFieldThreeArray    

    // Set array of texts for field four.
    setRecordTextFieldFourArray(i_rec_text_field_four_array)
    {
        this.m_rec_text_field_four_array = i_rec_text_field_four_array;

    } // setRecordTextFieldFourArray    

    ///////////////////////////////////////////////////////////////
    ////// Event functions ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    // Sets the onclick icon next image function name. Only the name is input
    setOnclickNextImageFunctionName(i_onclick_icon_next_image_function_name) 
    {
      this.m_onclick_icon_next_image_function_name = i_onclick_icon_next_image_function_name;

    } // setOnclickIconOneFunctionName  

    // Sets the onclick icon previous image function name. Only the name is input
    setOnclickPrevImageFunctionName(i_onclick_icon_prev_image_function_name) 
    {
      this.m_onclick_icon_prev_image_function_name = i_onclick_icon_prev_image_function_name;

    } // setOnclickPrevImageFunctionName  

    // Sets the onclick icon full screen image function name. Only the name is input
    setOnclickFullScreenImageFunctionName(i_onclick_icon_full_screen_image_function_name) 
    {
      this.m_onclick_icon_full_screen_image_function_name = i_onclick_icon_full_screen_image_function_name;

    } // setOnclickFullScreenImageFunctionName  

    // Sets the onclick icon close image function name. Only the name is input
    setOnclickCloseImageFunctionName(i_onclick_icon_close_image_function_name) 
    {
      this.m_onclick_icon_close_image_function_name = i_onclick_icon_close_image_function_name;

    } // setOnclickCloseImageFunctionName  

   // Set styles for the display image picture element. Separate with semicolon
    // Function sets clear:both; height: m_image_container_height and 
    // the width (setImageContainerWidth)
    setStylePictureContainerString(i_style_picture_container)
    {
        this.m_style_picture_container = i_style_picture_container;

    } // setStylePictureContainerString    

    // Set the width of the image picture container element
    // Default value ie 92%
    setImageContainerWidth(i_width_picture_container)
    {
        this.m_width_picture_container = i_width_picture_container;

    } // setImageContainerWidth

    ///////////////////////////////////////////////////////////////
    ////// Data for ImageDisplayText //////////////////////////////
    ///////////////////////////////////////////////////////////////

     // Set styles for label all text. Separate with semicolon
     setStyleLabelAllTextString(i_style_label_all_text)
     {
         this.m_display_image_text.m_style_label_all_text = i_style_label_all_text;
 
     } // setStyleLabelAllTextString

     // Set styles for the text group all element. Separate with semicolon
     setStyleTextGroupAll(i_style_text_group_all)
     {
         this.m_display_image_text.m_style_text_group_all = i_style_text_group_all;
 
     } // setStyleTextGroupAll
        
     // Set styles for the text group one element. Separate with semicolon
     setStyleTextGroupOne(i_style_text_group_one)
     {
         this.m_display_image_text.m_style_text_group_one = i_style_text_group_one;
 
     } // setStyleTextGroupOne
 
     // Set styles for the text group two element. Separate with semicolon
     setStyleTextGroupTwo(i_style_text_group_two)
     {
         this.m_display_image_text.m_style_text_group_two = i_style_text_group_two;
 
     } // setStyleTextGroupTwo        
        
     // Set styles for text one. Separate with semicolon
     setStylTextOneString(i_style_text_one)
     {
         this.m_display_image_text.m_style_text_one = i_style_text_one;
 
     } // setStylTextOneString
 
     // Set styles for text two. Separate with semicolon
     setStylTextTwoString(i_style_text_two)
     {
         this.m_display_image_text.m_style_text_two = i_style_text_two;
 
     } // setStylTextTwoString
 
     // Set styles for text three. Separate with semicolon
     setStylTextThreeString(i_style_text_three)
     {
         this.m_display_image_text.m_style_text_three = i_style_text_three;
 
     } // setStylTextThreeString 
 
     // Set styles for text three. Separate with semicolon
     setStylTextFourString(i_style_text_four)
     {
         this.m_display_image_text.m_style_text_four = i_style_text_four;
 
     } // setStylTextFourString 


    ///////////////////////////////////////////////////////////////
    ////// Get HTML String Functions //////////////////////////////
    ///////////////////////////////////////////////////////////////

    checkInputData()
    {
        // TODO
        return true;

    } // checkInputData

    // Returns the string that defines the HTML display image string
    getHtmlString(i_n_tabs)
    {
        if (!this.checkInputData())
        {
            return '';
        }

        var ret_html_str = '';

        var ret_html_str = ret_html_str + this.getDisplayImageToolbarsContainerString(i_n_tabs);

        ret_html_str = ret_html_str + this.getDisplayImageTextContainerString(i_n_tabs);

        return ret_html_str;

    } // getHtmlString

    // Returns the HTML string defining the div container with the image element and
    // the two image toolbars
    getDisplayImageToolbarsContainerString(i_n_tabs)
    {
        var toolbar_style_str = 'float: left; width: 12px; background-color: black;  height: ' + this.m_image_container_height;

        // toolbar_style_str = toolbar_style_str + '; border: 1px solid black'; // Debug
        
        var toolbar_inner_html = 'b'; 

        var left_toolbar_html = 
            UtilHtml.getDivElementLeafStyleMouseString(this.getIdLeftImageToolbarContainer(), 
                        toolbar_style_str, 
                        this.m_on_mouse_over_function_name, 
                        this.m_on_mouse_out_function_name,                         
                        toolbar_inner_html, i_n_tabs+2);

        var picture_html = this.getPictureHtmlString(i_n_tabs+2);

        var right_toolbar_html = 
            UtilHtml.getDivElementLeafStyleMouseString(this.getIdRightImageToolbarContainer(), 
                        toolbar_style_str, 
                        this.m_on_mouse_over_function_name, 
                        this.m_on_mouse_out_function_name, 
                        toolbar_inner_html, i_n_tabs+2);


        var image_and_toolbars_style_str = 'clear: both; width: 100%; overflow: hidden';

        // image_and_toolbars_style_str = image_and_toolbars_style_str + '; border: 1px solid red'; // Debug

        var image_and_toolbar_inner_html = left_toolbar_html + picture_html + right_toolbar_html;

        return UtilHtml.getDivElementLeafStyleString(this.getIdDisplayImageToolbarsContainer(), 
                        image_and_toolbars_style_str, image_and_toolbar_inner_html, i_n_tabs+1);

    } // getDisplayImageToolbarsContainerString

    // Returns the HTML string that defines the picture element
    getPictureHtmlString(i_n_tabs)
    {
        var picture_container_style_str = 'float: left; width: ' + this.m_width_picture_container + '; height: ' + this.m_image_container_height;

        if (this.m_style_picture_container.length > 0)
        {
            picture_container_style_str = picture_container_style_str + '; ' + this.m_style_picture_container;
        }

        if (this.m_display_div_borders)
        {
            picture_container_style_str = picture_container_style_str + '; border: 1px solid blue';
        }

        if (this.m_image_file_name.length == 0)
        {
            this.m_image_file_name = this.m_image_deault_file_name;
        }
        
        var image_style_str = ''; // DisplayImage sets these attributes

        // var image_width = this.m_image_container_height; // TODO 

        var image_width = '95%'; //TODO QQQQQQQQQQQQQQQQQQQQQ

        var event_fctn = this.m_onclick_icon_full_screen_image_function_name + "()";

        var inner_html = UtilHtml.getImgStyleString(this.m_image_file_name, 'Guest Image', '', image_style_str, image_width, event_fctn, '');

        return UtilHtml.getDivElementLeafStyleString(this.getIdPictureContainer(), picture_container_style_str, inner_html, i_n_tabs+1);

    } // getPictureHtmlString

    // Returns the HTML string that defines the display image text element
    getDisplayImageTextContainerString(i_n_tabs)
    {
        var text_container_style_str = 'clear: both';

        var inner_html = this.m_display_image_text.getHtmlString(i_n_tabs+1);

        return UtilHtml.getDivElementLeafStyleString(this.getIdDisplayImageTextContainer(), text_container_style_str, inner_html, i_n_tabs+1);

    } // getDisplayImageTextContainerString


    ///////////////////////////////////////////////////////////////
    ////// Identity functions /////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    // Returns the identity for the container for the image and the left and right toolbars
    getIdDisplayImageToolbarsContainer()
    {
        return 'id_div_display_image_toolbars_container_' + this.m_id_my_fctn_str;

    } // getIdDisplayImageToolbarsContainer

    // Returns the picture container element
    getElementPictureContainer()
    {
        return document.getElementById(this.getIdPictureContainer());

    } // getElementPictureContainer

    // Returns the identity string for the picture container element
    getIdPictureContainer()
    {
        return 'id_display_image_' + this.m_id_my_fctn_str;;
        
    } // getIdPictureContainer

    // Returns the identity for the image toolbar left container
    getIdLeftImageToolbarContainer()
    {
        return 'id_container_left_image_toolbar_' + this.m_id_my_fctn_str;

    } // getIdLeftImageToolbarContainer

    // Returns the identity for the image toolbar right container
    getIdRightImageToolbarContainer()
    {
        return 'id_container_right_image_toolbar_' + this.m_id_my_fctn_str;

    } // getIdRightImageToolbarContainer

    // Returns the identity for the DisplayImageText container
    getIdDisplayImageTextContainer()
    {
        return 'id_div_display_image_text_container_' + this.m_id_my_fctn_str;

    } // getIdDisplayImageTextContainer

} // DisplayImage
// File: DisplayImageText.js
// Date: 2024-01-27
// Author: Gunnar Lidén

// File content
// =============
//
// Class DisplayImageText 

class DisplayImageText
{
  // Creates the instance of the class
    // i_id_my_fctn_str: 
    // Application unique string for the calling function. 
    // Used to construct identities and class names
    // i_id_div_container:
    // Place holder for the DisplayImageText element
    constructor(i_id_my_fctn_str, i_id_div_container)
    {
        // String used to construct identities and class names that are
        // unique for an application
        this.m_id_my_fctn_str = i_id_my_fctn_str;

        // The identity of the container for the control
        this.m_id_div_container = i_id_div_container;

        // Object container
        this.m_el_div_container = null;

        // Label text
        this.m_label_text = '';

        // The string for the text one element
        this.m_text_one_str = '';

        // The text for the text two element
        this.m_text_two_str = '';

        // The string for the text three element
        this.m_text_three_str = '';

        // The string for the text four element
        this.m_text_four_str = '';

         // Styles for the label to text group all element. Separate with semicolon
        this.m_style_label_all_text = ''; // clear: both

        // Styles for the text group all element. Separate with semicolon
        this.m_style_text_group_all = ''; // clear: both; overflow: hidden

        // Styles for the text group one element. Separate with semicolon
        this.m_style_text_group_one = ''; // clear: both; overflow: hidden

        // Styles for the text group two element. Separate with semicolon
        this.m_style_text_group_two = ''; // clear: both; overflow: hidden

        // Styles for text one. Separate with semicolon
        this.m_style_text_one = ''; // float: left; font-size: 15px; font-weight: bold; padding: 5px

        // Styles for text two. Separate with semicolon
        this.m_style_text_two = ''; // float: right; font-size: 15px; font-weight: bold; padding: 5px

        // Styles for text three. Separate with semicolon
        this.m_style_text_three = ''; // clear:both; font-size: 15px; font-style: italic; font-weight: bold; padding: 5px

        // Styles for text four. Separate with semicolon
        this.m_style_text_four = ''; // clear:both; font-size: 15px; font-style: italic; font-weight: bold; padding: 5px

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Initialization
        this.init();

    } // constructor

    // Initialization
    init()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // init

    display()
    {
        var n_tabs = 2;

        var html_str = this.getHtmlString(n_tabs);

        this.getObject().innerHTML = html_str;
    }

    // Get object container
    getObject()
    {
        return this.m_el_div_container;

    } // getObject

    // Sets the label text for the text box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

    } // setLabelText    

    // Set the text one element
    setTextOne(i_text_one_str)
    {      
        this.m_text_one_str = i_text_one_str;

        var el_text_one = this.getElementTextOneDiv();

        if (null == el_text_one)
        {
            alert("DisplayImage.setTextOne Element is not created");

            return;
        }

        el_text_one.innerHTML = this.m_text_one_str;

    } // setTextOne

    // Set the text two element
    setTextTwo(i_text_two_str)
    {      
        this.m_text_two_str = i_text_two_str;

        var el_text_two = this.getElementTextTwoDiv();

        if (null == el_text_two)
        {
            alert("DisplayImage.setTextTwo Element is not created");

            return;
        }

        el_text_two.innerHTML = this.m_text_two_str;
        
    } // setTextTwo

    // Set the text three element
    setTextThree(i_text_three_str)
    {      
        this.m_text_three_str = i_text_three_str;

        var el_text_three = this.getElementTextThreeDiv();

        if (null == el_text_three)
        {
            alert("DisplayImage.setTextThree Element is not created");

            return;
        }

        el_text_three.innerHTML = this.m_text_three_str;
        
    } // setTextThree

    // Set the text four element
    setTextFour(i_text_four_str)
    {      
        this.m_text_four_str = i_text_four_str;

        var el_text_four = this.getElementTextFourDiv();

        if (null == el_text_four)
        {
            alert("DisplayImage.setTextFour Element is not created");

            return;
        }

        el_text_four.innerHTML = this.m_text_four_str;
        
    } // setTextFour

     // Set styles for label all text. Separate with semicolon
     setStyleLabelAllTextString(i_style_label_all_text)
     {
         this.m_style_label_all_text = i_style_label_all_text;
 
     } // setStyleLabelAllTextString

     // Set styles for the text group all element. Separate with semicolon
     setStyleTextGroupAll(i_style_text_group_all)
     {
         this.m_style_text_group_all = i_style_text_group_all;
 
     } // setStyleTextGroupAll
        
     // Set styles for the text group one element. Separate with semicolon
     setStyleTextGroupOne(i_style_text_group_one)
     {
         this.m_style_text_group_one = i_style_text_group_one;
 
     } // setStyleTextGroupOne
 
     // Set styles for the text group two element. Separate with semicolon
     setStyleTextGroupTwo(i_style_text_group_two)
     {
         this.m_style_text_group_two = i_style_text_group_two;
 
     } // setStyleTextGroupTwo        
        
     // Set styles for text one. Separate with semicolon
     setStylTextOneString(i_style_text_one)
     {
         this.m_style_text_one = i_style_text_one;
 
     } // setStylTextOneString
 
     // Set styles for text two. Separate with semicolon
     setStylTextTwoString(i_style_text_two)
     {
         this.m_style_text_two = i_style_text_two;
 
     } // setStylTextTwoString
 
     // Set styles for text three. Separate with semicolon
     setStylTextThreeString(i_style_text_three)
     {
         this.m_style_text_three = i_style_text_three;
 
     } // setStylTextThreeString 
 
     // Set styles for text three. Separate with semicolon
     setStylTextFourString(i_style_text_four)
     {
         this.m_style_text_four = i_style_text_four;
 
     } // setStylTextFourString 

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    // TODO Not yet impemented
    setTitle(i_title) 
    {
        this.m_title = i_title; 

    } // setTitle

    // Returns the identity of the text group all div
    getIdTextGroupAllDiv()
    {
        return 'id_text_group_all_div_' + this.m_id_my_fctn_str;

    } // getIdTextGroupAllDiv

    // Returns the element text group all div
    getElementTextGroupAllDiv()
    {
        return document.getElementById(this.getIdTextGroupAllDiv());
    }

    // Hide element div text group all div
    hideElementTextGroupAllDiv()
    {
        this.getElementTextGroupAllDiv().style.display = "none";

    } // hideElementTextGroupAllDiv

    // Display element div text group all div
    displayElementTextGroupAllDiv()
    {
        this.getElementTextGroupAllDiv().style.display = "block";
        
    } // hideElementTextGroupAllDiv

    // Get the HTML string defining the text group all div
    getTextGroupAllDivHtmlString(i_n_tabs)
    {
        var text_group_all_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_group_all_div_style_str = text_group_all_div_style_str + '; border: 1px solid blue';
        }
        
        if (this.m_style_text_group_all.length > 0)
        {
            text_group_all_div_style_str = text_group_all_div_style_str + '; ' + this.m_style_text_group_all;
        }

        var text_group_all_inner_html = '';
		
        text_group_all_inner_html = text_group_all_inner_html + this.getTextGroupOneDivHtmlString(i_n_tabs+1);

        text_group_all_inner_html = text_group_all_inner_html + this.getTextGroupTwoDivHtmlString(i_n_tabs+1);

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextGroupAllDiv(), text_group_all_div_style_str, text_group_all_inner_html, i_n_tabs+1);

    } // getTextGroupAllDivHtmlString

    // Returns the identity of the text group one div
    getIdTextGroupOneDiv()
    {
        return 'id_text_group_one_div_' + this.m_id_my_fctn_str;

    } // getIdTextGroupOneDiv

    // Returns the element text group one div
    getElementTextGroupOneDiv()
    {
        return document.getElementById(this.getIdTextGroupOneDiv());
    }

    // Hide element div text group one div
    hideElementTextGroupOneDiv()
    {
        this.getElementTextGroupOneDiv().style.display = "none";

    } // hideElementTextGroupOneDiv

    // Display element div text group one div
    displayElementTextGroupOneDiv()
    {
        this.getElementTextGroupOneDiv().style.display = "block";
        
    } // hideElementTextGroupOneDiv

    // Returns the identity of the text group two div
    getIdTextGroupTwoDiv()
    {
        return 'id_text_group_two_div_' + this.m_id_my_fctn_str;

    } // getIdTextGroupTwoDiv

    // Returns the element text group two div
    getElementTextGroupTwoDiv()
    {
        return document.getElementById(this.getIdTextGroupTwoDiv());
    }

    // Hide element div text group two div
    hideElementTextGroupTwoDiv()
    {
        this.getElementTextGroupTwoDiv().style.display = "none";

    } // hideElementTextGroupTwoDiv

    // Display element div text group two div
    displayElementTextGroupTwoDiv()
    {
        this.getElementTextGroupTwoDiv().style.display = "block";
        
    } // hideElementTextGroupTwoDiv

    // Get the HTML string defining the label textgroup all div
    getLabelAllTextDivHtmlString(i_n_tabs)
    {
        var label_all_text_div_style_str = '';

        if (this.m_display_div_borders)
        {
            label_all_text_div_style_str = label_all_text_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_label_all_text.length > 0)
        {
            label_all_text_div_style_str = label_all_text_div_style_str + '; ' + this.m_style_label_all_text;
        }

        var label_all_text_inner_html = this.m_label_text;

        return UtilHtml.getDivElementLeafStyleString(this.getIdLabelAllTextDiv(), label_all_text_div_style_str, label_all_text_inner_html, i_n_tabs+1);

    } // getLabelAllTextDivHtmlString

    // Get the HTML string defining the text group one div
    getTextGroupOneDivHtmlString(i_n_tabs)
    {
        var text_group_one_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_group_one_div_style_str = text_group_one_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_group_one.length > 0)
        {
            text_group_one_div_style_str = text_group_one_div_style_str + '; ' + this.m_style_text_group_one;
        }

        var text_group_one_inner_html = '';
		
        text_group_one_inner_html = text_group_one_inner_html + this.getTextOneDivHtmlString(i_n_tabs+1);

        text_group_one_inner_html = text_group_one_inner_html + this.getTextTwoDivHtmlString(i_n_tabs+1);

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextGroupOneDiv(), text_group_one_div_style_str, text_group_one_inner_html, i_n_tabs+1);

    } // getTextGroupOneDivHtmlString

    // Get the HTML string defining the text group two div
    getTextGroupTwoDivHtmlString(i_n_tabs)
    {
        var text_group_two_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_group_two_div_style_str = text_group_two_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_group_two.length > 0)
        {
            text_group_two_div_style_str = text_group_two_div_style_str + '; ' + this.m_style_text_group_two;
        }

        var text_group_two_inner_html = '';
		
        text_group_two_inner_html = text_group_two_inner_html + this.getTextThreeDivHtmlString(i_n_tabs+1);

        text_group_two_inner_html = text_group_two_inner_html + this.getTextFourDivHtmlString(i_n_tabs+1);

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextGroupTwoDiv(), text_group_two_div_style_str, text_group_two_inner_html, i_n_tabs+1);

    } // getTextGroupTwoDivHtmlString


    // Returns the identity of the div for the label text
    getIdLabelAllTextDiv()
    {
        return 'id_label_all_text_div_' + this.m_id_my_fctn_str;

    } // getIdLabelAllTextDiv

    // Returns the element for the label text
    getElementLabelAllTextDiv()
    {
        return document.getElementById(this.getIdLabelAllTextDiv());
        
    } // getElementLabelAllTextDiv

    // Returns the identity of the text one div
    getIdTextOneDiv()
    {
        return 'id_text_one_div_' + this.m_id_my_fctn_str;

    } // getIdTextOneDiv

    // Returns the element text one div
    getElementTextOneDiv()
    {
        return document.getElementById(this.getIdTextOneDiv());

    } // getElementTextOneDiv

    // Hide element div text one div
    hideElementTextOneDiv()
    {
        this.getElementTextOneDiv().style.display = "none";

    } // hideElementTextOneDiv

    // Display element div text one div
    displayElementTextOneDiv()
    {
        this.getElementTextOneDiv().style.display = "block";
        
    } // hideElementTextOneDiv

    // Get the HTML string defining the text one div
    getTextOneDivHtmlString(i_n_tabs)
    {
        var text_one_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_one_div_style_str = text_one_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_one.length > 0)
        {
            text_one_div_style_str = text_one_div_style_str + '; ' + this.m_style_text_one;
        }

        var text_one_inner_html = 'Place holder div for text one';

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextOneDiv(), text_one_div_style_str, text_one_inner_html, i_n_tabs+1);

    } // getTextOneDivHtmlString

    // Returns the identity of the text two div
    getIdTextTwoDiv()
    {
        return 'id_text_two_div_' + this.m_id_my_fctn_str;

    } // getIdTextTwoDiv

    // Returns the element text two div
    getElementTextTwoDiv()
    {
        return document.getElementById(this.getIdTextTwoDiv());
    }

    // Hide element div text two div
    hideElementTextTwoDiv()
    {
        this.getElementTextTwoDiv().style.display = "none";

    } // hideElementTextTwoDiv

    // Display element div text two div
    displayElementTextTwoDiv()
    {
        this.getElementTextTwoDiv().style.display = "block";
        
    } // hideElementTextTwoDiv

    // Get the HTML string defining the text two div
    getTextTwoDivHtmlString(i_n_tabs)
    {
        var text_two_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_two_div_style_str = text_two_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_two.length > 0)
        {
            text_two_div_style_str = text_two_div_style_str + '; ' + this.m_style_text_two;
        }

        var text_two_inner_html = 'Place holder div for text two';

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextTwoDiv(), text_two_div_style_str, text_two_inner_html, i_n_tabs+1);

    } // getTextTwoDivHtmlString

    // Returns the identity of the text three div
    getIdTextThreeDiv()
    {
        return 'id_text_three_div_' + this.m_id_my_fctn_str;

    } // getIdTextThreeDiv

    // Returns the element text three div
    getElementTextThreeDiv()
    {
        return document.getElementById(this.getIdTextThreeDiv());
    }

    // Hide element div text three div
    hideElementTextThreeDiv()
    {
        this.getElementTextThreeDiv().style.display = "none";

    } // hideElementTextThreeDiv

    // Display element div text three div
    displayElementTextThreeDiv()
    {
        this.getElementTextThreeDiv().style.display = "block";
        
    } // hideElementTextThreeDiv

    // Get the HTML string defining the text three div
    getTextThreeDivHtmlString(i_n_tabs)
    {
        var text_three_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_three_div_style_str = text_three_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_three.length > 0)
        {
            text_three_div_style_str = text_three_div_style_str + '; ' + this.m_style_text_three;
        }

        var text_three_inner_html = 'Place holder div for text three';

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextThreeDiv(), text_three_div_style_str, text_three_inner_html, i_n_tabs+1);

    } // getTextThreeDivHtmlString

    // Returns the identity of the text four div
    getIdTextFourDiv()
    {
        return 'id_text_four_div_' + this.m_id_my_fctn_str;

    } // getIdTextFourDiv

    // Returns the element text four div
    getElementTextFourDiv()
    {
        return document.getElementById(this.getIdTextFourDiv());
    }

    // Hide element div text four div
    hideElementTextFourDiv()
    {
        this.getElementTextFourDiv().style.display = "none";

    } // hideElementTextFourDiv

    // Display element div text four div
    displayElementTextFourDiv()
    {
        this.getElementTextFourDiv().style.display = "block";
        
    } // hideElementTextFourDiv

    // Get the HTML string defining the text four div
    getTextFourDivHtmlString(i_n_tabs)
    {
        var text_four_div_style_str = '';

        if (this.m_display_div_borders)
        {
            text_four_div_style_str = text_four_div_style_str + '; border: 1px solid yellow';
        }

        if (this.m_style_text_four.length > 0)
        {
            text_four_div_style_str = text_four_div_style_str + '; ' + this.m_style_text_four;
        }

        var text_four_inner_html = 'Place holder div for text four';

        return UtilHtml.getDivElementLeafStyleString(this.getIdTextFourDiv(), text_four_div_style_str, text_four_inner_html, i_n_tabs+1);

    } // getTextFourDivHtmlString

    checkInputData()
    {
        // TODO
        return true;

    } // checkInputData

    // Returns the string that defines the HTML display image string
    getHtmlString(i_n_tabs)
    {
        if (!this.checkInputData())
        {
            return '';
        }

        var ret_html_str = '';

        ret_html_str = ret_html_str + this.getLabelAllTextDivHtmlString(i_n_tabs+1);

        ret_html_str = ret_html_str + this.getTextGroupAllDivHtmlString(i_n_tabs);

        return ret_html_str;

    } // getHtmlString

} // DisplayImageText
// File: JazzTextArea.js
// Date: 2024-02-04
// Author: Gunnar Lidén

// File content
// =============
//
// Class JazzTextArea

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Text Area /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates a textarea
// The code that will be generated is 
// <label for="id_text_box">Label text</label>
// <textarea id="id_text_area" rows="20" cols="30" title="Tip ...">value</textarea>  
// 
// Input data
// i_id_text_area:     Identity of the text area
// i_id_div_container: Identity of the container. Normally a div
// i_n_rows:           Number of rows as string
// i_n_cols:           Number of columns as string
// 
// Here is a sample how an object of the class can be created:
// var img_textarea = new JazzTextArea("id_text_area", "i_id_container", "3", "50")
class JazzTextArea
{
    // Function that is executed when an object of this class is created
    constructor(i_id_text_area, i_id_div_container, i_n_rows, i_n_cols)
    {
        // Member variables
        // ================

        // The identity of the text area
        this.m_id_text_area = i_id_text_area;

        // The identity of the container for the text area
        this.m_id_div_container = i_id_div_container;

        // Number of rows
        this.m_n_rows = i_n_rows;

        // Number of columns
        this.m_n_cols = i_n_cols;

        // The container element for the text area
        this.m_el_div_container = null;

        // The class for the text box
        this.m_class = '';
    
        // The value of the text box
        this.m_value = '';

        // The oninput function name. Only the name is input
        this.m_oninput_function = '';

        // Flag telling if the text box shall be read only
        this.m_read_only_flag = false;        

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Placeholder text (instructions what to write)
        this.m_placeholder_text = '';

        // Size of the text box. Size is the number of characters
        // If size not is set there will be no attribute size= "20"
        // Then the default value for the browser application will be the size
        this.m_text_box_size = '';

        // Maximum length (number of characters) of the input string 
        // If the maximum length not is defined there will be no attribute maxlength= "30"
        // Then the default value for the browser application will be the maximum length
        this.m_maxlength = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Initialization
        // ==============        

        this.setDivContainerElement();

        this.setControl();

    } // constructor

    // Set and get functions
    // =====================

    // Sets the value for the text box 
    setValue(i_value) 
    {
      this.m_value = i_value;

      var element_html = this.getHtmlElement();

      element_html.value = this.m_value;

    } // setValue

    // Returns the value of the text box
    getValue()
    {
        var element_html = this.getHtmlElement();

        var value = element_html.value;

        this.setValue(value);

        return this.m_value;

    } // getValue    

    // Set focus
    setFocus()
    {
        var element_html = this.getHtmlElement();

        if (null != element_html)
        {
            element_html.focus();
        }

    } // setFocus

    // Lose focus
    loseFocus()
    {
        var element_html = this.getHtmlElement();

        if (null != element_html)
        {
            element_html.blur();
        }

    } // loseFocus

    // Set functions for the layout member variables
    // =============================================

    // Set the oninput function name. Only the name is input
    setOninputFunctionName(i_oninput_function)
    {
        this.m_oninput_function = i_oninput_function;

        this.setControl();

    } // setOninputFunctionName

    // Sets the class for the text box 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the label text for the text box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the text box
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Set placeholder text (instructions what to write)
    setPlaceholderText(i_placeholder_text)
    {
        this.m_placeholder_text = i_placeholder_text;

        this.setControl();

    } // setPlaceholderText
        
    // Sets the label text to the right of the text box
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove

    // Set read only flag to false or true
    setReadOnlyFlag(i_read_only_flag)
    {
        this.m_read_only_flag = i_read_only_flag; 

        this.setControl();

    } // setReadOnlyFlag

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzTextBox error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    // Append if the input div element had elements
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

    } // setControl

    // Returns the HTML text box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_text_area);

    } // getHtmlElement


    // Returns the string that defines the HTML text area string
    // <textarea id="id_text_area" rows="20" cols="30" title="Tip ...">value</textarea>  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_area, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_area, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<textarea id="' + this.m_id_text_area + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }

        if (this.m_n_rows.length > 0)
        {
            ret_html_str = ret_html_str + ' rows="' + this.m_n_rows + '" ';
        }
        else
        {
            alert("JazzTextArea.getHtmlString Error Number of rows is not set");

            return;
        }

        if (this.m_n_cols.length > 0)
        {
            ret_html_str = ret_html_str + ' cols="' + this.m_n_cols + '" ';
        }
        else
        {
            alert("JazzTextArea.getHtmlString Error Number of columns is not set");

            return;
        }

        if (this.m_oninput_function.length > 0)
        {
            ret_html_str = ret_html_str + ' oninput="' + this.m_oninput_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        if ( this.m_placeholder_text.length > 0)
        {
            ret_html_str = ret_html_str + ' placeholder="' + this.m_placeholder_text + '" ';
        }

        if (this.m_read_only_flag)
        {
            ret_html_str = ret_html_str + ' readonly';
        }

        ret_html_str = ret_html_str + '>';

        ret_html_str = ret_html_str + this.m_value;

        ret_html_str = ret_html_str + '</textarea>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_area, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzTextArea



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Text Area ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// File: JazzUploadImage.js
// Date: 2025-04-10
// Author: Gunnar Lidén

// Content
// ========
//
// Control for the upload of a photo to the JAZZ live AARAU server.

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Upload Image //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Input data for JazzUploadImage
// i_upload_file_name:      The name of the file to be uploaded without extension
// i_upload_file_extension: The extension of the file to be uploaded
// i_upload_path:           The server absolute path (URL) for the file to be uploaded
// i_image_max_size_mb:     Maximum image size in MByte. If bigger the image will be compressed
// i_default_img:           URL for the default (start) image in the image container <div>
// i_caption_select_img:    Caption for the select image button
// i_img_loaded_callback:   Callback function when an image is loaded (displayed)
//                          A boolean parameter tells if it is the default image that
//                          was loaded
class JazzUploadImageInput
{
    // Creates the instance of the class
    constructor(i_upload_file_name, i_upload_file_extension, i_upload_path, i_image_max_size_mb, 
                i_default_img, i_caption_select_img, i_img_loaded_callback)
    {
        // Name of the upload file without extension, e.g. Image_2024mmddhhmmss
        this.m_upload_file_name = i_upload_file_name;

        // Extension of the upload file,e.g. .jpg
        this.m_upload_file_extension = i_upload_file_extension;

        // The server absolute path for m_upload_file_name
        this.m_upload_path = i_upload_path;

        // Maximum image size in MByte. If bigger the image will be compressed
        this.m_image_max_size_mb = i_image_max_size_mb;

        // URL for the default image, i.e. an start image that is diplayed in the image container
        this.m_default_img = i_default_img;

        // Caption for the select image button (actually a label)
        this.m_caption_select_img = i_caption_select_img;

        // Callback function when image has been loaded
        this.m_img_loaded_callback = i_img_loaded_callback;
    }

     // Set the server absolute path for m_upload_file_name
    setImageFilePath(i_upload_path)
    {
        this.m_upload_path = i_upload_path;        
    }

    // Sets the name of the upload file without extension, e.g. Image_yyymmddhhmmss
    setImageFileName(i_upload_file_name)
    {
        this.m_upload_file_name = i_upload_file_name; 

    } // setImageFileName

    // Sets the extension of the upload file, e.g. .jpg
    setImageFileExtension(i_upload_file_extension)
    {
        this.m_upload_file_extension = i_upload_file_extension;

    } // setImageFileExtension

    // Sets the extension of the upload file from another file, e.g. .jpg
    setFileExtensionFromAnotherFile(i_image_file)
    {
        var last_index_point = i_image_file.lastIndexOf('.');

        if (last_index_point < 0)
        {
            alert("JazzUploadImageInput.setImageFileExtension No file extension: " + i_image_file);

            return;
        }

        var extension_str = i_image_file.substring(last_index_point);

        this.m_upload_file_extension = extension_str;

    } // setFileExtensionFromAnotherFile

    // Set the extension from a File object type
    setFileExtensionFromObjectFileType(i_file_object)
    {
        var file_type_str = i_file_object.type;

        var index_image = file_type_str.indexOf('image');

        if (index_image < 0)
        {
            alert("JazzUploadImageInput.setFileExtensionFromObjectFileType Not an image");

            return;
        }
        var index_jpg = file_type_str.indexOf('jpg');

        var index_jpeg = file_type_str.indexOf('jpeg');

        var index_png = file_type_str.indexOf('png');

        var index_gif = file_type_str.indexOf('gif');

        var index_bmp = file_type_str.indexOf('bmp');

        var extension_str = '';

        if (index_jpg >= 0)
        {
            extension_str = '.jpg';
        }
        else if (index_jpeg >= 0)
        {
            extension_str = '.jpg';
        }
        else if (index_png >= 0)
        {
            extension_str = '.png';
        }
        else if (index_gif >= 0)
        {
            extension_str = '.gif';
        }
        else if (index_bmp >= 0)
        {
            extension_str = '.bmp';
        }
        else
        {
            extension_str = '.jpg';

            var warning_message = "JazzUploadImageInput.setFileExtensionFromObjectFileType Warning Image type not jpg, jpeg, png, gif or bmp. Type= " + file_type_str;

            alert(warning_message);

            console.log(warning_message);
        }

        this.m_upload_file_extension = extension_str;

    } // setFileExtensionFromObjectFileType

    // Returns the server file name (URL) for the file that shall be uploaded
    getImageFileFullName()
    {
        return this.m_upload_path + this.m_upload_file_name + this.m_upload_file_extension;

    } // getImageFileFullName

} // JazzUploadImageInput

// Class for the upload of an image to the server 
class JazzUploadImage
{
    // Creates the instance of the class
    // Used to construct identities and class names and handling of event functions
    // i_id_div_container:
    // Place holder for all the the upload controls
    // i_input_data:
    // Instance of JazzUploadImageInput with data (settings) for the upload
    constructor(i_id_div_container, i_input_data) 
    {
        // Member variables
        // ================

        // The identity of the container for the upload controls
        this.m_id_div_container = i_id_div_container;

        // Input data object JazzUploadImageInput
        this.m_input_data = i_input_data;

        // The container element object
        this.m_el_div_container = null;

       // Number of uploaded images
       this.m_n_uploaded_images = 0;

        // Initialization
        this.init();

    } // constructor

    // Initialization 
    init()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

        if (null == this.m_el_div_container)
        {
            alert("JazzUploadImage.init  Error: Container element is null for id= " + this.m_id_div_container);

            return;
        }

        if (this.m_input_data.m_upload_path.length > 0 && !UtilServer.isAbsolutePath(this.m_input_data.m_upload_path))
        {
            alert("JazzUploadImage.init  Error: Not an absolute path m_upload_path= " + this.m_input_data.m_upload_path);

            return;
        }        

        var html_content = this.getHtml();

        this.m_el_div_container.innerHTML = html_content;

        this.addEventListenerForInputFileElement(this, this.m_input_data);

        this.addEventListenerForUploadImageElement(this, this.m_input_data);

        this.m_n_uploaded_images = 0;

    } // init

    // Set the full server file name (URL) for the uploaded image
    // i_full_server_file_name: Absolut full path URL
    // Please note that the URL can be set also as input data to JazzUtilImageInput
    // (Pameters i_upload_file_name, i_upload_file_extension, i_upload_path)
    setUploadFileUrl(i_full_server_file_name)
    { 
        if (!UtilServer.isAbsolutePath(i_full_server_file_name))
        {
            alert("JazzUploadImage.setUploadFileUrl Not an absolute path= " + i_full_server_file_name);

            return;
        }

        this.m_input_data.setImageFilePath(UtilServer.getFilePath(i_full_server_file_name));   
        
        this.m_input_data.setImageFileName(UtilServer.getFileNameWithoutExtension(i_full_server_file_name));  

        this.m_input_data.setImageFileExtension(UtilServer.getFileExtension(i_full_server_file_name));  
       
    } // setUploadFileUrl

    // Get the full server file name (URL) to the uploaded image
    getImageFileFullName(i_full_server_file_name)
    {       
        return this.m_input_data.getImageFileFullName();

    } // getImageFileFullName

    // Get number of uploaded images after initialization
    getNumberOfUploadedImages()
    {
        return this.m_n_uploaded_images;

    } // getNumberOfUploadedImages

    // Adds an event listener for the input file element
    // i_upload_image_object: This JazzUploadImage object
    // i_input_data:          An instance of JazzUploadImageInput
    //
    // Inside this function 'this' is the <input> object that holds the data about
    // the file that shall be uploaded. This data must of course be passed on
    // to the event execution member function userSelectedFiles.
    // The function userSelectedFiles is a member of the JazzUploadImage class. Therefore
    // must the object JazzUploadImageInput i_upload_image_object be input to this function.
    //
    // https://www.w3schools.com/js/tryit.asp?filename=tryjs_addeventlistener_parameters
    addEventListenerForInputFileElement(i_upload_image_object, i_input_data)
    {
        var input_file_el = JazzUploadImage.getElementFileInput();

        input_file_el.addEventListener("change", function() {
            i_upload_image_object.userSelectedFiles(this, i_input_data);
        });

    } // addEventListenerForInputFileElement

    // Adds an event handler to the <img> element that displays the uploaded image
    addEventListenerForUploadImageElement(i_upload_image_object, i_input_data) 
    {
        var upload_image_el = JazzUploadImage.getElementUploadImage();

        upload_image_el.addEventListener("load", function() {
            i_upload_image_object.imageIsLoaded(this, i_input_data);
        });

    } // addEventListenerForUploadImageElement

    // Event: Image is loaded. The function m_img_loaded_callback will be called
    // with a boolean parameter telling if it was the default image that was loaded
    imageIsLoaded(i_input_object, i_input_data)
    {
        var upload_image_el = JazzUploadImage.getElementUploadImage();

        var uploaded_img_url = upload_image_el.src;

        var b_default_image = false;

        if (uploaded_img_url == i_input_data.m_default_img )
        {
            b_default_image = true;
        }
        else
        {
            this.m_n_uploaded_images = this.m_n_uploaded_images + 1;
        }

        i_input_data.m_img_loaded_callback(b_default_image);

    } // imageIsLoaded

    // Event function when the user selected files with the input element, type file
    // i_input_object: Element <input> holding the data about the file that shall be uploaded
    // i_input_data:   An instance of JazzUploadImageInput holding data for the upload
    async userSelectedFiles(i_input_object, i_input_data)
    {
        JazzUploadImage.debugAppend("userSelectedFiles Enter");

        if (i_input_object.files.length == 0)
        {
            JazzUploadImage.debugAppend("userSelectedFiles User did not select any file");

            return;
        }

        this.resetDefaultImage();

        JazzUploadImage.debugAppend("userSelectedFiles After resetDefaultImage");
        
        var max_size_mb = i_input_data.m_image_max_size_mb;

        var image_file = i_input_object.files[0];

        var file_name_orig = image_file.name;

        var file_name_el = JazzUploadImage.getElementDivFileName();

        file_name_el.innerHTML = file_name_orig;
    
        if (!JazzUploadImage.fileIsOfTypeImage(image_file))
        {
            alert("JazzUploadImage.userSelectedFiles The file is not an image.");
    
            return;
        }
        else
        {
            console.log("JazzUploadImage.userSelectedFiles The input file is an image");
        }
    
        var original_size = image_file.size/1000000.0;

        console.log("Original image size is " + original_size.toString());

        var full_server_file_name = '';

        if (original_size < max_size_mb)
        {
            console.log("JazzUploadImage.userSelectedFiles The original image is not changed");

            var file_name = image_file.name;

            i_input_data.setFileExtensionFromAnotherFile(file_name); // Really needed?

            full_server_file_name = i_input_data.getImageFileFullName();

            JazzUploadImage.debugAppend("userSelectedFiles The original image will not be compressed");

            var file_type = JazzUploadImage.getFileTypeImage(image_file);

            if (file_type != "image/jpeg" && file_type != "image/jpg" && !UtilServer.isSafari())
            {
                JazzUploadImage.debugAppend("JazzUploadImage.userSelectedFiles The original image will be converted");

                var converted_file = await JazzUploadImage.getConvertedImageFile(image_file);

                console.log("JazzUploadImage.userSelectedFiles The image was converted");

                i_input_data.setFileExtensionFromObjectFileType(converted_file);

                full_server_file_name = i_input_data.getImageFileFullName();

                JazzUploadImage.debugAppend("JazzUploadImage.userSelectedFiles The input image was converted. File name= " + full_server_file_name);

                UtilServer.uploadFile(image_file, full_server_file_name, JazzUploadImage.displayUploadedImage);
            }
            else
            {
                UtilServer.uploadFile(image_file, full_server_file_name, JazzUploadImage.displayUploadedImage);
            }
            
        }
        else
        {
            // Note again that this. not cannot be used for getCompressedImageFile, i.e. this
            // function must be static
            var compressed_file = await JazzUploadImage.getCompressedImageFile(image_file, max_size_mb);

            console.log("JazzUploadImage.userSelectedFiles The image was compressed");

            i_input_data.setFileExtensionFromObjectFileType(compressed_file);

            full_server_file_name = i_input_data.getImageFileFullName();

            JazzUploadImage.debugAppend("userSelectedFiles The input image was compressed");

            UtilServer.uploadFile(image_file, full_server_file_name, JazzUploadImage.displayUploadedImage);
        }

    } // userSelectedFiles

    // Reset the default image
    async resetDefaultImage()
    {
        var url_default_image = this.m_input_data.m_default_img;

        UtilImage.replaceImageInDivContainer(url_default_image, JazzUploadImage.getElementDivImageContainer());
        
        JazzUploadImage.debugAppend("resetDefaultImage Default image was set");

    } // resetDefaultImage

    // Display the uploaded image. 
    static async displayUploadedImage(i_file_name)
    {
        JazzUploadImage.debugAppend("displayUploadedImage i_file_name= " + i_file_name);

        UtilImage.replaceImageInDivContainer(i_file_name, JazzUploadImage.getElementDivImageContainer());

        JazzUploadImage.debugAppend("displayUploadedImage UtilImage.replaceImageInDivContainer was called");

    } // displayUploadedImage

    // Get image file that has been converted to type jpeg
    static async getConvertedImageFile(i_image_file)
    {
        if (UtilServer.isSafari())
        {
            alert("JazzUploadImage.getConvertedImageFile Browser is Apple Safari. Function compressImage does not work");

            return null;
        }

        if (!JazzUploadImage.fileIsOfTypeImage(i_image_file))
        {
            alert("JazzUploadImage.getConvertedImageFile The file is not an image.");

            return null;
        }

        var file_type = JazzUploadImage.getFileTypeImage(i_image_file);

        if (file_type == "image/jpeg" || file_type == "image/jpg" )
        {
            alert("JazzUploadImage.getConvertedImageFile The file is already type image/jpeg or image/jpg");

            return null;            
        }

        var scale_factor = 1.0;

        console.log("JazzUploadImage.getConvertedImageFile Scaling factor " + scale_factor.toString());

        JazzUploadImage.debugAppend("getConvertedImageFile Scaling factor= " + scale_factor.toString());

        var file_type_str = 'image/jpeg';

        const converted_file = await compressImage(i_image_file, {
            quality: scale_factor,
            type: file_type_str,
        });

        if (null == converted_file)
        {
            alert("JazzUploadImage.getConvertedImageFile Converted image file is null");
            
            return null;
        }

        JazzUploadImage.debugAppend("getConvertedImageFile Exit");

        return converted_file;

    } // getConvertedImageFile
    
    // Get a compressed image if bigger as the input maximum size in Megabyte
    static async getCompressedImageFile(i_image_file, i_max_size_mb)
    {
        if (!JazzUploadImage.fileIsOfTypeImage(i_image_file))
        {
            alert("JazzUploadImage.getCompressedImageFile The file is not an image.");

            return null;
        }
        else
        {
            console.log("JazzUploadImage.getCompressedImageFile The input file is an image");
        }

        var original_size = i_image_file.size/1000000.0;

        console.log("JazzUploadImage.getCompressedImageFile Original image size is " + original_size.toString());

        if (original_size < i_max_size_mb)
        {
            console.log("JazzUploadImage.getCompressedImageFile The original image is not changed");

            return i_image_file;
        }

        var scale_factor = i_max_size_mb/original_size;
        
        console.log("JazzUploadImage.getCompressedImageFile Scaling factor " + scale_factor.toString());

        JazzUploadImage.debugAppend("getCompressedImageFile Scaling factor= " + scale_factor.toString());

        // The ouput type could be equal to the input type, but files get very big and the preferred type is jpeg
        // Please refer to function getInputHtml() for the allowed (accept=) input types 
        //var file_type_str = JazzUploadImage.getFileTypeImage(i_image_file);
        //console.log("JazzUploadImage.getCompressedImageFile Image type= " + file_type_str);
        //JazzUploadImage.debugAppend("getCompressedImageFile Image type= " + file_type_str);

        var file_type_str = 'image/jpeg';

        const compressed_file = await compressImage(i_image_file, {
            quality: scale_factor,
            type: file_type_str,
        });

        if (null == compressed_file)
        {
            alert("JazzUploadImage.getCompressedImageFile Compressed image file is null");
            
            return null;
        }

        JazzUploadImage.debugAppend("getCompressedImageFile Exit");

        return compressed_file;

    } // getCompressedImageFile

    // Returns true if the input file is of type image
    // Type of image is for instance 'image/jpeg'
    static fileIsOfTypeImage(i_file)
    {
        var file_type_str = i_file.type;

        var index_image = file_type_str.indexOf('image');

        if (index_image >= 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // fileIsOfTypeImage

    // Returns the Image file type of the input File
    // Uncertain how the returned string 
    static getFileTypeImage(i_file)
    {
        if (!JazzUploadImage.fileIsOfTypeImage(i_file))
        {
            alert("JazzUploadImage.getFileTypeImage Not an image");

            return '';
        }

        var file_type_str = i_file.type;

        var index_jpg = file_type_str.indexOf('jpg');

        var index_jpeg = file_type_str.indexOf('jpeg');

        var index_png = file_type_str.indexOf('png');

        var index_gif = file_type_str.indexOf('gif');

        var index_bmp = file_type_str.indexOf('bmp');

        var ret_type_str = '';

        if (index_jpg >= 0)
        {
            ret_type_str = 'image/jpg';
        }
        else if (index_jpeg >= 0)
        {
            ret_type_str = 'image/jpeg';
        }
        else if (index_png >= 0)
        {
            ret_type_str = 'image/png';
        }
        else if (index_gif >= 0)
        {
            ret_type_str = 'image/gif';
        }
        else if (index_bmp >= 0)
        {
            ret_type_str = 'image/bmp';
        }
        else
        {
            ret_type_str = file_type_str;

            var warning_message = "JazzUploadImage.getFileTypeImage Warning Image type not jpg, jpeg, png, gif or bmp. Type= " + file_type_str;

            alert(warning_message);

            console.log(warning_message);
        }

        return ret_type_str;

    } // getFileTypeImage

    // Get the HTML string defining the content of i_id_div_container
    getHtml()
    {
        var ret_html = '';

        const tabs_two = 2;

        var id_div_input = JazzUploadImage.getIdDivFileInput();

        //20250406 var input_styles_str = 'overflow: hidden; clear: both; text-align: center;';

        var input_styles_str = 'overflow: hidden; clear: both; margin-top: 5px; text-align: center; height: 14%';

        var div_input_inner_html = this.getInputHtml();

        var div_input_html = UtilHtml.getDivElementLeafStyleString(id_div_input, input_styles_str, div_input_inner_html, tabs_two);

        var id_div_label_name = JazzUploadImage.getIdDivFileName();

        //20250406 var file_name_styles_str = 'border: solid 1px grey; margin-top: 10px; clear: both;text-align: center;';

        var file_name_styles_str = 'border: solid 1px grey; margin-top: 10px; margin-left: 2%; margin-right: 2%;  clear: both;text-align: center; height: 9%';

        var div_file_name_inner_html = '...'; 

        var div_file_name_html = UtilHtml.getDivElementLeafStyleString(id_div_label_name, file_name_styles_str, div_file_name_inner_html, tabs_two);

        var id_div_image_container = JazzUploadImage.getIdDivImageContainer();

        //20250406 var image_container_styles_str = 'border: solid 1px blue;  margin-top: 10px; clear: both;'; // TODO Must have a border, otherwise it disappears ??

        // It is necessary to set the height. Calling changeDefaultImageFile multiple times made the container height smaller and smaller
        var image_container_styles_str = ' margin-top: 10px; height: 60%; clear: both;'; 

        var id_div_upload_image = JazzUploadImage.getIdDivUploadImage();

        var image_styles_str = '';

        var image_width = '98%';

        var event_fctn = '';

        var file_name_icon = this.m_input_data.m_default_img;

        var image_title = '';

        //20250406 var upload_image_html = UtilHtml.getDivElementIconStyleString(id_upload_image, image_styles_str, file_name_icon, image_width, event_fctn, image_title, tabs_two+1);
        var upload_image_html = UtilHtml.getDivElementImageString(id_div_upload_image, image_styles_str, file_name_icon, 'Image', image_width, event_fctn, image_title, tabs_two+1)
        
        var div_image_container_html = UtilHtml.getDivElementLeafStyleString(id_div_image_container, image_container_styles_str, upload_image_html, tabs_two);

        ret_html = ret_html + div_input_html;

        ret_html = ret_html + div_file_name_html;

        ret_html = ret_html + div_image_container_html;

        return ret_html;

    } // getHtml

    // Get the HTML string as defined below
    // <input id="id_fileupload" type="file" accept="image/png, image/jpeg, image/jpg" /> 
    // <label for="id_fileupload">Bild wählen</label> 
    getInputHtml()
    {
        var ret_input_html = '';

        var input_style_str = '';

        input_style_str = input_style_str + ' style= "';

        input_style_str = input_style_str + 'width: 0; ';
        input_style_str = input_style_str + 'height: 0; ';
        input_style_str = input_style_str + 'z-index: -1; ';
        input_style_str = input_style_str + 'position: absolute; ';
        input_style_str = input_style_str + 'overflow: hidden; ';
        input_style_str = input_style_str + 'opacity: 0 ';

        input_style_str = input_style_str + '" ';

        var label_style_str = '';

        // https://www.w3docs.com/snippets/css/how-to-control-the-width-of-the-label-tag.html
        label_style_str =  label_style_str + ' style= "';
     
        label_style_str =  label_style_str + 'display: inline-block; '; 
        label_style_str =  label_style_str + 'width: 95%; '; 
        label_style_str =  label_style_str + 'border: solid 2px black; ';
        label_style_str =  label_style_str + 'padding-top: 5px; ';
        label_style_str =  label_style_str + 'padding-bottom: 5px; ';
        label_style_str =  label_style_str + 'margin-left: 0px;';
        label_style_str =  label_style_str + 'background-color: rgb(229, 225, 218);';
        label_style_str =  label_style_str + 'cursor: pointer ';

        label_style_str =  label_style_str + '" ';

        var id_input_str = JazzUploadImage.getIdFileInput();

        ret_input_html = ret_input_html + '<input id="' + id_input_str + '" type="file" accept="image/png, image/jpeg, image/jpg, image/gif, image/bmp"';

        ret_input_html = ret_input_html + input_style_str + '/>';

        ret_input_html = ret_input_html + '<label for="' + id_input_str + '" ';

        ret_input_html = ret_input_html + label_style_str + '>' + this.m_input_data.m_caption_select_img + '</label>';

        return ret_input_html;
        
    } // getInputHtml

    // Set image and image file name for an image on the server, i.e. not an uploaded image
    // 1. Get elements image and file name container.
    //    Call of getElementDivImageContainer and getElementDivFileName
    // 2. Get only the file name and set the file name
    //    Call of UtilServer.getFileName and set innerHTML for the file name container
    // 3. Replace the image with the input window
    //    Call of UtilImage.replaceImageInDivContainer
    changeDefaultImageFile(i_url_image)
    {
        var image_container_el = JazzUploadImage.getElementDivImageContainer();

        var file_name_container = JazzUploadImage.getElementDivFileName();

        var file_name = UtilServer.getFileName(i_url_image);

        file_name_container.innerHTML = file_name;

        UtilImage.replaceImageInDivContainer(i_url_image, image_container_el);

    } // changeDefaultImageFile

    // Returns the <input> element
    static getElementFileInput()
    {
        return document.getElementById(JazzUploadImage.getIdFileInput());

    } // getElementFileInput

    // Returns the identity string for the <input> element
    static getIdFileInput()
    {
        return 'id_jazzuploadimage_fileupload';

    } // getIdFileInput

    // Returns the identity string for the <div> that has the <input> element
    static getIdDivFileInput()
    {
        return 'id_div_jazzuploadimage_fileupload';

    } // getIdDivFileInput

    // Returns the div element file name
    static getElementDivFileName()
    {
        return document.getElementById(JazzUploadImage.getIdDivFileName());

    } // getElementDivFileName

    // Returns the identity string for the file name <div>
    static getIdDivFileName()
    {
        return 'id_div_jazzuploadimage_file_name';

    } // getIdDivFileName

    // Returns the div element image container
    static getElementDivImageContainer()
    {
        return document.getElementById(JazzUploadImage.getIdDivImageContainer());

    } // getElementDivImageContainer

    // Returns the identity string for the image container <div>
    static getIdDivImageContainer()
    {
        return 'id_div_jazzuploadimage_image_container';

    } // getIdDivImageContainer

    // Returns the <img> element
    static getElementUploadImage()
    {
        var div_img_el = JazzUploadImage.getElementDivUploadImage();

        var img_elements = div_img_el.getElementsByTagName('img');

        return img_elements[0];

    } // getElementUploadImage

    // Returns the the div element for upload <img>
    static getElementDivUploadImage()
    {
        return document.getElementById(JazzUploadImage.getIdDivUploadImage());

    } // getElementDivUploadImage

    // Returns the identity string for the upload <img>
    static getIdDivUploadImage()
    {
        return 'id_div_jazzuploadimage_upload_image';

    } // getIdUploadImage

    // Returns the debug file name
    static getDebugFilename()
    {
        return  'JazzUploadImage';

        // return  'NoDebug';

    } // getDebugFilename

    // Create a new debug file
    static initDebugFile()
    {
        var b_execute_server = UtilServer.execApplicationOnServer();

        if (!b_execute_server)
        {
            return;
        }

        if (JazzUploadImage.getDebugFilename() == 'NoDebug')
        {
            return;
        }

        UtilServer.initDebugFile(JazzUploadImage.getDebugFilename());

    } // initDebugFile

    // Append to debug file
    static debugAppend(i_msg_str)
    {
        var b_execute_server = UtilServer.execApplicationOnServer();

        if (!b_execute_server)
        {
            return;
        }
        
        if (JazzUploadImage.getDebugFilename() == 'NoDebug')
        {
            return;
        }
        
        if (JazzUploadImage.getDebugFilename() == 'NoDebug')
        {
            return;
        }

        UtilServer.appendDebugFile(i_msg_str, JazzUploadImage.getDebugFilename());

    } // debugAppend

} // JazzUploadImage


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Upload Image ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// File: JazzIcon.js
// Date: 2024-03-08
// Author: Gunnar Lidén

// File content
// =============
//
// Class JazzIcon
//
// Please note that instantiate must be called after the creation of JazzIcon
// var icon_object= new JazzIcon(i_image, i_id_icon, i_id_div_container);
// icon_object.set....
// icon_object.set....
// icon_object.instantiate()

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Icon //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// // Class that creates an icon control
class JazzIcon 
{
    // Creates the instance of the class
    constructor(i_image, i_id_icon, i_id_div_container) 
    {
        // Member variables
        // ================

        // The image for the icon
        this.m_image = i_image;

        // The identity of the icon control
        this.m_id_icon = i_id_icon;

        // The identity of the container for the icon control
        this.m_id_div_container = i_id_div_container;

        // The container element for the icon control
        this.m_el_div_container = null;

        // The style for the image
        this.m_img_style = '';

        // The style for the label
        this.m_label_style = '';

        // The onclick function name. Only the name is input
        this.m_onclick_function = '';

        // The width of the icon
        this.m_width = '';

        // The height of the icon
        this.m_height = '';

        // Alternate text for the icon
        this.m_alt = '';

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // none: Label div element will not be created
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Padding top for label div
        this.m_label_padding = '3px';

        // Padding left for image (icon)
        this.m_image_padding = '0px';

        // Color for label div
        this.m_label_bg_color = 'white'; 

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';
        
        // Initialization
        // ==============

        this.setDivContainerElement();

    } // constructor

    // Set functions for the layout member variables
    // =============================================

    // Sets the image style for the icon control 
    setImgStyle(i_img_style) 
    {
        this.m_img_style = i_img_style;

    } // setImgStyle

    // Set the style for the label
    setLabelStyle(i_label_style) 
    {
        this.m_label_style = i_label_style;

    } // setLabelStyle

    // Set padding top for label div
    setLabelPadding(i_label_padding)
    {
        this.m_label_padding = i_label_padding;

    } // setLabelPadding

   // Set padding left for the image (icon)
   setImagePadding(i_image_padding)
   {
       this.m_image_padding = i_image_padding;

   } // setImagePadding

    // Set backgroundcolor for label div
    setLabelBackgroundColor(i_label_bg_color)
    {
        this.m_label_bg_color = i_label_bg_color;

    } // setLabelBackgroundColor

    // Sets the image for the icon control 
    setImage(i_image) 
    {
      this.m_image = i_image;

    } // setImage    

    // Sets the width of an icon
    setWidth(i_width)
    {
        this.m_width = i_width;

    } // setWidth

    // Sets the height of an icon
    setHeight(i_height)
    {
        this.m_height = i_height;

    } // setHeight

    // Set alternate text for the icon
    setAlt(i_alt)
    {
        this.m_alt = i_alt;

    } // setAlt

    // Sets the label text for the icon
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

    } // setLabelText    

    // Sets the label text to the left of the icon
    setLabelTextPositionLeft() 
    {
        this.m_label_text_position = 'left'; 

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the icon
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

    } // setLabelTextPositionRight
    
    // Sets the label text above the icon
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

    } // setLabelTextPositionAbove    

    // Sets the label text below the icon
    setLabelTextPositionBelow() 
    {
        this.m_label_text_position = 'below'; 

    } // setLabelTextPositionBelow  

    // The label div element will not be created
    setLabelTextPositionNone() 
    {
        this.m_label_text_position = 'none'; 

    } // setLabelTextPositionNone

     // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

    } // setTitle
    
    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Returns the icon element
    getIconElement()
    {
        return document.getElementById(this.m_id_icon);

    } // getIconElement

    // Hide the icon
    hideIcon()
    {
        this.getIconElement().style.display = 'none';

    } // hideIcon

 
    // Display the icon
    showIcon()
    {
        this.getIconElement().style.display = 'block';

    } // showIcon   

    // Sets the onchange function name. Only the name is input
    setOnclickFunctionName(i_onclick_function) 
    {
      this.m_onclick_function = i_onclick_function;

    } // setOnchangeFunctionName     

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzIcon error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Create the element
    instantiate()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        if (this.m_image.length < 4)
        {
            alert("JazzIcon.instantiate Error: Image is not defined.  this.m_image= " + this.m_image);

            return;            
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

    } // instantiate
        
    // Returns the string that defines the HTML img string
    // <img id="id_icon" class="cl_icon" onclick= "eventXyz" title="Tip ...">
    getHtmlString()
    {
        var ret_html_str = '';

        var img_styles = this.m_img_style;

        var label_styles =  this.m_label_style;

        label_styles = UtilHtml.appendBackgroundStyle(label_styles, this.m_label_bg_color);

        if (this.m_label_text_position == 'left' || this.m_label_text_position == 'right')
        {
            img_styles = UtilHtml.appendLeftStyle(img_styles);

            label_styles = UtilHtml.appendLeftStyle(label_styles);

            label_styles = UtilHtml.appendPaddingTopStyle(label_styles, this.m_label_padding);
        }
        else if (this.m_label_text_position == 'above' || this.m_label_text_position == 'below')
        {
            img_styles = UtilHtml.appendClearStyle(img_styles);

            img_styles = UtilHtml.appendPaddingLeftStyle(img_styles, this.m_image_padding);

            label_styles = UtilHtml.appendClearStyle(label_styles);         
        }
        else if (this.m_label_text_position == 'none')
        {
            img_styles = UtilHtml.appendClearStyle(img_styles);    
        }

        if (this.m_onclick_function.length > 0)
        {
            img_styles = UtilHtml.appendCursorStyle(img_styles);

            label_styles = UtilHtml.appendCursorStyle(label_styles);            
        }

        var icon_html = UtilHtml.getImgAllStyleString(this.m_image, this.m_alt, this.m_id_icon, 
                    img_styles, this.m_width, this.m_height, this.m_onclick_function, this.m_title);

        if (this.m_label_text_position == 'none')
        {
            ret_html_str = ret_html_str + icon_html;

            return ret_html_str;
        }
  
        var n_tabs = 2;

        var id_element_leaf = '';

        var label_div_html = UtilHtml.getDivElementLeafStyleClickString(id_element_leaf, label_styles, 
                            this.m_onclick_function, this.m_label_text, n_tabs);

        if (this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + label_div_html + icon_html;
        }
        else if (this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + icon_html + label_div_html;
        }
        else if (this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + label_div_html + icon_html;
        }
        else if (this.m_label_text_position == 'below')
        {
            ret_html_str = ret_html_str + icon_html + label_div_html;
        }
        else
        {
            alert("JazzIcon.getHtmlString Programming error");

            return 'JazzIcon.getHtmlString Programming error';
        }

        // console.log("JazzIcon.getHtmlString html_str= " + ret_html_str);

        return ret_html_str;

    } // getHtmlString

} // JazzIcon

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Icon ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// File: JazzToolbar.js
// Date: 2024-03-17
// Author: Gunnar Lidén

// File content
// =============
//
// Class for a toolbar with icons, buttons and checkboxes

// Holds data for an icon element
class JazzToolbarData
{
    constructor(i_class_name)
    {
        // Class name
        this.m_class_name = i_class_name;

        // Object
        this.m_object = null;

        // Image URL for class JazzIcon
        this.m_image_url = '';

        // Image alternative for class JazzIcon
        this.m_image_alt = '';

        // Caption for class JazzButton
        this.m_caption = '';

        // Element width
        this.m_width = '';

        // Element height
        this.m_height = '';

        // Element identity
        this.m_id = '';

        // Container div element identity
        this.m_div_id = '';

        // The on click function name.
        this.m_onclick_function = '';

        // Label text for the element
        this.m_label_text = '';

        // Image padding left for label above and below
        this.m_image_padding = '0px';

        // Title (tool tips)
        this.m_title = '';

    }

    // Set image URL for class JazzIcon
    setImageUrl(i_image_url)
    {
        this.m_image_url = i_image_url;

    } // setImageUrl

    // Set image alternative for class JazzIcon
    setImageAlt(i_image_alt)
    {
        this.m_image_alt = i_image_alt;

    } // setImageAlt

    // Set caption for class JazzButton
    setCaption(i_caption)
    {
        this.m_caption = i_caption;

    } // setCaption

    // Set element width
    setWidth(i_width)
    {
        this.m_width = i_width;

    } // setWidth

    // Set element height
    setHeight(i_height)
    {
        this.m_height = i_height;

    } // setHeight

    // Set the element container div identity
    setDivId(i_element_number, i_id_my_fctn_str)
    {
        this.m_div_id = 'id_div_' + this.m_class_name + '_' + i_element_number + '_' + i_id_my_fctn_str;

    } // setDivId

    // Set the element identity
    setId(i_element_number, i_id_my_fctn_str)
    {
        this.m_id = 'id_' + this.m_class_name + '_' + i_element_number + '_' + i_id_my_fctn_str;

    } // setId

    // Sets the on click function name.
    setOnclickFunctionName(i_onclick_function) 
    {
      this.m_onclick_function = i_onclick_function;

    } // setOnchangeFunctionName    

    // Sets the label text for the icon
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

    } // setLabelText

   // Set padding left for the image (icon)
   setImagePadding(i_image_padding)
   {
       this.m_image_padding = i_image_padding;

   } // setImagePadding

    // Set title (tool tips)
    setTitle(i_title)
    {
        this.m_title = i_title;

    } // setTitle

} // JazzToolbarIcon

// Creates a toolbar
class JazzToolbar
{
    // i_toolbar_data_array: 
    // Array of JazzToolbarData objects
    // i_id_my_fctn_str: 
    // Application unique string for the calling function. 
    // Used to construct identities and class names
    // i_id_div_container:
    // Place holder for the DisplayImage element
    constructor(i_toolbar_data_array, i_id_my_fctn_str, i_id_div_container) 
    {
        // Member variables
        // ================

        // Array of JazzToolbarData objects
        this.m_toolbar_data_array = i_toolbar_data_array;

        // String used to construct identities and class names that are
        // unique for an application
        this.m_id_my_fctn_str = i_id_my_fctn_str;

        // The identity of the container for the control
        this.m_id_div_container = i_id_div_container;

        // Container object div with the identity m_id_div_container
        this.m_el_div_container = null;

        // Flag telling if it is a horzontal toolbar.
        // If false a vertical toolbar will be created
        this.m_horizontal = true;

        // Font size
        this.m_font_size = '10px';

        // Font color
        this.m_font_color = 'black';

        // Font weight
        this.m_font_weight = 'bold';

        // Label padding for label left and right
        this.m_label_padding = '4px';

        // Background color
        this.m_bg_color = '';

        // Margin left for the icon/label container elements
        this.m_margin_left = '5px';

        // Margin right for the icon/label container elements
        this.m_margin_right = '';

        // Margin bottom for the icon/label container elements
        this.m_margin_bottom = '';

        // Margin top for the icon/label container elements
        this.m_margin_top = '';

        // Style for the icon/label container elements
        // Set by function setStyles
        this.m_style = '';

        // Label case: none, left, right, above or below
        this.m_label_case = 'none';

        this.init();

    } // constructor

    // Initialization and check of input data
    init()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

        if (null == this.m_el_div_container)
        {
            alert("JazzToolbar.init Not element witd id= " + this.m_id_div_container);

            return;
        }

        if (!this.setIdentities())
        {
            return;
        }

    } // init

    // Set the style (m_style) for the icon/label container elements 
    setStyles()
    {
        this.m_style = '';

        if (this.m_horizontal)
        {
            this.m_style = UtilHtml.appendLeftStyle(this.m_style);
        }
        else
        {
            this.m_style = UtilHtml.appendClearStyle(this.m_style);

            this.m_style = UtilHtml.appendOverflowHiddenStyle(this.m_style)
        }

        if (this.m_margin_left.length > 0)
        {
            this.m_style = UtilHtml.appendMarginLeftStyle(this.m_style, this.m_margin_left);
        }

        if (this.m_margin_right.length > 0)
        {
            this.m_style = UtilHtml.appendMarginRightStyle(this.m_style, this.m_margin_right);
        }

        if (this.m_margin_bottom.length > 0)
        {
            this.m_style = UtilHtml.appendMarginBottomStyle(this.m_style, this.m_margin_bottom);
        }

        if (this.m_margin_top.length > 0)
        {
            this.m_style = UtilHtml.appendMarginTopStyle(this.m_style, this.m_margin_top);
        }

        if (this.m_font_size.length > 0)
        {
            this.m_style = UtilHtml.appendFontSizeStyle(this.m_style, this.m_font_size);
        }

        if (this.m_font_color.length > 0)
        {
            this.m_style = UtilHtml.appendFontColorStyle(this.m_style, this.m_font_color);
        }

        if (this.m_font_weight == 'bold')
        {
            this.m_style = UtilHtml.appendFontBoldStyle(this.m_style);
        }

        if (this.m_bg_color.length > 0)
        {
            this.m_style = UtilHtml.appendBackgroundStyle(this.m_style, this.m_bg_color);
        }

        console.log("JazzToolbar.setStyles= " + this.m_style);

    } // setStyles()

    // Set margin left for the icon/label container elements
    setMarginLeft(i_dist_str)
    {
        this.m_margin_left = i_dist_str;

        console.log("JazzToolbar.setMarginLeft m_margin_left= " + this.m_margin_left);

    } // setMarginLeft

    // Set margin right for the icon/label container elements
    setMarginRight(i_dist_str)
    {
        this.m_margin_right = i_dist_str;

    } // setMarginRight

    // Set margin bottom for the icon/label container elements
    setMarginBottom(i_dist_str)
    {
        this.m_margin_bottom = i_dist_str;

    } // setMarginBottom

    // Set margin top for the icon/label container elements
    setMarginTop(i_dist_str)
    {
        this.m_margin_top = i_dist_str;

    } // setMarginTop

    // Set font size
    setFontSize(i_font_size)
    {
        this.m_font_size = i_font_size;

    } // setFontSize

    // Set font color
    setFontColor(i_font_color)
    {
        this.m_font_color = i_font_color;

    } // setFontColor

    // Set font weight
    setFontWeight(i_font_weight)
    {
        this.m_font_weight = i_font_weight;

    } // setFontColor

    // Set label padding
    setLabelPadding(i_label_padding)
    {
        this.m_label_padding = i_label_padding;

    } // setLabelPadding

    // Set background color
    setBackgroundColor(i_bg_color)
    {
        this.m_bg_color = i_bg_color;

    } // setBackgroundColor

     // Set label case: none, left, right, above or below
    setLabelCase(i_label_case)
    {
        if (i_label_case != 'none' && i_label_case != 'left' && i_label_case != 'right' && i_label_case != 'above'  && i_label_case != 'below')
        {
            alert("JazzToolbar.setLabelCase Unvalid case= " + i_label_case);

            return;

        }

        this.m_label_case = i_label_case;

        console.log("JazzToolbar.setLabelCase m_label_case= " + this.m_label_case);

    } // setLabelCase

    // Set flag telling that it shall be a horizontal toolbar
    setHorizontalToTrue()
    {
        this.m_horizontal = true;

    } // setHorizontalToTrue

    // Set flag telling that it shall be a vartical toolbar
    setVerticalToTrue()
    {
        this.m_horizontal = false;

    } // setVerticalToTrue

    // Set font size
    setFontSize(i_font_size)
    {
        this.m_font_size = i_font_size;
    }

    // Set font color
    setFontColor(i_font_color)
    {
        this.m_font_color = i_font_color;

    } // setFontColor

    // Set the identities
    setIdentities()
    {
        var n_elements = this.m_toolbar_data_array.length;

        for (var element_number=1; element_number <= n_elements; element_number++)
        {
            var current_element = this.m_toolbar_data_array[element_number - 1];

            current_element.setId(element_number, this.m_id_my_fctn_str);

            current_element.setDivId(element_number, this.m_id_my_fctn_str);

        } // element_number

        console.log("JazzToolbar.setIdentities Exit");

        return true;

    } // setIdentities
        
    // Add element containers
    addElementContainers()
    {
        var n_elements = this.m_toolbar_data_array.length;

        var container_elements_html = '';

        for (var element_number=1; element_number <= n_elements; element_number++)
        {
            var current_element = this.m_toolbar_data_array[element_number - 1];

            container_elements_html = container_elements_html + this.getContainerDivString(current_element.m_div_id);

        } // element_number

        this.m_el_div_container.innerHTML = container_elements_html;

        console.log("JazzToolbar.addElementContainers Exit");

        return true;

    } // addElementContainers

    // Get the string defining the div for the icon and label element 
    getContainerDivString(id_container_div)
    {
        var ret_str = '<div id= "' + id_container_div + '" style= "' + this.m_style + '" ' + '></div>'

        console.log("JazzToolbar.getContainerDivString Returned string:");
        console.log(ret_str);

        return ret_str;

    } // getContainerDivString

    // Set the identities and create objects
    instantiate()
    {
        console.log("JazzToolbar.instantiate Enter");

        this.setStyles();

        this.addElementContainers();

        var n_elements = this.m_toolbar_data_array.length;

        for (var element_number=1; element_number <= n_elements; element_number++)
        {
            var current_element = this.m_toolbar_data_array[element_number - 1];

            if (current_element.m_class_name == 'JazzIcon')
            {

                current_element.m_object = new JazzIcon(current_element.m_image_url, current_element.m_id,  current_element.m_div_id);

                current_element.m_object.setAlt(current_element.m_image_alt)

                current_element.m_object.setWidth(current_element.m_width);

                current_element.m_object.setHeight(current_element.m_height);

                current_element.m_object.setOnclickFunctionName(current_element.m_onclick_function);

                if (current_element.m_label_text.length > 0)
                {
                    current_element.m_object.setLabelText(current_element.m_label_text);
                }
                else
                {
                    current_element.m_object.setLabelText('&nbsp;');
                }

                current_element.m_object.setTitle(current_element.m_title);

                if (this.m_label_case == 'none')
                {
                    current_element.m_object.setLabelText('');
                }
                else if (this.m_label_case == 'left')
                {
                    current_element.m_object.setLabelTextPositionLeft();

                    current_element.m_object.setLabelPadding(this.m_label_padding);
                }
                else if (this.m_label_case == 'right')
                {
                    current_element.m_object.setLabelTextPositionRight();

                    current_element.m_object.setLabelPadding(this.m_label_padding);
                }
                else if (this.m_label_case == 'above')
                {
                    current_element.m_object.setLabelTextPositionAbove();

                    current_element.m_object.setImagePadding(current_element.m_image_padding);
                }
                else if (this.m_label_case == 'below')
                {
                    current_element.m_object.setLabelTextPositionBelow();

                    current_element.m_object.setImagePadding(current_element.m_image_padding);
                }

                current_element.m_object.setLabelBackgroundColor(this.m_bg_color);

                current_element.m_object.instantiate();
            }
            else
            {
                alert("JazzToolbar.instantiate Not yet an implemented class= " + current_element.m_class_name);

                return false;
            }
        }

        console.log("JazzToolbar.instantiate Exit");

        return true;

    } // instantiate

    // Hide icon
    hideIcon(i_icon_number)
    {
        var current_el = this.getIconElement(i_icon_number);

        if (null == current_el)
        {
            return;
        }

        current_el.style.display = 'none';

    } // hideIcon

    // Display icon
    displayIcon(i_icon_number)
    {
        var current_el = this.getIconElement(i_icon_number);

        if (null == current_el)
        {
            return;
        }

        current_el.style.display = 'block';

    } // hideIcon

    // Hide all icons
    hideAllIconsInheritBackgroundColor()
    {
        var max_index = this.m_toolbar_data_array.length - 1;

        for (var index_icon=0; index_icon <= max_index; index_icon++)
        {
            this.hideIcon(index_icon + 1);
        }

        this.m_el_div_container.style.background = 'inherit';

    } // hideAllIconsInheritBackgroundColor

    // Display all icons and set backgroundcolor
    displayAllIcons()
    {
        var max_index = this.m_toolbar_data_array.length - 1;

        for (var index_icon=0; index_icon <= max_index; index_icon++)
        {
            this.displayIcon(index_icon + 1);
        }

        this.m_el_div_container.style.background = 'black';

    } // displayAllIcons

    // Returns the icon element
    getIconElement(i_icon_number)
    {
        var icon_index = i_icon_number - 1;

        var max_index = this.m_toolbar_data_array - 1;

        if (i_icon_number < 0)
        {
            alert("JazzToolbar.getIconElement Error icon_index= " + icon_index.toString());

            return null;
        }

        if (i_icon_number > max_index)
        {
            alert("JazzToolbar.getIconElement Error icon_index= " + icon_index.toString() + 
                        ' max_index= ' + max_index.toString());

            return null;
        }

        var current_rec = this.m_toolbar_data_array[icon_index];

        var current_id = current_rec.m_div_id;

        var current_el = document.getElementById(current_id);

        return current_el;

    } // getIconElement

} // JazzToolbar