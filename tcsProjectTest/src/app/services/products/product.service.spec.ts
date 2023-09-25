import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request for getAll', () => {
    const mockResponse = [
      {
        id: '1',
        name: 'Product 1',
      },
      {
        id: '2',
        name: 'Product 2',
      },
    ];

    service.getAll().then((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('https://tribu-ti-staffing-desarrolloafangwbmcrhucqfh.z01.azurefd.net/ipf-msaproductosfinancieros/bp/products');

    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should make an HTTP GET request for validateId', () => {
    const mockId = '123';

    service.validateId(mockId).then((data) => {
      expect(data).toEqual(true);
    });

    const req = httpTestingController.expectOne(`https://tribu-ti-staffing-desarrolloafangwbmcrhucqfh.z01.azurefd.net/ipf-msaproductosfinancieros/bp/products/verification?id=${mockId}`);

    expect(req.request.method).toEqual('GET');

    req.flush(true);
  });

  // Agrega más pruebas para createProduct y updateProduct según sea necesario
});
