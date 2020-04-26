import { setInstance } from '~/services';
export default function(ctx) {
  if (!ctx.$axios) {
    console.error('Please make sure $axios module is added');
  } else {
    setInstance(ctx.$axios);
  }
}
