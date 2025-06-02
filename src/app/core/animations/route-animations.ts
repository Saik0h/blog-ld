import {
  trigger,
  transition,
  style,
  animate,
  query,
} from '@angular/animations';

export const fadeAnimation =
  trigger('routeAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0
        })
      ], { optional: true }),
      query(':leave', [
        animate('100ms ease-in-out', style({ opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-in-out', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ]);

