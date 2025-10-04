import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAddmin } from './main-addmin';

describe('MainAddmin', () => {
  let component: MainAddmin;
  let fixture: ComponentFixture<MainAddmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAddmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAddmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
