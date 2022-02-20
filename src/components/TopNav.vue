<template>
  <div class="home-header">
    <nav class="row h-100 justify-content-between m-0 px-3 py-0">
      <div
        class="
          col-2
          p-0
          d-flex
          align-items-center
          justify-content-start
          h-100
          position-relative
        "
      >
        <router-link to="/home" class="position-relative">
          <span class="material-icons-outlined text-dark icons-bg-circle fs-5">
            arrow_back
          </span>
        </router-link>
      </div>
      <div
        class="
          col-7
          h-100
          p-0
          d-flex
          align-items-start
          justify-content-center
          flex-column
        "
      >
        <slot name="middle-content"> </slot>
      </div>
      <div class="col p-0 d-flex justify-content-end align-items-center h-100">
        <slot name="action-button"></slot>
      </div>
    </nav>
  </div>
</template>

