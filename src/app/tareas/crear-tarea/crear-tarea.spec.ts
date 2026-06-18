import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTarea } from './crear-tarea';

describe('CrearTarea', () => {
  let component: CrearTarea;
  let fixture: ComponentFixture<CrearTarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTarea],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearTarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
