<template>
  <header class="home-header">
    <nav class="row h-100 justify-content-between m-0 px-3 py-0">
      <div class="col-2 p-0 d-flex align-items-center position-relative">
        <div class="profile-icon-sm">
          <a
            data-bs-toggle="offcanvas"
            href="#profile-offcanvas"
            role="button"
            aria-controls="offcanvasWithBothOptions"
          >
            <h6 class="uname-first-letter text-light">P</h6>
          </a>
        </div>
      </div>
      <div class="col-9 p-0 align-self-center">
        <h6 class="my-2 text-start fw-bold" v-if="$route.path != '/explore'">
          {{ $route.name }}
        </h6>
        <div class="search-box text-secondary" v-else>
          <span class="material-icons-outlined search-icon"> search </span>
          <input type="text" class="search-input" placeholder="Search Hooter" />
        </div>
      </div>
      <div class="col p-0 position-relative h-100">
        <span class="material-icons-outlined sparkle fs-4">
          {{ $route.path == "/explore" ? "settings" : "auto_awesome" }}
        </span>
      </div>
    </nav>
  </header>
</template>

