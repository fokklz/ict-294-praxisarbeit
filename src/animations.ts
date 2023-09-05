import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state('in', style({ opacity: 1 })),
  state('out', style({ opacity: 0 })),
  transition('in <=> out', [animate('0.3s ease-in-out')]),
]);
