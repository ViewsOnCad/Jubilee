// File: JubileeImage.js
// Date: 2026-02-08
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class creating a jubilee image

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Instance of the class JubileeImageData
var g_jubilee_image_data = null;

// Instance of the class JubileeXml
var g_jubilee_xml = null;

var g_number_horizontal_grid_elements = 15; 

// The identity (a number) of the setTimeout object for the display of the images. 
// This is used to clear the timeout if necessary, e.g. when the user 
// clicks on the jubilee image to stop the display of the images. TODO
var g_set_timeout_object = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeImage ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// This is the main class for the creation of the jubilee image.
// The class is static, i.e. holds only static methods. 
// All data is stored in an instance of class JubileeImageData (g_jubilee_image_data).
class JubileeImage
{
    // Set images. This is the start execution function for the creation of the jubilee image.
    // 1. Get array from local storage and set object PhotoDataList. 
    //    Call of JubileeImage.getArrayFromLocalStorageSetPhotoDataList. The number of photos
    //    is given by the number of grid elements in the JubileeImageData object.
    //    This is a temporary solution. The class will later be implemented in the application
    //    WwwHomepage (the JAZZ live AARAU homepage)
    // 2. Initialize arrays of images if necessary. Call of JubileeLoadImages.initArraysImages.
    // 3. Load array of images. Call of JubileeLoadImages.loadArrayImages.
    static setImages()
    {
        console.log('JubileeImage.setImages: Setting images. This is the start execution function.');

        if (null == g_jubilee_image_data)
        {
            alert('JubileeImage.setImages: JubileeImageData is null');

            return;
        }

        var n_images = g_jubilee_image_data.numberGridElements();

        if (n_images <= 0)
        {
            alert('JubileeImage.setImages: Number of images is less than or equal to zero');

            return;
        }

        if (!JubileeStorage.getArrayFromLocalStorageSetPhotoDataList(n_images))
        {
            return;
        }

        if (!JubileeLoadImages.initArraysImages())
        {
            alert('JubileeImage.setImages: Could not initialize arrays of images');

            return;
        }

        JubileeLoadImages.loadArrayImages();

    } // setImages

    // Callback function after array of images have been loaded
    // 1. Load array of small images. Call of JubileeLoadImages.loadArraySmallImages.
    static arrayImagesLoaded()
    {
        console.log('JubileeImage.arrayImagesLoaded: Array of images has been loaded. ');

        JubileeLoadImages.loadArraySmallImages();

    } // arrayImagesLoaded

    // Callback function after array of small images have been loaded
    // 1. Set load image case to -1 (no loading)
    static arraySmallImagesLoaded()
    {
        console.log('JubileeImage.arraySmallImagesLoaded: Array of small images has been loaded. ');

        g_jubilee_image_data.m_load_image_case = -1;

        g_jubilee_image_data.initDisplayIndex();

        JubileeImage.fullScreen();

    } // arraySmallImagesLoaded

    // Set full screen mode
    static fullScreen()
    {
        var container_el = g_jubilee_image_data.m_container_el;
        // KI UtilDomElement.setElementFullScreen(container_el);

        var b_mobile = UtilDevice.isMobile();

        console.log('Is mobile device= ' + b_mobile);

        if (!UtilDevice. isMobile())
        {
            // TODO Did not work any longer UtilDevice.openFullScreen(container_el);
        }

        JubileeImage.displayYearsRecursively();
        
    } // fullScreen

    // Display all years recursively
    static displayYearsRecursively()
    {
        var next_index = g_jubilee_image_data.getNextDisplayIndex();    

        if (next_index >= 0)
        {
            JubileeImage.displayYear();

            JubileeTimeout.displayYears(JubileeImage.displayYearsRecursively);
        }   
        else
        {
            g_jubilee_image_data.m_load_image_case = -1;

            g_jubilee_image_data.initDisplayIndex();

            JubileeTimeout.displayImages(JubileeImage.displayImagesRecursively); // TODO
        }

    } // displayYearsRecursively

