import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetquotesComponent } from './getquotes.component';

describe('GetquotesComponent', () => {
  let component: GetquotesComponent;
  let fixture: ComponentFixture<GetquotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetquotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetquotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
