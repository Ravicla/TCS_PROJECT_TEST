import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormListComponent } from './form-list.component';
import { ProductService } from 'src/app/services/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FormListComponent', () => {
  let component: FormListComponent;
  let fixture: ComponentFixture<FormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormListComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: () => of([]).toPromise(), // Convierte el observable en una promesa
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', async () => { // Agrega 'async' aquí para poder usar 'await'
    const productService = TestBed.inject(ProductService);
    const dummyData = [ { name: 'Product 1', description: 'Description 1' },
    { name: 'Product 2', description: 'Description 2' }]; // Define tus datos de prueba aquí
    spyOn(productService, 'getAll').and.returnValue(of(dummyData).toPromise()); // Convierte el observable en una promesa

    await component.loadData(); // Usa 'await' aquí

    expect(component.data).toEqual(dummyData);
  });

  it('should filter data', () => {
    // Configura el estado inicial del componente
    component.data = [ { name: 'Product 1', description: 'Description 1' },
    { name: 'Product 2', description: 'Description 2' }]; // Define tus datos de prueba aquí
    component.searchTerm = 'Keyword'; // Palabra clave de búsqueda de prueba

    component.search();

    // Verifica si los datos se han filtrado correctamente
    expect(component.data).toEqual([ { name: 'Product 1', description: 'Description 1' },
    { name: 'Product 2', description: 'Description 2' },]); // Define el resultado esperado después de la búsqueda
  });
});
