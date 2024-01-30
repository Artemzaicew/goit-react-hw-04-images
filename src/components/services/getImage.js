const API_KEY =  '41985746-64288158566550a6271d845ee' ;
const URL =  'https://pixabay.com/api/';

export function fetchImage(searchQuery, page) {
    return fetch(`${URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        
}
