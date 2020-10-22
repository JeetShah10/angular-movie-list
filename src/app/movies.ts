export class Movies_New {
    id:string;
    title: string;
    description: string;
    ratings: string;
    rating_average: string;
    comments: string;

    constructor(id,title,description,ratings,rating_average,comments){
        this.id=id;
        this.title=title;
        this.description=description;
        this.ratings=ratings;
        this.rating_average=rating_average;
        this.comments=this.comments;
    }
}
