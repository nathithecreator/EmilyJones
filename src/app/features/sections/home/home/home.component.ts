import { Component, ElementRef, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { CartServiceService } from '../../../../Services/cart.service';
import { ProductAPIService } from '../../../../Services/product-api.service';
import { ProductPost } from '../../../../Models/Product-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productPosts: ProductPost[] = [];
  errorMessage: string | null = null;

  constructor(private cartService: CartServiceService, private productApiService: ProductAPIService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productApiService.getAllProductPosts().subscribe({
      next: (posts) => {
        this.productPosts = posts;
        console.log('Fetched products:', this.productPosts);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products. Please try again later.';
        console.error('Error fetching products:', error);
      }
    });
  }

  chartNumber = 0; 

  @Output() chartDataChange = new EventEmitter<ChartData>(); 

 addtoChart(product: any) {
  this.cartService.addToCart(product);
}

  

  searchText: string ='';

  //event for searching
  SearchTextChanged: EventEmitter<string> = new EventEmitter<string>();


  //event for category buttons
  selectedButtonChanged: EventEmitter<string> = new EventEmitter<string>();

  isAllClicked = true;
  isCouchesClicked = false;
  isTvstandClicked = false;
  isHeadboardsClicked = false;
  isTablesClicked = false;
  selectedCategory: string = 'all';

  @ViewChild('searchInput') searchInputEl!: ElementRef;

  //Search function
  updateSearchText(){
    // this.searchText = event.target.value;
    this.searchText = this.searchInputEl.nativeElement.value;
    this.SearchTextChanged.emit(this.searchText);
  }

  onselectedButtonChanged(category: string) {
    this.selectedButtonChanged.emit(category);
  }

  toggleButton(button: string) {
    // Reset all buttons to initial state
    this.isAllClicked = false;
    this.isCouchesClicked = false;
    this.isTvstandClicked = false;
    this.isHeadboardsClicked = false;
    this.isTablesClicked = false;

    // Activate the clicked button and set the selected category
    if (button === 'all') {
      this.isAllClicked = true;
      this.selectedCategory = 'all';
    } else if (button === 'couches') {
      this.isCouchesClicked = true;
      this.selectedCategory = 'couches';
    } else if (button === 'tvstand') {
      this.isTvstandClicked = true;
      this.selectedCategory = 'tvstand';
    } else if (button === 'headboards') {
      this.isHeadboardsClicked = true;
      this.selectedCategory = 'headboards';
    } else if (button === 'tableschairs') {
      this.isTablesClicked = true;
      this.selectedCategory = 'tableschairs';
    }

    // Emit the event with the selected category
    this.onselectedButtonChanged(this.selectedCategory);
  }

  shouldDisplayProduct(product: any): boolean {
    const categoryMatch = this.selectedCategory === 'all' || product.category === this.selectedCategory;
    const searchTextMatch = product.name.toLowerCase().includes(this.searchText.toLowerCase());
    return categoryMatch && searchTextMatch;
  }

  products = [
    {
      id: 1,
      name: "Minimalistic Italian white Couch",
      category: "couches",
      price: 799,
      imageUrl: "https://kenswarehouse.com/cdn/shop/files/429584127_287812347667183_2651609771097993601_n.jpg?v=1709569184"
    },
    {
      id: 2,
      name: "Arab timbaq TV Stand",
      category: "tvstand",
      price: 450,
      imageUrl: "https://media.takealot.com/covers_images/ad3d3a76ee9942debcd8ad2323bd5c78/s-zoom.file"
    },
    {
      id: 3,
      name: "Italian Metalic Gray Headboard",
      category: "headboards",
      price: 900,
      imageUrl: "https://www.cielo.co.za/156502-large_default/kate-headboard-single-alaska-grey.jpg"
    },
    {
      id: 4,
      name: "Aluminium based James Bond Table",
      category: "tableschairs",
      price: 299,
      imageUrl: "https://www.nuvoitalia.co.za/cdn/shop/products/dalia-coffee-table-brown-living-room_1200x.jpg?v=1708445846"
    },
    {
      id: 5,
      name: "1869 Belgium Gold Steel Marble Table",
      category: "tableschairs",
      price: 649,
      imageUrl: "https://www.nuvoitalia.co.za/cdn/shop/products/imola-gold-coffee-and-side-table-top_5000x.jpg?v=1708446255"
    },
    {
      id: 6,
      name: "Bel-Air Cloud Chair",
      category: "tableschairs",
      price: 777,
      imageUrl: "https://media.portmoni.com/resized/24778/IMG_4930-thumbnail-600x600-95.jpeg"
    },
    {
      id: 7,
      name: "Bachelor Cloud Couch",
      category: "couches",
      price: 777,
      imageUrl: "https://luxmood.ca/wp-content/uploads/2022/08/teddy.png"
    },
    {
      id: 8,
      name: "Independent Minimalistic Couch",
      category: "couches",
      price: 545,
      imageUrl: "https://m.media-amazon.com/images/I/916LFXslqwL._AC_UF894,1000_QL80_.jpg"
    },
    {
      id: 9,
      name: "Float White Matrix TV Stand",
      category: "tvstand",
      price: 275,
      imageUrl: "https://m.media-amazon.com/images/I/81XG42yGr3L._AC_UF894,1000_QL80_.jpg"
    },
    {
      id: 10,
      name: "Gold Feet TV Stand",
      category: "tvstand",
      price: 199,
      imageUrl: "https://m.media-amazon.com/images/I/71epdjhhBdL._AC_UF894,1000_QL80_.jpg"
    },
    {
      id: 11,
      name: "Silverton Paige Headboard",
      category: "headboards",
      price: 250,
      imageUrl: "https://skhome.co.za/wp-content/uploads/2022/07/Image7-scaled.jpg"
    },
    {
      id: 12,
      name: "Rose-Gold Queen Headboard",
      category: "headboards",
      price: 222,
      imageUrl: "https://fancyhouse-design.com/wp-content/uploads/2023/11/The-bedrooms-interior-design-blends-traditional-charm-with-modern-sophistication..jpg"
    },
    {
      id: 13,
      name: "Elegance Dinning Bently Chair",
      category: "tableschairs",
      price: 400,
      imageUrl: "https://joyfurniture.co.za/wp-content/uploads/2023/01/YT211.jpg"
    },
    {
      id: 14,
      name: "Throne Royal Blue Valvet Chair",
      category: "tableschairs",
      price: 650,
      imageUrl: "https://www.home-designing.com/wp-content/uploads/2021/08/navy-blue-living-room-chair-wingback-design-classic-mid-century-modern-velvet-armchair-affordable-luxury-furniture-600x600.jpg"
    }


  ];
}

interface ChartData {
  // Define the properties and types of your chart data
}




