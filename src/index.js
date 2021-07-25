import NewsApiService from './js/apiService';
import articalesTpl from './template/articales.hbs';
import Notiflix from 'notiflix';
import axios from 'axios';
import './sass/main.scss';




const refs = {
  serchForm : document.querySelector('#search-form'),
  btnLoadMore : document.querySelector('.js-load-more'),
  gallery : document.querySelector('.gallery'),
}

const newsApiService = new NewsApiService();


refs.serchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoardMore);

refs.btnLoadMore.disabled = true;

function onSearch(e){
  e.preventDefault();
  refs.btnLoadMore.disabled = false ;
   
  clearArticlesContainer()
  newsApiService.query = e.currentTarget.elements.query.value;
  if(newsApiService.query.trim() === ''){
      
      return
  }
  newsApiService.resetPage()
  newsApiService.fetchArticals()
    
  .then(appendArticlesMarkup)
  
  
}
 
function onLoardMore(){
    if(newsApiService.query.trim() === ''){
        return
    }
    newsApiService.fetchArticals().then(appendArticlesMarkup)
}


function appendArticlesMarkup(data){
  if(data.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  }
  else if(data.length >= 1 ){
    Notiflix.Notify.success('Success')
    refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(data))
  }

//   else if(){
//     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//     refs.btnLoadMore.disabled = true;
    
//   }
//  refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(data))
}




function clearArticlesContainer(){
    refs.gallery.innerHTML = ''
}