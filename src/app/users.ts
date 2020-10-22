export class Users_New {
    id: string;
    name: string;
    type: string;
    email: string;
    password: string;
    your_rating: string
    token?: string;
    
    constructor(id,name,type='user',email,password,your_rating){
        this.id=id;
        this.name=name;
        this.type=type;
        this.email=email;
        this.password=password;
        this.your_rating=your_rating
    }
}
