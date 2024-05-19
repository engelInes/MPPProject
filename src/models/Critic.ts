export class Critic {
    public criticId: number;
    public criticName: string;
    public bookId: number;

    public constructor(id:number, name: string, bookId: number) {
        this.criticId = id;
        this.criticName = name;
        this.bookId = bookId;
    }
}
