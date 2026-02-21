// File: JubileeImageData.js
// Date: 2026-02-11
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class holding the data for the creation of a jubilee image. 
// The class is used in the application Jubilee.htm.

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeImageData ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class holding the data for the creation of a jubilee image
class JubileeImageData
{
    constructor(i_container_id)
    {
        ////////////////// Start container div ///////////////////////////

        // ID of the container element for the image
        this.m_container_id = i_container_id;

        // Container element for the image
        this.m_container_el = null;

        // Container width (pixels)
        // Size is calculated by the function ElemDim.allData() 
        // in the function setContainerAttributes.
        this.m_container_width = 0;

         // Container height (pixels)
        // Size is calculated by the function ElemDim.allData() 
        // in the function setContainerAttributes.
        this.m_container_height = 0;   

        ////////////////// End container div ///////////////////////////

        ////////////////// Start display divs //////////////////////////
        
        // Container for the jubilee controls (buttons)
        this.m_cl_div_jubilee_controls = null;

        // Overlay image and text <div> element
        this.m_overlay_image_text_div_el = null;

        // Overlay image <div> element
        this.m_overlay_image_div_el = null;

        // Overlay text <div> element
        this.m_overlay_text_div_el = null;

        // Overlay jubilee text <div> element
        this.m_overlay_jubilee_text_div_el = null;

        ////////////////// End display divs ////////////////////////////
      
        ////////////////// Start grid photos ///////////////////////////

        // Element width (pixels). This is the width of the grid 
        // element <div> that will hold the photo.
        // Size is calculated by the function ElemDim.allData()  
        // Size is set in the function setContainerAttributes.
        this.m_element_width = 120;

        // Element height (pixels). This is the height of the grid 
        // element <div> that will hold the photo.
        // Size is calculated by the function ElemDim.allData()  
        // Size is set in the function setContainerAttributes.
        this.m_element_height = 100;

        // Number of columns
        // Number is calculated by the function ElemDim.allData()  
        // Number is set in the function setContainerAttributes.
        this.m_n_columns = 0;

        // Number of rows
        // Number is calculated by the function ElemDim.allData()  
        // Number is set in the function setContainerAttributes.
        this.m_n_rows = 0;

        ////////////////// End grid photos ///////////////////////////////

        ////////////////// Start photo XML data ///////////////////////////
 
        // XML data object for gallery one
        this.m_gallery_one_xml = null;

        // XML data object object for gallery two
        this.m_gallery_two_xml = null;

        // XML data object for guestbook
        this.m_gustbook_xml = null;

        // XML data object for audience
        this.m_audience_xml = null;

        ////////////////// End photo XML data /////////////////////////////

        ////////////////// Start photo data ///////////////////////////////
        
        // Instance of the class PhotoDataList holding the random photos
        // as an array of PhotoData objects
        this.m_list_data_objects = null;

        // Array of GridElement objects corresponding to m_list_data_objects
        this.m_grid_element_array = null;

        // Array of loaded images
        this.m_loaded_images_array = null;

        // Array of loaded small images
        this.m_loaded_images_small_array = null;

        // Load image case
        // 0: Load images
        // 1: Load small images
        this.m_load_image_case = -1;

        ////////////////// End photo data /////////////////////////////////

        // Index for the display of photo, text and small photo
        this.m_display_index = -12345;

        // Initialize
        this.init();
       
    } // constructor

    // Initialize
    // 1. Set container attributes. Call of setContainerAttributes.
    // 2. Set attributes for the jubilee controls (buttons). 
    //    Call of setJubileeControlsAttributes.
    // 3. Set grid attributes. Call of setGridAttributes.
    // 4. Create grid elements. Call of createGridElements.
    // 5. Create overlay image and text <div> element. 
    //    Call of createOverlayImageTextDiv.
    init()
    {
        if (!this.setContainerAttributes())
        {
            return false;
        }

        if (!this.setJubileeControlsAttributes())
        {
            return false;
        }

        if (!this.setGridAttributes())
        {
            return false;
        }

        if (!this.createGridElements())
        {
            return false;
        }  

        if (!this.createOverlayImageTextDiv())
        {
            return false;
        }

    } // init

    ////////////////// Start container div functions //////////////////

    // Get the container element for the jubilee image
    getContainerElement()
    {
        return this.m_container_el; 

    } // getContainerElement

