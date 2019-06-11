import { Component, Prop, Vue } from 'vue-property-decorator';

import { $counter } from '@/store';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private get count() {
    return $counter.state.count;
  }

  private get half() {
    return $counter.getters.half;
  }

  private countUp() {
    $counter.commit('inc', {
      amount: 10,
    });
  }

  private countUpDelay() {
    $counter.dispatch('incAsync', {
      amount: 20,
      delay: 2000,
    });
  }
}
