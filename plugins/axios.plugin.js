import axiosInstance from '~/services/axiosInstance';
export default function(ctx) {
  if (!ctx.$axios) {
    console.error('Please make sure $axios module is added');
  } else {
    axiosInstance.setInstance(ctx.$axios);
  }
}
