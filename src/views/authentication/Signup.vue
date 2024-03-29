<template>
  <ModalForm :noPadding="true">
    <div
      class="modal-body-cstm m-0 flex-grow-1 d-flex flex-column gap-1"
      v-if="!isFinalStep && isFirstStep"
    >
      <h4 class="my-3 text-start fw-bold">Create your account</h4>
      <div class="form-floating my-2">
        <UserInput
          input-type="Name"
          label="Name"
          v-model="nameModel"
        ></UserInput>
      </div>
      <div class="form-floating my-2">
        <UserInput
          v-if="userInputType === 'email'"
          label="Email"
          :input-type="userInputType"
          :is-invalid="!noErrorEmail && !!emailModel"
          :is-existing="userExists"
          v-model="emailModel"
        ></UserInput>
        <UserInput
          v-else
          label="Username"
          :input-type="userInputType"
          :is-invalid="!noErrorUsername && !!usernameModel"
          :is-existing="userExists"
          :at-min-length="usernameAtGreaterLength"
          v-model="usernameModel"
        ></UserInput>
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
      <PasswordInput
        v-model="passwordModel"
        :at-min-length="passwordAtMinLength"
      />
    </div>

    <!-- alternative step set username -->
    <div
      class="modal-body-cstm m-0 flex-grow-1 d-flex flex-column gap-2"
      v-else-if="isOptionalStep"
    >
      <h4 class="my-3 text-start fw-bold">What should we call you?</h4>
      <h6 class="text-secondary text-start mb-3">
        Your @username is unique you can always change it later.
      </h6>
      <div class="form-floating my-2 postion-relative">
        <UserInput
          input-type="username"
          :is-invalid="isUsernameInvalid"
          :is-existing="userExists"
          showAtSymbol="true"
          v-model="usernameModel"
          :at-min-length="usernameAtGreaterLength"
        ></UserInput>
        <div
          :class="{
            'visually-hidden':
              userExists || isUsernameInvalid || !usernameAtGreaterLength,
          }"
          class="material-icons-outlined alt-email"
        >
          alternate_email
        </div>
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
        :disabled="!isPasswordValid"
        @click="handleOptionalStep"
      >
        Next
      </button>
      <!-- finish button -->
      <button
        type="button"
        class="btn btn-dark btn-md rounded-pill my-3"
        v-else-if="isOptionalStep || !isInputEmail"
        :disabled="
          !isPasswordValid ||
          userExists ||
          isUsernameInvalid ||
          !usernameAtGreaterLength
        "
        @click="finishSignUp"
      >
        Finish
      </button>
    </div>
  </ModalForm>
</template>

<script>
import { isEmail, isAlphanumeric } from "validator";
import { mapState, mapActions } from "vuex";
import UserVModels from "@/mixins/UserVModels";
import UserInput from "@/components/UserInput.vue";
import ModalForm from "@/components/ModalForm.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import DateInput from "@/components/DateInput.vue";
export default {
  mixins: [UserVModels],
  components: {
    UserInput,
    ModalForm,
    PasswordInput,
    DateInput,
  },
  data() {
    return {
      isInputEmail: false,
      isFirstStep: true,
      isNextStep: false,
      isFinalStep: false,
      isOptionalStep: false,
      userExists: false,
    };
  },
  methods: {
    ...mapActions("user", ["signUp", "checkUser"]),
    emptyUserField() {
      this.emailModel = null;
      this.usernameModel = null;
    },
    assignBooleanInSteps({ first, next, final, optional }) {
      this.isFirstStep = first || this.isFirstStep;
      this.isNextStep = next;
      this.isFinalStep = final || this.isFinalStep;
      this.isOptionalStep = optional || this.isOptionalStep;
    },
    showNextStep(bool1, bool2) {
      this.assignBooleanInSteps({ next: bool1, final: bool2 });
    },
    showPrevStepToEdit() {
      this.assignBooleanInSteps({ first: true, next: false });
    },
    handleOptionalStep() {
      //overwrite true values to false
      this.isFirstStep = false;
      this.isFinalStep = false;
      this.assignBooleanInSteps({ first: false, final: false, optional: true });
    },
    handleSteps() {
      if (this.isFirstStep && !this.isNextStep) {
        this.assignBooleanInSteps({ next: true });
      } else if (this.isNextStep && this.isFirstStep) {
        this.assignBooleanInSteps({ first: false, next: false, final: true });
      } else if (this.isFinalStep) {
        this.assignBooleanInSteps({ first: false, next: false, final: false });
      } else if (this.isInputEmail && this.isFinalStep) {
        this.assignBooleanInSteps({ optional: true });
      }
    },
    finishSignUp() {
      const info = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password,
      };
      this.signUp(info)
        .then(() => {
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          console.log("sign up error", error);
        });
    },
    checkUserAvailability(isInvalid, user, condition) {
      if (!isInvalid && user) {
        if (condition) {
          this.checkUser({ user: user }).then((res) => {
            this.userExists = res.userExists;
          });
        } else this.userExists = false;
      } else this.userExists = false;
    },
  },
  computed: {
    ...mapState("date", ["monthShortName", "day", "year"]),
    userInputType() {
      return this.isInputEmail ? "email" : "username";
    },
    areAllInputsFilled() {
      if (
        this.name &&
        (this.emailModel || this.usernameModel) &&
        (this.noErrorEmail || this.noErrorUsername) &&
        this.monthShortName &&
        this.day &&
        this.year
      )
        return true;
      return false;
    },
    isSetToDisable() {
      if (this.isFinalStep && this.password) {
        return false;
      } else if (this.isFirstStep && !this.isFinalStep) {
        if (this.areAllInputsFilled) return false;
      } else if (this.isOptionalStep && this.usernameModel) return false;
      return true;
    },
    isEmailValid() {
      if (this.emailModel) return isEmail(this.emailModel);
      return false;
    },
    isUsernameAlphanumeric() {
      if (this.usernameModel) return isAlphanumeric(this.usernameModel);
      return false;
    },
    isUsernameInvalid() {
      return !this.isUsernameAlphanumeric && !!this.usernameModel;
    },
    noErrorUsername() {
      return (
        !this.userExists &&
        this.usernameAtGreaterLength &&
        !this.isUsernameInvalid
      );
    },
    noErrorEmail() {
      return !this.userExists && this.isEmailValid;
    },
    usernameAtGreaterLength() {
      const minCharLength = 6;
      return this.username && this.username.length >= minCharLength;
    },
    passwordAtMinLength() {
      return this.password && this.password.length >= 6;
    },
    isPasswordValid() {
      return this.passwordAtMinLength && this.password;
    },
  },
  watch: {
    usernameModel(username) {
      if (username) {
        this.checkUserAvailability(
          this.isUsernameInvalid,
          this.username,
          this.usernameAtGreaterLength
        );
      }
    },
    email(email) {
      const regEx = /@[a-zA-Z\d]+.[a-zAz]+$/;
      const containsFormat = regEx.test(email);
      this.checkUserAvailability(
        !this.isEmailValid,
        this.email,
        containsFormat
      );
    },
  },
};
</script>