    // Display all images recursively
    static displayImagesRecursively()
    {
        g_jubilee_image_data.m_overlay_text_div_el.style.display = 'block'; 

        var next_index = g_jubilee_image_data.getNextDisplayIndex();

        if (next_index >= 0)
        {
            JubileeImage.displaySmallImage();

            JubileeImage.displayImageText();

             JubileeTimeout.displayImages(JubileeImage.displayImagesRecursively);

        }
        else
        {
            JubileeImage.callbackImagesDisplayed();
        }

    } // displayImagesRecursively 

    // Display the small image
    // 1. Get the current display index. Call of JubileeImageData.getDisplayIndex
    // 2. Get small loaded image from array JubileeImageData.m_loaded_images_small_array
    // 3. Get current GridElement from array JubileeImageData.m_grid_element_array
    // 4. Fit (scale) image, add to container <div> and center <img> in container
    //    Call of UtilImage.fitAddCenterImageInContainer
    static displaySmallImage()
    {
        var index_photo = g_jubilee_image_data.getDisplayIndex();

        var current_small_img_el = g_jubilee_image_data.m_loaded_images_small_array[index_photo];

        var current_grid_element = g_jubilee_image_data.m_grid_element_array[index_photo];

        var scaled_small_img_el = UtilImage.fitAddCenterImageInContainer(current_small_img_el, current_grid_element.m_el);

        if (null == scaled_small_img_el)
        {
            console.log('JubileeImage.displaySmallImage: UtilImage.fitAddCenterImageInContainer failed');

            return;
        }

    } // displaySmallImage

    // Display image and text in overlay <div>
    // 1. Get the current display index. Call of JubileeImageData.getDisplayIndex
    // 2. Get loaded image from array JubileeImageData.m_loaded_images_small_array
    // 3. Get overlay image <div> container: JubileeImageData.m_overlay_image_div_el
    // 4. Fit (scale) image, add to container <div> and center <img> in container
    //    Call of UtilImage.fitAddCenterImageInContainer
    // 5. Get overlay text <div> container: JubileeImageData.m_overlay_text_div_el
    // 6. Get current PhotoData object. 
    //    Call of JubileeImageData.m_list_data_objects.getPhotoData
    static displayImageText()
    {
        var index_photo = g_jubilee_image_data.getDisplayIndex();

        // console.log('JubileeImage.displayImageText:  index_photo= ' + index_photo.toString());

        var current_img_el = g_jubilee_image_data.m_loaded_images_array[index_photo];

        var image_container_div = g_jubilee_image_data.m_overlay_image_div_el;

        

        var scaled_img_el = UtilImage.fitAddCenterImageInContainer(current_img_el, image_container_div);

        if (null == scaled_img_el)
        {
            console.log('JubileeImage.displayImageText: UtilImage.fitAddCenterImageInContainer failed');

            return;
        }

        var text_container_div = g_jubilee_image_data.m_overlay_text_div_el;

        var current_photo_data = g_jubilee_image_data.m_list_data_objects.getPhotoData(index_photo + 1); 

        var concert_text = current_photo_data.getText();

        // Not used var concert_band = current_photo_data.getBand();

        var concert_year = current_photo_data.getYear(); 

        var n_display_years = parseInt(2026 - concert_year);

        var text_htm = concert_text + '<br>' + n_display_years.toString() + ' Jahre her';

        text_container_div.innerHTML = text_htm;

    } // displayImageText

    // Display only the year
    static displayYear()
    {
        var index_photo = g_jubilee_image_data.getDisplayIndex();
        var current_photo_data = g_jubilee_image_data.m_list_data_objects.getPhotoData(index_photo + 1);
        var concert_year = current_photo_data.getYear();
        var n_display_years = parseInt(2026 - concert_year);
        var text_htm = n_display_years.toString();
        var current_grid_el = g_jubilee_image_data.m_grid_element_array[index_photo];
        //QQ var text_container_div = g_jubilee_image_data.m_overlay_text_div_el;
        current_grid_el.m_el.style.textAlign = 'center';

        var font_size_years = parseInt(g_jubilee_image_data.m_element_height / 1.5);

        current_grid_el.m_el.style.fontSize = font_size_years.toString() + 'px';

        current_grid_el.m_el.style.verticalAlign = 'middle';

        current_grid_el.m_el.innerHTML = text_htm;
    } //

