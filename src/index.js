import ApiService from './js/api';
import articalesTpl from './template/articales.hbs';
import Notiflix from 'notiflix';

import './sass/main.scss';




const refs = {
  serchForm : document.querySelector('#search-form'),
  btnLoadMore : document.querySelector('.js-load-more'),
  gallery : document.querySelector('.gallery'),
  
}

const api = new ApiService();


refs.serchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoardMore);


refs.btnLoadMore.style.display ="none";
let totalPages = 0;



function onSearch(e){
  e.preventDefault();
  clearImagesContainer()

  api.query = e.currentTarget.elements.query.value;

  if(api.query.trim() === ''){
    return
  }

  refs.btnLoadMore.style.display ="none";
  api.resetPage()
  api.fetchImages()
    
  .then(({hits, totalHits }) => {

    if(hits.length === 0) {
      return  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
     }

       totalPages = Math.ceil(totalHits/ api.per_page)
       Notiflix.Notify.success('Success')
       refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(hits))
       
       refs.btnLoadMore.style.display = "inline"

       checkIfEndOfColllection()

  }).catch(()=>{Notiflix.Notify.failure('"Sorry, please try again');})
  
}

 
function onLoardMore(){
   
    api.fetchImages().then(({hits})=>{
        
        refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(hits))
        checkIfEndOfColllection()
        
    
    }).catch(()=>{Notiflix.Notify.failure('"Sorry, please try again');})
}

function checkIfEndOfColllection(){
    if(api.page > totalPages){
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        refs.btnLoadMore.style.display ="none"
      }
}

function clearImagesContainer(){
    refs.gallery.innerHTML = ''
}

