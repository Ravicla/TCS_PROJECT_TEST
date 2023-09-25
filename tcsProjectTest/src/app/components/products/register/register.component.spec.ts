import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import { ProductService } from 'src/app/services/products/product.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let productService: ProductService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ productId: '1' }) // Simula un parámetro en la ruta para la prueba
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate') // Simula la función navigate
          }
        },
        {
          provide: ProductService,
          useValue: {
            // Simula los métodos del servicio ProductService
            validateId: (id: string) => Promise.resolve(true),
            getAll: () => Promise.resolve([]),
            createProduct: (product: any) => Promise.resolve({ id: '1' }),
            updateProduct: (product: any) => Promise.resolve({ id: '1' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with "Enviar" as type', () => {
    expect(component.type).toBe('Enviar');
  });

  it('should validate ID asynchronously', async () => {
    const control = component.productForm.get('id');
    if (control) { // Comprueba que control no sea nulo
      control.setValue('123');
      const result = await component.validateIdAsync(control);
      expect(result).toBeNull(); // El ID debe ser válido en esta simulación
    } else {
      fail('Control is null'); // O maneja de otra manera si es null
    }
  });
  

  it('should navigate to /form-list after successful product creation', async () => {
    const navigateSpy = spyOn(router, 'navigate'); // Espía la función navigate
    spyOn(window, 'alert'); // Espía la función de alerta para evitar su ejecución real
    const createProductSpy = spyOn(productService, 'createProduct').and.callThrough();
    
    component.getDataForm();
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(createProductSpy).toHaveBeenCalledWith(component.productForm.value);
    expect(navigateSpy).toHaveBeenCalledWith(['/form-list']);
  });
  

  // Agrega más pruebas para otros casos según sea necesario
});
