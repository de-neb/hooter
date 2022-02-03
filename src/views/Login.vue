<template>
  <div class="container-fluid p-4">
    <img src="" alt="hooter-logo" />
    <h1 class="greet my-5">
      <span>Happening now</span>
    </h1>
    <h3 class="text-start fw-bold mb-3">Join Hooter today.</h3>

    <div class="container d-grid gap-2 p-0">
      <button type="button" class="btn btn-outline-secondary rounded-pill">
        Sign in as {Google Auth}
      </button>
      <div class="d-flex justify-content-center align-items-center">
        <span class="horizontal"></span>
        <span class="mx-2">or</span>
        <span class="horizontal"></span>
      </div>
      <button type="button" class="btn btn-primary rounded-pill">
        Sign up with email
      </button>
      <div class="tos mb-3">
        <span
          >By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.</span
        >
      </div>
      <div class="mt-4 d-grid">
        <h5 class="fs-6 fw-bold text-start">Already have an account?</h5>
        <button type="button" class="btn btn-outline-primary rounded-pill">
          Sign in
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>