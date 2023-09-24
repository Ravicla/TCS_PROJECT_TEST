import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/products/product.interface';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  productForm: FormGroup;
  type: string = "Enviar";

  model: any = {};
  idExists: boolean = false;

  constructor(
    private productService: ProductService, 
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
    // Inicializa el formulario
    //this.productForm = this.formBuilder.group
    this.productForm = new FormGroup({
      id: new FormControl ('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(10)
      ]),
      name: new FormControl ('', [
        Validators.required,
        Validators.minLength(5), 
        Validators.maxLength(100)
      ]),
      description: new FormControl ('', [
        Validators.required,
        Validators.minLength(10), 
        Validators.maxLength(200)
      ]),
      logo: new FormControl ('', [
        Validators.required
      ]),
      date_release: new FormControl ('', [
        Validators.required,
      ]),
      date_revision: new FormControl ('', [
        Validators.required
      ])
    },[]);
  }

 
  

  

  // Función para enviar el formulario y crear un nuevo producto
  /*onSubmit() {
    const newProduct = this.productForm.value;
    this.productService.createProduct(newProduct).subscribe(response => {
      // Maneja la respuesta aquí, por ejemplo, muestra un mensaje de éxito
      console.log('Producto creado con éxito', response);
      // Limpia el formulario después de crear el producto
      this.productForm.reset();
    }, error => {
      // Maneja el error aquí, por ejemplo, muestra un mensaje de error
      console.error('Error al crear el producto', error);
    });
  }*/
  
  async getDataForm(): Promise<void> {
    if (this.productForm.valid) {
      let newProduct = this.productForm.value;
  
      if (newProduct.productId) {
        // Actualizando producto existente
        try {
          let response = await this.productService.updateProduct(newProduct);
  
          if (response.updatedAt) {
            alert('Producto actualizado');
            this.router.navigate(['/form-list']);
          }
        } catch (error) {
          console.error(error);
          alert('Error al actualizar el producto');
        }
      } else {
        // Creando nuevo usuario
        try {
          let response = await this.productService.createProduct(newProduct);
  
          if (response.id) {
            this.router.navigate(['/form-list']);
          } else {
            alert('Hubo un error al crear el producto. Inténtelo de nuevo');
          }
        } catch (error) {
          console.error(error);
          alert('Error al guardar el producto');
        }
      }
    } else {
      alert('El formulario no está bien rellenado');
    }

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.registerId);
      if(id) {
        this.type = 'Actualizar'
        const response = await this.productService.getProductById(id)
            
        const product: Product = response
        console.log(product);
        this.productForm = new FormGroup({
          id: new FormControl (product?.id, []),
          name: new FormControl (product?.name, []),
          descripion: new FormControl (product?.description, []),
          logo: new FormControl (product?.logo, []),
          date_release: new FormControl (product?.date_release, []),
          date_revision: new FormControl (product?.date_revision, [])
        }, [])    
      }    
    })
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.productForm.get(pControlName)?.hasError(pError) && this.productForm.get(pControlName)?.touched) {
      return true;
    } else {
      return false;
    }
  }
}
