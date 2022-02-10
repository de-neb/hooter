<template>
  <ModalForm :noPadding="true">
    <div
      class="modal-body-cstm m-0 flex-grow-1 d-flex flex-column gap-1"
      v-if="!isFinalStep && isFirstStep"
    >
      <h5 class="my-3 text-start fw-bold">Create your account</h5>
      <div class="form-floating my-2">
        <input
          type="text"
          name="name"
          class="form-control"
          placeholder="Name"
          autofocus=""
          v-model="name"
        /><label for="name">Name</label>
      </div>
      <div class="form-floating my-2">
        <input
          type="text"
          :name="userInput"
          class="form-control"
          :placeholder="userInput"
          autofocus=""
          v-model="userIdentifier"
        /><label :for="userInput" class="text-capitalize">{{
          userInput
        }}</label>
      </div>

      <!--first step  -->
      <div class="d-flex flex-column" v-if="!isNextStep && !isFinalStep">
        <input
          type="checkbox"
          id="user-input"
          v-model="isInputUsername"
          hidden
        />
        <label
          for="user-input"
          class="
            text-teak
            underline-hover
            text-start
            mt-3
            mb-1
            input-changer
            w-fit-content
          "
          @click="emptyUserField"
          >Use {{ isInputUsername ? "email" : "username" }} instead</label
        >

        <h6 class="text-start fw-bold mt-4 mb-0">Date of Birth</h6>
        <p class="text-start m-0 text-secondary">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>

        <!-- birth date  -->
        <DateInput @date-input-filled="handleDateValues" />
      </div>
      <!-- second step confirm details-->

      <div
        class="d-flex flex-column flex-grow-1"
        v-else-if="isNextStep && !isFinalStep"
      >
        <div class="form-floating mt-2 mb-5">
          <input
            type="text"
            name="birthdate"
            class="form-control"
            placeholder="Birth date"
            @focus="showFirstStep"
            :value="`${monthShortName} ${day}, ${year}`"
          /><label for="birtdate">Birth date</label>
        </div>

        <p class="mb-0 mx-0 mt-5 text-start">
          By signing up, you agree to the
          <span class="text-info">Terms of Service</span> and
          <span class="text-info">Privacy Policy</span>, including
          <span class="text-info">Cookie Use </span>. Others will be able to
          find you by email or phone number when provided ·
          <span>Privacy Options</span>
        </p>

        <div class="d-grid mt-2">
          <button
            type="button"
            class="btn btn-dark btn-lg rounded-pill m-0 fw-bold"
            :disabled="isSetToDisable"
            @click="showNextStep(false, true)"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- third step password-->
    <div
      class="modal-body-cstm m-0 flex-grow-1 d-flex flex-column gap-2"
      v-if="isFinalStep"
    >
      <h5 class="my-3 text-start fw-bold">You'll need a password</h5>
      <h6 class="text-secondary text-start mb-3">
        Make sure it’s 8 characters or more.
      </h6>
      <PasswordInput @emit-password="(val) => (password = val)" />
    </div>

    <!-- next button -->
    <div class="d-grid px-4 pt-2 pb-4" v-if="!isNextStep">
      <button
        type="button"
        class="btn btn-dark btn-md rounded-pill my-3"
        :disabled="isSetToDisable"
        @click="showNextStep(true, false)"
      >
        Next
      </button>
    </div>
  </ModalForm>
</template>

<script>
import { mapState } from "vuex";
import ModalForm from "../components/ModalForm.vue";
import PasswordInput from "../components/PasswordInput.vue";
import DateInput from "../components/DateInput.vue";
export default {
  components: {
    ModalForm,
    PasswordInput,
    DateInput,
  },
  data() {
    return {
      name: null,
      userIdentifier: null,
      isInputUsername: false,
      isFirstStep: true,
      isNextStep: false,
      isFinalStep: false,
      password: null,
    };
  },
  methods: {
    emptyUserField() {
      this.userIdentifier = null;
    },
    showNextStep(bool1, bool2) {
      this.isNextStep = bool1;
      this.isFinalStep = bool2;
    },
    showFirstStep() {
      this.isFirstStep = true;
      this.isNextStep = false;
    },
  },
  computed: {
    userInput() {
      return this.isInputUsername ? "username" : "email";
    },
    isSetToDisable() {
      if (this.isFinalStep && this.password) {
        return false;
      } else if (this.isFirstStep && !this.isFinalStep) {
        if (
          this.name &&
          this.userIdentifier &&
          this.monthShortName &&
          this.day &&
          this.year
        ) {
          return false;
        }
      }
      return true;
    },
    ...mapState(["monthShortName", "day", "year"]),
  },
};
</script>

<style>
</style>