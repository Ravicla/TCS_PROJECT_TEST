import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  productForm: FormGroup;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
    // Inicializa el formulario
    this.productForm = this.formBuilder.group({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    });
  }

  // Función para enviar el formulario y crear un nuevo producto
  onSubmit() {
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
  }
}
