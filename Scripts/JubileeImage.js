// File: JubileeImage.js
// Date: 2026-02-06
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

        JubileeImage.getArrayFromLocalStorageSetPhotoDataList(n_images);

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
            
            setTimeout(JubileeImage.displayYearsRecursively, 50);
        }   
        else
        {
            g_jubilee_image_data.m_load_image_case = -1;

            g_jubilee_image_data.initDisplayIndex();

            setTimeout(JubileeImage.displayImagesRecursively, 3000);
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

            var timeout_seconds = g_jubilee_image_data.getDisplaySleepTime();

            setTimeout(JubileeImage.displayImagesRecursively, timeout_seconds);

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

    // Display image and text in ovelay <div>
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

        JubileeImage.displayJubileeText();

    } // callbackImagesDisplayed

    // Display jubilee text in overlay <div>
    static displayJubileeText()
    {
        console.log('JubileeImage.displayJubileeText Enter. ');

         g_jubilee_image_data.m_overlay_image_div_el.style.display = 'none';

        g_jubilee_image_data.m_overlay_text_div_el.style.display = 'none';

        g_jubilee_image_data.m_overlay_jubilee_text_div_el.style.display = 'block';

    } // displayJubileeText


    // Get array from local storage and set object PhotoDataList(temporary solution)
    // i_n_photos: Number of PhotoData objects to set
    static getArrayFromLocalStorageSetPhotoDataList(i_n_photos)
    {
        var key_jubilee_photo_urls = 'key_jubilee_photo_urls';

        var key_jubilee_small_photo_urls = 'key_jubilee_small_photo_urls';

        var key_jubilee_band_names = 'key_jubilee_band_names';

        var key_jubilee_years = 'key_jubilee_years';

        var key_jubilee_texts = 'key_jubilee_texts';

         var jubilee_photo_urls = [];

        var jubilee_small_photo_urls = [];

        var jubilee_band_names = [];

        var jubilee_years = [];

        var jubilee_texts = [];

        var jubilee_photo_urls_string = localStorage.getItem(key_jubilee_photo_urls);

        if (null != jubilee_photo_urls_string)
        {
            jubilee_photo_urls = JSON.parse(jubilee_photo_urls_string);
        }

        var jubilee_small_photo_urls_string = localStorage.getItem(key_jubilee_small_photo_urls);

        if (null != jubilee_small_photo_urls_string)
        {
            jubilee_small_photo_urls = JSON.parse(jubilee_small_photo_urls_string);
        }

        var jubilee_band_names_string = localStorage.getItem(key_jubilee_band_names);

        if (null != jubilee_band_names_string)
        {
            jubilee_band_names = JSON.parse(jubilee_band_names_string);
        }

        var jubilee_years_string = localStorage.getItem(key_jubilee_years);

        if (null != jubilee_years_string)
        {
            jubilee_years = JSON.parse(jubilee_years_string);
        }

        var jubilee_texts_string = localStorage.getItem(key_jubilee_texts);

        if (null != jubilee_texts_string)
        {
            jubilee_texts = JSON.parse(jubilee_texts_string);
        }

        console.log('JubileeImage.getArrayFromLocalStorageSetPhotoDataList: Number of photo URLs= ' + jubilee_photo_urls.length +
            ' number of small photo URLs= ' + jubilee_small_photo_urls.length);

        if (jubilee_photo_urls.length < i_n_photos || jubilee_small_photo_urls.length < i_n_photos)
        {
            alert('JubileeImage.getArrayFromLocalStorageSetPhotoDataList: Not enough images in local storage');

            return;
        }

        g_jubilee_image_data.m_list_data_objects = new PhotoDataList();

        for (var index_url=0; index_url < i_n_photos; index_url++)
        {
            var add_one_up = '../';

            var photo_url_full = add_one_up + jubilee_photo_urls[index_url];
            var photo_data = new PhotoData(photo_url_full);

            var photo_url_small = add_one_up + jubilee_small_photo_urls[index_url];
            
            photo_data.setUrlSmall(photo_url_small);

            var band_name = jubilee_band_names[index_url];

            var concert_year = jubilee_years[index_url];

            var text_info = jubilee_texts[index_url];

            photo_data.setBand(band_name);

            photo_data.setYear(concert_year); 

            photo_data.setText(text_info);

            g_jubilee_image_data.m_list_data_objects.appendPhotoData(photo_data);

            g_jubilee_image_data.m_grid_element_array[index_url].setPhotoData(photo_data);
        }

        var n_photos = g_jubilee_image_data.m_list_data_objects.getNumberOfPhotos();

        console.log('JubileeImage.getArrayFromLocalStorageSetPhotoDataList: Number of set PhotoData objects= ' + n_photos);

    } // getArrayFromLocalStorageSetPhotoDataList

} // JubileeImage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeImage //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeLoadImages ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for the preloading of images. They are added to the DOM but not displayed.
// The class is static, i.e. holds only static methods. This is necessary for the recursive 
// loading of images which is based on callback functions.
// All data is stored in an instance of class JubileeImageData (g_jubilee_image_data).
// The JubileeImageData instance holds two arrays of loaded images:
// m_loaded_images_array and m_loaded_small_images_array.
class JubileeLoadImages
{
    static initArraysImages()
    {
        if (null == g_jubilee_image_data)
        {
            alert('JubileeImage.initArraysImages: JubileeImageData is null');

            return false;
        }

        if (null == g_jubilee_image_data.m_list_data_objects)
        {
            alert('JubileeImage.initArraysImages: PhotoDataList is null');

            return false;
        }

        if (null != g_jubilee_image_data.m_loaded_images_array && null != g_jubilee_image_data.m_loaded_images_small_array)
        {
            JubileeLoadImages.deleteArraysImages();
        }

        g_jubilee_image_data.m_loaded_images_array = [];

        g_jubilee_image_data.m_loaded_images_small_array = [];

        return true;

    } // initArraysImages