    // Get width of the container element for the jubilee image
    getWidthContainer()
    {   
        return this.m_container_width;

    } // getWidthContainer

    // Get height of the container element for the jubilee image
    getHeightContainer()
    {
        return this.m_container_height;

    } // getHeightContainer

    // Set width of the container element for the jubilee image
    setWidthContainer(i_width)
    {   
        this.m_container_width = i_width;

    } // setWidthContainer

    // Set height of the container element for the jubilee image
    setHeightContainer(i_height)
    {
        this.m_container_height = i_height;

    } // setHeightContainer

    ////////////////// End container div functions ////////////////////

    ////////////////// Start display divs functions //////////////////


    // Get container for the jubilee controls (buttons)
    getJubileeControlsContainer()
    {
        return this.m_cl_div_jubilee_controls;  
        
    } // getJubileeControlsContainer
    
    // Get overlay image and text <div> element
    getOverlayImageTextDiv()
    {
        return this.m_overlay_image_text_div_el;

    }  // getOverlayImageTextDiv


    // Get overlay image <div> element
    getOverlayImageDiv()
    {
        return this.m_overlay_image_div_el; 

    } // getOverlayImageDiv

    // Get overlay text <div> element
    getOverlayTextDiv(i_overlay_text_div_el)
    {
        return this.m_overlay_text_div_el;  
    } // getOverlayTextDiv

    // Get overlay jubilee text <div> element
    getOverlayJubileeTextDiv()
    {
        return this.m_overlay_jubilee_text_div_el;  

    } // getOverlayJubileeTextDiv

    // Get container for the jubilee controls (buttons)
    getJubileeControlsContainer()
    {
        return this.m_cl_div_jubilee_controls;  
        
    } // getJubileeControlsContainer
    
    // Set overlay image and text <div> element
    setOverlayImageTextDiv(i_overlay_image_text_div_el)
    {
        this.m_overlay_image_text_div_el = i_overlay_image_text_div_el;

    }  // setOverlayImageTextDiv

    // Set overlay image <div> element
    setOverlayImageDiv(i_overlay_image_div_el)
    {
        this.m_overlay_image_div_el = i_overlay_image_div_el;

    } // setOverlayImageDiv

    // Set overlay text <div> element
    setOverlayTextDiv(i_overlay_text_div_el)
    {
        this.m_overlay_text_div_el = i_overlay_text_div_el;
    } // setOverlayTextDiv

    // Set overlay jubilee text <div> element
    setOverlayJubileeTextDiv(i_overlay_jubilee_text_div_el)
    {
        this.m_overlay_jubilee_text_div_el = i_overlay_jubilee_text_div_el;

    } // setOverlayJubileeTextDiv

    ////////////////// End display divs functions ////////////////////

    ////////////////// Start display index functions //////////////////
    
    // Set display index to start value undefined: A negative value
    initDisplayIndex()
    {
        this.m_display_index = -1;

    } // initDisplayIndex

    // Get the current display index
    getDisplayIndex()
    {
        return this.m_display_index;

    } // getDisplayIndex

    // Returns the next display index value. 
    // Returns a negative value when all is displayed
    // This function may be changed to return a random index value
    getNextDisplayIndex()
    {
        var n_photo_data = this.m_list_data_objects.getNumberOfPhotos();

        if (this.m_display_index < 0)
        {
            this.m_display_index = 0;
        }
        else
        {
            this.m_display_index = this.m_display_index + 1;

            if (this.m_display_index == n_photo_data)
            {
                this.initDisplayIndex();
            }
        }

        return this.m_display_index;

    } // getNextDisplayIndex

    ////////////////// End display index functions ////////////////////

    // Set container attributes 
    // 1. Member variables m_container_el, m_container_width, m_container_height
    //    are set from the input <div> container element (m_container_el) with
    //    functions clientWidth and clientHeight.
    setContainerAttributes()
    {
        this.m_container_el = document.getElementById(this.m_container_id);

        if (null == this.m_container_el)
        {
            alert('JubileeImageData.setContainerAttributes: Container element is null for id= ' + this.m_container_id);

            return false;
        }

        this.setWidthContainer(ElemDim.widthContainer());

        this.setHeightContainer(ElemDim.heightContainer());

        console.log('setContainerAttributes Container width= ' + this.getWidthContainer() + ' height= ' + this.getHeightContainer());

        this.m_element_width =  ElemDim.widthGridImage();
        this.m_element_height = ElemDim.heightGridImage();

        console.log('Element width= ' + this.m_element_width + ' height= ' + this.m_element_height);

        return true;

    } // setContainerAttributes

