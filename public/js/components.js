const Vue = require('vue');

Vue.component('back-button', {
  props: ['onClick'],
  template: `
    <a class="card-header-icon" v-on:click="onClick">
      <span class="icon">
        <i class="fa fa-remove"></i>
      </span>
    </a>
  `,
});
