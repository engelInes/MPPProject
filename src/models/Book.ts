export class Book {
    private id: number;
    private title: string;
    private author: string;
    private genre: string;
    private pictureUrl: string;

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

    public getId(): number {
        return this.id;
    }

    public setId(newId: number) {
        this.id = newId;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(newTitle: string) {
        this.title = newTitle;
    }

    public getAuthor(): string {
        return this.author;
    }

    public setAuthor(newAuthor: string) {
        this.author = newAuthor;
    }

    public getGenre(): string {
        return this.genre;
    }

    public setGenre(newGenre: string) {
        this.genre = newGenre;
    }

    public getPictureUrl(): string {
        return this.pictureUrl;
    }

    public setPictureUrl(newPictureUrl: string) {
        this.pictureUrl = newPictureUrl;
    }
}
