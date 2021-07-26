import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22631674-5d368c2f6a01c7affe232da9d';


export default class NewsApiService {
    constructor(){
        this.searchQuery = '';
        this.per_page = 40;
        this.page = 1;
        this.totalHits = 500;

    }

    fetchArticals(){
        const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}`
      return  fetch(url)
        .then(response => response.json())
        .then(data => {
            this.incrementPage()
            
            return data.hits
        });
      
     
        
    }

   

    incrementPage(){
        this.page += 1;
    }

    resetPage(){
        this.page = 1;
    }

    get query(){
        return this.searchQuery
    }

    set query(newQuery){
       return ( this.searchQuery = newQuery)
    }
}


