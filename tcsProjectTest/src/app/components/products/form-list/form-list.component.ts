import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/products/product.interface';
import { ProductService } from 'src/app/services/products/product.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent {
  dropdownVisible: boolean = false;

  data: any[] = [];
  searchTerm: string = '';

  @Input()myProduct!: Product;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      const response = await this.productService.getAll();
      this.data = response;

      if (this.data.length > 0) {
        this.initDataTable();
      } else {
        console.log("No se encontraron usuarios.");
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  }

  initDataTable() {
    const self = this;
    $('#dataTable').DataTable({
      searching: true,
      data: this.data,
      paging: false, 
      lengthMenu: [5, 10, 20], 
      pageLength: 10, 
      info: true,
      columns: [
        { title: 'Logo', data: 'logo' },
        { title: 'Nombre del producto',  data: 'name' },
        { title: 'Descripción', data: 'description'  },
        {
          title: 'Fecha de liberación',
          data: null,
          render: (data, type, row: Product) => {
            const fechaActual = new Date(row.date_release);
            const dia = fechaActual.getUTCDate().toString().padStart(2, '0');
            const mes = (fechaActual.getUTCMonth() + 1).toString().padStart(2, '0');
            const anio = fechaActual.getUTCFullYear();
            const fechaFormateada = `${dia}/${mes}/${anio}`;
            return fechaFormateada;
        }
        },
        {
          title: 'Fecha de reestructuración',
          data: null,
          render: (data, type, row: Product) => {
            if (type === 'display') {
              const fechaActual = new Date(row.date_revision);
              const dia = fechaActual.getUTCDate().toString().padStart(2, '0');
              const mes = (fechaActual.getUTCMonth() + 1).toString().padStart(2, '0');
              const anio = fechaActual.getUTCFullYear();
              const fechaFormateada = `${dia}/${mes}/${anio}`;
              return fechaFormateada;
            }
            return data;
          }
        },
        {
          title: '',
          data: null,
          render: (data, type, row: Product) => {
            const productId = row.id;
            return `
            <button class="btn btn-sm update-btn" data-product-id="${productId}">
              <i class="fa-solid fa-pen-to-square"></i><br>
            </button>`;
          }
        }
      ]
    });

    $('#dataTable').on('click', '.update-btn', function() {
      const product = $(this).data('product-id');
      self.navigateToUpdateProduct(product);
    });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    console.log("toggleDropdown() ejecutada. dropdownVisible:", this.dropdownVisible);
  }

  eliminar() {
    this.toggleDropdown();
  }

  actualizar() {
    this.toggleDropdown();
  }
  ngOnDestroy(): void {
    $('#dataTable').DataTable().destroy();
  }

  search(): void {
    const dataTable: any = $('#dataTable').DataTable();
    
    // Limpia los filtros existentes
    dataTable.search('').columns().search('').draw();
    
    if (this.searchTerm) {
      const numColumns = dataTable.columns().header().length; // Corregir aquí
      
      // Itera a través de las columnas y aplica el filtro
      for (let i = 0; i < numColumns; i++) {
        dataTable.column(i).search(this.searchTerm).draw();
      }
    }
  }
  
  navigateToUpdateProduct(productId: string) {
    this.router.navigate(['/updateRegister', productId]);
  }
}
