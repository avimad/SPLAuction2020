import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionOverviewComponent } from './auction-overview.component';

describe('AuctionOverviewComponent', () => {
  let component: AuctionOverviewComponent;
  let fixture: ComponentFixture<AuctionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
