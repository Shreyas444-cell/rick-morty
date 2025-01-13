import { forkJoin } from "rxjs";
import { episodeType } from "./model";

  export function fetchEpisodeDetails(episodeUrls: string[],episodeDetails:episodeType[]): void {
    const episodeRequests = episodeUrls.map(url =>
      this.dataService.getEpisodeDetails(url)
    );
    forkJoin(episodeRequests).subscribe({
      next: (responses: episodeType[]) => {
        episodeDetails = responses; 
      },
     
    });
}
  