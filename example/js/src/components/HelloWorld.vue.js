import { $counter } from '@/store';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed: {
    count() {
      return $counter.state.count;
    },
    half() {
      return $counter.getters.half;
    },
  },
  methods: {
    countUp() {
      $counter.commit('inc', {
        amount: 10,
      });
    },
    countUpDelay() {
      $counter.dispatch('incAsync', {
        amount: 20,
        delay: 2000,
      });
    },
  },
};
