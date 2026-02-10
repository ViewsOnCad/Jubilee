// File: ElemDim.js
// Date: 2026-02-10
// Author: Gunnar Lidén

// Inhalt
// =============
//
// / Class for the preloading of images. They are added to the DOM but not displayed.

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class ElemDim /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for the dimensions of the grid elements. The dimensions are based on the screen 
// width and height and the number of grid elements. The class is static, i.e. holds only 
// static methods.
class ElemDim
{
    // Returns instance of ElemDimData that contains all dimension ata for the grid elements. 
    // The data are based on the screen width and height and the number of grid elements.
    static allData()
    {
        var dim_data = new ElemDimData();

        var number_horizontal = ElemDim.numberHorizontal();

        var input_screen_width = UtilDevice.screenWidth();

        var input_screen_height = UtilDevice.screenHeight();

        var container_margin = ElemDim.containerMargin();

        var width_container = input_screen_width * (100 - 2*container_margin) / 100;

        width_container = parseInt(width_container);

        var height_controls = ElemDim.heightJubileeControlsDiv();

        height_controls = 0; // TODO

        console.log('ElemDim.allData: height_controls= ' + height_controls);

        var height_container = (input_screen_height - height_controls) * (100 - 2*container_margin) / 100;

        height_container = parseInt(height_container);

        var rel_wh = ElemDim.heightRelativeToWidth();

        var width_el = width_container / number_horizontal;

        var height_el = width_el * rel_wh;

        var number_vertical = Math.floor(height_container / height_el);
           
        var number_grid_elements = number_horizontal * number_vertical;

        width_el = parseInt(width_el);

        height_el = parseInt(height_el);

        dim_data.m_number_grid = number_grid_elements;
        dim_data.m_width_grid_image = width_el;
        dim_data.m_height_grid_image = height_el;
        dim_data.m_number_horizontal = number_horizontal;
        dim_data.m_number_vertical = number_vertical;
        dim_data.m_width_container = width_container;
        dim_data.m_height_container = height_container;

        //console.log('ElemDim.allData: width_container= ' + width_container + ' height_container= ' + height_container +
        //            ' width_el= ' + width_el + ' height_el= ' + height_el);

        //console.log('ElemDim.allData: number_horizontal= ' + number_horizontal + ' number_vertical= ' + number_vertical);

        return dim_data;

    } // allData

    // Get number of horizontal grid elements. 
    // This is input data for the calculation
    static numberHorizontal()
    {
       return g_number_horizontal_grid_elements;

    } // numberHorizontal

    // Returns the total number of grid elements. 
    // this is input data for the calculation
    static numberGridElements()
    {
        var dim_data = ElemDim.allData();

        return dim_data.m_number_grid;
        
    } // numberGridElements

    // Returns the margin of the container for the grid elements. 
    // This is input data for the calculation
    // Returned as percentage value 
    static containerMargin()
    {
        return 1; 

    } // containerMargin


    // Returns the height relative to width for the grid elements.
    // This is input data for the calculation. 
    static heightRelativeToWidth()
    {        
        return 0.89;

    } // heightRelativeToWidth

    // Get width of the container for the grid elements.
    static widthContainer()
    {   
         var dim_data = ElemDim.allData();  

        return dim_data.m_width_container;

    } // widthContainer

    // Get width of the container for the grid elements. The dimensions are based 
    // on the screen width.
    static heightContainer()
    {   
        var dim_data = ElemDim.allData();

        return dim_data.m_height_container;

    } // heightContainer

    // Get width of the grid elements for the small images.
    static widthGridImage()
    {
        var dim_data = ElemDim.allData();

        return dim_data.m_width_grid_image;

    } // widthGridImage
    
    // Get height of the grid elements for the small images.
    static heightGridImage()
    {
        var dim_data = ElemDim.allData();

        return dim_data.m_height_grid_image;

    } // heightGridImage

    // Get number of rows for the grid elements. 
    static numberRows()
    {
        var dim_data = ElemDim.allData();

        return dim_data.m_number_vertical;

    } // numberRows

    // Get number of columns for the grid elements. 
    static numberColumns()
    {       
        var dim_data = ElemDim.allData();

        return dim_data.m_number_horizontal;    

    } // numberColumns

    // Get height of the container for the container div for the jubilee controls.
    static heightJubileeControlsDiv()
    {
        var controls_div_exit_el = document.getElementById('id_div_jubilee_controls_exit');
        if (controls_div_exit_el)
        {
            return controls_div_exit_el.offsetHeight;
        }

        return 0;

    }  // heightJubileeControlsDiv

} // ElemDim

class ElemDimData
{
    constructor(i_number_grid)
    {
        // Number of grid elements
        this.m_number_grid = i_number_grid; 

        // Width of the grid element
        this.m_grid_element_width = -12345;

        // Height of the grid element
        this.m_grid_element_height = -12345;

        // Number of horizontal grid elements
        this.m_number_horizontal = -12345;  

        // Number of vertical grid elements
        this.m_number_vertical = -12345; 

        // Width of the container for the grid elements
        this.m_width_container = -12345;

        // Height of the container for the grid elements
        this.m_height_container = -12345;

    } // constructor

} // class ElemDimData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class ElemDimData ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