    // Delete arrays of images. The image elements are removed from the DOM
    static deleteArraysImages()
    {
        JubileeLoadImages.deleteArrayImages();

        JubileeLoadImages.deleteArraySmallImages();

    } // deleteArraysImages

     // Delete array of images. The image elements are removed from the DOM
    static deleteArrayImages()
    {
         if (null == g_jubilee_image_data.m_loaded_images_array)
         {
            console.log('JubileeLoadImages.deleteArrayImages: Loaded images array is null');

             return;
         }

         var n_images = g_jubilee_image_data.m_loaded_images_array.length;

        if (n_images == 0)
        {   
            console.log('JubileeLoadImages.deleteArrayImages: Number of loaded images is equal to zero');

            return;
        }

        for (var index_image=0; index_image < n_images; index_image++)
        {
            var current_img_el = g_jubilee_image_data.m_loaded_images_array[index_image];

            current_img_el.remove;
           
        }

        g_jubilee_image_data.m_loaded_images_array = null;

    } // deleteArrayImages

    // Delete array of small images. The image elements are removed from the DOM
    static deleteArraySmallImages()
    {
          if (null == g_jubilee_image_data.m_loaded_small_images_array)
         {
            console.log('JubileeLoadImages.deleteArraySmallImages: Loaded small images array is null');

             return;
         }

         var n_images = g_jubilee_image_data.m_loaded_small_images_array.length;

        if (n_images == 0)
        {   
            console.log('JubileeLoadImages.deleteArraySmallImages: Number of loaded small images is equal to zero');    
            return;
        }

        for (var index_image=0; index_image < n_images; index_image++)
        {
            var current_small_img_el = g_jubilee_image_data.m_loaded_small_images_array[index_image];

            current_small_img_el.remove;
           
        }

        g_jubilee_image_data.m_loaded_small_images_array = null;

    } // deleteArraySmallImages


    static loadArrayImages()
    {
        g_jubilee_image_data.m_load_image_case = 0;

        console.log('JubileeLoadImages.loadArrayImages: Loading images Case= ' + g_jubilee_image_data.m_load_image_case );

        JubileeLoadImages.loadImages();

    } // loadArrayImages

    static loadArraySmallImages()
    {
        g_jubilee_image_data.m_load_image_case = 1;

        console.log('JubileeLoadImages.loadArrayImages: Loading small images Case= ' + g_jubilee_image_data.m_load_image_case );

        JubileeLoadImages.loadImages();

    } // loadArraySmallImages

    // Load images with this recursive function
    static loadImages()
    {
        var current_index = JubileeLoadImages.getNextIndex();

        var current_photo_data_number = current_index + 1;

        var n_photo_data = g_jubilee_image_data.m_list_data_objects.getNumberOfPhotos();

       if (current_photo_data_number <= n_photo_data)
        {
            var current_photo_data = g_jubilee_image_data.m_list_data_objects.getPhotoData(current_photo_data_number);

            var current_url = '';

            if (g_jubilee_image_data.m_load_image_case == 0)
            {
                current_url = current_photo_data.getUrl();
            }
            else if (g_jubilee_image_data.m_load_image_case == 1)
            {
                current_url = current_photo_data.getUrlSmall();
            }

            // console.log('JubileeLoadImages.loadImages: Loading image ' + current_photo_data_number + ' URL= ' + current_url);

            var current_img = document.createElement('img');

            if (g_jubilee_image_data.m_load_image_case == 0)
            {
                g_jubilee_image_data.m_loaded_images_array.push(current_img);
            }
            else if (g_jubilee_image_data.m_load_image_case == 1)
            {
                g_jubilee_image_data.m_loaded_images_small_array.push(current_img);
            }

            current_img.onload = JubileeLoadImages.oneImageLoaded;

            current_img.onerror = JubileeLoadImages.oneImageLoadFailure;

            current_img.src = current_url;           
        } // current_photo_data_number <= n_photo_data
        else
        {
            console.log('JubileeLoadImages.loadImages: End of recursive calls. Exit condition met. ');

            JubileeLoadImages.imagesLoaded();

        } // current_photo_data_number > n_photo_data

    } // loadImages

