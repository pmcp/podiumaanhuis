<template>
  <div>
    <form
      v-if="!formSend"
      class="grid-form"
      name="contact"
      method="post"
      v-on:submit.prevent="handleSubmit"
      action="/success/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input
        type="hidden"
        name="form-name"
        value="contact"
      />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div class="form-group">
        <label for="formInitiative">Wat vind je van dit initatief?</label>
        <textarea
          class="cc-form__input w-input"
          name="formInitiative"
          v-model="formData.initiative"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="formContent">Wat vind je van de voorstellingen?</label>
        <textarea
          class="cc-form__input w-input"
          name="formContent"
          v-model="formData.content"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="email">E-mail (optioneel)</label>
        <input
          class="cc-form__input w-input"
          type="email"
          name="email"
          v-model="formData.email"
        />
      </div>
      <!-- TODO: result page -->
      <button
        type="submit"
        class="submit-button-2 button-full w-button"
      >Verstuur</button>
    </form>
    <div v-if="formSend">Bedankt voor je feedback!<br></div>
    <div v-if="formError">Oeps, er ging iets fout bij het versturen van je bericht.</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formSend: false,
      formError: false

    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit(e) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target.getAttribute("name"),
          ...this.formData
        })
      })
        .then(() => {
          this.formSend = true;
          console.log("success");
        })
        .catch(error => {
          this.formError = true;
          console.log(error);
        });
    }
  }
};
</script>