    // Callback function when all images and texts have been displayec
    static callbackImagesDisplayed()
    {
        console.log('JubileeImage.callbackImagesDisplayed: All photos displayed. ');

        JubileeImage.displayImagesJubileeText();

    } // callbackImagesDisplayed

    // Display jubilee text in overlay <div>
    static displayImagesJubileeText()
    {
        console.log('JubileeImage.displayImagesJubileeText Enter. ');

         g_jubilee_image_data.m_overlay_image_div_el.style.display = 'none';

        g_jubilee_image_data.m_overlay_text_div_el.style.display = 'none';

        g_jubilee_image_data.m_overlay_jubilee_text_div_el.style.display = 'block';

        JubileeTimeout.toJubileeTextOnly(JubileeImage.displayOnlyJubileeText);

    } // displayImagesJubileeText

    // Display only the jubilee text in overlay <div>
    static displayOnlyJubileeText()
    {
        console.log('JubileeImage.displayOnlyJubileeText Enter. ');

        g_jubilee_image_data.m_overlay_jubilee_text_div_el.style.display = 'block';

        g_jubilee_image_data.hideImagesTextDiv();

    } // displayOnlyJubileeText


} // JubileeImage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeImage //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeTimeout //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// This class holds static methods for the setting of timeouts for the display of images.
// The class is static, i.e. holds only static methods.
// g_set_timeout_object is the identity (a number) of the setTimeout object for the display of the images.
class JubileeTimeout
{
    // Returns timeout for the display of the images
    static images()
    {
        // return 3000; // 3 seconds
        return 70; // Temporarely QQQQQQQQQQQQQQQQQQ

    } // images

    // Returns timeout for the display of the image years
    static imageYears()
    {
        return 50; // 3 seconds
        
    } // imageYears

    // Returns timeout for the waiting time between the display of the years and 
    // the display of the images
    static imageYearsToImages()
    {
        return 1000; // 1 second
        
    } // imageYearsToImages

    // Returns the time to display the jubilee text after all images have been displayed
    static imagesJubileeText()
    {
        return 3000; // 3 seconds

    } // imagesJubileeText

    // Returns the time to display only the jubilee text with no images
    static jubileeTextNoImages()
    {
        return 3000; // 3 seconds

    } // jubileeTextNoImages    

    // Set timeout for the display of the image years
    static displayYears(i_function_name)
    {
        JubileeTimeout.clearTimeout();

        g_set_timeout_object = setTimeout(i_function_name, JubileeTimeout.imageYears());

        console.log('JubileeTimeout.displayYears: Set timeout for the display of the image years. Timeout= ' + 
            JubileeTimeout.imageYears().toString() + ' milliseconds.');

    } // displayYears

        // Set timeout for the display of the jubilee text only
    static toJubileeTextOnly(i_function_name)
    {
        JubileeTimeout.clearTimeout();
        
        g_set_timeout_object = setTimeout(i_function_name, JubileeTimeout.jubileeTextNoImages());
        console.log('JubileeTimeout.toJubileeTextOnly: Set timeout for the display of the jubilee text only. Timeout= ' + 
                JubileeTimeout.jubileeTextNoImages().toString() + ' milliseconds.');
        
    } // toJubileeTextOnly


   // Set timeout for the display of the image years
    static displayImages(i_function_name)
    {
        JubileeTimeout.clearTimeout();

        g_set_timeout_object = setTimeout(i_function_name, JubileeTimeout.images());

    } // displayImages

    /* Not yet used

    // Set timeout for the display of the image years,
    static toDisplayYears(i_function_name)
    {
        JubileeTimeout.clearTimeout();
        
        g_set_timeout_object = setTimeout(i_function_name, JubileeTimeout.imageYearsToImages());
        
    } // toDisplayYears

    // Set timeout for the display of the images i.e when only the years are displayed. 
    static toDisplayImages(i_function_name)
    {
        JubileeTimeout.clearTimeout();

        g_set_timeout_object = setTimeout(i_function_name, JubileeTimeout.images());

    } // toDisplayImages
    */

    // Clear timeout for the display of the images
    static clearTimeout()
    {
        if (null != g_set_timeout_object)
        {
            clearTimeout(g_set_timeout_object);
            g_set_timeout_object = null;
        }
    } // clearTimeout

} // JubileeTimeout



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeTimeout ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


