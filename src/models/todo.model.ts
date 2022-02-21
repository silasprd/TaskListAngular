export class Todo { // export diz que a classe é publica
    
    constructor( 
        public id: Number,
        public title: String,
        public done: Boolean,
        ) { }
}