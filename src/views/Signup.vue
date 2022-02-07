<template>
  <ModalForm :noPadding="true">
    <div class="modal-body-cstm m-0 flex-grow-1 d-flex flex-column gap-2">
      <h5 class="my-4 text-start fw-bold">Create your account</h5>
      <div class="form-floating my-2">
        <input
          type="text"
          name="name"
          class="form-control"
          placeholder="Name"
          autofocus=""
        /><label for="name">Name</label>
      </div>
      <div class="form-floating my-2">
        <input
          type="text"
          name="email"
          class="form-control"
          placeholder="Email"
          autofocus=""
        /><label for="Email">Email</label>
      </div>
      <a href="#" class="open-sans text-teak underline-hover text-start ps-2"
        >Use username instead</a
      >

      <h6 class="text-start">Date of Birth</h6>
      <p class="text-start">
        This will not be shown publicly. Confirm your own age, even if this
        account is for a business, a pet, or something else.
      </p>
      <div class="input-group gap-3">
        <!-- date month -->
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <!-- date day -->
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <!-- date year -->
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="d-grid px-4 pt-2 pb-4">
      <button type="button" class="btn btn-dark rounded-pill my-3">Next</button>
    </div>
  </ModalForm>
</template>

<script>
import ModalForm from "../components/ModalForm.vue";
export default {
  components: {
    ModalForm,
  },
};
</script>

<style>
</style>