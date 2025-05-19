import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

const slideInAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [style({ position: 'absolute', width: '100%' })],
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ])
]);


export { slideInAnimation };