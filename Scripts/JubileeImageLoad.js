// File: JubileeLoad.js
// Date: 2026-02-10
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for the preloading of images. They are added to the DOM but not displayed.

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
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

