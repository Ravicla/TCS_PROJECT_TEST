  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl } from '@angular/forms';
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

    //model: any = {};
    //idExists: boolean = false;

    constructor(
      private productService: ProductService, 
      //private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private router: Router
      ) {
      // Inicializa el formulario
      //this.productForm = this.formBuilder.group
      this.productForm = new FormGroup({
        id: new FormControl ('', [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(10),
          this.validateIdAsync
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


    async validateIdAsync(control: AbstractControl): Promise<any> {
      const id = control.value; 
      if (id.length>2) {
        try {
          console.log('hola id: '+id);
          const isValid = await this.productService.validateId(id);
          console.log('hola: '+isValid);
          if (isValid === false) {
            return null; 
          } else {
            return { idInvalid: true }; 
          }
        } catch (error) {
          console.error('Error al validar el ID:', error);
          return { idInvalid: true }; 
        }
      } else {
        return null; 
      }
    }
    
    

    
    async getDataForm(): Promise<void> {
        let newProduct = this.productForm.value;
        console.log(newProduct);
        console.log(this.type);
        if (this.type !="Enviar") {
            let response = await this.productService.updateProduct(newProduct);
            console.log(response);
            if (response[0].id) {
              alert('Producto actualizado');
              this.router.navigate(['/form-list']);
            }
        } else {
            let response = await this.productService.createProduct(newProduct);
            if (response[0].id) {
              alert('Producto almacenado correctamente');
              this.router.navigate(['/form-list']);
            } else {
              alert('Hubo un error al crear el producto. Inténtelo de nuevo');
            }
        }

    }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(async (params: any) => {
        let id: string = params.productId;
        if(id) {
          this.type = 'Actualizar'
          const response = await this.productService.getAll();
          const product = response.find((p: Product) => p.id === id);
          
          const formattedDateRelease = new Date(product.date_release).toISOString().substring(0, 10);
          const formattedDateRevision = new Date(product.date_revision).toISOString().substring(0, 10);
      
          this.productForm = new FormGroup({
            id: new FormControl (product?.id, []),
            name: new FormControl (product?.name, []),
            description: new FormControl (product?.description, []),
            logo: new FormControl (product?.logo, []),
            date_release: new FormControl(formattedDateRelease, []),
            date_revision: new FormControl(formattedDateRevision, [])
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
