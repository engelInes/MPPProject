export class Book {
    public id: number;
    public title: string;
    public author: string;
    public genre: string;
    public pictureUrl: string;

    public constructor(
        id: number,
        title: string,
        author: string,
        genre: string,
        pictureUrl: string,
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pictureUrl = pictureUrl;
    }
}
