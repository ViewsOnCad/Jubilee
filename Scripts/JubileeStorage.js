// File: JubileeStorage.js
// Date: 2026-02-10
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class getting data for the jubilee image and storing it in the class JubileeStorageData. 

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Data ist stored in the global instance g_jubilee_image_data of the class JubileeStorageData. 


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeStorage //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for getting data for the jubilee image and storing it in the class JubileeStorageData.
class JubileeStorage
{
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

        console.log('JubileeStorage.getArrayFromLocalStorageSetPhotoDataList: Number of photo URLs= ' + jubilee_photo_urls.length +
            ' number of small photo URLs= ' + jubilee_small_photo_urls.length);

        if (jubilee_photo_urls.length < i_n_photos || jubilee_small_photo_urls.length < i_n_photos)
        {
            alert('JubileeStorage.getArrayFromLocalStorageSetPhotoDataList: Not enough images in local storage');

            return false;
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

        console.log('JubileeStorage.getArrayFromLocalStorageSetPhotoDataList: Number of set PhotoData objects= ' + n_photos);

        return true;

    } // getArrayFromLocalStorageSetPhotoDataList

} // JubileeStorage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JubileeStorage ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
