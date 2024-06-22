export class ProductPost {
  constructor(
    public id: number,
    public name: string,
    public desc: string,
    public price: number,
    public category: string,
    public imageUrl: string
  ) {}
}
