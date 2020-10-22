export class Ratings {
    id:string;
    movie_id: string;
    user_id: string;
    rating: string;
    comments: string;

    constructor(id,movie_id,user_id,rating,comments){
        this.id=id;
        this.movie_id=movie_id;
        this.user_id=user_id;
        this.rating=rating;
        this.comments=this.comments;
    }
}
