import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSearchComponent } from './top-search.component';

describe('TopSearchComponent', () => {
  let component: TopSearchComponent;
  let fixture: ComponentFixture<TopSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopSearchComponent]
    });
    fixture = TestBed.createComponent(TopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
