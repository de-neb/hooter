<template>
  <ModalForm :noPadding="true">
    <div
      class="modal-body-cstm m-0 flex-grow-1 d-flex flex-column gap-1"
      v-if="!isFinalStep && isFirstStep"
    >
      <h4 class="my-3 text-start fw-bold">Create your account</h4>
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
        <input type="checkbox" id="user-input" v-model="isInputEmail" hidden />
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
          >Use {{ !isInputEmail ? "email" : "username" }} instead</label
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
            @focus="showPrevStepToEdit"
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
            @click="handleSteps"
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
      <h4 class="my-3 text-start fw-bold">You'll need a password</h4>
      <h6 class="text-secondary text-start mb-3">
        Make sure it’s 8 characters or more.
      </h6>
      <PasswordInput @emit-password="(val) => (password = val)" />
    </div>

    <!-- optional step set username -->
    <div
      class="modal-body-cstm m-0 flex-grow-1 d-flex flex-column gap-2"
      v-else-if="isOptionalStep"
    >
      <h4 class="my-3 text-start fw-bold">What should we call you?</h4>
      <h6 class="text-secondary text-start mb-3">
        Your @username is unique you can always change it later.
      </h6>
      <div class="form-floating my-2">
        <input
          type="text"
          class="form-control username-input"
          name="set-username"
          placeholder="Username"
          v-model="setUsername"
          minlength="6"
          required
        /><label for="set-username">Username</label>
        <span class="material-icons-outlined alt-email"> alternate_email </span>
        <span class="material-icons check-circle"> check_circle </span>
      </div>
    </div>

    <!-- next button -->
    <div
      class="d-grid px-4 pt-2 pb-4"
      v-if="(isFirstStep || isFinalStep || isOptionalStep) && !isNextStep"
    >
      <!-- proceed next step -->
      <button
        type="button"
        class="btn btn-dark btn-md rounded-pill my-3"
        v-if="isFirstStep && !isFinalStep"
        :disabled="isSetToDisable"
        @click="handleSteps"
      >
        Next
      </button>
      <!-- set up username  -->
      <button
        type="button"
        class="btn btn-dark btn-md rounded-pill my-3"
        v-else-if="isFinalStep && isInputEmail"
        :disabled="!password"
        @click="handleOptionalStep"
      >
        Next
      </button>
      <!-- finish button -->
      <button
        type="button"
        class="btn btn-dark btn-md rounded-pill my-3"
        v-else-if="isOptionalStep || !isInputEmail"
        :disabled="!password"
        @click="finishSignUp"
      >
        Finish
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
      isInputEmail: false,
      isFirstStep: true,
      isNextStep: false,
      isFinalStep: false,
      isOptionalStep: false,
      password: null,
      setUsername: null,
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
    showPrevStepToEdit() {
      this.isFirstStep = true;
      this.isNextStep = false;
    },
    handleOptionalStep() {
      this.isOptionalStep = true;
      this.isFirstStep = false;
      this.isFinalStep = false;
    },
    handleSteps() {
      if (this.isFirstStep && !this.isNextStep) {
        this.isNextStep = true;
      } else if (this.isNextStep && this.isFirstStep) {
        this.isFinalStep = true;
        this.isFirstStep = false;
        this.isNextStep = false;
      } else if (this.isFinalStep) {
        this.isFinalStep = false;
        this.isNextStep = false;
        this.isFirstStep = false;
      } else if (this.isInputEmail && this.isFinalStep) {
        this.isOptionalStep = true;
      }
    },
    finishSignUp() {
      this.$router.push("/");
    },
  },
  computed: {
    userInput() {
      return this.isInputEmail ? "email" : "username";
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
      } else if (this.isOptionalStep && this.setUsername) {
        return false;
      }
      return true;
    },
    ...mapState(["monthShortName", "day", "year"]),
  },
};
</script>

<style>
</style>