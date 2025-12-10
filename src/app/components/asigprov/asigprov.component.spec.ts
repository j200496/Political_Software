import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigprovComponent } from './asigprov.component';

describe('AsigprovComponent', () => {
  let component: AsigprovComponent;
  let fixture: ComponentFixture<AsigprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsigprovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsigprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
