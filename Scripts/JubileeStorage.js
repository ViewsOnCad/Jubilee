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

var g_statistics_array_musicians = null;
var g_statistics_array_musicians_html = null;
var g_statistics_array_females = null;
var g_statistics_array_females_html = null;
var g_statistics_array_bands = null;
var g_statistics_array_bands_html = null;
var g_statistics_array_premises = null;
var g_statistics_array_premises_html = null;
var g_statistics_array_members = null;
var g_statistics_array_members_html = null;
var g_statistics_array_galleries = null;
var g_statistics_array_galleries_html = null;
var g_statistics_array_concerts = null;
var g_statistics_array_concerts_html = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JubileeStorage //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for getting data for the jubilee image and storing it in the class JubileeStorageData.
class JubileeStorage
{

    // Get statistics for the jubilee image in the local storage of the browser
    // and save to global variables
    static getJubileeStatisticsFromLocalStorageSetGlobalArrays()
    {   
        var key_jubilee_statistics_musicians = 'key_jubilee_statistics_musicians';
        var key_jubilee_statistics_musicians_html = 'key_jubilee_statistics_musicians_html';
        var key_jubilee_statistics_females = 'key_jubilee_statistics_females';
        var key_jubilee_statistics_females_html = 'key_jubilee_statistics_females_html';
        var key_jubilee_statistics_bands = 'key_jubilee_statistics_bands';
        var key_jubilee_statistics_bands_html = 'key_jubilee_statistics_bands_html';
        var key_jubilee_statistics_premises = 'key_jubilee_statistics_premises';
        var key_jubilee_statistics_premises_html = 'key_jubilee_statistics_premises_html';
        var key_jubilee_statistics_premises = 'key_jubilee_statistics_premises';
        var key_jubilee_statistics_premises_html = 'key_jubilee_statistics_premises_html';
        var key_jubilee_statistics_members = 'key_jubilee_statistics_members';
        var key_jubilee_statistics_members_html = 'key_jubilee_statistics_members_html';
        var key_jubilee_statistics_galleries = 'key_jubilee_statistics_galleries';
        var key_jubilee_statistics_galleries_html = 'key_jubilee_statistics_galleries_html';
        var key_jubilee_statistics_concerts = 'key_jubilee_statistics_concerts';
        var key_jubilee_statistics_concerts_html = 'key_jubilee_statistics_concerts_html';
        
        

        g_statistics_array_musicians = localStorage.getItem(key_jubilee_statistics_musicians);

        if (null != g_statistics_array_musicians)
        {
            g_statistics_array_musicians = JSON.parse(g_statistics_array_musicians);
        }
        else
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No musicians statistics in local storage');

            return;
        }   

        g_statistics_array_females = localStorage.getItem(key_jubilee_statistics_females);
        if (null != g_statistics_array_females)
        {
            g_statistics_array_females = JSON.parse(g_statistics_array_females);
        }
        else
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No females statistics in local storage');

            return;
        }   

        g_statistics_array_bands = localStorage.getItem(key_jubilee_statistics_bands);
        if (null != g_statistics_array_bands)
        {
            g_statistics_array_bands = JSON.parse(g_statistics_array_bands);
        }
        else
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No bands statistics in local storage');

            return;
        }

        g_statistics_array_premises = localStorage.getItem(key_jubilee_statistics_premises);
        if (null != g_statistics_array_premises)
        {
            g_statistics_array_premises = JSON.parse(g_statistics_array_premises);
        }
        else
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No premises statistics in local storage');   
            return;
        }

        g_statistics_array_members = localStorage.getItem(key_jubilee_statistics_members);
        if (null != g_statistics_array_members)
        {
            g_statistics_array_members = JSON.parse(g_statistics_array_members);
        }
        else
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No members statistics in local storage');
            return;
        }

        g_statistics_array_galleries = localStorage.getItem(key_jubilee_statistics_galleries);
        if (null != g_statistics_array_galleries)
        {
            g_statistics_array_galleries = JSON.parse(g_statistics_array_galleries);
        }
        else
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No galleries statistics in local storage');
            return;
        }   

        g_statistics_array_concerts = localStorage.getItem(key_jubilee_statistics_concerts);
        if (null != g_statistics_array_concerts)
        {
            g_statistics_array_concerts = JSON.parse(g_statistics_array_concerts);
        }


    
        g_statistics_array_musicians_html = localStorage.getItem(key_jubilee_statistics_musicians_html);    
        if (null == g_statistics_array_musicians_html)
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No musicians statistics in local storage');

            return;
        }

        g_statistics_array_concerts_html = localStorage.getItem(key_jubilee_statistics_concerts_html);
        if (null == g_statistics_array_concerts_html)
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No concerts statistics in local storage');

            return;
        }

        g_statistics_array_bands_html = localStorage.getItem(key_jubilee_statistics_bands_html);
        if (null == g_statistics_array_bands_html)
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No bands statistics in local storage');

            return;
        }

        g_statistics_array_females_html = localStorage.getItem(key_jubilee_statistics_females_html);
        if (null == g_statistics_array_females_html)
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No females statistics in local storage');

            return;
        }           

        g_statistics_array_premises_html = localStorage.getItem(key_jubilee_statistics_premises_html);
        if (null == g_statistics_array_premises_html)
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No premises statistics in local storage');

            return;
        }

        g_statistics_array_members_html = localStorage.getItem(key_jubilee_statistics_members_html);
        if (null == g_statistics_array_members_html)
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No members statistics in local storage');

            return;
        }           

        g_statistics_array_galleries_html = localStorage.getItem(key_jubilee_statistics_galleries_html);
        if (null == g_statistics_array_galleries_html)
        {
            alert('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays: No galleries statistics in local storage');

            return;
        }


        console.log('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays Musicians=' ); 
        console.log(g_statistics_array_musicians);
        console.log('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays Females=' );
        console.log(g_statistics_array_females);
        console.log('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays Bands=' );
        console.log(g_statistics_array_bands);
        console.log('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays Premises=' );
        console.log(g_statistics_array_premises);
        console.log('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays Members=' );
        console.log(g_statistics_array_members);
        console.log('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays Galleries=' );
        console.log(g_statistics_array_galleries);
        console.log('JubileeStorage.getJubileeStatisticsFromLocalStorageSetGlobalArrays Concerts=' );
        console.log(g_statistics_array_concerts);

    } // getJubileeStatisticsFromLocalStorageSetGlobalArrays


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