    // Set attributes for the jubilee controls (buttons)
    setJubileeControlsAttributes()
    {
        this.m_cl_div_jubilee_controls = document.getElementById('id_div_jubilee_controls');    

        if (null == this.m_cl_div_jubilee_controls)        {
            alert('JubileeImageData.setJubileeControlsAttributes: Jubilee controls container element is null for id= ' 
                + 'id_div_jubilee_controls');
            return false;
        }   

        this.m_cl_div_jubilee_controls.style.width = ElemDim.widthContainer() + 'px';
 
        return true;

    } // setJubileeControlsAttributes

    // Set grid attributes
    // 1. Member variables m_n_columns and m_n_rows are set from the container
    //    width and height and the element width and height.
    // 2. Container element style is set to grid with the correct number of
    //    columns and rows.
    setGridAttributes()
    {     
        this.m_container_el.style.display = 'grid';

        this.m_n_columns = ElemDim.numberColumns();

        this.m_n_rows = ElemDim.numberRows();

        console.log('Number of columns= ' + this.m_n_columns + ' rows= ' + this.m_n_rows + 
            ' total elements= ' + this.numberGridElements()  );

        this.m_container_el.style.gridTemplateColumns = 'repeat(' + this.m_n_columns + ', ' + this.m_element_width + 'px)';

        this.m_container_el.style.gridTemplateRows = 'repeat(' + this.m_n_rows + ', ' + this.m_element_height + 'px)';

        return true;

    } // setGridAttributes

    // Create grid <div> elements and GridElement objects
    // Member variable m_grid_element_array is created as an array of
    // GridElement objects.
    createGridElements()
    {   
        this.m_grid_element_array = [];

        for (var i_row=0; i_row < this.m_n_rows; i_row++)
        {
            for (var i_col=0; i_col < this.m_n_columns; i_col++)
            {
                var element_id = 'id_' + i_row + '_' + i_col;

                var el_div = document.createElement('div'); 
                el_div.style.width = this.m_element_width + 'px';
                el_div.style.height = this.m_element_height + 'px';
                el_div.id = element_id;
                //el_div.innerHTML = element_id;
                el_div.style.backgroundColor = 'black';   
                el_div.style.color = 'white';  
                el_div.style.border = 'solid 1px white';   

                this.m_container_el.appendChild(el_div);

                var grid_element = new GridElement(element_id, el_div,i_row, i_col);

                this.m_grid_element_array.push(grid_element);

            } // i_col

        } // i_row


        return true;

    } // createGridElements

    // Get total number of grid elements
    numberGridElements()
    {
        return this.m_n_columns * this.m_n_rows;   

    } // numberGridElements

    createOverlayDivs()
    {
        var overlay_image_text_div_el = this.createOverlayImageTextDiv();
        if (null == overlay_image_text_div_el)
        {
            alert('JubileeImageData.createOverlayDivs: Overlay image and text <div> element is null');
            return false;
        }
       
        setOverlayImageTextDiv(overlay_image_text_div_el);
       

    } // createOverlayDivs

    // Creates the div for the big photo inside the overlay div for this div and the text div
    creatOverlayImageDiv(i_overlay_image_text_div_el)
    {
          this.m_overlay_image_div_el = document.createElement('div'); 

         this.m_overlay_image_div_el.style.width = '99%';
         this.m_overlay_image_div_el.style.height = '69%';
         //this.m_overlay_image_div_el.style.border = 'solid 1px white';

        i_overlay_image_text_div_el.appendChild(this.m_overlay_image_div_el);

    } // creatOverlayImageDive

