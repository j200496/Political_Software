import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigusuariosComponent } from './asigusuarios.component';

describe('AsigusuariosComponent', () => {
  let component: AsigusuariosComponent;
  let fixture: ComponentFixture<AsigusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsigusuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsigusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
