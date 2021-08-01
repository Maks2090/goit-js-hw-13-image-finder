import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22631674-5d368c2f6a01c7affe232da9d';


export default class ApiService {
    constructor(){
        this.searchQuery = '';
        this.per_page = 200;
        this.page = 1;
        

    }

   async fetchImages(){
       const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}`
    
       const response = await axios.get(url)
       this.incrementPage()

       return response.data
        
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


