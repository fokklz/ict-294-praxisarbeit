import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTodosComponent } from './page-todos.component';

describe('PageTodosComponent', () => {
  let component: PageTodosComponent;
  let fixture: ComponentFixture<PageTodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageTodosComponent]
    });
    fixture = TestBed.createComponent(PageTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
