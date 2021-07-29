import NewsApiService from './js/apiService';
import articalesTpl from './template/articales.hbs';
import Notiflix from 'notiflix';

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
refs.btnLoadMore.style.display ="none";
let totalpage = 0;



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
    
  .then(data => {
    if(data.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            refs.btnLoadMore.style.display ="none";
            return
          }
          else if(data.length >= 1 ){
                Notiflix.Notify.success('Success')
                refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(data))
                totalpage = newsApiService.per_page * newsApiService.page
                refs.btnLoadMore.style.display = "inline"
            }
            else if(totalpage >= newsApiService.totalHits){
                    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
                    refs.btnLoadMore.style.display ="none"
                }
  }).catch(()=>{Notiflix.Notify.failure('"Sorry, please try again');})
  
  
}

 
function onLoardMore(){
    if(newsApiService.query.trim() === ''){
        return
    }
    newsApiService.fetchArticals().then(data =>{
        totalpage = newsApiService.per_page * newsApiService.page
         if(totalpage >= newsApiService.totalHits){
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
            refs.btnLoadMore.style.display ="none"
        }
        refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(data))
    }).catch(()=>{Notiflix.Notify.failure('"Sorry, please try again');})
}



function clearArticlesContainer(){
    refs.gallery.innerHTML = ''
}