    // Get next index for loading image
    static getNextIndex()
    {
        var next_index = -1;

        if (g_jubilee_image_data.m_load_image_case == 0)
        {
            next_index = g_jubilee_image_data.m_loaded_images_array.length ;
        }   
        else if (g_jubilee_image_data.m_load_image_case == 1)
        {
            next_index = g_jubilee_image_data.m_loaded_images_small_array.length;
        }   

        return next_index;

    } // getNextIndex

    // One image has been loaded
    static oneImageLoaded()
    {
        var current_index = JubileeLoadImages.getNextIndex() - 1;

        // console.log('JubileeLoadImages.oneImageLoaded: One image has been loaded. Array index= ' + current_index);
    
        JubileeLoadImages.loadImages();

    } // oneImageLoaded

    // One image has been loaded
    static oneImageLoadFailure()
    {
        console.log('JubileeLoadImages.oneImageLoadFailure: One image has failed to load.');

        alert('JubileeLoadImages.oneImageLoadFailure: One image has failed to load.');

    } // oneImageLoadFailure

    // All images have been loaded
    static imagesLoaded()
    {
        console.log('JubileeLoadImages.imagesLoaded: Images for the current case have been loaded.');

        if (g_jubilee_image_data.m_load_image_case == 0)
        {
            JubileeImage.arrayImagesLoaded();
        }
        else if (g_jubilee_image_data.m_load_image_case == 1)
        {
            JubileeImage.arraySmallImagesLoaded();
        }
        else
        {
            alert('JubileeLoadImages.imagesLoaded: Unknown load image case= ' + g_jubilee_image_data.m_load_image_case);
        }   

    } // imagesLoaded

}  // JubileeLoadImages

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeLoadImages /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class GridElement /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


class GridElement
{
    constructor(i_id, i_el, i_index_row, i_index_col)
    {
        // ID of the grid element
        this.m_id = i_id;

        // Grid element object
        this.m_el = i_el;

        // Index of the row
        this.m_index_row = i_index_row;

        // Index of the column
        this.m_index_col = i_index_col;

        // Instance of the class PhotoData
        this.m_photo_data = null;

    } // constructor

    // Set the photo data object
    setPhotoData(i_photo_data)
    {
        this.m_photo_data = i_photo_data;

    } // setPhotoData

    // Initialize TODO Remove
    init()
    {
        var div_el = document.getElementById(this.m_id);

        if (null == div_el)
        {
            alert('GridElement.init: Element is null for id= ' + this.m_id);    
            
            return false;
        }

        return true;

    } // init

} // GridElement

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class GridElement ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for the dimensions of the grid elements. The dimensions are based on the screen 
// width and height and the number of grid elements. The class is static, i.e. holds only 
// static methods.
class ElemDim
{
    static numberElements()
    {
        return 14;

    } // numberElements

    static heightRelativeToWidth()
    {        
        return 0.83;

    } // heightRelativeToWidth

    // Get width of the container for the grid elements. The dimensions are based 
    // on the screen width.
    static widthContainer()
    {   
        var screen_width = UtilDevice.screenWidth();

        return screen_width;

    } // widthContainer

    // Get width of the container for the grid elements. The dimensions are based 
    // on the screen width.
    static heightContainer()
    {   
        var screen_height = UtilDevice.screenHeight();

        return screen_height;

    } // heightContainer

    // Get width and height of the grid elements for the small images. The dimensions 
    // are based on the screen width and height and the number of grid elements.
    static widthHeightGridlImage()
    {
        var dinensions_ret = [];

        var screen_width = ElemDim.widthContainer();
        var screen_height = ElemDim.heightContainer();

        var element_width = screen_width * 0.98 / ElemDim.numberElements();

        var element_height = element_width * ElemDim.heightRelativeToWidth();

        dinensions_ret.push(element_width);
        dinensions_ret.push(element_height);

        return dinensions_ret;

    } // widthHeightGridlImage

