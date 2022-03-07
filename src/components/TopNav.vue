<template>
  <div class="home-header">
    <nav class="row h-100 flex-nowrap justify-content-between m-0 px-3 py-0">
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
        <a @click="$router.go(-1)" class="position-relative">
          <span class="material-icons-outlined text-dark icons-bg-circle fs-5">
            arrow_back
          </span>
        </a>
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


