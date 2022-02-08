<template>
  <ModalForm :noPadding="true">
    <div
      class="modal-body-cstm m-0 flex-grow-1 d-flex flex-column gap-1"
      v-if="!isThirdStep"
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
      <div class="d-flex flex-column" v-if="!isNextStep && !isThirdStep">
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
        <div class="input-group gap-3 flex-nowrap">
          <!-- date month -->
          <div class="form-floating my-2 flex-grow-1">
            <select class="form-select" id="month-selector" v-model="month">
              <option v-for="(month, i) in monthsArr" :key="month" :value="++i">
                {{ month }}
              </option>
            </select>
            <label for="month-selector">Month</label>
          </div>

          <!-- date day -->
          <div class="form-floating my-2 flex-grow-1">
            <select class="form-select" id="day-selector" v-model="day">
              <option
                v-for="day in daysArr"
                :key="month + '-' + day"
                :value="day"
              >
                {{ day }}
              </option>
            </select>
            <label for="day-selector">Day</label>
          </div>

          <!-- date year -->
          <div class="form-floating my-2 flex-grow-1">
            <select class="form-select" id="year-selector" v-model="year">
              <option
                v-for="year in yearArr"
                :key="month + '-' + year"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
            <label for="year-selector">Year</label>
          </div>
        </div>
      </div>
      <!-- second step confirm details-->

      <div
        class="d-flex flex-column flex-grow-1"
        v-else-if="isNextStep && !isThirdStep"
      >
        <div class="form-floating mt-2 mb-5">
          <input
            type="text"
            name="birthdate"
            class="form-control"
            placeholder="Birth date"
            autofocus=""
            :value="`${shortMonth} ${day}, ${year}`"
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
            :disabled="!allInputsFilled"
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
      v-if="isThirdStep"
    >
      <h5 class="my-3 text-start fw-bold">You'll need a password</h5>
      <h6 class="text-secondary text-start mb-3">
        Make sure it’s 8 characters or more.
      </h6>
      <PasswordInput />
    </div>

    <!-- next button -->
    <div class="d-grid px-4 pt-2 pb-4" v-if="!isNextStep">
      <button
        type="button"
        class="btn btn-dark btn-md rounded-pill my-3"
        :disabled="!allInputsFilled"
        @click="showNextStep(true, false)"
      >
        Next
      </button>
    </div>
  </ModalForm>
</template>

<script>
import ModalForm from "../components/ModalForm.vue";
import PasswordInput from "../components/PasswordInput.vue";
export default {
  components: {
    ModalForm,
    PasswordInput,
  },
  data() {
    return {
      name: null,
      userIdentifier: null,
      month: null,
      day: null,
      year: null,
      isInputUsername: false,
      isNextStep: false,
      isThirdStep: false,
    };
  },
  methods: {
    emptyUserField() {
      this.userIdentifier = null;
    },
    showNextStep(bool1, bool2) {
      this.isNextStep = bool1;
      this.isThirdStep = bool2;
    },
    getMonth(format) {
      return Array.from(Array(12), (e, i) => {
        return new Date(25e8 * ++i).toLocaleString("en-US", { month: format });
      });
    },
  },
  computed: {
    shortMonth() {
      return this.getMonth("short")[this.month];
    },
    monthsArr() {
      return this.getMonth("long");
    },
    daysArr() {
      const days = new Date(2000, this.month, 0).getDate();
      return Array.from(Array(days), (e, i) => ++i);
    },
    yearArr() {
      const currentYear = new Date().getFullYear();
      const yearRange = currentYear - 1902;
      const resultArr = Array.from(
        Array(yearRange),
        (e, i) => 1902 + i
      ).reverse();

      if (this.month === 2 && this.day === 29) {
        return resultArr.filter(
          (year) => (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
        );
      }
      return resultArr;
    },
    userInput() {
      return this.isInputUsername ? "username" : "email";
    },
    allInputsFilled() {
      return (
        this.name && this.userIdentifier && this.month && this.day && this.year
      );
    },
  },
};
</script>

<style>
</style>