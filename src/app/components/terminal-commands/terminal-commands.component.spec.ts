import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandsComponent } from './terminal-commands.component';

describe('TerminalCommandsComponent', () => {
  let component: TerminalCommandsComponent;
  let fixture: ComponentFixture<TerminalCommandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerminalCommandsComponent]
    });
    fixture = TestBed.createComponent(TerminalCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