    // Get width of the grid elements for the small images. The dimensions 
    // are based on the screen width and height and the number of grid elements.
    static widthGridImage()
    {
        var grid_elemnt_dims = ElemDim.widthHeightGridlImage();

        return parseInt(grid_elemnt_dims[0]);

    } // widthGridImage
    
    // Get height of the grid elements for the small images. The dimensions 
    // are based on the screen width and height and the number of grid elements.
    static heightGridImage()
    {
        var grid_elemnt_dims = ElemDim.widthHeightGridlImage();

        return parseInt(grid_elemnt_dims[1]);

    } // heightGridImage

    // Get number of rows for the grid elements. The dimensions are based on 
    // the screen height and the element height.
    static numberRows()
    {
        var screen_height = ElemDim.heightContainer();
        var grid_elemnt_dims = ElemDim.widthHeightGridlImage();
        var element_height = grid_elemnt_dims[1];

        return Math.floor(screen_height / element_height);

    } // numberRows

    // Get number of columns for the grid elements. The dimensions are based on 
    // the screen width and the element width.
    static numberColumns()
    {       
        var screen_width = ElemDim.widthContainer();
        var grid_elemnt_dims = ElemDim.widthHeightGridlImage();
        var element_width = grid_elemnt_dims[0];

        return Math.floor(screen_width / element_width);

    } // numberColumns

} // ElemDim

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeImageData ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class JubileeImageData
{
    constructor(i_container_id)
    {
        // ID of the container element for the image
        this.m_container_id = i_container_id;

        // Element width (pixels) 
        this.m_element_width = 4*42;

        // Element height (pixels)
        this.m_element_height = 4*35;

        // Number of columns
        this.m_n_columns = 0;

        // Number of rows
        this.m_n_rows = 0;

        // XML data object for gallery one
        this.m_gallery_one_xml = null;

        // XML data object object for gallery two
        this.m_gallery_two_xml = null;

        // XML data object for guestbook
        this.m_gustbook_xml = null;

        // XML data object for audience
        this.m_audience_xml = null;

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

        // Container element for the image
        this.m_container_el = null;

        // Container width (pixels)
        this.m_container_width = 0;

         // Container height (pixels)
        this.m_container_height = 0;   

        // Overlay image and text <div> element
        this.m_overlay_image_text_div_el = null;

        // Overlay image <div> element
        this.m_overlay_image_div_el = null;

        // Overlay text <div> element
        this.m_overlay_text_div_el = null;

        // Overlay jubilee text <div> element
        this.m_overlay_jubilee_text_div_el = null;

        // Index for the display of photo, text and small photo
        this.m_display_index = -12345;

        // Number of milliseconds that photo and text will be displayed
        // on the overlay <div> 
        this.m_display_sleep_time = 5000;
        // this.m_display_sleep_time = 100; 
        

        // Initialize
        this.init();
       
    } // constructor

    // Initialize
    // 1. Set container attributes. Call of setContainerAttributes.
    // 2. Set grid attributes. Call of setGridAttributes.
    // 3. Create grid elements. Call of createGridElements.
    init()
    {
        if (!this.setContainerAttributes())
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

    // Set display index to start value undefined: A negative value
    initDisplayIndex()
    {
        this.m_display_index = -1;

    } // initDisplayIndex

    // Get the curren display index
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

    // Returns the number of milliseconds that photo and text will be displayed
    // on the overlay <div>
    getDisplaySleepTime()
    {
        return this.m_display_sleep_time;

    } // getDisplaySleepTime

    // Set container attributes 
    // 1. Member variables m_container_el, m_container_width, m_container_height
    //    are set from the input <div> container element (m_container_el) with
    //    functions clientWidth and clientHeight.
    // 2. Check that container width is at least 4 X element width
    // 3. Check that container height is at least 4 X element height
    setContainerAttributes()
    {
        this.m_container_el = document.getElementById(this.m_container_id);

        if (null == this.m_container_el)
        {
            alert('JubileeImageData.setContainerAttributes: Container element is null for id= ' + this.m_container_id);

            return false;
        }
 
        this.m_container_width = ElemDim.widthContainer();

        this.m_container_height = ElemDim.heightContainer();

        console.log('Container width= ' + this.m_container_width + ' height= ' + this.m_container_height);

        this.m_element_width =  ElemDim.widthGridImage();
        this.m_element_height = ElemDim.heightGridImage();

        console.log('Element width= ' + this.m_element_width + ' height= ' + this.m_element_height);

        return true;

    } // setContainerAttributes

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


        return true;

    } // createOverlayImageTextDiv

} // JubileeImageData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeImageData //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


