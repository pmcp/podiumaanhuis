<template>
<!-- 
  <form
                id="Signup-Form"
                name="wf-form-Signup-Form"
                data-name="Signup Form"
                class="grid-form"
              >
                <div class="form-group"><label for="initiative">Wat vind je van dit initatief?</label><textarea
                    data-name="initiative"
                    maxlength="5000"
                    id="formInitiative"
                    name="initiative"
                    class="cc-form__input w-input"
                  ></textarea></div>
                <div class="form-group"><label for="content-3">Wat vind je van de voorstellingen?</label><textarea
                    data-name="content"
                    maxlength="5000"
                    id="formContent"
                    name="content"
                    class="cc-form__input w-input"
                  ></textarea></div>
                <div class="form-input-group"><label for="Email-Address">E-mail (optioneel)</label><input
                    type="email"
                    class="cc-form__input w-input"
                    maxlength="256"
                    name="Email-Address"
                    data-name="Email Address"
                    placeholder="email@example.com"
                    id="Email-Address"
                  ></div><input
                  type="submit"
                  value="Verstuur"
                  data-wait="Even geduld..."
                  class="submit-button-2 button-full w-button"
                >
              </form> -->
  <form 
  class="grid-form"
  name="contact"
  method="post"
  v-on:submit.prevent="handleSubmit"
  action="/success/"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  <p hidden>
    <label>
      Don’t fill this out: <input name="bot-field" />
    </label>
  </p>
  <div class="form-group">
      <label for="formInitiative">Wat vind je van dit initatief?</label>
      <textarea class="cc-form__input w-input" name="formInitiative" v-model="formData.initiative"></textarea>
  </div>
  <div class="form-group">
    <label for="formContent">Wat vind je van de voorstellingen?</label>
    <textarea class="cc-form__input w-input" name="formContent" v-model="formData.content"></textarea>
    </div>
  <div class="form-group">
    <label for="email">E-mail (optioneel)</label>
    <input  class="cc-form__input w-input" type="email" name="email" v-model="formData.email" />
  </div>
  <!-- TODO: result page -->
  <button type="submit" class="submit-button-2 button-full w-button">Verstuur</button>
</form>
</template>

<script>
export default {
  data() {
  return {
    formData: {},
  }
},
methods: {
  encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  },
  handleSubmit(e) {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encode({
        'form-name': e.target.getAttribute('name'),
        ...this.formData,
      }),
    })
    .then(() => this.$router.push('/success'))
    .catch(error => alert(error))
  }
}
}
</script>