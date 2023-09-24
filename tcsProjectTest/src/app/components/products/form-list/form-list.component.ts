import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/products/product.interface';
import { ProductService } from 'src/app/services/products/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent {
  dropdownVisible: boolean = false;

  data: any[] = [];

  @Input()myProduct!: Product;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params: any) => {
      let response = await this.productService.getAll();
      if(response.error){
        Swal.fire(response.error, '', 'error');
      }   
      this.data = response;
      console.log(this.data);
    })
      
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    console.log("toggleDropdown() ejecutada. dropdownVisible:", this.dropdownVisible);

  }

  eliminar() {
    // Lógica para la acción de eliminar
    this.toggleDropdown();
  }

  actualizar() {
    // Lógica para la acción de actualizar
    this.toggleDropdown();
  }
}
