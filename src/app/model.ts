export interface selectedData {
    created: string;  
    episode: string[];  
    gender: string;  
    id: number; 
    image: string; 
    location: {name?:string,url?:string}; 
    name: string; 
    origin: {name?:string,url?:string};  
    species: string;
    status: string;  
    type: string;  
    url: string;  
    highlightedName?: string;
  }
  export interface data{
    
       info: {
          count: number,
          pages: number,
          next: string,
          prev: string
        },
        results: selectedData [
         
        ]
    
      
      

  }
export interface episodeType {
  air_date: string,
  characters: string[],

  created
  :
  string
  episode
  :
  string
  id
  :
  number
  name
  :
  string
  url
  :
  string




}