    // Create overlay image and text <div> element 
    createOverlayImageTextDiv()
    {
        // This is the width and height of the input div container for the grid (clientWidh, clientHeight)
        console.log("JubileeImageData.createOverlayImageTextDiv Container width=  " + this.m_container_width);
        console.log("JubileeImageData.createOverlayImageTextDiv Container height= " + this.m_container_height);

        this.m_overlay_image_text_div_el = document.createElement('div'); 

        this.m_overlay_image_text_div_el.id = 'id_jubilee_overlay_image_div';

        var div_width = parseInt(this.m_container_width*0.7);
        var div_height = parseInt(this.m_container_height*0.8);
        var left_coord = parseInt((this.m_container_width * 0.2));
        var top_coord = parseInt((this.m_container_height*0.2));

        console.log("JubileeImageData.createOverlayImageTextDiv div_width=   " + div_width);
        console.log("JubileeImageData.createOverlayImageTextDiv div_height=  " + div_height);
        console.log("JubileeImageData.createOverlayImageTextDiv left_coord=  " + left_coord);
        console.log("JubileeImageData.createOverlayImageTextDiv top_coord=   " + top_coord);



        this.m_overlay_image_text_div_el.style.position = 'absolute';   
        this.m_overlay_image_text_div_el.style.top = top_coord + 'px';
        this.m_overlay_image_text_div_el.style.left = left_coord +'px';
        this.m_overlay_image_text_div_el.style.width = div_width + 'px';
        this.m_overlay_image_text_div_el.style.height = div_height + 'px';
        this.m_overlay_image_text_div_el.style.zIndex = '10'; 
        
        //this.m_overlay_image_text_div_el.style.border = 'solid 2px yellow';
        //this.m_overlay_image_text_div_el.style.display = 'none'; // Initially hidden
        this.m_overlay_image_text_div_el.style.display = 'block'; // Initially displayed

        this.m_container_el.appendChild(this.m_overlay_image_text_div_el);


         this.m_overlay_image_div_el = document.createElement('div'); 

         this.m_overlay_image_div_el.style.width = '99%';
         this.m_overlay_image_div_el.style.height = '69%';
         //this.m_overlay_image_div_el.style.border = 'solid 1px white';

        this.m_overlay_image_text_div_el.appendChild(this.m_overlay_image_div_el);


        this.m_overlay_text_div_el = document.createElement('div');
        this.m_overlay_text_div_el.style.marginTop = '1%';
        this.m_overlay_text_div_el.style.width = '99%';
        this.m_overlay_text_div_el.style.height = '22%';
        //this.m_overlay_text_div_el.style.border = 'solid 1px white';
        this.m_overlay_text_div_el.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

        var font_size_text_image = parseInt(div_width / 25.0);

        this.m_overlay_text_div_el.style.color = 'white';
        this.m_overlay_text_div_el.style.fontSize = font_size_text_image.toString() + 'px';
        this.m_overlay_text_div_el.style.textAlign = 'center';

        this.m_overlay_image_text_div_el.style.zIndex = '5'; 

        this.m_overlay_text_div_el.style.display = 'none'; // Initially hidden
        // this.m_overlay_text_div_el.innerHTML = 'Overlay text goes here.';

        

        this.m_overlay_image_text_div_el.appendChild(this.m_overlay_text_div_el);

        var font_size_jubilee_text = parseInt(div_width / 9.0);

        this.m_overlay_jubilee_text_div_el = document.createElement('div');
        //this.m_overlay_jubilee_text_div_el.style.marginTop = '1%';
        this.m_overlay_jubilee_text_div_el.style.width = '99%';
        this.m_overlay_jubilee_text_div_el.style.height = '70%';    
        // this.m_overlay_jubilee_text_div_el.style.border = 'solid 2px yellow';  
        this.m_overlay_jubilee_text_div_el.style.color = 'red';
        this.m_overlay_jubilee_text_div_el.style.fontSize = font_size_jubilee_text.toString() +  'px'; 
        this.m_overlay_jubilee_text_div_el.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        this.m_overlay_jubilee_text_div_el.style.textAlign = 'center';
        this.m_overlay_jubilee_text_div_el.style.zIndex = '20'; 
        this.m_overlay_jubilee_text_div_el.style.display = 'none'; // Initially hidden
        var text_htm = 'JAZZ <i>live</i> AARAU<br><br>30 Jahre';
        this.m_overlay_jubilee_text_div_el.innerHTML = text_htm;

        this.m_overlay_image_text_div_el.appendChild(this.m_overlay_jubilee_text_div_el);


        return this.m_overlay_image_text_div_el;

    } // createOverlayImageTextDiv

    // Functions to hide and display the overlay image and text <div>
    hideImagesTextDiv()
    {
        this.m_overlay_image_text_div_el.style.display = 'none';
        
    } // hideImagesTextDiv

    // Functions to hide and display the overlay image and text <div>
    displayImagesTextDiv()
    {
        this.m_overlay_image_text_div_el.style.display = 'block';

    } // displayImagesTextDiv

} // JubileeImageData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeImageData //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


