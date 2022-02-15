<template>
  <div class="container home-header">
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
        <router-link to="#" class="position-relative">
          <span class="material-icons-outlined text-dark icons-bg-circle fs-5">
            arrow_back
          </span>
        </router-link>
      </div>

      <div
        class="col-3 p-0 d-flex justify-content-end align-items-center h-100"
      >
        <button
          class="
            btn btn-secondary
            rounded-pill
            fw-bold
            fs-6
            text-light
            px-3
            py-1
          "
        >
          Hoot
        </button>
      </div>
    </nav>
    <main>
      <article class="container px-2">
        <div class="row justify-content-center gap-2">
          <div class="col-2 p-0">
            <div class="profile-icon h-25 w-50">
              <h3 class="uname-first-letter text-light">P</h3>
            </div>
          </div>
          <div class="col-9">
            <div class="row">
              <textarea type="text" class="compose-input-text" />
            </div>
            <div class="row">
              <button class="btn">Everyone can reply</button>
            </div>
            <div class="row"></div>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>