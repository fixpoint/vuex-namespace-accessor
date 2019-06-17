# vuex-namespace-accessor
[![Build Status](https://travis-ci.com/lambdalisue/vuex-namespace-accessor.svg?branch=master)](https://travis-ci.com/lambdalisue/vuex-namespace-accessor)
![Support Vue 2](https://img.shields.io/badge/support-Vue%202-yellowgreen.svg)
![Support Vuex 3](https://img.shields.io/badge/support-Vuex%203-yellowgreen.svg)
[![Version](https://img.shields.io/npm/v/vuex-namespace-accessor.svg)](https://www.npmjs.com/package/vuex-namespace-accessor)
[![License](https://img.shields.io/github/license/lambdalisue/vuex-namespace-accessor.svg)](LICENSE)

Create an accessor instance of a **namespaced** module of [Vuex](https://github.com/vuejs/vuex) store.

**Under development**

## Install

```
npm i vuex-namespace-accessor
```

## Usage

Create an accessor with `createAccessor` function like

```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import counter from './counter';

// NOTE: the module MUST be 'namespaced: true'
const store = new Vuex.Store({
  state: {},
  modules: {
    counter,
  },
});

import { createAccessor } from 'vuex-namespace-accessor';
export const $counter = createAccessor(store, 'counter');
```

Then use that accessor to access the namespaced module like

```javascript
import { $counter } from '@/store';

// Access module state
console.log($counter.state.count);

// Access module getters
console.log($counter.getters.half);

// Commit
$counter.commit('inc', { amount: 10 });

// Dispatch
$counter.dispatch('incAsync', { amount: 20, delay: 500 });
```

See [./example/js/src/store](./example/js/src/store) directory for more detail.

## Store function

The `store` attribute of `createAccessor` can be a function which return a `store` instance.

```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import counter from './counter';

import { createAccessor } from 'vuex-namespace-accessor';
export const $counter = createAccessor(() => store, 'counter');

export const store = new Vuex.Store({
  state: {},
  modules: {
      counter,
  },
});
```


## Type safety

If `createAccessor` is used with type annotations in [vuex-type-helper](https://github.com/ktsn/vuex-type-helper) style, the accessor becomes type-safe like.

```typescript
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

import counter from './counter';

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    counter,
  },
});
export default store;

import { createAccessor } from 'vuex-namespace-accessor';

interface CounterState {
  count: number;
}
interface CounterGetters {
  half: number;
}
interface CounterMutations {
  inc: {
    amount: number;
  };
}
interface CounterActions {
  incAsync: {
    amount: number;
    delay: number;
  };
}

export const $counter = createAccessor<
  CounterState,
  CounterGetters,
  CounterMutations,
  CounterActions
>(store, 'counter');
```

Then the accessor (`$counter`) is type-safe.

```typescript
import { $counter } from '@/store';

// OK
console.log($counter.state.count);
// Fail 
console.log($counter.state.foo);

// OK
console.log($counter.getters.half);
// Fail
console.log($counter.getters.foo);

// OK
$counter.commit('inc', { amount: 10 });
// Fail
$counter.commit('inc', { amount: 'foo' });
$counter.commit('inc', {});
$counter.commit('foo');

// OK
$counter.dispatch('incAsync', { amount: 20, delay: 500 });
// Fail
$counter.dispatch('incAsync', { amount: 20 });
$counter.dispatch('incAsync', { foo: 20 });
$counter.dispatch('foo');
```
See [./example/ts/src/store](./example/ts/src/store) directory for more detail.

## Definition

```typescript
interface Accessor<State, Getters, Mutations, Actions> {
  state: State;

  getters: Getters;

  commit<K extends keyof Mutations>(type: K, payload: Mutations[K]): void;
  commit<K extends keyof Mutations>(payloadWithType: { type: K } & Mutations[K]): void;

  dispatch<K extends keyof Actions>(type: K, payload: Actions[K]): Promise<any> | void;
  dispatch<K extends keyof Actions>(payloadWithType: { type: K } & Actions[K]): Promise<any> | void;
}

function createAccessor<S, G, M, A>(
  store: Store<any> || (() => Store<any>),
  path: string | string[],
): Accessor<S, G, M, A>;
```
